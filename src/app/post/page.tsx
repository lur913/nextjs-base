type User = {
  id: number
  name: string
  username: string
  email: string
  phone: string
}

export default async function BlogPage() {
  const blogs = await fetch('https://jsonplaceholder.typicode.com/users')
  const data: User[] = await blogs.json()
  console.log(`users: `, data)
  return (
    <div className="container mx-auto">
      <ul>
        {
          data.map(user => {
            return (
              <li key={user.id} className="shadow rounded mb-4 p-4">
                <ol>
                  <li>name: {user.name}</li>
                  <li>username: {user.username}</li>
                  <li>email: {user.email}</li>
                  <li>phone: {user.phone}</li>
                </ol>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}
