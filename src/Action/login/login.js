import {createAction, handleActions, combineActions} from 'redux-actions';
import {createAsyncAction} from '../sxqAsyncAction';
const setLoginData = createAction('登录action');
const getAllUsersOk =  createAction('得到了所有用户');
const getAllUsers  = createAsyncAction('http://localhost:4396/','GET',getAllUsersOk);
const setXXData = createAction('测试action');
export const actions = {
    setLoginData,
    getAllUsers,
    getAllUsersOk,
    setXXData
}
export default handleActions({
    [setLoginData]: (state, {payload}) => ({
        ...state,
        loginData: payload
    }),    
    [setXXData]: (state, {payload}) => ({
        ...state,
        XXData: payload
    }),
    [getAllUsersOk]:(state,{payload})=>{
        return{
            ...state,
            allUsers:payload
        }
    }
},{});