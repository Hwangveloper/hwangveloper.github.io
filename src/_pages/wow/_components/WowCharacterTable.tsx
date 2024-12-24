import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";
import styled from "styled-components";
import { useShallow } from "zustand/shallow";
import useWowStore from "../_stores/useWowStore";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import useWowCharacterOrderUpdateMutation from "../_apis/_mutations/useWowCharacterOrderUpdateMutation";


const HeaderTableCell = styled(TableCell)`
  && {
    text-align: center;
    font-weight: bold;
    background-color: #f0f0f0;
  }
`;

const WowCharacterTable: React.FC = () => {

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

    const sourceChar = characterList[source.index];
    const destChar = characterList[destination.index];

    updateCharacterOrder(
      {
        list: characterList.filter((char) => char.id === sourceChar.id || char.id === destChar.id).map((char) => ({
          rowIndex: char.rowIndex,
          order: char.id === sourceChar.id ? destChar.order : (char.id === destChar.id ? sourceChar.order : 0),
        }))
      },
      {
        onSuccess: (res) => {
          useWowStore.setState({
            characterList: characterList.map((char) => {
              if (char.id === sourceChar.id) {
                return {
                  ...char,
                  order: destChar.order,
                };
              } else if (char.id === destChar.id) {
                return {
                  ...char,
                  order: sourceChar.order,
                };
              }
              return char;
            }).sort((left, right) => left.order - right.order)
          });
        }
      }
    );
  };

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
                  <Draggable key={row.id} draggableId={`${index}`} index={index}>
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
                        <TableCell sx={{textAlign: "center"}}><Link href={row.link} target="_blank">링크</Link></TableCell>
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
