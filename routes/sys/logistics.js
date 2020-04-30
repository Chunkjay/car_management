var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../resouce/mongo')
var ObjectId = require('mongodb').ObjectID

//获取物流列表
router.get('/getLogisticsList',function(req,res,next){
  getStoreDB(function(store){
    store.collection('logistics').find({}).toArray(function(err,result){
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
          logisticsList:result
        })
        return
      }else{
        res.send({
          status:10005,
          msg:'暂时没有物流信息哦！！！'
        })
        return
      }
    })
  })
})

//获取物流信息列表
router.post('/getLogisticsInfo',function(req,res,next){

  var id = req.body.logisticsid

  getStoreDB(function(store){
    store.collection('logisticsInfo').find({logid:id}).toArray(function(err,result){
      console.log(result)
      console.log(result.logisticsInfoList)
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
          start:{start:"xxxx市",to:"xxxxx市转运中心"},
          logisticsInfo:result[0].logisticsInfoList,
          end:{phone:"1234567890"}
        })
        return
      }else{
        res.send({
          status:10005,
          msg:'暂时没有物流信息哦！！！'
        })
        return
      }
    })
  })
})

module.exports = router;
