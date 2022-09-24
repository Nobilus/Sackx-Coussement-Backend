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
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.customerRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const customerExists = await this.customerRepository.findOneBy({
      name: request.body.name,
    })

    if (customerExists) {
      return customerExists
    }

    const newCustomer = this.manager.create(Customer, request.body)

    return this.customerRepository.save(newCustomer)
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const customer = await this.customerRepository.preload(req.body)
    await this.customerRepository.save(customer)
    return this.customerRepository.findOneBy({ id: req.body.id })
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.customerRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.customerRepository.remove(userToRemove)
  }
}
