'use strict'

const Database = use('Database')

class AdminController {

  async index({ request, response }) {
    let data = null
    await Database.raw(`
      select
        (select count(*) from users) as users,
        (select count(*) from contacts) as contacts,
        (select count(*) from reservations) as reservations,
        (select count(*) from menu_products) as products
    `).then(resp => data = resp[0][0])
    return data
  }

}

module.exports = AdminController
