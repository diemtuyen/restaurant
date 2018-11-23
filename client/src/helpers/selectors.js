import _ from 'lodash';
export const createLoadingSelector = (actions) => (state) => {
  // returns true only when all actions is not loading
  return _(actions).some((action) => {
    let flag = _.get(state, `loading.${action}`);
    console.log(flag);
    return flag;
  });
};