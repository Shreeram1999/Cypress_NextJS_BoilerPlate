import Link from 'next/link';

export default function Home() {
  const users = [
    { id: 1, name: 'Alice Johnson' },
    { id: 2, name: 'Bob Smith' },
  ];

  return (
    <main>
      <h1>Team</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <Link href={`/user/${user.id}`}>
              <button>View Profile</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
