const jwt = require('jsonwebtoken')

const key = 'sdfasdfaef'

function encryToken(admin){
  return jwt.sign(admin,key,{ expiresIn:60*30})
}

function decodeToken(token){
  return jwt.verify(token,key)
}

module.exports = {
  encryToken,
  decodeToken
}