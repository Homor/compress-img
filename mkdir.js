/*
 * @Author: molor
 * @Date: 2022-09-14 18:05:03
 * @LastEditors: molor
 * @LastEditTime: 2022-09-14 18:07:15
 * @FilePath: \compress-img\mkdir.js
 */
const fs = require('fs');
const dirCache = {};

function mkdir(filePath) {
  const arr = filePath.split('/');
  let dir = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (!dirCache[dir] && !fs.existsSync(dir)) {
      dirCache[dir] = true;
      fs.mkdirSync(dir);
    }
    dir = dir + '/' + arr[i];
  }
  fs.writeFileSync(filePath, '')
}

module.exports = mkdir;