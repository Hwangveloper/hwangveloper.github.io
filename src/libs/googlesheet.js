import { GoogleSpreadsheet } from 'google-spreadsheet';

const credential = require('../googleKey.json');

export const getSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREAD_SHEET_ID);

    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();

    return doc;
}

export const getSheetData = async (sheetId, sheetName) => {
    const spreadsheet = await getSpreadsheet();
    const sheetsByIdElement = spreadsheet.sheetsById[sheetId];
    const rows = await sheetsByIdElement.getRows();
    const data = {title: sheetName, data: rows}

    return data;
}

export const useGoogleSheet = async () => {
    const googleSheet = await getSpreadsheet();
    const sheetsByIdElement = googleSheet.sheetsByTitle['Outline'];
    const rows = await sheetsByIdElement.getRows();
    return rows;
}

export default getSpreadsheet;