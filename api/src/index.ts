import { HELLO } from '@lumber/common'
import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send(HELLO)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
