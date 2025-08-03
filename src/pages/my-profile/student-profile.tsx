import { Profile } from "@components";

const StudentProfile = () => {
  return (
    <Profile
      type="student"
      data={{
        firstName: "Ali",
        lastName: "Valiyev",
        email: "student@gmail.com",
        city: "Samarkand",
        country: "Uzbekistan",
      }}
    />
  );
};

export default StudentProfile;
