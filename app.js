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

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.find(r => r.id === Number(req.params.id))
  res.render('show', { restaurant })
})

// search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.toLowerCase().trim()
  const findByName = restaurants.filter(r => r.name.toLowerCase().includes(keyword))
  const findByCategory = restaurants.filter(r => r.category.toLowerCase().includes(keyword))
  let filteredRestaurants = Object.assign(findByName, findByCategory)
  const searchAlert = (!filteredRestaurants.length || !keyword) ? true : false
  if (!filteredRestaurants.length) {
    filteredRestaurants = restaurants
  }
  res.render('index', { restaurants: filteredRestaurants, keyword, searchAlert })
})