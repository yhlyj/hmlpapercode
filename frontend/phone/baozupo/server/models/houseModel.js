
const db = require('../tools/dbTools')

module.exports = db.defineModel('house_info', {
  name: {
    type: db.STRING(100)
  },
  layerSize: db.INTEGER,
  roomSize: db.INTEGER,
  userId: db.STRING(50)
})
