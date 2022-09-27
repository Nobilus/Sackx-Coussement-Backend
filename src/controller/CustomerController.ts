import { NextFunction, Request, Response } from 'express'
import { Customer } from '../entity/Customer'
import { AppDataSource } from '../data-source'
import axios from 'axios'
import { Like } from 'typeorm'
import { IVatvalidatorResponse } from '../types'

export class CustomerController {
  private customerRepository = AppDataSource.getRepository(Customer)
  private manager = AppDataSource.manager

  async lookup(req: Request, res: Response, next: NextFunction) {
    const vatNumber = req.params.vatnumber
    const url = `https://controleerbtwnummer.eu/api/validate/${vatNumber}.json`

    const customer = await axios
      .get<IVatvalidatorResponse>(url)
      .then(async ({ data }) => {
        const newCustomer = new Customer()
        newCustomer.name = data.name
        newCustomer.city = data.address.city
        newCustomer.postal = data.address.zip_code
        newCustomer.street = `${data.address.street} ${data.address.number}`
        newCustomer.vatNumber = data.vatNumber
        return newCustomer
      })
      .catch(err => {
        console.error(err)
      })
    return customer
  }

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      const query = request.query.q

      if (query) {
        return (
          await this.customerRepository.find({
            where: { name: Like(`%${query}%`) },
          })
        ).sort((a, b) => a.name.localeCompare(b.name))
      }
      return (await this.customerRepository.find()).sort((a, b) =>
        a.name.localeCompare(b.name),
      )
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const customer = this.customerRepository.findOne({
        where: { id: parseInt(request.params.id, 10) },
      })
      if (customer) {
        return customer
      }
      response.statusCode = 400
      response.statusMessage = 'Not found'
      response.send()
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const customerExists = await this.customerRepository.findOneBy({
        name: request.body.name,
      })

      if (customerExists) {
        return customerExists
      }

      const newCustomer = this.manager.create(Customer, request.body)

      return this.customerRepository.save(newCustomer)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const customer = await this.customerRepository.preload(req.body)
      await this.customerRepository.save(customer)
      return this.customerRepository.findOneBy({ id: req.body.id })
    } catch (error) {
      console.error(error)
      res.statusCode = 500
      res.send()
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      let userToRemove = await this.customerRepository.findOneBy({
        id: parseInt(request.params.id, 10),
      })
      await this.customerRepository.remove(userToRemove)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }
}
