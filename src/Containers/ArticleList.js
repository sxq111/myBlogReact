import React, { Component } from 'react';
import FileMap from '../articlesHelper/fileMap.json';
import { Card } from 'antd';
const { Meta } = Card;

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articleData: []
        }
    }

    componentWillReceiveProps(p1, p2) {
        let arr = [];
        if (p1.tag) {
            Object.keys(FileMap[p1.tag]).map(articleName => {
                let articleHelper = require('../articles/' + p1.tag + '/' + articleName);
                let basicInfo = articleHelper.getBasicInfo();
                let time = new Date(basicInfo.time);
                basicInfo.menTime = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日';
                arr.push({
                    basicInfo: basicInfo,
                    overviewPic: articleHelper.getOverviewPic(),
                    title: articleName
                })
                this.setState({ articleData: arr });
            })
        }
    }
    render() {
        console.log(this.state.articleData);
        return (
            <div>
                {
                    this.state.articleData.map(data => {
                        return (
                            <Card
                                hoverable
                                style={{ width: 450,height:360 ,margin:10}}
                            >
                                <div style = {{width:'auto',height:200}}>
                                    <img style = {{height:'100%',width:'100%'}} alt="暂无图片" src={data.overviewPic}  />
                                </div>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}