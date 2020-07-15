'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuGroupSchema extends Schema {
  up () {
    this.create('menu_groups', (table) => {
      table.increments()
      table.string('name', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('menu_groups')
  }
}

module.exports = MenuGroupSchema
