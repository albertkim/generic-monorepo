import { app } from './app'

console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
