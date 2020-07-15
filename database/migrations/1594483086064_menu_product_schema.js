'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MenuProductSchema extends Schema {
  up () {
    this.create('menu_products', (table) => {
      table.increments()
      table.string('name', 100)
      table.text('description')
      table.text('image')
      table.decimal('price', 15, 3)
      table.boolean('is_promo').defaultTo(false)
      table.date('end_promo')
      table.decimal('price_promo', 15, 3)
      table.boolean('active').defaultTo(true)
      table.integer('group_id').unsigned().notNullable().references('menu_groups.id')
      table.timestamps()
    })
  }

  down () {
    this.drop('menu_products')
  }
}

module.exports = MenuProductSchema
