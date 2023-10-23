import {useEffect, useState} from "react";
import { GoogleSpreadsheet } from 'google-spreadsheet';

const credential = require('../googleKey.json');

export const getSpreadsheet = async () => {
    const doc = new GoogleSpreadsheet(process.env.REACT_APP_SPREAD_SHEET_ID);

    await doc.useServiceAccountAuth(credential);
    await doc.loadInfo();

    return doc;
}

const useGoogleSheet = (sheetId) => {
    const [rows, setRows] = useState([]);

    const fetchRows = async () => {
        const googleSheet = await getSpreadsheet();
        const sheetsByIdElement = googleSheet.sheetsById[sheetId];
        const rows = await sheetsByIdElement.getRows();
        setRows(rows);
    }

    useEffect(() => {
        fetchRows();
    }, []);

    return [rows];
}

export default useGoogleSheet;