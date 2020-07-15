'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReservationSchema extends Schema {
  up () {
    this.create('reservations', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('email', 100)
      table.date('date')
      table.string('time', 8)
      table.integer('seats')
      table.string('phone', 100)
      table.text('obs')
      table.integer('checked').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('reservations')
  }
}

module.exports = ReservationSchema
