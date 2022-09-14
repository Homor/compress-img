/*
 * @Author: molor
 * @Date: 2022-09-14 16:09:29
 * @LastEditors: molor
 * @LastEditTime: 2022-09-14 18:33:25
 * @FilePath: \compress-img\compressImg.js
 */

const fs = require('fs');
const mkdir = require("./mkdir");

const tinify = require("tinify");

const API_KEY = "c8V2C6pmsUeKsCmLkfqCNDxmXivYbb7q";
tinify.key = API_KEY;

function compressImg(entryUrl, outUrl) {
  console.log(entryUrl, outUrl);
  let time = + new Date();

  return new Promise(function (resolve, reject) {
    fs.readFile(entryUrl, function (err, sourceData) {
      if (err) { reject(); throw err };
      try {
        console.log('start compress');

        tinify.fromBuffer(sourceData).toBuffer(function (err, resultData) {
          if (err) { reject(); console.log(err); throw err };

          if (!fs.existsSync(outUrl)) {
            mkdir(outUrl);
          }
          
          //写入文件
          fs.writeFile(outUrl, resultData, 'binary', (err) => {
            if (err) {
              console.log(err);
              console.log('写入文件错误');
              reject();
            } else {
              let diff = new Date()  - time;
              console.log('end compress,time:',diff/1000+"s")
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