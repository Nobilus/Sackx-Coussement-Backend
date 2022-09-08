import { CustomerController } from './controller/CustomerController'
import { OrderController } from './controller/OrderController'
import { ProductController } from './controller/ProductController'
import { UnitController } from './controller/UnitController'

const customerRoutes = [
  {
    method: 'get',
    route: '/customers',
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

const productRoutes = [
  {
    method: 'get',
    route: '/products',
    controller: ProductController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/product',
    controller: ProductController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/product/:id',
    controller: ProductController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/product/:id',
    controller: ProductController,
    action: 'remove',
  },
]

const orderRoutes = [
  {
    method: 'get',
    route: '/orders',
    controller: OrderController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/order/:id',
    controller: OrderController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/order',
    controller: OrderController,
    action: 'save',
  },
  {
    method: 'remove',
    route: '/order:id',
    controller: OrderController,
    action: 'remove',
  },
]

const unitRoutes = [
  {
    method: 'get',
    route: '/units',
    controller: UnitController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/unit/:id',
    controller: UnitController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/unit',
    controller: UnitController,
    action: 'save',
  },
]

export const Routes = [
  ...customerRoutes,
  ...productRoutes,
  ...orderRoutes,
  ...unitRoutes,
]
