'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with menuproducts
 */

const moment = require('moment')

const MenuProduct = use('App/Models/MenuProduct')
const Helpers = use('Helpers')

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
    const { name, group_id, is_promo } = request.get()
    const query = MenuProduct.query().orderBy('name')
    if (name) {
      query.where('name', 'like', name + '%').fetch()    
    }
    if (group_id) {
      query.where({ group_id })
    }
    if (is_promo) {
      const today = moment().format('Y-MM-DD')
      if (/true/i.test(is_promo)) {
        query
          .where({ is_promo: 1 })
          .where('end_promo', '>=', today)
      } else {
        query
          .where({ is_promo: 0 })
          .orWhere('end_promo', '<', today)
      }
    }
    return await query.fetch()
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


  async saveImage({ params, request, response }) {
    const menuProduct = await MenuProduct.findOrFail(params.id)
    const fileImage = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    const fileName = params.id + '.' + fileImage.subtype
    await fileImage.move(Helpers.tmpPath('images/products'), {
      name: fileName,
      overwrite: true
    })
    menuProduct.image = fileName
    menuProduct.save()
    return response.ok()
  }

  async getImage({ params, request, response }) {
    response.download(Helpers.tmpPath('images/products/' + params.filename))
  }
  
}

module.exports = MenuProductController
