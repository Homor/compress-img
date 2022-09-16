/*
 * @Author: molor
 * @Date: 2022-09-14 11:49:17
 * @LastEditors: molor
 * @LastEditTime: 2022-09-15 11:19:43
 * @FilePath: \compress-img\index.js
 */

// yanan.li@3dbizhi.com
// liyanan2020
const compressImg = require("./compressImg");
const mapDir = require('./mapDir');

var arguments = process.argv;

// 目标数组
const basePath = arguments[2];

// 输出目录
const outPut = arguments[3];

console.log(basePath,outPut);

// // 目标数组
// const basePath = 'C:/Users/HI/Desktop/pano/pano/';

// // 输出目录
// const outPut = "./pos/";


mapDir(basePath, (arr) => {
  // 过滤非图片
  let list = arr.filter(item => item.match(/(jpg)|(jpeg)|(png)/));

  console.log(typeof list[0]);

  // 生成导出目录
  let out = list.map(item => item.replace(basePath, outPut));

  console.log(list);
  console.log(out);

  // 压缩图片
  com(list, out);

});


async function com(list, out) {
  let len = list.length;
  let count = 0;
  for (let index = 0; index < len; index++) {
    try {
      await compressImg(list[index], out[index]);
      count++;
      console.log("compress progress:",count + "/" + len);
    } catch (e) {
      //在这里处理错误回调
      console.log(e);
    }
  }
  console.log('压缩完了');
}