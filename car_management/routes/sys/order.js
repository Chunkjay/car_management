var express = require('express');
var router = express.Router();
var { getStoreDB } = require('../resouce/mongo')
var ObjectId = require('mongodb').ObjectID

//del
router.post('/del',function(req,res,next){
  var id = req.body.id
  getStoreDB(function(store){
    store.collection('order').removeOne({_id:new ObjectId(id)},err => {
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

//getOrderList()
router.get('/getOrderList',function(req,res,next){
  getStoreDB(function(store){
    store.collection('order').find({}).toArray(function(err,result){
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
          orderList:result
        })
        return
      }else{
        res.send({
          status:10005,
          msg:'暂时没有订单哦！！！'
        })
        return
      }
    })
  })
})

//确认订单，并把数据添加到物流表；
router.post('/',function(req,res,next){
  var username = req.body.item.username
  var tel = req.body.item.tel
  var address = req.body.item.address
  var goodsname = req.body.item.goodsname
  var price = req.body.item.price
  var number = req.body.item.number
  getStoreDB(function(store){
    store.collection('logistics').insertOne({username:username,tel:tel,address:address,goodsname:goodsname,price:price,number:number},function(err,result){
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
