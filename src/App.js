import React, { Component } from 'react';
import { Provider } from 'react-redux';
import stylesLess from './App2.less';
import store, { updateReducer } from './store'
import reducers from './Action';
import { BrowserRouter, Route, NavLink, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import RMD from 'react-markdown';
import FileMap from './articlesHelper/fileMap.json';
import Nav from './Components/Nav';
import ALink from './Components/ArticleLink';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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
									this.setState({currentTag:tag});
								}
							} />
						{/* 文章列表区 */}
						<div style={{ height: '100%', width: 'auto', overflow: 'hidden', background: '#fff' }}>
							<Switch>
								{/* 文章显示区 */}
								<Route path='/:tag/:name' render={(props) => {
									let { match: { params } } = props;
									console.log(params)
									let md = require(`./articles/${params.tag}/${params.name}`);
									return (
										<RMD>
											{md.getArticle()}
										</RMD>)
								}} />
								<Route path='/' render={(props) => {
									return this.state.currentTag && Object.keys(FileMap[this.state.currentTag]).map(name => {
										return (
											<div style = {{margin:'5px'}}>
												<ALink tag = {this.state.currentTag} name = {name}/>
											</div>
										)
									}) || null
								}} />
							</Switch>
						</div>
					</div>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
