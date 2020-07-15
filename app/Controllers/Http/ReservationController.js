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
    return await Reservation.all()
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
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = ReservationController
