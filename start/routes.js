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
  return { greeting: 'Backend está em operação!' }
})

Route.post('/login', 'UserController.login')
Route.get('/users/profile', 'userController.profile')

Route.resource('/users', 'UserController').apiOnly()
Route.resource('/contacts', 'ContactController').apiOnly()
Route.resource('/reservations', 'ReservationController').apiOnly()
Route.resource('/menu/groups', 'MenuGroupController').apiOnly()
Route.resource('/menu/products', 'MenuProductController').apiOnly()

