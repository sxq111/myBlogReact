const inquirer = require('inquirer');
const moment = require('moment');
const fs = require("fs");
const questions = [
    {
        type: 'input',
        name: 'post_name',
        message: '请输入您的文章名',
        validate: value => {
            if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
                return '不得包含特殊符号（.*?\\/），请重新输入↑↑';
            }
            return true;
        },
    },
    {
        type: 'input',
        name: 'tags',
        message: '请输入您的文章标签',
        validate: value => {
            if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
                return '不得包含特殊符号（.*?\\/），请重新输入↑↑';
            }
            return true;
        }
    }
];

const JSON_TEMPLATE = {
    createTime: moment().format('YYYY-MM-DDThh:mm:ss'),
    tags: '',
    markDown: '',
}

inquirer
    .prompt(questions)
    .then(answers => {
        // 获取用户输入
        const { post_name, tags } = answers;
        console.log('tags', tags);
        /* 此处做一些命令行反馈和过程性的工作 */
        /* （如：提示用户输入是否合法、创建文章对应的目录和文件等等） */
        let newPost = JSON_TEMPLATE;
        JSON_TEMPLATE.tags = [...(new Set(tags.split(',')))];;
        // let fmap = generateFileMap('src/articles/');
        // console.log(fmap);
        fs.mkdir('src/articles/' + tags, (err, rst) => {
            //创建标签目录
            fs.mkdir('src/articles/' + tags + '/' + post_name, (err, rst) => {
                //创建文章目录
                if (err) {
                    console.log('创建文章目录报错', err);
                    return;
                }
                console.log('创建文章目录成功');
                fs.writeFile('src/articles/' + tags + '/' + post_name + '/' + 'main.md', '请开始你的表演', (err => {
                    //创建markdown
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('创建main.md文件成功，将您的文章填入该markdown文件');
                }));
                fs.writeFile('src/articlesHelper/fileMap.json', JSON.stringify(generateFileMap('src/articles/')), (err => {
                    //创建文件地图
                    if (err) {
                        console.log(err);
                        return
                    }
                    console.log('更新文件地图成功');
                }));
                copyExposerTemplate('src/articlesHelper/exposerTemplate.js', 'src/articles/' + tags + '/' + post_name + '/' + 'index.js');
            });
        });
    })
    .catch(err => {
        /* 异常处理 */
        console.log('eee1', err);
    });
const generateFileMap = (base, maxDepth = 2) => {
    return (function getMap(depth, path) {
        if (depth > maxDepth) {
            return true;
        }
        let map = {};
        let files = fs.readdirSync(path);
        files.length > 0 && files.forEach(dir => {
            map[dir] = getMap(depth + 1, path + '/' + dir);
        });
        return map;
    })(1, base);
}

const copyExposerTemplate = (desPath, targetPath) => {
    var fs = require("fs");
    var buf = new Buffer(2048);
    fs.open(desPath, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            fs2 = require('fs');
            fs2.writeFile(targetPath, buf.slice(0, bytes).toString(), function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });
}
module.exports = {
    generateFileMap
}