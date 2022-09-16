/*
 * @Author: molor
 * @Date: 2022-09-15 11:57:35
 * @LastEditors: molor
 * @LastEditTime: 2022-09-16 16:45:57
 * @FilePath: \compress-img\rotate.js
 */

const fs = require('fs');
const sharp = require('sharp');
const mapDir = require('./mapDir');
const mkdir = require("./mkdir");


var arguments = process.argv;

// 目标数组
const basePath = arguments[2];

// 输出目录
const outPut = arguments[3];

mapDir(basePath, (arr) => {
  // 过滤非图片
  let list = arr.filter(item => item.match(/(jpg)|(jpeg)|(png)/));

  console.log(typeof list[0]);

  // 生成导出目录
  let out = list.map(item => item.replace(basePath, outPut));

  console.log(list);
  console.log(out);
  console.log('总个数,',list.length);

  // console.log(list[0]);
  // console.log(list[0].match(/(\/bottom\.)|(\/top\.)/));

  // 旋转图片
  rot(list, out);

});

async function rot(list, out) {
  let len = list.length;
  let count = 0;
  for (let index = 0; index < len; index++) {

    if (!fs.existsSync(out[index])) {
      mkdir(out[index]);
    }
    
    try {
      if(list[index].match(/(\/bottom\.)|(\/top\.)/)){
        await rotateImg(list[index], out[index]);
      }else{
        await copyFile(list[index], out[index])
      }
      count++;
      console.log("rotate progress:",count + "/" + len);
    } catch (e) {
      //在这里处理错误回调
      console.log(e);
    }
  }
  console.log('旋转完了');
}


// 复制文件
function copyFile(input,output){
  return new Promise(function(resolve,reject){
    fs.cp(input, output, (err) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      };
      resolve();
    });
  })
}

function rotateImg(input,output){
  return new Promise(function(resolve,reject){
      sharp(input)
      .rotate(180)
      .toFile(output)
      .then( () => { console.log('end');resolve();})
      .catch( err => { console.log(err);reject(err) });
  })
}
