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
  var item = req.body.item
  // console.log(item)
  var nitem = {}
  nitem.id = item._id
  nitem.phone = item.phone
  nitem.adress = item.adress
  nitem.status = item.status
  nitem.logID = ""
  nitem.sum = item.sum
  nitem.name = item.name
  // console.log(nitem)

  var goods = []
  for(var i=0;i<item.goods.length;i++){
    var good = {}
    good.goodsname = item.goods[i].goodsname
    good.color = item.goods[i].color
    good.size = item.goods[i].size
    good.price = item.goods[i].price
    good.num = item.goods[i].num
    goods.push(good)
  }
  // console.log(goods)
  nitem.goods = goods
  // console.log(nitem)

  
  getStoreDB(storeDB => {
    storeDB.collection('logistics').find({id:nitem.id}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10003,
          msg:'此订单已经确认，无需再次确认'
        })
        return
      }else{
        getStoreDB(function(store){
          store.collection('logistics').insertOne(nitem,function(err,result){
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
                log_id:result.insertedId
              }
            })
          })
        })
      }
    })
  })
  
})

module.exports = router;
