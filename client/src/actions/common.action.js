export const commonActions = {
    request,
    success,
    failure
};
function request(type_action, data) { return { type: type_action, data } }
function success(type_action, data) { return { type: type_action, data } }
function failure(type_action, error) { return { type: type_action, error } }