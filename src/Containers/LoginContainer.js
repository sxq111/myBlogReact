import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, notification } from 'antd';
import { actions } from '../Action/login/login';
import { getStoreHistories } from '../store';
const FormItem = Form.Item;
@connect(
    state => {
        //  const { store = {} } = state || {};
        console.log(state);
        return state;
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({ ...actions }, dispatch),
    })
)
class LogInCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rst: null
        }
    }
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    componentDidMount() {
        // class A{
        //     fun(){
        //         console.log('fun');
        //     }
        //     x = 100
        // }
        // let a = new A();
        // console.log(a.hasOwnProperty('x')); //返回true

        // let arr = [];
        // for(var i = 0;i<5;i++){
        //     arr.push(()=>{
        //         return i;
        //     });
        // }
        // console.log(arr[2]());

        // let arr = [];
        // for (let i = 0; i < 5; i++) {
        //     setTimeout(() => {
        //         console.log(i);
        //     }, 0);
        // }
        let innerObj = { innerName: '123' }
        let arr = [1, 2, 3, 4, 666, innerObj];
        let obj = { arr: arr, name: 'sxq' }
        let myDeepCopy = (origin) => {
            if (typeof origin !== 'object') {
                return origin
            }
            let rst = origin instanceof Array ? [] : {};
            for (let key in origin) {
                if (origin.hasOwnProperty(key)) {
                    rst[key] = myDeepCopy(origin[key]);
                }
            }
            return rst;
        }
        let obj2 = myDeepCopy(obj);
        obj2.arr[2] = 1212;
        obj2.arr[5].name = '11111111';
        console.log(obj, obj2);

    }
    login() {
        let vals = this.props.form.getFieldsValue();
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Origin', 'http://localhost:3000')
        var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(vals)
        };
        fetch('http://localhost:4396/login', myInit)
            .then(async (response) => {
                let rst = await response.json();
                console.log(rst);
                if (!rst.fail) {
                    const { setLoginData } = this.props.bindedactions;
                    setLoginData(rst);
                    this.props.history.push('/home');
                    notification.success({
                        message: '系统信息',
                        description: rst.userId + ' 登录成功',
                    });
                    return;
                }
                notification.error({
                    message: '系统信息',
                    description: '用户名密码错误',
                });
            });

    }
    render() {

        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        const userNameError = isFieldTouched('id') && getFieldError('id');
        const passwordError = isFieldTouched('pwd') && getFieldError('pwd');
        return (
            <div style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, padding: '10px', background: '#345' }}>
                <Form style={{ width: '200px', margin: '100px auto' }}>
                    <FormItem
                        validateStatus={userNameError ? 'error' : ''}
                        help={userNameError || ''}
                    >
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: '用户名密码至少为6位', pattern: /^[\w\d]{6}[\w\d]*$/ }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                            )}
                    </FormItem>
                    <FormItem
                        validateStatus={passwordError ? 'error' : ''}
                        help={passwordError || ''}
                    >
                        {getFieldDecorator('pwd', {
                            rules: [{ required: true, message: '用户名密码至少为6位', pattern: /^[\w\d]{6}[\w\d]*$/ }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
                            )}
                    </FormItem>
                    <FormItem>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            disabled={this.hasErrors(getFieldsError())}
                            onClick={this.login.bind(this)}
                        >
                            登录
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            onClick={() => {
                                const { setXXData } = this.props.bindedactions;
                                setXXData('asdasd');
                            }}
                        >
                            测试
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            onClick={() => {
                                console.log(getStoreHistories());
                            }}
                        >
                            测试2
                        </Button>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            onClick={() => {
                                console.log(getStoreHistories());
                            }}
                        >
                            测试回退state
                        </Button>
                    </FormItem>
                </Form>

            </div>
        );
    }
}

const inputNormalStyle = {
    display: 'block',
    width: '200px',
    margin: '10px auto'
}
export default Form.create()(LogInCheck);