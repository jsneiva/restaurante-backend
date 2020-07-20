'use strict'

const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
 
/**
 * Resourceful controller for interacting with users
 */
class UserController {

  async index ({ request, response }) {
    const { name } = request.get()
    const query = User.query().orderBy('username')
    if (name) {
      query
        .where('username', 'like', name + '%')
        .orWhere('email', 'like', name + '%')
    }
    return await query.fetch()
  }

  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password', 'admin'])
    const user = await User.create(data)
    return user
  }

  async show ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    return user
  }

  async update ({ params, request, response }) {
    const data = request.only(['username', 'email', 'password', 'admin'])
    const user = await User.findOrFail(params.id)
    user.merge(data)
    await user.save()
    return user
  }

  async destroy ({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return {
      message: 'Usuário deletado com sucesso.'
    }
  }

  async login({request, response, auth}) {
    const { email, password } = request.post()
    const data = await auth.attempt(email, password)
    return data
  }

  async profile({ auth, request, response }) {
    return await auth.getUser()
  }
}

module.exports = UserController
