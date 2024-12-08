import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { UserService } from './services/UserService'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/users', async (req, res) => {
  const users = await UserService.getUsers()
  res.send(users)
})

app.get('/users/:id', async (req, res) => {
  const id = Number(req.params.id)
  const user = await UserService.getUser(id)
  res.send(user)
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
