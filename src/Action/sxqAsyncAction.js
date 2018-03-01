
const headers = new Headers();
headers.append('Content-Type', 'application/json')
headers.append('Origin', 'http://localhost:3000')
const InitData = {
    headers: headers,
    mode: 'cors',
    cache: 'default',
    // body: JSON.stringify(vals)
};
export const createAsyncAction = (url, method, successAction) => {
    method = method.toLowerCase();
    return (
        (data) => {
            return (dispatch) => {
                let innerInit;
                if (method === 'get') {
                    innerInit = InitData;
                }
                return fetch(url, innerInit).then(rst => {
                    return rst.json();
                }).catch(err => {
                    return null
                }).then(result => {
                    if (!result) {
                        throw new Error(method + ' ' + url + ' fail');
                    }
                    successAction && dispatch(successAction(result));
                    return result;
                });
            }
        }
    );
}

