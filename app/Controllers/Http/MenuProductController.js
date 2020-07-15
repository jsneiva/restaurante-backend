'use strict'

const { findOrFail } = require('../../Models/MenuGroup')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with menuproducts
 */

const MenuProduct = use('App/Models/MenuProduct')

const fields = [
  'name',
  'description',
  'image',
  'price',
  'is_promo',
  'end_promo',
  'price_promo',
  'active',
  'group_id'
]

class MenuProductController {

  async index ({ request, response, view }) {
    const { group_id } = request.get()
    let result = []
    if (group_id) {
      result = await MenuProduct.query().where({ group_id }).fetch()
    } else {
      result = await MenuProduct.all()
    }
    return result
  }

  async store ({ request, response }) {
    const data = request.only(fields)
    const menuProduct = await MenuProduct.create(data)
    return menuProduct
  }

  async show ({ params, request, response }) {
    const menuProduct = await MenuProduct.findOrFail(params.id)
    return menuProduct
  }

  async update ({ params, request, response }) {
    const menuProduct = await MenuProduct.findOrFail(params.id)
    const data = request.only(fields)    
    menuProduct.merge(data)
    await menuProduct.save()
    return menuProduct
  }

  async destroy ({ params, request, response }) {
    const menuProduct = await MenuProduct.findOrFail(params.id)
    await menuProduct.delete()
    return response.ok()
  }
  
}

module.exports = MenuProductController
