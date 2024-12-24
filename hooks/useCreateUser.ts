import { createUser, CreateUserInput } from "@/lib/api/mutations/createUser";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  const { mutateAsync, isSuccess, isError, isPending } = useMutation({
    mutationKey: ["createUser"],
    mutationFn: (input: CreateUserInput) => createUser(input),
  });

  return {
    createUser: mutateAsync,
    creationSuccess: isSuccess,
    creationError: isError,
    creationPending: isPending,
  };
};
