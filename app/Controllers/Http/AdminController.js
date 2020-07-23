'use strict'

const Database = use('Database')
const moment = require('moment')

class AdminController {

  async totals({ request, response }) {
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

  async totalsPerDay({ params, request, response }) {
    const iniDate = moment().subtract(+params.quant, 'day').format('Y-MM-DD')
    const data = await Database.raw(`
      select
        date,
        sum(contacts) as contacts,
        sum(reservations) as reservations
      from ( 
        (select date(created_at) as date, count(*) as contacts, 0 as reservations from contacts group by date(created_at))
        union all
        (select date(created_at) as date, 0 as contacts, count(*) as reservations from reservations group by date(created_at))
      ) as totals
      group by date
      having date >= ${iniDate}
      order by date
    `)
    return data[0]
  }

}

module.exports = AdminController
