var express = require('express');
var router = express.Router();

//获取svg
var captcha = require('svg-captcha')
//获取数据库
const { getStoreDB } = require('./resouce/mongo')
//获取token
const { encryToken , decodeToken } = require('./resouce/token')


//生成随机字母验证
router.get("/captcha",function(req,res,next){
  var cap = captcha.create({
    inverse:false,//翻转颜色
    fontSize:48,
    noise:3,
    width:256,
    height:60,
    size:4,
    ignoreChars:'0o1i'
  })
  //将验证码保存到session中，忽略大小写
  req.session = cap.text.toLowerCase()
  console.log(req.session)
  res.cookie('captcha',req.session)
  res.setHeader('Content-Type','image/svg+xml')
  res.write(String(cap.data))
  res.end()
})

//加密token
router.post('/encry',function(req,res,next){
  // console.log(req.body)
  res.send(encryToken(req.body))
  
})

//登录
router.post('/',function(req,res,next){
  try {
    var admin = decodeToken(req.body.token)
  // console.log(admin)
  var adminName = admin.adminName
  var adminPassword = admin.adminPassword
  var nadmin = {adminName:adminName,adminPassword:adminPassword}
  getStoreDB(function(storeDB){
    storeDB.collection('admins').find(nadmin).toArray(function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          adminName:result[0].adminName
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'请输入正确的用户名和密码后重新登录！！！'
        })
        return
      }
    })
  })
  } catch (error) {
    res.send({
      status:10004,
      msg:'登录时间过长，请重新登录'
    })
  }
  
})


module.exports = router;
