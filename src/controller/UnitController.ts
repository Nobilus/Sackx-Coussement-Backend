import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Product } from '../entity/Product'

export class UnitController {
  private unitRepository = AppDataSource.getRepository(Product)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.unitRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.unitRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.unitRepository.save(request.body)
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.unitRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.unitRepository.remove(userToRemove)
  }
}
