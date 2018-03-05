const {generateFileMap} = require('./tools');
const fs = require("fs");


fs.writeFile('src/articlesHelper/fileMap.json', JSON.stringify(generateFileMap('src/articles/')), (err => {
    //创建文件地图
    if (err) {
        console.log(err);
        return
    }
    console.log('更新文件地图成功');
}));