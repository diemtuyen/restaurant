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
function removeFood(){
    return {
        type: actionTypes.REMOVE_FOOD
    }
}
export function removeFood(tableItemID, foodID){
    
    return dispatch => {
        return fetch(`/table/${tableItemID}/food/${foodID}`, { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }else{

                    dispatch(removeFood());
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
function resetData(){
    return {
        type: actionTypes.RESET_TABLE
    }
}
export function resetTable(tableItemID){
    
    return dispatch => {
        return fetch(`/table/${tableItemID}/reset`, { 
            method: 'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(), 
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }else{
                    dispatch(resetData())
                }
            })
            .catch( (e) => console.log(e) );
    }    
}