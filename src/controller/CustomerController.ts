import { NextFunction, Request, Response } from 'express'
import { Customer } from '../entity/Customer'
import { AppDataSource } from '../data-source'

export class UserController {
  private userRepository = AppDataSource.getRepository(Customer)

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find()
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body)
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.userRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.userRepository.remove(userToRemove)
  }
}
