import actionTypes from '../constants/table.constants';
import { tableService } from  '../services/table.service';

export const tableActions = {
    getListTable
};

function getListTable() {
    return dispatch => {
        let action = actionTypes.TABLE_GET_LIST;
        tableService.getListTable()
            .then(
                obj => {                  
                    console.log('OKKKKKKK');
                },
                error => {
                    console.log('faillllllll');
                }
            );
    };
}