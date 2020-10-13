import express from 'express'

import './database/connection'

const app = express()

app.use(express.json())

app.get('/teste', (request, response) => {
	return response.json({ ok: true })
})

app.listen(3333)