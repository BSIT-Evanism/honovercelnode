import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { prettyJSON } from 'hono/pretty-json'
import {cors} from 'hono/cors'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.use('*', prettyJSON())
app.use('*', cors())

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

app.get('/json/:id', (c) => {
  const id = c.req.param('id');
  const page = c.req.query('page')

  return c.json({
    idName: id,
    pageNum: page
  })
})

export default handle(app)
