type User = {
  id: number;
  name: string;
  email: string;
};

export default async function ServerFetchPage() {
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await data.json();
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>server fetch</h1>
      <ul className="p-4 rounded bg-stone-900 mt-4">
        {users.map((user) => (
          <li key={user.id} className="border border-dashed border-stone-700 rounded my-4 p-2">
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
