'use strict'


const Contact = use('App/Models/Contact')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class ContactController {

  async index ({ request, response, view }) {
    const { name, status } = request.get()
    const query = Contact.query().orderBy('created_at')
    if (name) {
      query.where('name', 'like', name + '%').fetch()
    }
    if (status && '12'.includes(status) ) {
      query.where('checked', status === '1' ? 1 : 0)
    }
    return await query.fetch()
  }


  async store ({ request, response }) {
    const data = request.only(['name', 'email', 'phone', 'cellphone', 'message'])
    const contact = await Contact.create(data)
    return contact
  }


  async show ({ params, request, response, view }) {
    const contact = await Contact.findOrFail(params.id)
    return contact
  }


  async update ({ params, request, response }) {
    const { checked } = request.only(['checked'])
    const contact = await Contact.findOrFail(params.id)
    contact.checked = checked
    await contact.save()
    return contact
  }


  async destroy ({ params, request, response }) {
    const contact = await Contact.findOrFail(params.id)
    await contact.delete()
    return {
      message: 'Contato deletado com sucesso.'
    }
  }

}

module.exports = ContactController
