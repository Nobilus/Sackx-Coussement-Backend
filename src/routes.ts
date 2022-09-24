import { CustomerController } from './controller/CustomerController'
import { OrderController } from './controller/OrderController'
import { ProductController } from './controller/ProductController'
import { UnitController } from './controller/UnitController'

const customerRoutes = [
  {
    method: 'get',
    route: '/api/customers',
    controller: CustomerController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/customer/:id',
    controller: CustomerController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/customer',
    controller: CustomerController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/customers/:id',
    controller: CustomerController,
    action: 'remove',
  },
  {
    method: 'get',
    route: '/api/validate/:vatnumber',
    controller: CustomerController,
    action: 'lookup',
  },
  {
    method: 'patch',
    route: '/api/customer',
    controller: CustomerController,
    action: 'update',
  },
]

const productRoutes = [
  {
    method: 'get',
    route: '/api/products',
    controller: ProductController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/product/:id',
    controller: ProductController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/product',
    controller: ProductController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/product/:id',
    controller: ProductController,
    action: 'remove',
  },
  {
    method: 'patch',
    route: '/api/product',
    controller: ProductController,
    action: 'update',
  },
]

const orderRoutes = [
  {
    method: 'get',
    route: '/api/orders',
    controller: OrderController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/order/:id',
    controller: OrderController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/order',
    controller: OrderController,
    action: 'save',
  },
  {
    method: 'delete',
    route: '/api/order/:id',
    controller: OrderController,
    action: 'remove',
  },
  {
    method: 'patch',
    route: '/api/order',
    controller: OrderController,
    action: 'update',
  },
]

const unitRoutes = [
  {
    method: 'get',
    route: '/api/units',
    controller: UnitController,
    action: 'all',
  },
  {
    method: 'get',
    route: '/api/unit/:id',
    controller: UnitController,
    action: 'one',
  },
  {
    method: 'post',
    route: '/api/unit',
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
