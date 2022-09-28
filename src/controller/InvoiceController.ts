import { NextFunction, Request, Response } from 'express'
import { In } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Invoice } from '../entity/Invoice'
import { Order } from '../entity/Order'
import { OrderProduct } from '../entity/OrderProduct'
import { Product } from '../entity/Product'

export class InvoiceController {
  private invoiceRepository = AppDataSource.getRepository(Invoice)
  private manager = AppDataSource.manager

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return (
        await this.invoiceRepository.find({
          relations: [
            'customer',
            'orders.productOrders.product',
            'orders.productOrders.product.unit',
          ],
        })
      ).sort((a, b) => b.id - a.id)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: { id: parseInt(request.params.id, 10) },

        relations: [
          'customer',
          'orders.productOrders.product',
          'orders.productOrders.product.unit',
        ],
      })

      if (invoice) {
        return invoice
      }
      response.statusCode = 404
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
      const invoice = new Invoice()

      invoice.customer = request.body.customer
      invoice.orders = await this.manager.findBy(Order, {
        id: In(request.body.orders),
      })

      return this.invoiceRepository.save(invoice)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async update(request: Request, response: Response) {
    try {
      const invoice = await this.invoiceRepository.preload(request.body)

      await this.invoiceRepository.save(invoice)
      return this.invoiceRepository.findOneBy({ id: request.body.id })
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async remove(request: Request, response: Response) {
    try {
      let invoiceToRemove = await this.invoiceRepository.findOneBy({
        id: parseInt(request.params.id, 10),
      })
      return await this.invoiceRepository.remove(invoiceToRemove)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }
}
