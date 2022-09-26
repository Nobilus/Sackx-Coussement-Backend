import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entity/Order'
import { OrderProduct } from '../entity/OrderProduct'
import { Product } from '../entity/Product'

export class OrderController {
  private orderRepository = AppDataSource.getRepository(Order)
  private manager = AppDataSource.manager

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

    const tempOrder = {
      ...request.body,
      productOrders: [],
    }

    const order: Order = await this.orderRepository.save(
      this.manager.create(Order, tempOrder),
    )

    for (const item of request.body.productOrders) {
      // const product = await this.manager.findOneBy(Product, {
      //   id: productId,
      // })
      // order.productOrders.push({
      //   ...item,
      //   orderId: order.id,
      //   customerId: request.body.customer,
      // })

      const newPO = new OrderProduct()

      newPO.orderId = order.id
      newPO.productId = item.productId
      newPO.amount = item.amount
      newPO.length = item.length
      newPO.price = item.price
      newPO.remark = item.remark
      newPO.thickness = item.thickness
      newPO.width = item.width

      // const test = {
      //   customerId: order.customer,
      //   orderId: order.id,
      //   productId: item.productId,
      //   ...item,
      // }

      // console.log('test: ', test)

      const po: OrderProduct = this.manager.create(OrderProduct, newPO)
      // const po = await this.manager.save(newPO)

      console.log(po)

      order.productOrders.push(po)
    }

    console.log('the full saved ', order)

    return this.orderRepository.save(order)
  }

  async remove(request: Request): Promise<Order> {
    let orderToRemove = await this.orderRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    return await this.orderRepository.remove(orderToRemove)
  }
}
