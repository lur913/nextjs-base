'use client'

import { use } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

const List = ({ list }: { list: Promise<User[]> }) => {
  const users = use(list);
  return (
    <ul className="p-4 rounded bg-stone-900 mt-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="border border-dashed border-stone-700 rounded my-4 p-2"
        >
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default List;
