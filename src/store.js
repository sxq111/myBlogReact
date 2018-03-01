import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createHistory from 'history/createBrowserHistory';
import {routerReducer} from 'react-router-redux';
import {browserHistory} from 'react-router';
import getAHistoryStore,{makeRootReducer} from'./historyStore';


const composeEnhancers = composeWithDevTools({
    //为了redux dev tools 服务
	// options like actionSanitizer, stateSanitizer
});
const hisStoreObj = getAHistoryStore();
export const getStoreHistories = hisStoreObj.getHistories;
const middleware = [thunk];
const myTestMidware = ({ getState, dispatch }) => nextDispatch => {
    let count = 0;
    return action => {
        count ++;    
        let otime = Date.now();
        let dispatchRst = nextDispatch(action);
        console.log('我是一个中间件,你发出了一个action，第'+count +'个','这个action为:',action,'执行时间：',Date.now() -otime+ '毫秒');
    }
}
const myTestMidware_delay = ({ getState, dispatch }) => nextDispatch => {
    return action => {
        let now = Date.now();
        while(Date.now()-now <50){}
        let dispatchRst = nextDispatch(action);
    }
}
const myEhancer = (createstore)=> (reducer, preloadedState, enhancer) => {
    const store = createstore(reducer, preloadedState, enhancer);
    const dispatch = (action)=>{
        console.log('我是一个Enhancer，action为：',action);
        return store.dispatch(action);
    }
    return {...store,dispatch};
}

const store = createStore(makeRootReducer(combineReducers({ routering: routerReducer })),
    {},
    composeEnhancers(
        applyMiddleware(myTestMidware,myTestMidware_delay, ...middleware),
        myEhancer,
        hisStoreObj.enhancer
        
    )
);


store.appReducers = {};
export const updateReducer = (key,reducer) => {
    if (Object.hasOwnProperty.call(store.appReducers, key)) return;
    store.appReducers[key] = reducer;
    let test = store.appReducers
    store.replaceReducer(makeRootReducer(combineReducers({routering: routerReducer ,...store.appReducers})));
}
console.log('store',store);
export default store;
