import Avatar from './Avatar';
import Button from './Button';

export default function UserCard({ user, onFollow }) {
  return (
    <div className="border p-4 rounded shadow-md w-72">
      <Avatar src={user.avatar} alt={user.name} />
      <h2 className="mt-2 text-lg font-bold">{user.name}</h2>
      <p className="text-sm text-gray-600">{user.bio}</p>
      <Button onClick={onFollow}>Follow</Button>
    </div>
  );
}
