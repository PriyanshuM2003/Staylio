import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TProperty } from "@/types/types";
import {
  TCreatePropertyPayload,
  TLoginPayload,
  TSignupPayload,
  TUploadPropertyImagePayload,
} from "@/types/payloads";
import { getAccessToken } from "./actions";

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
    mutationFn: async (payload: TSignupPayload) => {
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

export const useLogin = () => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: async (payload: TLoginPayload) => {
      const { data } = await api.post("/auth/login/", payload);

      return data;
    },
  });
};

export const useCreateProperty = () => {
  return useMutation({
    mutationKey: ["createProperty"],
    mutationFn: async (payload: TCreatePropertyPayload) => {
      const token = await getAccessToken();
      const formData = new FormData();

      // Add each field to the FormData object
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const { data } = await api.post(
        "/properties/create-property/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return data;
    },
  });
};

export const useUploadPropertyImage = () => {
  return useMutation({
    mutationKey: ["upload-property-image"],
    mutationFn: async (payload: TUploadPropertyImagePayload) => {
      const token = await getAccessToken();
      const formData = new FormData();
      formData.append("property", payload.property);
      formData.append("image", payload.image);

      const { data } = await api.post(
        "/properties/upload-property-image/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      return data;
    },
  });
};
