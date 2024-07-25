import { useSelector } from "react-redux";

// Profile page showing user information
const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <div>Email: {user.email}</div>
    </div>
  );
};

export default ProfilePage;
