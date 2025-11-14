import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Link } from "@mui/material";
import styled from "styled-components";
import useWowStore from "../../_stores/useWowStore";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import useWowCharacterOrderUpdateMutation from "../_apis/_mutations/useWowCharacterOrderUpdateMutation";
import { IWowCharacter } from "../_apis/_models/wowCharacter";
import useWowCharMemoModalStore from "../_stores/useWowCharMemoModalStore";


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

  const { characterList, modifyMemo } = useWowStore();

  const { mutateAsync: updateCharacterOrder } = useWowCharacterOrderUpdateMutation();

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    const sourceOrder = characterList[source.index].order;
    const destOrder = characterList[destination.index].order;

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

  const getClassColor = (className: string): string => {
    switch (className) {
      case "수도사":
        return "#00ff98";
      case "기원사":
        return "#33937f";
      case "마법사":
        return "#3fc7eb";
      case "성기사":
        return "#f48cba";
      case "드루이드":
        return "#ff7c0a";
      case "사냥꾼":
        return "#aad372";
      case "사제":
        return "#ffffff";
      case "전사":
        return "#c69b6d";
      case "악마사냥꾼":
        return "#a330c9";
      case "주술사":
        return "#0070dd";
      case "흑마법사":
        return "#8788ee";
      case "죽음의 기사":
        return "#c41e3a";
      case "도적":
        return "#fff468";
    }

    return "#000000";
  }

  const handleClickCharacterMemoCell = (char: IWowCharacter) => {
    useWowCharMemoModalStore.getState().open({
      char,
      onConfirm: (request) => {
        modifyMemo(request);
      }
    });
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
              <HeaderTableCell>서버/종족</HeaderTableCell>
              <HeaderTableCell>메모</HeaderTableCell>
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
                        <TableCell sx={{textAlign: "center"}}>
                          <Link
                            href={getCharUrl(row.server, row.name)}
                            target="_blank"
                            sx={{
                              fontWeight: "700",
                              color: `${getClassColor(row.job)}`,
                              textShadow: (row.job === "사제" || row.job === "도적") ? "1px 1px 4px black" : "1px 1px 0 black",
                              textDecoration: "none",
                            }}
                          >
                            {row.name}
                          </Link>
                        </TableCell>
                        <TableCell sx={{textAlign: "center"}}>{`${row.server}/${row.tribe}`}</TableCell>
                        <TableCell onClick={() => handleClickCharacterMemoCell(row)}>{row.modifiedMemo}</TableCell>
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
