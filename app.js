// require express
const express = require('express')
const app = express()

// require express-handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// require bootstrap
app.use(express.static('public'))

// require restaurant.json
const restaurantJSON = require('./restaurant.json')
const restaurants = restaurantJSON.results

// set port
const port = 3000

// listen to localhost:3000
app.listen(port, () => {
  console.log(`Express is listening to http://localhost:${port}`)
})

// set route
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurants })
})