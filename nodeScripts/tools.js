const fs = require("fs");
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

module.exports = {
    generateFileMap
}