'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with reservations
 */

const Reservation = use('App/Models/Reservation')

class ReservationController {

  async index ({ request, response, view }) {
    const { name, status } = request.get()
    const query = Reservation.query().orderBy('date').orderBy('time')
    if (name) {
      query.where('name', 'like', name + '%').fetch()
    }
    if (status && '12'.includes(status) ) {
      query.where('checked', status === '1' ? 1 : 0)
    }
    return await query.fetch()
  }

  async store ({ request, response }) {
    const data = request.only([
      'name',
      'email',
      'date',
      'time',
      'seats',
      'phone',
      'obs'
    ])
    const reservation = await Reservation.create(data)
    return reservation
  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
    const { checked } = request.only(['checked'])
    const reservation = await Reservation.findOrFail(params.id)
    reservation.checked = checked
    await reservation.save()
    return reservation
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ReservationController
