//import getSheet from "../../libs/googlesheet";

export const GET_TODO_LIST = "home/GET_TODO_LIST";


export function getTodoList() {
    
    //const [data] = getSheet('342331815');

    return {
        type: GET_TODO_LIST,
        payload: ''//data
    };
}