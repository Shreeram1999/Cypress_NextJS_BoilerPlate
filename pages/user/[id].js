import { useRouter } from 'next/router';

export default function UserProfile() {
  const { id } = useRouter().query;

  return (
    <div>
      <h2>User Profile</h2>
      <p>User ID: {id}</p>
    </div>
  );
}
