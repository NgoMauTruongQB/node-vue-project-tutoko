const app = require('./src/app')
require('dotenv').config()

const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})