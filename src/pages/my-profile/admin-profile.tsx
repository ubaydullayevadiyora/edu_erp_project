import { Profile } from "@components";

const AdminProfile = () => {
  return (
    <Profile
      type="admin"
      data={{
        firstName: "Admin",
        lastName: "Admin",
        email: "admin@gmail.com",
        phone: "+998 90 123-45-67",
        role: "Admin",
        city: "Tashkent",
        country: "Uzbekistan",
      }}
    />
  );
};

export default AdminProfile;
