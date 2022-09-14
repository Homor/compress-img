/*
 * @Author: molor
 * @Date: 2022-09-14 11:49:17
 * @LastEditors: molor
 * @LastEditTime: 2022-09-14 16:20:46
 * @FilePath: \compress\index.js
 */

const { log } = require('console');

const compressImg = require("./compressImg");
const mapDir = require('./mapDir');

// 目标数组
const basePath = './panos2';

// 输出目录
const outPut = "./pos/";

mapDir(basePath, (arr) => {
  console.log(arr);
  // 过滤非图片
  let list = arr.filter(item=>item.match(/(jpg)|(jpeg)|(png)/))

  // 生成导出目录
  list = list.map(item=>item.replaceAll(basePath,outPut));
  console.log(list);

  list =[
    './panos2/back.jpg',
    // './panos2/bottom.jpg',
    // './panos2/new/left.jpg',
    // './panos2/new/right.jpg',
  ];


  var out =[
    './pos/back.jpg',
    // './pos/bottom.jpg',
    // './pos/new/left.jpg',
    // './pos/new/right.jpg',
  ];


  list.forEach((item,index) => {
    compressImg(item,out[index]);
  });
  // return;
  // var fileName = 'E:/素材/全景/已补地成品/back.jpg';
  // compressImg(fileName);

});
