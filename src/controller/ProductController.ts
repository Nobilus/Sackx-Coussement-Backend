import { NextFunction, Request, Response } from 'express'
import { Like } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Product } from '../entity/Product'

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product)

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query.q

    if (query) {
      return await this.productRepository.find({
        where: { name: Like(`%${query}%`) },
      })
    }

    return (
      await this.productRepository.find({
        relations: {
          unit: true,
        },
      })
    ).sort((a, b) => a.name.localeCompare(b.name))
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.productRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.productRepository.save(request.body)
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.productRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.productRepository.remove(userToRemove)
  }
}
