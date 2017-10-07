const fs = require('fs')
const getStat = require('util').promisify(fs.stat)

module.exports = async function (name, res) {
  var path = `./static/music/${name}`
  const stat = await getStat(path)
  const hightWaterMark = 2
  const stram = fs.createReadStream(path, { hightWaterMark })

  res.setHeader(200, {
    'Content-Type': 'audio/mp3',
    'Content-Lenght': stat.size
  })

  stream.on('end', () => console.log('Ended'))
  stream.pipe(res)
}
