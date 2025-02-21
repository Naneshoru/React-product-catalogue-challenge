// import { http, HttpResponse } from 'msw'
import ExampleCatalog from '../assets/ExampleCatalog.json'
import categorize from '../models/Catalog'

import { rest } from 'msw'

const data = {
  products: { categories: categorize(ExampleCatalog.products) },
}

export const handlers = [
  rest.get('/catalog', ((req, res, ctx) => {
  console.log('Returning data:', data)
    return res(
      ctx.status(200),
      ctx.json(data),
    )
  })),
]