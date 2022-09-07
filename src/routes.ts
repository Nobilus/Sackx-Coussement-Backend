import { CustomerController } from './controller/CustomerController'

const customerRoutes = [
  {
    method: 'get',
    route: '/customer',
    controller: CustomerController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/customer/:id',
    controller: CustomerController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/customer',
    controller: CustomerController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/customers/:id',
    controller: CustomerController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/validate/:vatnumber',
    controller: CustomerController,
    action: 'lookup',
  },
]

export const Routes = [...customerRoutes]
