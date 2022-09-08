import { NextFunction, Request, Response } from 'express'
import { Customer } from '../entity/Customer'
import { AppDataSource } from '../data-source'

import { pipeline } from 'stream'
import { Like } from 'typeorm'

export class CustomerController {
  private customerRepository = AppDataSource.getRepository(Customer)

  async lookup(req: Request, res: Response, next: NextFunction) {
    const vatNumber = req.params.vatnumber
    const url = `https://controleerbtwnummer.eu/api/validate/${vatNumber}.json`
    const datastream = got.stream(url)

    pipeline(datastream, res, err => {
      if (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const query = request.query.q

    if (query) {
      return (
        await this.customerRepository.find({
          where: { name: Like(`%${query}%`) },
        })
      ).sort((a, b) => a.name.localeCompare(b.name))
    }
    return (await this.customerRepository.find()).sort((a, b) =>
      a.name.localeCompare(b.name),
    )
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.customerRepository.findOne({
      where: { id: parseInt(request.params.id, 10) },
    })
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.customerRepository.save(request.body)
  }

  async remove(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> {
    let userToRemove = await this.customerRepository.findOneBy({
      id: parseInt(request.params.id, 10),
    })
    await this.customerRepository.remove(userToRemove)
  }
}
