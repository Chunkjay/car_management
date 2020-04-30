var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../../resouce/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('user').updateOne({_id:new ObjectId(user._id)},{$set:{username:user.username,sex:user.sex,tel:user.tel}},err => {
      // console.log(err)
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      res.send({
        status:10000,
        msg:'ok'
      })
    })
    
  
  
  })
})



module.exports = router;