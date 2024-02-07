import { getSpreadsheet } from "../../libs/googlesheet";

export const getTodoList = async () => {
    const spreadsheet = await getSpreadsheet();
    const sheetsByIdElement = spreadsheet.sheetsById[0];
    const rows = await sheetsByIdElement.getRows();
    return rows;
};