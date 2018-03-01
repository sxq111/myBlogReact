const replaceActionType = '替换state';
const getAHistoryStore = ()=>{
    let storeArr = [];
    return{
        getHistories:()=>{
            return [...storeArr]
        },
        enhancer:(createstore)=> (reducer, preloadedState, enhancer) => {
            const store = createstore(reducer, preloadedState, enhancer);
            const dispatch = (action)=>{
                store.dispatch(action);
                let tempStore = JSON.parse(JSON.stringify(store.getState()));
                storeArr.push({
                    action:action,
                    store:tempStore
                });
            }
            storeArr.push({
                action:null,
                store:JSON.parse(JSON.stringify(store.getState()))
            });
            console.log('in',store.getState());
            return {...store,dispatch};
        }
    }
}
export const replaceStoreActionCreater =(payload)=>{
    return {
        type:replaceActionType,
        payload
    }
}
export const makeRootReducer=(otherReducer)=>{
    return (prevState,action)=>{
        if(action.type === replaceActionType){
            return JSON.parse(JSON.stringify(action.payload));
        }
        return otherReducer(prevState,action);
    }
}
export default getAHistoryStore;