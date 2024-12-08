import { UserModel } from '@lumber/common'

const user = UserModel.parse({
  userId: 1,
  userFullName: 'John Doe',
  userEmail: 'john.doe@example.com'
})

export function App() {
  return (
    <>
      <div>Hello world</div>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </>
  )
}
