'use strict'

const MenuGroup = use('App/Models/MenuGroup')

class MenuGroupController {

  async index ({ request, response, view }) {
    const { name } = request.get()
    const query = MenuGroup.query().orderBy('name')
    if (name) {
      query.where('name', 'like', name + '%').fetch()
    }
    return await query.fetch()
  }

  async store ({ request, response }) {
    const data = request.only(['id', 'name'])
    const menuGroup = await MenuGroup.create(data)
    return menuGroup
  }

  async show ({ params, request }) {
    const menuGroup = await MenuGroup.findOrFail(params.id)
    return menuGroup
  }

  async update ({ params, request, response }) {
    const data = request.only(['name'])
    const menuGroup = await MenuGroup.findOrFail(params.id)
    menuGroup.merge(data)
    await menuGroup.save()
    return menuGroup
  }

  async destroy ({ params, request, response }) {
    const menuGroup = await MenuGroup.findOrFail(params.id)
    await menuGroup.delete()    
    return response.ok()
  }
}

module.exports = MenuGroupController
