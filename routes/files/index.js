/*
 * @Author: zfz
 * @Date: 2021-11-22 16:48:51
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-23 14:12:45
 * @Description: update
 */
const fs = require('fs')
var express = require('express');
var router = express.Router();
/**
  * @接口 POST /localFileToJSON
  * @作用 本地文件地址存入json文件
  * @传参 {
  *         path:'',//文件夹路径
  *         name:'',//json文件名称
  *       }
  * @返回数据
  * {code:'success',msg:''}//正确
  * {code:'error,msg:''}//错误
  *修改记录:
    时间    修改人    内容
*/
router.post('/localFileToJSON',(req,res)=>{
    let folderPath = req.body.path
    let name = req.body.name ? req.body.name + '.json' : 'videoList'+ Math.ceil(Math.random() * 100) +'.json'
    let list = getFile(folderPath)
    let basePath = global.path.resolve(__dirname, '../../public/videosJson')
    process.chdir(`${basePath}`)
    fs.access(`${basePath}/${name}`, (err) => {
        if (err) {
            fs.writeFileSync(`${name}`, JSON.stringify(list))
        } else {
            fs.writeFileSync(`${basePath}/${name}`, JSON.stringify(list), 'utf8')
        }
        res.send({ msg: '保存成功', code: 'success' })
    })
})
// 读取文件夹,readdir方法只读取一层文件夹，所以多层需要递归
function getFile(filePath) {
    //根据文件路径读取文件，返回文件列表
    let arrFiles = []
    const files = fs.readdirSync(filePath)
    for (let i = 0; i < files.length; i++) {
        const item = files[i]
        const stat = fs.lstatSync(filePath + '\\' + item)
        if (stat.isDirectory() === true) {
            arrFiles = arrFiles.concat(getFile(filePath + '\\' + item))
        } else {
            arrFiles.push(
                {
                    preview:filePath + '\\' + item,
                    id:global.common.createId(),
                    name:item
                }
            )
        }
    }
    return arrFiles
}
module.exports = router;