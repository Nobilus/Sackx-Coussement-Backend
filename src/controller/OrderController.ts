import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entity/Order'
import { OrderProduct } from '../entity/OrderProduct'

export class OrderController {
  private orderProductRepository = AppDataSource.getRepository(OrderProduct)
  private orderRepository = AppDataSource.getRepository(Order)
  private orderManager = AppDataSource.manager
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

    newOrder.customer = request.body.customer
    newOrder.orderType = request.body.orderType
    newOrder.productOrders = []

    const savedOrder = await this.orderRepository.save(newOrder)

    request.body.productOrders.forEach(item => {
      savedOrder.productOrders.push({
        ...item,
        orderId: savedOrder.id,
        customerId: request.body.customer,
      })
    })

    return this.orderRepository.save(savedOrder)
  }

  async update(request: Request) {
    const order = await this.orderRepository.preload(request.body)
    await this.orderRepository.save(order)
    return this.orderRepository.findOneBy({ id: request.body.id })
  }

  async remove(request: Request): Promise<Order> {
    let orderToRemove = await this.orderRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    return await this.orderRepository.remove(orderToRemove)
  }
}
