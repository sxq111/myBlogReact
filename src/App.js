import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styles from  './App.css';
import stylesLess from  './App2.less';
import store, { updateReducer } from './store'
import reducers from './Action';
import LoginContainer from './Containers/LoginContainer'
import Auth from './Containers/Auth'
import { BrowserRouter, Route, NavLink, Switch, Redirect, Link } from 'react-router-dom';
import { Button, Input ,Card} from 'antd';
import DrawBoard from './Containers/DrawBoard'
import Nav from './Components/Nav'
import testmd from './test.txt';
class App extends Component {
	constructor(props) {
		super(props);

	}
	async  componentDidMount() {
		console.log(testmd);
		// let arr = [1,2,5];//学习下reduce
		// arr.reduce((p,c)=>{
		// 	console.log(p,c)
		// 	return p+c;
		// },7);
		Object.keys(reducers).forEach(name => {
			updateReducer(name, reducers[name]);
		});
		// console.log('app',this);
		// console.log(this.hasOwnProperty('setState'));
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>

					<div className = { stylesLess.testC} style={{ width: '100%', background: '#345' }}>
						<Nav />
						{/* {
							Usual.test2()
						}
						<Usual /> */}
						{/* <Usual2/> */}
						<Switch>
							<Route path='/home' render={() => {
								return (<h1>HOME</h1>);
							}} />
							<Route path='/page2' component={DrawBoard} />
							<Route path='/login' component={LoginContainer} />
							<Route path='/page404' render={() => {
								return (<h1>404 not found</h1>);
							}} />
							<Redirect from='/' to='/page404' />
						</Switch>
						{
							//先禁用登陆验证
							<Route path='/' component={Auth} />
						}
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;












const iiHoc = 
WrappedComponent => class xxxx extends WrappedComponent {
	constructor(){
		super();
		console.log(new.target.prototype );
		
		// console.log('father',super.valueOf());
		console.log('this',this);
		// console.log('==',this === super.valueOf());
		this.kkk ='lklk';
	}
	componentDidMount() {
		console.log('new father in child',new Usual());
		console.log('father in child', Usual);
		console.log('father in child', Usual === xxxx);//true
		console.log(xxxx.prototype)
	}
	sxq(){
		console.log('child')
	}
	bbb(){}
	render() {
		super.sxq();
		this.sxq();
		console.log(this.__proto__ === xxxx.prototype)//true
		// console.log(super.yyy)//undefined
		// console.log(super.kkk)//undefined
		// console.log(this.sxq === super.sxq)//false
		// console.log(this.sxq === super.valueOf().sxq)//true
		// console.log(super.valueOf().yyy)//234
		// console.log(this === super.valueOf())//true
		// console.log(typeof super.valueOf());//object
		return super.render();
	}
	static test(){
		console.log('super in static',super.valueOf() === Usual);
	}
}




@iiHoc
class Usual extends Component {

	constructor() {
		// console.log('new component',new Component());
		super();
		this.state = {
			usual: 'usual',
		}
		this.yyy=234
	}
	sxq(){
		console.log('father',this)
	}
	xxx=123
	static test2(){
		console.log('uaual static');
	}
	componentDidMount() {
		console.log('didMount',this);
		this.setState({ sxq: '111' })
	}
	render() {
		// this.sxq();
		//继承时父类方法的this指向子类
		return (
			<div>
				Usual
      		</div>
		)
	}
}


const cloneReactTreeStepByStep = function thisFunc(element,func = (tempnode)=>{return tempnode}){
	let node = null;
	let childNode = null;
	console.log('cloning',element)
	if(element.props && element.props.children && element.props.children.length > 0 ){
		if(Array.isArray(element.props.children)){
			childNode = element.props.children.map(cnode => {
				return thisFunc(cnode,func);
			});
		}
		if(typeof element.props.children === 'string'){
			childNode = element.props.children;
		}
	}
	node = React.cloneElement(element,element.props,childNode);
	console.log('do func 1',node)
	node = func(node);
	console.log('do func 2',node)
	return node;
}
const iiHoc2 = (WrappedComponent)=>{
	return class II extends WrappedComponent{
		constructor(...args){
			super(...args);
			this.supRended = super.render();
			// this.nodeNew = {...this.supRended.props.children[0]}
			// this.supRended.props.aaa='asdasdsa'
			this.cloneTest = cloneReactTreeStepByStep(this.supRended,(prevNode)=>{
				console.log('func nodev ',prevNode)
				let newNode = prevNode;
				if(prevNode.type === 'button')
				{
					let newProps = {...prevNode.props};
					newNode= React.cloneElement(prevNode,newProps,'asdasd');
				}
				if(prevNode.type === 'input')
				{
					let newProps = {...prevNode.props,disabled:true};
					newNode= React.cloneElement(prevNode,newProps);
				}
				return newNode;
			});
			let Comp = (<Card/>);//这样也可以进行渲染劫持，但是无法获取他的声明周期以及state等
			let comp2 = React.createElement(Card);//这样也可以进行渲染劫持，但是无法获取他的声明周期以及state等
			console.log(Comp,comp2);
			// console.log(this.cloneTest);
			// console.log(this.supRended);
			// console.log(this.nodeNew);
		}
		render(){
			return this.cloneTest;
		}
	}
}


@iiHoc2
class Usual2 extends Component{
	render(){
		return(
			<Card>
				<MyFunComponent/>
				{
					//MyFunComponent是函数式组件。他的子组件无法通过渲染劫持获取
				}
				<Card>
					<input />
					<button>asdasdasd</button>
					<input />
				</Card>
				<Card>
					<Input />
					<Button>asdasdasd</Button>
				</Card>
			</Card>
		)
	}
}
const MyFunComponent = (props)=>{
	return (
		<div>
			<Card>
				<Button>XXXX</Button>
			</Card>
		</div>
	)
}