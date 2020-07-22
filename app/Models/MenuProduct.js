'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')

const BASE_URL = Env.get('APP_URL')

class MenuProduct extends Model {

  static get computed() {
    return ['promotion']
  }

  getPromotion({ is_promo, price_promo, end_promo }) {
    return is_promo > 0 && price_promo > 0 && end_promo >= new Date()
  }

}

module.exports = MenuProduct
