import {db} from '@/db/drizzle'
import { todo, SelectTodo } from '@/db/schema'

export default async function ServerOrmPage() {
  const todos: SelectTodo[] = await db.select().from(todo)
  console.log(111, todos);
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1>server orm</h1>
      <ul className="p-4 rounded bg-stone-900 mt-4">
        {todos.map((t) => (
          <li key={t.id} className="border border-dashed border-stone-700 rounded my-4 p-2">
            {t.text} - {t.done ? '已完成' : '未完成'}
          </li>
        ))}
      </ul>
    </div>
  );
}