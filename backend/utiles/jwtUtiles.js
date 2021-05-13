/*Gestion de jwt*/
let jwt = require('jsonwebtoken')//importation

module.exports = {
  tokenSign : 'DEVELOPMENT_TOKEN_SECRET',
  generateToken: function (user) {
    return jwt.sign({
      userId: user.id,
      is_admin: user.is_admin
    },
      this.tokenSign,
      {
        expiresIn: '24h'
      })
  },
  getUserId: function (data) {
    if (data.length > 1) {
      let token = data.split(' ')[1];
      try {
        let decodedToken = jwt.verify(token, this.tokenSign)
        userId = decodedToken.userId
        return userId
      }
      catch (error) {
        return error
      }
    };
  }
}