import moment from "moment";
import { getSpreadsheet } from "../../libs/googlesheet";

export const getProjectRows = async () => {
    const spreadsheet = await getSpreadsheet();
    const projectTable = spreadsheet.sheetsById[1870747319];
    const projectRows = await projectTable.getRows();

    return projectRows;
}

export const getTaskRows = async () => {
    const spreadsheet = await getSpreadsheet();
    const TaskTable = spreadsheet.sheetsById[342331815];
    const taskRows = await TaskTable.getRows();

    return taskRows;
}

export const refreshTodoRows = async ({todoRows}) => {
    await todoRows.forEach(async (row) => {
        if (!isEmpty({row}) && !isModified({row, time: 8})) {
            if (row['FrequentlyReset'] === 'Y') {
                row.CurrentProgress = '0';
            }
            row.PlayingProgress = '0';
            row.ModifiedAt = moment().format('YYYY/MM/DD HH:mm:ss');

            await row.save();
        }
        
    });
}

const isEmpty = ({row}) => {
    return !row['MaxProgress'];
}

const isModified = ({row, time}) => {
    if (!!row['ModifiedAt']) {
        const modifiedAt = moment(row['ModifiedAt'], 'YYYY/MM/DD HH:mm:ss');
        let current = moment(moment().format('YYYY/MM/DD'), 'YYYY/MM/DD');
        if (row['Frequency'] === 'Weekly') {
            const diffDay = (current.day() + 3) % 7;
            current = current.subtract(diffDay, 'days').add(time, 'hours');
        }
        else if (row['Frequency'] === 'Daily') {
            current = current.add(time, 'hours');
        }

        return !modifiedAt.isBefore(current);
    }

    return false;
}

export const getCheckList = ({todoRows, charRows}) => {
    
    return todoRows.filter((row) => !!row['MaxProgress'] && row['Type'] === 'Check').map((row) => {

        const chars = charRows.filter((cRow) => cRow['ID'] === row['CharacterID']);
        let charRow = null;
        if (chars.length >= 1) {
            charRow = chars[0];
        }
        
        return {
            id: row['ID'],
            charId: row['CharacterID'],
            isMainCharacter: charRow !== null ? charRow['Main'] : '',
            charName: charRow !== null ? charRow['Character'] : '',
            charJob: charRow !== null ? charRow['Job'] : '',
            charTribe: charRow !== null ? charRow['Tribe'] : '',
            charServer: charRow !== null ? charRow['Server'] : '',
            charLink: charRow !== null ? charRow['Link'] : '',
            frequency: row['Frequency'],
            frequentlyReset: row['FrequentlyReset'],
            startDate: row['StartDate'],
            endDate: row['endDate'],
            title: row['Title'],
            description: row['Description'],
            currentProgress: parseInt(row['CurrentProgress']) ?? 0,
            playingProgress: parseInt(row['PlayingProgress']) ?? 0,
            maxProgress: parseInt(row['MaxProgress']) ?? 0,
            category: row['Category'],
            references: row['References'],
            modifiedAt: row['ModifiedAt'],
        };
    });
};

export const getWeeklyTable = ({todoRows, charRows}) => {

    let columns = [];
    let rows = [];
    
    let list = todoRows.filter((row) => !!row['MaxProgress'] && row['Type'] === 'Table').map((row) => {

        if (!columns.some((column) => column.id === row['ID'])) {
            columns.push({
                id: row['ID'],
                title: row['Title'],
            });
        }

        if (!rows.some((r) => r.charId === row['CharacterID'])) {
            rows.push({charId: row['CharacterID']});
        }

        const chars = charRows.filter((cRow) => cRow['ID'] === row['CharacterID']);
        let charRow = null;
        if (chars.length >= 1) {
            charRow = chars[0];
        }
        return {
            id: row['ID'],
            charId: row['CharacterID'],
            isMainCharacter: charRow !== null ? charRow['Main'] : '',
            charName: charRow !== null ? charRow['Character'] : '',
            charJob: charRow !== null ? charRow['Job'] : '',
            charTribe: charRow !== null ? charRow['Tribe'] : '',
            charServer: charRow !== null ? charRow['Server'] : '',
            charLink: charRow !== null ? charRow['Link'] : '',
            frequency: row['Frequency'],
            frequentlyReset: row['FrequentlyReset'],
            startDate: row['StartDate'],
            endDate: row['endDate'],
            title: row['Title'],
            description: row['Description'],
            currentProgress: parseInt(row['CurrentProgress']) ?? 0,
            playingProgress: parseInt(row['PlayingProgress']) ?? 0,
            maxProgress: parseInt(row['MaxProgress']) ?? 0,
            category: row['Category'],
            references: row['References'],
            modifiedAt: row['ModifiedAt'],
        };
    });

    return {columns, rows: rows.map((row) => {
        list.filter((item) => item.charId === row.charId).forEach((item) => {
            row[item.id] = {
                currentProgress: item.currentProgress,
                playingProgress: item.playingProgress,
                maxProgress: item.maxProgress,
                description: item.description,
            };
            row.isMainCharacter = item.isMainCharacter;
            row.charName = item.charName;
            row.charJob = item.charJob;
            row.charTribe = item.charTribe;
            row.charServer = item.charServer;
            row.charLink = item.charLink;
            row.frequency = item.frequency;
            row.frequentlyReset = item.frequentlyReset;
            row.category = item.category;
        });

        return row;
    })};
};

export const setCurrentProgress = async ({id, charId, playingProgress, currentProgress, todoRows}) => {

    await todoRows.forEach(async (row) => {
        if (row['ID'] === id && row['CharacterID'] === charId) {
            row.PlayingProgress = playingProgress.toString();
            row.CurrentProgress = currentProgress.toString();
            row.ModifiedAt = moment().format('YYYY/MM/DD HH:mm:ss');
            await row.save();
        }
    });
}