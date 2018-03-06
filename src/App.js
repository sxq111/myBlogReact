import React, { Component } from 'react';
import { Provider } from 'react-redux';
import stylesLess from './App2.less';
import store, { updateReducer } from './store'
import reducers from './Action';
import { BrowserRouter, Route, NavLink, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import Nav from './Components/Nav';
import ALink from './Components/ArticleLink';
import Article from './Containers/Article';
import ArticleList from './Containers/ArticleList';
import FileMap from './articlesHelper/fileMap.json';
// const Gitment = require('gitment');
// require('gitment/style/default.css');
const SubMenu = Menu.SubMenu;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	async  componentDidMount() {
		Object.keys(reducers).forEach(name => {
			updateReducer(name, reducers[name]);
		});
	}
	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<div className={stylesLess.body}>
						<Nav fileMap={FileMap}
							onChangeTag={
								(tag) => {
									console.log('clktag');
									this.setState({ currentTag: tag });
								}
							} />
						{/* 文章列表区 */}
						<div style={{ height: '100%', width: 'auto', overflow: 'scroll', background: '#fff', overflowX: 'hidden' }}>
							<Switch>
								{/* 文章显示区 */}
								<Route path='/:tag/:name' component={Article} />
								<Route path='/'
									render={(props) => {
										return (<ArticleList tag  = {this.state.currentTag}/>)
									}}
								/>
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
