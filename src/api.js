const ApiBuilder = require("claudia-api-builder");
const api = new ApiBuilder();
const dotenv = require('dotenv').config({path: '../.env'});
const {parse, service} = require('./index.js')

api.any("/", function (req, res) {
  try {
    var data = req.body;
    data = parse(data)
    return service(data)

  } catch (err) {
    //console.log(err);
    res.status(400);
    throw process.env.AWS_FUNCTION_NAME + ' has thrown an error: ' + err;
  }
});

module.exports = api;