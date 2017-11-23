const express = require('express')
const path = require('path')
const serveStatic = require('serve-static')
const consign = require('consign')

const app = express()

const dir = path.join(__dirname, 'dist')

app.use(serveStatic(dir))

consign()
  .include('/config/server.js')
  .then('/config/routes.js')
  .into(app)

const port = process.env.PORT || 5000

app.get('*', (req, res) => {
  res.sendFile(`${dir}/index.html`)
})

app.listen(port, () => {
  console.log(`Running at port ${port}`)
})
