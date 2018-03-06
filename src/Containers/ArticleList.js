import React, { Component } from 'react';
import FileMap from '../articlesHelper/fileMap.json';
import { Card, Tag } from 'antd';
import styles from './ArticleList.css';
import { Link } from 'react-router-dom';
const { Meta } = Card;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        }
    }
    componentDidMount(){
        if(this.props.tag){
            this.getArticles(this.props);
        }
    }
    componentWillReceiveProps(p1, p2) {
        if (p1.tag) {
            this.getArticles(p1);
        }
    }
    getArticles(p1) {
        let arr= [];        
        Object.keys(FileMap[p1.tag]).map(articleName => {
            let articleHelper = require('../articles/' + p1.tag + '/' + articleName);
            let basicInfo = articleHelper.getBasicInfo();
            let time = new Date(basicInfo.time);
            basicInfo.menTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日' + ' '+time.getHours()+'时' + time.getMinutes()+'分' ;
            arr.push({
                basicInfo: basicInfo,
                overviewPic: articleHelper.getOverviewPic(),
                title: articleName,
                tag: p1.tag
            })
            this.setState({ articleData: arr });
        })
    }
    render() {
        console.log(this.state.articleData);
        return (
            <div>
                {
                    this.state.articleData.map(data => {
                        return (
                            <div className={styles.al} style={{ width: '31%', height: '250px', padding: 5, float: 'left' }} >
                                <Card
                                    hoverable={true}
                                    style={{ width: '100%', height: '100%' }}
                                >
                                    <div style={{ width: '100%', height: 150 }}>
                                        <img style={{ height: '100%', width: '100%' }} alt="暂无图片" src={data.overviewPic} />
                                    </div>
                                    <Tag style={{ margin: '10px 0 10px' }} color="blue">{'发布时间：' + data.basicInfo.menTime}</Tag>
                                    <br />
                                    <Tag color="#444"><Link to={`/${data.tag}/${data.title}`}>{'标题：' + data.title}</Link></Tag>
                                </Card>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}