// require express
const express = require('express')
const app = express()

// require express-handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// set port
const port = 3000

// listen to localhost:3000
app.listen(port, () => {
  console.log(`Express is listening to http://localhost:${port}`)
})