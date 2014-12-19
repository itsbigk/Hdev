// when adding module.exports to this section it should then automatically connect to your server.js file

module.exports = {
  url      : 'mongodb://localhost/project4-homeless-devices',
  mongoLab : process.env.MONGOLAB_URI
  // the link below will more than likely need to be called something different like 'urlRemote'
  // url : 'mongodb://heroku_app32217691:r6boqevj1e319cp31900ets09c@ds061200.mongolab.com:61200/heroku_app32217691'
}
