import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Order } from '../entity/Order'

export class OrderController {
  private orderRepository = AppDataSource.getRepository(Order)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.orderRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
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
