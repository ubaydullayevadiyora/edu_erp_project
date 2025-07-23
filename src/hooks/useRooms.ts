import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roomService } from "@service";
import { type Rooms, type ParamsType } from "@types";

export const useRoom = (params: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["rooms", params],
    queryFn: async () => roomService.getRooms(params),
  });

  // Mutations
  const useRoomCreate = () => {
    return useMutation({
      mutationFn: async (data: Rooms) => roomService.createRoom(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };
  const useRoomUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, ...rest }: Rooms) =>
        roomService.updateRoom(id, rest),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };
  const useRoomDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => roomService.deleteRoom(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["rooms"] });
      },
    });
  };

  return {
    data,
    useRoomCreate,
    useRoomUpdate,
    useRoomDelete,
  };
};
