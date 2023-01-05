/*
 * @Author: zfz
 * @Date: 2021-11-19 14:00:56
 * @LastEditors: zfz
 * @LastEditTime: 2021-11-23 13:51:47
 * @Description: update
 */
var express = require('express');
var router = express.Router();
// fs模块
const fs = require('fs')
// multer模块，上传文件用
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    var changedName = (new Date().getTime()) + '-' + file.originalname;
    cb(null, changedName);
  }
})
const upload = multer({
  storage:storage
}).array('muliteVideos')

/**
  * @接口 POST /videos/save
  * @作用 保存数据到数据库
  * @传参 {
  *        videoList:{
  *          'fileType':[
  *            {
  *              fileName:'',
  *              fileTags:[],
  *              fileType:'',
  *              regionId:'',
  *              remark:'',
  *              preview:'',
  *              cover:''
  *            }
  *          ]
  *        }
  *      }
  * @返回数据 
  *     {msg:'保存成功',code:'success'}
  *     {msg:'保存失败',code:'error'}
 */
router.post('/save', function(req, res, next) {
  let body = Object.keys(req.body.videoList).reduce((pre, val) => {
    pre[val] = req.body.videoList[val].map((item) => {
      item.id = global.common.createId()
      return item
    })
    return pre
  }, {})
  let sql = ''
  global.pool.query(sql, body , (err, result) => {
    if (err) throw err;
    res.send({msg:'保存成功',code:'success'});
  })
});
/**
  * @接口 GET /videos/uploadFile
  * @作用 上传文件
  * @传参 formData
  * @返回数据
  *   { msg:'MuliterError:' + err, code:'error' }
  *   { msg: 'Error:' + err, code: 'error' }
  *   { msg: '上传成功', code: 'success',
  *     files:[
  *         {
  *           originalname: 'ccj1.mp4',//文件原始名称
  *           mimetype: 'video/mp4',//类型
  *           filename: '1637548271583-ccj1.mp4',//新名称
  *           path: 'uploads\\1637548271583-ccj1.mp4',//路径
  *           size: 2462587,//大小
  *         }
  *     ] 
  *   }
  *修改记录:
    时间    修改人    内容
*/
router.post('/uploadFile', (req,res)=>{
    //取参数req.body
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          res.send({msg:'MuliterError:' + err,code:'error'})
        } else if (err) {
          res.send({ msg: 'Error:' + err, code: 'error' })
        }else{
          let files = req.files.map((val) => {
            let { originalname,mimetype,filename,path,size} = val
            let newPath = path.split('\\').join('/')
            return { originalname, mimetype, filename, path: newPath, size }
          })
          res.send({ msg: '上传成功', code: 'success',files })
        }
    })
})

/**
  * @接口 GET /videos/getVideo
  * @作用 获取视频
  * @传参 {
  *         id:'',
  *         type:'',//从何处取值，json/sql
  *         category:''
  *       }
  * @返回数据
  * {code:'success',data:{preview:''}}//正确
  * {code:'error',msg:'未找到视频'}//错误
  *修改记录:
    时间    修改人    内容
*/
router.get('/getVideo',async (req,res)=>{
  let query = req.query
  //取参数req.query.xx
  res.setHeader('Access-Control-Allow-Origin', '*');
  // console.log(`${header}://${IP}:${port}/uploads/1637548156441-ccj1.mp4`)
  let path = query.type == 'json' ? getVideoForJson(query) : getVideoForSql(query)
  let data = await global.common.readFile(path)
  res.send(
    data
  )
})
function getVideoForSql(query){
  let {id,category} = query
  let sql = ''
  global.pool.query(sql, id, (err, result) => {
    if (err) throw err;
    // let path = global.path.resolve(__dirname, '../../public/uploads/1637548156441-ccj1.mp4')
    let path = global.path.resolve(__dirname, '../../public' + result.path)
    return path
  })
}
async function getVideoForJson(query){
  let { id, category } = query
  let path = global.path.resolve(__dirname,'../../public/videos/videosList.json')
  let json = await global.common.readFile(path,'utf-8')
  let obj = JSON.parse(json.trim())
  let list = category ? obj[category] : Object.values((pre,val)=>{
    return [...pre,...val]
  },[])
  let video = list.find((val)=>{
    return val.id == id
  })
}
module.exports = router;
