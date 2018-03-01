
export default class PointList {
    constructor() {
        this.points = [];
        this.pointSet = {
        }
    }
    push(x, y,fill = false) {
        if (!this.pointSet[`${x},${y}`]) {
            this.pointSet[`${x},${y}`] = true;
            this.points.push({ x, y });
        }
    }
    fillTwo(sp,ep){
        //简单的寻路，用来实现两个点的最短路径寻找
        if(sp.x === ep.x && sp.y === ep.y){
            return;
        }
        let newp =this.getNearest(sp,ep);
        this.push(newp.x,newp.y);
        this.fillTwo(newp,ep);
    }
    fillLastTwo(){
        //填充最后两个点
        if(this.points.length>1)
        {
            this.fillTwo(this.points[this.points.length-2],this.points[this.points.length-1])
        }
    }
    getNearest({x,y},{x:dx,y:dy}){
        let ninePoints = [];
        for(let i=-1;i<=1;i++){
            for(let j=-1;j<=1;j++){
                ninePoints.push({x:x+i,y:y+j});
            }
        };
        let minPoint = ninePoints.reduce((curMin,nowPoint)=>{
            let [accx,accy] = [Math.abs(curMin.x -dx),Math.abs(curMin.y -dy)];
            let [naccx,naccy] = [Math.abs(nowPoint.x -dx),Math.abs(nowPoint.y -dy)];
            let l1 = accx*accx + accy*accy;
            let l2 = naccx*naccx + naccy*naccy;
            if(l2<l1){
                return nowPoint;
            }
            return curMin;
        },{x,y});
        return minPoint;
    }
    refreshSet(){
        let set = {}
        this.points.forEach(point=>{
            set[`${point.x},${point.y}`] = true;
        });
        this.pointSet = set;
    }
    move(x,y){
        this.points.forEach(point=>{
            point.x+=x;
            point.y+=y;
        });
    }
}