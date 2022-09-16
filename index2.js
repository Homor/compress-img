/*
 * @Author: molor
 * @Date: 2022-09-14 11:49:17
 * @LastEditors: molor
 * @LastEditTime: 2022-09-15 11:21:00
 * @FilePath: \compress-img\index2.js
 */

const { output_list, input_list } = require("./list");
const compressImg = require("./compressImg");

// 过滤非图片
let list = input_list;

// 生成导出目录
let out = output_list;

console.log(list);
console.log(out);

// 压缩图片
com(list, out);

async function com(list, out) {
    let len = list.length;
    let count = 0;
    for (let index = 0; index < len; index++) {
        try {
            await compressImg(list[index], out[index]);
            count++;
            console.log("compress progress:", count + "/" + len);
        } catch (e) {
            //在这里处理错误回调
            console.log(e);
        }
    }
    console.log('压缩完了');
}