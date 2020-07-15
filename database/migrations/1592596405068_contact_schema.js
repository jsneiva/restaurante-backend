'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactSchema extends Schema {
  up () {
    this.create('contacts', (table) => {
      table.increments()
      table.string('name', 100)
      table.string('email', 100)
      table.string('phone', 100)
      table.string('cellphone', 100)
      table.text('message')
      table.integer('checked').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('contacts')
  }
}

module.exports = ContactSchema
