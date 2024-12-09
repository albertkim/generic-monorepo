import { useEffect } from 'react'
import { apiClient } from './API'
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert'
import { Button } from './components/ui/button'

export function App() {
  useEffect(() => {
    apiClient.ping().then((ping) => {
      console.log(ping)
    })
  }, [])

  return (
    <div className="px-4 py-4">
      <Alert>
        <AlertTitle>Hello world</AlertTitle>
        <AlertDescription>You can add components to your app using the cli.</AlertDescription>
      </Alert>
      <br />
      <Button>Click me</Button>
    </div>
  )
}
