import { Profile } from "@components";
import { useTeacher } from "@hooks";
import { useTeacherProfile } from "@hooks";

const TeacherProfile = () => {
  const id = +localStorage.getItem("userId")!;
  const { useTeacherUploadImage } = useTeacher();
  const { mutate } = useTeacherUploadImage();

  const { data: teacher, isLoading, isError } = useTeacherProfile(id);

  const handleUpload = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    mutate({ data: formData, id });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !teacher) {
    return null;
  }

  return (
    <Profile
      type="teacher"
      onUpload={handleUpload}
      data={{
        firstName: teacher.data.first_name,
        lastName: teacher.data.last_name,
        email: teacher.data.email,
        phone: teacher.data.phone,
        role: teacher.data.role,
        city: teacher.data.city,
        country: teacher.data.country,
        dob: teacher.data.dob,
        postal: teacher.data.postal,
      }}
    />
  );
};

export default TeacherProfile;
