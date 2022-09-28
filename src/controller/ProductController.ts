import { NextFunction, Request, response, Response } from 'express'
import { Like } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Product } from '../entity/Product'
import { Unit } from '../entity/Unit'

export class ProductController {
  private productRepository = AppDataSource.getRepository(Product)
  private manager = AppDataSource.manager

  async all(request: Request, response: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: parseInt(request.params.id, 10) },
      })

      if (product) {
        return product
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
      const unit = await this.manager.findOneBy(Unit, { id: 1 })

      const product: Product = this.manager.create(Product, request.body)

      if (!product.unit) {
        product.unit = unit
      }

      return this.productRepository.save(product)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async update(request: Request, response: Response, next: NextFunction) {
    try {
      await this.productRepository.update(request.body.id, request.body)
      return this.productRepository.findOneBy({ id: request.body.id })
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async remove(request: Request): Promise<Product> {
    try {
      let productToRemove = await this.productRepository.findOneBy({
        id: parseInt(request.params.id, 10),
      })
      return await this.productRepository.remove(productToRemove)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }
}
