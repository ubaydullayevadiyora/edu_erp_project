import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentService } from "../service";
import type { Student } from "../types/student";

export const useStudent = () => {
  const queryClient = useQueryClient();

  // GET: Barcha studentlar
  const { data, isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => studentService.getStudents(),
  });

  // CREATE: Student yaratish
  const useStudentCreate = () =>
    useMutation({
      mutationFn: async (data: Omit<Student, "id">) =>
        studentService.createStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });

  // UPDATE: Student tahrirlash
  const useStudentUpdate = () =>
    useMutation({
      mutationFn: async (data: Student) => {
        const { id, ...rest } = data;
        return studentService.updateStudent(id, rest);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });

  // DELETE: Student o‘chirish
  const useStudentDelete = () =>
    useMutation({
      mutationFn: async (id: number) => studentService.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });

  return {
    data,
    isLoading,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  };
};
