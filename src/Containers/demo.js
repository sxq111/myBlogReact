// export default connect(
//     state => {
//         //  const { store = {} } = state || {};
//         console.log(state);
//         return state;
//     }
//     // ,
//     // dispatch => {
//     //     //-------------sxq--------------
//     //     //自己实现了bindActionCreators
//     //     let bindedactions = {};
//     //     Object.keys(actions).forEach(k=>{
//     //         bindedactions[k] = (data)=>{
//     //             return dispatch(actions[k](data));
//     //         }
//     //     });
//     //     return {bindedactions};
//     // }
//     ,
//     dispatch => ({
//         bindedactions: bindActionCreators({ ...actions }, dispatch),
//     })
// )(FComponent);