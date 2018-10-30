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
function addFood(body){
    return {
        type: actionTypes.ORDER_FOOD,
        noodle: body.noodle,
        meat: body.meat,
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

                    dispatch(addFood(data.body))
                }
            })
            .catch( (e) => console.log(e) );
    }    
}