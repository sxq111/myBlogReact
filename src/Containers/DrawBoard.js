import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Icon, Input, Button, notification } from 'antd';
import PointList from '../DrawEngine/PointList';
import {getStoreHistories} from '../store';
import {replaceStoreActionCreater} from '../historyStore';

const d3 = require('d3');
const FormItem = Form.Item;

@connect(
    state => {
        return state;
    }
    ,
    dispatch => ({
        bindedactions: bindActionCreators({replaceState:replaceStoreActionCreater}, dispatch),
    })
)
export default class LogInCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            context: null,
            canvas: null,
            blocksize: 4,
            bloclNumbersXY:200,
            optionMode: 'DRAW',
            pointLists:[]
        }
    }
    canvasMouseMove(e){
        let {offsetX:ox,offsetY:oy} = e;
        let [x,y] = [Math.floor(ox/ this.state.blocksize),Math.floor(oy/ this.state.blocksize)];
        this.mouseOnLine(x,y);
    }
    canvasClick(e){
        let {offsetX:ox,offsetY:oy} = e;
        let [x,y] = [Math.floor(ox/ this.state.blocksize),Math.floor(oy/ this.state.blocksize)];
        if(this.state.optionMode === 'FILL'){
            this.fillRound(x,y);
        }     
    }

    fillRound(x,y){
        if(this.isXYInLineLists(x,y)){
            // console.log('point drawed');
            return;
        }
        let fillPointList = new PointList();
        let npwls = this.state.pointLists;
        npwls.push(fillPointList);    
        this.setState({pointLists:npwls},()=>{
            this.fillThePointListWithoutHeap(fillPointList,x,y);
        });
    }
    fillThePointList(pointList,x,y){
        //填充逻辑
        if(this.isXYInLineLists(x,y)){
            return;
        }
        if(x<0 || x>this.state.bloclNumbersXY){
            return;
        }
        if(y<0 || y>this.state.bloclNumbersXY){
            return;
        }
        pointList.push(x,y);
        this.fillThePointList(pointList,x+1,y);
        this.fillThePointList(pointList,x-1,y);
        this.fillThePointList(pointList,x,y+1);
        this.fillThePointList(pointList,x,y-1);
    }
    fillThePointListWithoutHeap(pointList,x,y){
        if(this.isInBoundary(x,y)){
            return;
        }
        pointList.push(x,y);
        let testList = [{x,y}];
        while(true){
            let newTestList= [];
            testList.forEach(p=>{
                let p4 = [
                    {x:p.x,y:p.y+1},
                    {x:p.x,y:p.y-1},
                    {x:p.x+1,y:p.y},
                    {x:p.x-1,y:p.y},
                ];
                p4.forEach(p=>{
                    if(!this.isInBoundary(p.x,p.y)){
                        newTestList.push(p);
                        pointList.push(p.x,p.y);
                    }
                });
            });
            testList = newTestList;
            if(testList.length<=0){
                break;
            }
        }
    }
    isInBoundary(x,y){
        if(this.isXYInLineLists(x,y)){
            return true;
        }
        if(x<0 || x>this.state.bloclNumbersXY){
            return true;
        }
        if(y<0 || y>this.state.bloclNumbersXY){
            return true;
        }
        return false;
    }
    updateLoop(){
        this.forceUpdate();
    }
    componentWillUnmount(){
        clearInterval(this.timer);
    }
    componentDidMount() {
        this.timer = setInterval(this.updateLoop.bind(this),1000);
        let canvas = d3.select('#drawBoard');
        let context = canvas.node().getContext('2d');
        this.setState({ context, canvas});
        let canvasele = document.getElementById('drawBoard');
        canvasele.addEventListener('mousemove',this.canvasMouseMove.bind(this));
        canvasele.addEventListener('click',this.canvasClick.bind(this));
        //拖拽和绘制主函数 基于D3
        canvas.call(d3.drag()
            .subject(this.dragsubject.bind(this))
            .on("start", this.dragstarted.bind(this))
            .on("drag", this.dragged.bind(this))
            .on("end", this.dragended.bind(this))
            .on("start.render drag.render end.render", this.draw.bind(this)));
    }
    draw() {//绘制逻辑
        if (!this.state.context) { return; }
        let { context } = this.state;
        context.clearRect(0, 0, this.state.blocksize*this.state.bloclNumbersXY, this.state.blocksize*this.state.bloclNumbersXY);
        let bsize = this.state.blocksize;
        this.state.pointLists.forEach((list)=>{
            context.beginPath();
            list.points.forEach(p=>{
                context.rect(p.x*bsize,p.y*bsize,bsize,bsize);
                context.fillStyle = '#0f0';
            });
            if(list.active){
                context.fillStyle = '#234';
            }
            context.fill();
        });
    }
    dragsubject() {
        let {x,y} = this.getBlockXY()
        if(this.state.optionMode === 'DRAW'){
            //绘制第一个点时，先创建一个PointList，最后返回该对象，在dragstarted中接收
            let pl = new PointList();
            let pointLists = this.state.pointLists;
            pointLists.push(pl);
            this.setState({pointLists});
            return pl;
        }
        if(this.state.optionMode === 'DRAG'){
            return this.state.pointLists.find((list,index)=>{
                return list.pointSet[`${x},${y}`];
            });
        }
    }
    getBlockXY(){
        //得到d3拖拽事件的 坐标 转换为block坐标
        let { offsetX: ox, offsetY: oy } = d3.event.sourceEvent;
        let [x,y] = [Math.floor(ox/ this.state.blocksize),Math.floor(oy/ this.state.blocksize)];
        return {x,y};
    }
    dragstarted() {
        this.clkPoint = this.getBlockXY();
        if(this.state.optionMode === 'DRAW'){
            d3.event.subject.push(this.clkPoint.x,this.clkPoint.y);
        }
        if(this.state.optionMode === 'DRAG'){
            d3.event.subject.active = true;
        }
    }
    dragged() {
        let {x,y} = this.getBlockXY();
        let [accx,accy] = [x-this.clkPoint.x,y-this.clkPoint.y];
        this.clkPoint.x=x;
        this.clkPoint.y=y;
        if(this.state.optionMode === 'DRAW'){
            d3.event.subject.push(x,y,true);
            d3.event.subject.fillLastTwo();
        }
        if(this.state.optionMode === 'DRAG'){
            d3.event.subject.move(accx,accy);
        }
    }
    dragended() {
        if(this.state.optionMode === 'DRAG'){
            d3.event.subject.refreshSet();
            d3.event.subject.active = false;
        }
    }
    isXYInLineLists(x,y){
        //判断xy是否在已经被绘制的区域
        return this.state.pointLists.some(list=>{
            return list.pointSet[`${x},${y}`];
        });
    }
    mouseOnLine(x,y){
        let onSth = false;
        onSth = this.isXYInLineLists(x,y);
        this.setState({onSth});
    }
    render() {
        this.draw();
        return (
            <div>
                <canvas
                    id='drawBoard'
                    width={this.state.blocksize*this.state.bloclNumbersXY}
                    height={this.state.blocksize*this.state.bloclNumbersXY}
                    style={
                        {border: '1px solid red',width:(this.state.blocksize*this.state.bloclNumbersXY),height: (this.state.blocksize*this.state.bloclNumbersXY),cursor:this.state.onSth?'pointer':'default'}
                    }
                />
                <Button onClick={
                    () => {
                        this.setState({ optionMode: 'DRAW' });
                    }
                }>绘图</Button>
                <Button onClick={
                    () => {
                        // console.log(getStoreHistories());
                        this.setState({ optionMode: 'DRAG' });
                    }
                }>拖动</Button>
                <Button onClick={
                    () => {
                        this.props.bindedactions.replaceState(getStoreHistories()[0].store);
                        this.setState({ optionMode: 'FILL' });
                    }
                }>填充</Button>
            </div>
        )
    }
}
