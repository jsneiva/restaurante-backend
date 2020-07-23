'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Restaurante - backend está em operação!' }
})

// rotas protegidas

Route.group(() => {

  Route.get('/users/profile', 'UserController.profile')  
  Route.get('/totals', 'AdminController.totals')  
  Route.get('/totals/days/:quant', 'AdminController.totalsPerDay')    

  Route.post('/menu/products/:id/images', 'MenuProductController.saveImage')

  Route.resource('/users', 'UserController').apiOnly()  
  Route.resource('/contacts', 'ContactController').apiOnly().except(['store'])
  Route.resource('/reservations', 'ReservationController').apiOnly().except(['store'])
  Route.resource('/menu/groups', 'MenuGroupController').apiOnly().except(['index'])
  Route.resource('/menu/products', 'MenuProductController').apiOnly().except(['index'])

}).middleware(['auth'])  


// rotas públicas

Route.post('/login', 'UserController.login')
Route.post('/register', 'UserController.store')
Route.post('/contacts', 'ContactController.store')
Route.post('/reservations', 'ReservationController.store')

Route.get('/menu/groups', 'MenuGroupController.index')
Route.get('/menu/products', 'MenuProductController.index')
Route.get('/menu/products/:id/images', 'MenuProductController.getImage')  

