const inquirer = require('inquirer');
const moment = require('moment');
const fs = require("fs");
const questions = [
    {
        type: 'input',
        name: 'post_name',
        message: '请输入您的文章别名（用于创建文章目录，仅限英文，单词间用短横杠‘-’连接）：',
        validate: value => {
            if (/(\.|\*|\?|\\|\/)/gi.test(value)) {
                return '文章别名不得包含特殊符号（.*?\\/），请重新输入↑↑';
            }

            if (/(([A-z]+-)+)?[A-z]+/gi.test(value)) {
                return true;
            }

            return '文章别名不合法，请重新输入↑↑';
        },
        filter: value => value.replace(/\s+/gi, '-'),
    },
    {
        type: 'input',
        name: 'tags',
        message: '请输入您的文章标签，由逗号分割',
        validate: value => {
            let arrs = value.split(',');
            if(arrs.some(str =>{
                return str === '';
            })){
                console.log('您输入的标签有误');
                return false;
            }
            return true;
        }
    }
];

const JSON_TEMPLATE = {
    createTime: moment().format('YYYY-MM-DDThh:mm:ss'),
    tags:'',
    markDown:'',
}

inquirer
    .prompt(questions)
    .then(answers => {
        // 获取用户输入
        const { post_name, tags } = answers;
        console.log(tags);
        /* 此处做一些命令行反馈和过程性的工作 */
        /* （如：提示用户输入是否合法、创建文章对应的目录和文件等等） */
        let newPost = JSON_TEMPLATE;
        JSON_TEMPLATE.tags =[...(new Set(tags.split(',')))];

        fs.writeFile('articles/'+post_name + '.json', JSON.stringify(JSON_TEMPLATE),{flag:'wx'}, function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
        });
    })
    .catch(err => {
        /* 异常处理 */
        console.log('eee1',err);
    });

