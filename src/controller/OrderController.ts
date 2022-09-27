import { NextFunction, Request, Response } from 'express'
import { In } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Order } from '../entity/Order'
import { OrderProduct } from '../entity/OrderProduct'
import { Product } from '../entity/Product'

export class OrderController {
  private orderRepository = AppDataSource.getRepository(Order)
  private orderProductRepository = AppDataSource.getRepository(OrderProduct)
  private manager = AppDataSource.manager

  async all(request: Request, response: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: parseInt(request.params.id, 10) },
        relations: {
          customer: true,
          productOrders: {
            product: true,
          },
        },
      })

      if (order) {
        return order
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
      const tempOrder = {
        ...request.body,
        productOrders: [],
      }

      const order: Order = await this.orderRepository.save(
        this.manager.create(Order, tempOrder),
      )

      for (const item of request.body.productOrders) {
        const newPO = new OrderProduct()
        newPO.orderId = order.id
        newPO.productId = item.productId
        newPO.amount = item.amount
        newPO.length = item.length
        newPO.price = item.price
        newPO.remark = item.remark
        newPO.thickness = item.thickness
        newPO.width = item.width
        const po: OrderProduct = this.manager.create(OrderProduct, newPO)
        order.productOrders.push(po)
      }
      return this.orderRepository.save(order)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async update(request: Request, response: Response) {
    try {
      const oldOrder = await this.orderRepository.findOneBy({
        id: request.body.id,
      })
      const order = await this.orderRepository.preload(request.body)

      if (oldOrder.productOrders.length > order.productOrders.length) {
        const oldPOs = oldOrder.productOrders.map(po => po.id)
        const newPOs = order.productOrders.map(po => po.id)

        const removedPOs = oldPOs.filter(x => !newPOs.includes(x))

        const pos = await this.orderProductRepository.findBy({
          id: In(removedPOs),
        })

        await this.orderProductRepository.remove(pos)
      }

      await this.orderRepository.save(order)
      return this.orderRepository.findOneBy({ id: request.body.id })
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async remove(request: Request, response: Response) {
    try {
      let orderToRemove = await this.orderRepository.findOneBy({
        id: parseInt(request.params.id, 10),
      })
      return await this.orderRepository.remove(orderToRemove)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }
}
