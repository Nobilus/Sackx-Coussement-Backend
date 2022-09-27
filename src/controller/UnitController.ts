import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Unit } from '../entity/Unit'

export class UnitController {
  private unitRepository = AppDataSource.getRepository(Unit)

  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return this.unitRepository.find()
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async one(request: Request, response: Response, next: NextFunction) {
    try {
      const unit = await this.unitRepository.findOne({
        where: { id: parseInt(request.params.id, 10) },
      })
      if (unit) {
        return unit
      }
      response.statusCode = 404
      response.statusMessage = 'Not found'
      response.send()
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    try {
      return this.unitRepository.save(request.body)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      let userToRemove = await this.unitRepository.findOneBy({
        id: parseInt(request.params.id, 10),
      })
      await this.unitRepository.remove(userToRemove)
    } catch (error) {
      console.error(error)
      response.statusCode = 500
      response.send()
    }
  }
}
