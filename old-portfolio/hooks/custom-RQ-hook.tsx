import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "@/utils/custom-fetch";
import { useToast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

export const useFetchTasks = () => {
  const { isLoading, data, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await customFetch.get("/");
      return data;
    },
  });
  return { isLoading, isError, data };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  const { toast } = useToast();

  const { mutate: createTask, isPending: isLoading } = useMutation({
    mutationFn: (taskTitle) => customFetch.post("/", { title: taskTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({ description: "task added", variant: "success" });
    },
    onError: (error: AxiosError) => {
      toast({ description: error.message, variant: "success" });
    },
  });
  return { createTask, isLoading };
};

export const useEditTask = () => {
  const queryClient = useQueryClient();

  const { mutate: editTask } = useMutation({
    mutationFn: ({ taskId, isDone }: { taskId: number; isDone: boolean }) => {
      return customFetch.patch(`/${taskId}`, { isDone });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { editTask };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: deleteTaskLoading } = useMutation({
    mutationFn: (taskId) => {
      return customFetch.delete(`/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
  return { deleteTask, deleteTaskLoading };
};
