var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../../resouce/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('goods').insertOne({goodsname:user.username,photo:user.photo,price:user.price,introduction:user.introduction,passnum:user.passnum,number:user.number,lieb:user.lieb},function(err,result){
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
          userid:result.insertedId
        }
      })
    })
  })
})



module.exports = router;