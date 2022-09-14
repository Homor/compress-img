/*
 * @Author: molor
 * @Date: 2022-09-14 16:09:29
 * @LastEditors: molor
 * @LastEditTime: 2022-09-14 16:11:58
 * @FilePath: \compress\compressImg.JS
 */

const { log } = require('console');
const fs = require('fs');

const tinify = require("tinify");

const API_KEY = "c8V2C6pmsUeKsCmLkfqCNDxmXivYbb7q";
tinify.key = API_KEY;

function compressImg(entryUrl, outUrl) {
  console.log(entryUrl, outUrl);
  return new Promise(function (resolve, reject) {
    fs.readFile(entryUrl, function (err, sourceData) {
      if (err) { reject(); throw err };
      try {
        console.log('start');

        tinify.fromBuffer(sourceData).toBuffer(function (err, resultData) {
          if (err) { reject();console.log(err); throw err };
          //写入文件
          fs.writeFile(outUrl, resultData, 'binary', (err) => {
            if (err) {
              console.log('写入文件错误');
              reject();
            } else {
              console.log('写入文件成功')
              resolve();
            }
          })

        });

      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  })
}

module.exports = compressImg;