import express from 'express'
import { join } from 'path'
import 'express-async-errors'

import routes from './routes'
import errorHandler from './errors/handler'
import './database/connection'

const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)