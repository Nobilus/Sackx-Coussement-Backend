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
        relations: {
          customer: true,
          productOrders: {
            product: true,
          },
        },
      })
    } else if (query && query === 'offerte') {
      return this.orderRepository.find({
        where: { orderType: 'offerte' },
        relations: {
          customer: true,
          productOrders: {
            product: true,
          },
        },
      })
    }

    return this.orderRepository.find({
      relations: {
        customer: true,
        productOrders: {
          product: true,
        },
      },
    })
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
      relations: {
        customer: true,
        productOrders: {
          product: true,
        },
      },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    console.log(request.body)

    const newOrder = new Order()

    newOrder.customer = request.body.customerId
    newOrder.orderType = request.body.orderType
    newOrder.productOrders = []

    const savedOrder = await this.orderRepository.save(newOrder)

    request.body.products.forEach(item => {
      savedOrder.productOrders.push({
        ...item,
        orderId: savedOrder.id,
        customerId: request.body.customerId,
      })
    })

    return this.orderRepository.save(savedOrder)
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
