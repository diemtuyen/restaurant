export const common = {
    getToken
};
function getToken(){
    let user = JSON.parse(localStorage.getItem('user'));
    return user.access_token;
}