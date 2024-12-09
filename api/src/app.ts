import { AdminUserResponse, AdminUsersResponse, PingResponse } from '@lumber/common/http'
import bodyParser from 'body-parser'
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { UserService } from './services/UserService'

export const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.get('/api/v1/ping', async (req: Request, res: Response<PingResponse>, next: NextFunction) => {
  try {
    res.send({ timestamp: new Date().toISOString() })
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/admin/users', async (req: Request, res: Response<AdminUsersResponse>, next: NextFunction) => {
  try {
    const users = await UserService.getUsers()
    res.send({ data: users, total: users.length })
  } catch (error) {
    next(error)
  }
})

app.get('/api/v1/admin/users/:id', async (req: Request, res: Response<AdminUserResponse>, next: NextFunction) => {
  try {
    const id = Number(req.params.id)
    const user = await UserService.getUser(id)
    if (!user) {
      throw createHttpError(404, 'User not found')
    }
    res.send(user)
  } catch (error) {
    next(error)
  }
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (createHttpError.isHttpError(err)) {
    res.status(err.statusCode || 500).send({ message: err.message })
  } else {
    res.status(500).send({ message: 'Internal server error' })
  }
})
