import actionTypes from '../constants/actionTypes';

function addTable(table){
    return {
        type: actionTypes.ADD_TABLE,
        tables: table
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
/*
function addFood(category, meat, note, count){
    return {
        type: actionTypes.s,
        category: category,
        meat: meat,
        note: note,
        count: count
    }
}


export function submitFood(tableID, data){
    
    return dispatch => {
        return fetch(`/table/${tableID}/food`, { 
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

                    dispatch(addFood(data.category, data.meat, data.note, data.count))
                }
            })
            .catch( (e) => console.log(e) );
    }    
}
*/