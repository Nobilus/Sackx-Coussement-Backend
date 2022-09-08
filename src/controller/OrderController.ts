import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entity/Order'

export class OrderController {
  private orderRepository = AppDataSource.getRepository(Order)

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query.type

    if (query && query === 'bestelbon') {
      return this.orderRepository.find({
        where: { orderType: 'bestelbon' },
      })
    } else if (query && query === 'offerte') {
      return this.orderRepository.find({
        where: { orderType: 'offerte' },
      })
    }

    return this.orderRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    // const newOrder = new Order()

    // newOrder.createdAt = new Date()
    // newOrder.orderType = request.body.orderType
    // newOrder.customer = request.body.customer

    // newOrder.products = request.body.products

    return this.orderRepository.save(request.body)
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.orderRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.orderRepository.remove(userToRemove)
  }
}
