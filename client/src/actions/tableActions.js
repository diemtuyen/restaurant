import actionTypes from '../constants/actionTypes';

function addTable(table){
    return {
        type: actionTypes.ADD_TABLE,
        tables: table
    }
}
function showTableItem(tableItem){
    return {
        type: actionTypes.SHOW_TABLE,
        tableItem: tableItem
    }
}
export function fetchTableItem(id){
    return dispatch => {
        return fetch(`/table/${id}`)
        .then( (response) => response.json() )
        .then( (data) => dispatch(showTableItem(data.data)))
        .catch( (e) => console.log(e) );
    }    
}
export function fetchTable(){
    return dispatch => {
        return fetch(`/table`)
        .then( (response) => response.json() )
        .then( (data) => dispatch(addTable(data.data)))
        .catch( (e) => console.log(e) );
    }    
}
export function submitTable(data){
    return dispatch => {
        return fetch('/table/', { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .catch( (e) => console.log(e) );
    }    
}
function addFood(stTable, body){
    return {
        type: actionTypes.ORDER_FOOD,
        stTable: stTable,
        noodle: body.noodle,
        meat: body.meat,
        reject: body.reject,
        note: body.note,
        count: body.count,
        hasOption: body.hasOption,
        optional: body.optional,
        countOption: body.countOption,
        priceOption: body.priceOption
    }
}
export function submitFood(tableItemID, data){
    
    return dispatch => {
        return fetch(`/table/${tableItemID}/food`, { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }else{

                    dispatch(addFood(data.stTable, data.body));
                }
            })
            .catch( (e) => console.log(e) );
    }    
}
function updateTable(st){
    return {
        type: actionTypes.UPDATE_TABLE,
        statusTable: st
    }
}
export function updateStatusTable(tableItemID, data){
    
    return dispatch => {
        return fetch(`/table/${tableItemID}/update`, { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }else{
                    dispatch(updateTable(data.statusTable))
                }
            })
            .catch( (e) => console.log(e) );
    }    
}
function addRecord(count, food, total){
    return {
        type: actionTypes.UPDATE_TABLE,
        count: count,
        food: food,
        total: total
    }
}
export function submitRecord(data){
    return dispatch => {
        return fetch(`/table/record/`, { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }else{
                    dispatch(addRecord(data.data.dtCount, data.data.dtFood, data.data.dtTotal))
                }
            })
            .catch( (e) => console.log(e) );
    }    
}