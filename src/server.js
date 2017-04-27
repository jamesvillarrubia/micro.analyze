const micro = require('micro')
const {json} = require('micro')
const dotenv = require('dotenv').config({path: '.env'});
const {parse, service} = require('./index.js')

const server = micro(async (req, res) => {
  let data = await json(req)
  data = parse(data);
  return await service(data)
})
server.listen(process.env.PORT)
console.log(`${process.env.AWS_FUNCTION_NAME} is running on ${process.env.PORT}`)
