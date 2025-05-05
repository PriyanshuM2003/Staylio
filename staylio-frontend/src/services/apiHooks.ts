import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TProperty } from "@/types/types";
import { SignupPayload } from "@/types/payloads";

export const usePropertiesListData = () => {
  return useQuery<TProperty[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await api.get("/properties/");
      return data.data;
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload: SignupPayload) => {
      const { name, email, password, confirmPassword } = payload;

      const signupData = {
        name,
        email,
        password1: password,
        password2: confirmPassword,
      };

      const { data } = await api.post("/auth/register/", signupData);

      return data;
    },
  });
};
