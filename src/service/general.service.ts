import axios from "axios";

export const getStudentLessons = async (studentId: number) => {
  const { data } = await axios.get(`/students/${studentId}/lessons`);
  return data; 
};
