'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with menuproducts
 */

const moment = require('moment')

const MenuProduct = use('App/Models/MenuProduct')
const Drive = use('Drive')


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
      query.where('name', 'like', name + '%')
    }
    if (group_id) {
      query.where({ group_id }).where({ active: 1 })
    }
    if (is_promo && /true/i.test(is_promo)) {
      const today = moment().format('Y-MM-DD')
      query
        .where({ is_promo: 1 })
        .where('end_promo', '>=', today)
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

    request.multipart.file('image', {}, async file => {
      const menuProduct = await MenuProduct.findOrFail(params.id)          
      const config = {
        ContentType: file.headers['content-type'],
        ACL: 'public-read'
      }
      const fileName = Date.now().toString(32) + '-' + file.clientName.replace(' ', '-')
      const urlImage = await Drive.disk('s3').put(fileName, file.stream, config)
      menuProduct.image = urlImage
      await menuProduct.save()
    })

    await request.multipart.process()
    return response.ok()    
  }

  
  async getImage({ params, request, response }) {
    const menuProduct = await MenuProduct.findOrFail(params.id)
    const fileName = menuProduct.image.replace(/.*\//, '')
    response.implicitEnd = false
    response.header('Content-type', 'image/*')
    const stream = await Drive.disk('s3').getStream(fileName)    
    stream.pipe(response.response)
  }
  
}

module.exports = MenuProductController
