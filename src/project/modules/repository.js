import { getSpreadsheet } from "../../libs/googlesheet";

export const getTodoList = async () => {
    const spreadsheet = await getSpreadsheet();
    const wowTodoTable = spreadsheet.sheetsById[761138336];
    const charTable = spreadsheet.sheetsById[2100441604];
    const todoRows = await wowTodoTable.getRows();
    const charRows = await charTable.getRows();

    return todoRows.map((row) => {

        const chars = charRows.filter((cRow) => cRow['ID'] === row['CharacterID']);
        let charRow = null;
        if (chars.length >= 1) {
            charRow = chars[0];
        }
        return {
            id: row['ID'],
            characterId: row['CharacterID'],
            isMainCharacter: charRow !== null ? charRow['Main'] : '',
            charName: charRow !== null ? charRow['Character'] : '',
            charJob: charRow !== null ? charRow['Job'] : '',
            charTribe: charRow !== null ? charRow['Tribe'] : '',
            charServer: charRow !== null ? charRow['Server'] : '',
            charLink: charRow !== null ? charRow['Link'] : '',
            frequency: row['Frequency'],
            startDate: row['StartDate'],
            endDate: row['endDate'],
            title: row['Title'],
            description: row['Description'],
            currentProgress: parseInt(row['CurrentProgress']) ?? 0,
            maxProgress: parseInt(row['MaxProgress']) ?? 0,
            category: row['Category'],
            references: row['References'],
        };
    });
};

export const setCurrentProgress = async ({id, currentProgress}) => {
    const spreadsheet = await getSpreadsheet();
    const wowTodoTable = spreadsheet.sheetsById[761138336];
    const todoRows = await wowTodoTable.getRows();

    todoRows.map(async (row) => {
        if (row['ID'] === id) {
            row.CurrentProgress = currentProgress.toString();
            await row.save();
        }
    });
}

export const getCharacterList = async () => {
    const spreadsheet = await getSpreadsheet();
    const sheetsByIdElement = spreadsheet.sheetsById[2100441604];
    const rows = await sheetsByIdElement.getRows();

    return rows.map((row) => {
        return {
            id: row['ID'],
            isMain: row['Main'],
            name: row['Character'],
            job: row['Job'],
            tribe: row['Tribe'],
            server: row['Server'],
            link: row['Link'],
        };
    });
}