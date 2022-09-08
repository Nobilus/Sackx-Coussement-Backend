import * as express from 'express'
import * as bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { AppDataSource } from './data-source'
import { Routes } from './routes'
import seedDb from './seeding/seeder'
import * as cors from 'cors'

const PORT = process.env.PORT || 5000

AppDataSource.initialize()
  .then(async () => {
    // create express app

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())

    // register express routes from defined application routes
    Routes.forEach(route => {
      ;(app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next,
          )
          if (result instanceof Promise) {
            result.then(result =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined,
            )
          } else if (result !== null && result !== undefined) {
            res.json(result)
          }
        },
      )
    })

    // setup express app here
    // ...

    seedDb()

    // start express server
    app.listen(PORT)

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/customers to see results`,
    )
  })
  .catch(error => console.log(error))
