import {globalConstants} from '../constants/global.constants'
export const common = {
    getToken,
    getRefreshToken
};
function getToken(){
    let user = JSON.parse(localStorage.getItem(globalConstants.USER));
    return user.access_token;
}
function getRefreshToken(){
    let user = JSON.parse(localStorage.getItem(globalConstants.USER));
    return user.refresh_token;
}