var express = require('express');
var router = express.Router();
var { getStoreDB } = require('./resouce/mongo')

// 注册接口
router.post('/',function(req,res,next){
  // console.log(req)
  getStoreDB(function(storeDB){
    storeDB.collection('admins').insertOne(req.body,function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:`${err.message}`+'用户请求已成功，插入数据库失败，请联系管理员进行处理！！！'
        })
        return
      }
      //此时请求已经成功
      res.send({
        status:10000,
        msg:'ok',
        data:{
          adminId:result.insertedId
        }
      })
    })
  })
})

module.exports = router;
