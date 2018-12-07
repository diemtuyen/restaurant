import actionTypes from '../constants/actionTypes';


function addRecord(report){
    return {
        type: actionTypes.ADD_RECORD,
        reports: report
    }
}
export function submitReport(data){
    return dispatch => {
        return fetch('/report', { 
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
                    dispatch(addRecord(data.data));
                }
            })
            .catch( (e) => console.log(e) );
    } 
}