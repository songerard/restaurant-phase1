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
const restaurantList = require('./restaurant.json').results

// set port
const port = 3000

// listen to localhost:3000
app.listen(port, () => {
  console.log(`Express is listening to http://localhost:${port}`)
})

// set route
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurantList })
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.find(r => r.id === Number(req.params.id))
  res.render('show', { restaurant })
})

// search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  let filteredRestaurants = restaurantList.filter(r => r.name.toLowerCase().includes(keyword) || r.category.toLowerCase().includes(keyword))
  const searchAlert = (!filteredRestaurants.length || !keyword) ? true : false
  const showReturnBtn = (!searchAlert) ? true : false
  if (!filteredRestaurants.length) {
    filteredRestaurants = restaurantList
  }
  res.render('index', { restaurantList: filteredRestaurants, keyword, searchAlert, showReturnBtn })
})