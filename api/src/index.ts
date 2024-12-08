import { HELLO } from '@lumber/common'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send(HELLO)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
