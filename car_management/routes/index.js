var express = require('express');
var router = express.Router();
var { getStoreDB } = require('./resouce/mongo')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//修改密码
router.post('/rePassword',function(req,res,next){
  var admin = {}
  admin.adminName = req.body.adminName
  admin.adminPassword = req.body.adminPassword
  // console.log(admin)
  var newPassword = req.body.newPassword
  // console.log(newPassword)
  getStoreDB(function(storeDB){
    storeDB.collection('admins').find(admin).toArray(function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        storeDB.collection('admins').updateOne({adminName:admin.adminName},{$set:{adminPassword:newPassword}},function(err,r){
          if(err){
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员'
            })
            return
          }
          if(r.result.ok === 1){
            res.send({
              status:10000,
              msg:'修改成功'
            })
          }
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'系统查询不到您的身份信息，请正确输入密码后重试！！'
        })
        return
      }
    })
  })
})

module.exports = router;
