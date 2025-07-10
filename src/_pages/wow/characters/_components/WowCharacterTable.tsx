import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowStore from "../../_stores/useWowStore";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import useWowCharacterOrderUpdateMutation from "../_apis/_mutations/useWowCharacterOrderUpdateMutation";
import { IWowCharacter } from "../_apis/_models/wowCharacter";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

interface WowCharacterTableProps {
  refetch: () => void;
}

const WowCharacterTable: React.FC<WowCharacterTableProps> = ({ refetch }) => {

  const { characterList } = useWowStore(
    useShallow((state) => ({
      characterList: state.characterList,
    }))
  );

  const { mutateAsync: updateCharacterOrder } = useWowCharacterOrderUpdateMutation();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    const sourceOrder = characterList[source.index].order;
    const destOrder = characterList[destination.index].order

    var updatedCharList: IWowCharacter[] = [];
    if (sourceOrder < destOrder) {
      updatedCharList = characterList.filter((char) => char.order >= sourceOrder && char.order <= destOrder);
      updatedCharList = updatedCharList.map((char) => ({
        ...char,
        order: char.order === sourceOrder ? destOrder : char.order - 1,
      }))
    } else {
      updatedCharList = characterList.filter((char) => char.order >= destOrder && char.order <= sourceOrder);
      updatedCharList = updatedCharList.map((char) => ({
        ...char,
        order: char.order === sourceOrder ? destOrder : char.order + 1,
      }))
    }

    updateCharacterOrder(
      {
        list: updatedCharList,
      },
      {
        onSuccess: (res) => {
          refetch();
        }
      }
    );
  };

  const getCharUrl = (serverName: string, charName: string): string => {
    return `https://worldofwarcraft.blizzard.com/ko-kr/character/kr/${serverName}/${charName}`;
  }

  return (
    <TableContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Table>
          <TableHead>
            <TableRow>
              <HeaderTableCell width={60}>순서</HeaderTableCell>
              <HeaderTableCell>메인</HeaderTableCell>
              <HeaderTableCell>이름</HeaderTableCell>
              <HeaderTableCell>직업</HeaderTableCell>
              <HeaderTableCell>종족</HeaderTableCell>
              <HeaderTableCell>서버</HeaderTableCell>
              <HeaderTableCell>링크</HeaderTableCell>
            </TableRow>
          </TableHead>
          <Droppable droppableId="CharacterTable">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {characterList.map((row, index) => (
                  <Draggable key={row.id} draggableId={row.id} index={index}>
                    {(provided, snapshot) => (
                      <TableRow
                        key={row.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          background: snapshot.isDragging ? "#f0f0f0" : "inherit",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <TableCell sx={{textAlign: "center"}}>{row.order}</TableCell>
                        <TableCell sx={{textAlign: "center"}}>{row.isMain}</TableCell>
                        <TableCell sx={{textAlign: "center"}}>{row.name}</TableCell>
                        <TableCell sx={{textAlign: "center"}}>{row.job}</TableCell>
                        <TableCell sx={{textAlign: "center"}}>{row.tribe}</TableCell>
                        <TableCell sx={{textAlign: "center"}}>{row.server}</TableCell>
                        <TableCell sx={{textAlign: "center"}}><Link href={getCharUrl(row.server, row.name)} target="_blank">링크</Link></TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </Table>
      </DragDropContext>
    </TableContainer>
  );
};

export default WowCharacterTable;
