import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TProperty, TReservation, TUser } from "@/types/types";
import {
  TBookPropertyPayload,
  TCreatePropertyPayload,
  TLoginPayload,
  TSignupPayload,
  TUploadPropertyImagePayload,
} from "@/types/payloads";
import { getAccessToken } from "../services/actions";
import { useAuthStore } from "@/stores/useAuthStore";

export const usePropertiesListData = (landlordId?: string) => {
  const refetchKey = useAuthStore((state) => state.refetchKey);

  return useQuery<TProperty[]>({
    queryKey: ["properties", landlordId, refetchKey],
    queryFn: async () => {
      const token = await getAccessToken();
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const { data } = await api.get("/properties/", {
        headers,
        params: landlordId ? { landlord_id: landlordId } : {},
      });

      return data.data;
    },
  });
};

export const useSignup = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (payload: TSignupPayload) => {
      const { username, email, password, confirmPassword } = payload;

      const signupData = {
        username,
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
    mutationKey: ["upload_property_image"],
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

export const usePropertyDetails = (id: string) => {
  return useQuery<TProperty>({
    queryKey: ["property_details", id],
    queryFn: async () => {
      const { data } = await api.get(`/properties/property/${id}`);
      if (!data) {
        throw new Error("No property data returned");
      }
      return data;
    },
  });
};

export const useBookProperty = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["book_property", id],
    mutationFn: async (payload: TBookPropertyPayload) => {
      const token = await getAccessToken();
      const formData = new FormData();
      const formatDate = (date: Date): string => {
        return date.toISOString().split("T")[0];
      };

      formData.append("start_date", formatDate(payload.start_date));
      formData.append("end_date", formatDate(payload.end_date));
      formData.append("number_of_nights", payload.number_of_nights.toString());
      formData.append("total_price", payload.total_price.toString());
      formData.append("guests", payload.guests.toString());

      const { data } = await api.post(
        `/properties/property/${id}/book/`,
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property_reservations", id],
      });
    },
  });
};

export const usePropertyReservations = (id: string) => {
  return useQuery<TReservation[]>({
    queryKey: ["property_reservations", id],
    queryFn: async () => {
      const { data } = await api.get(
        `/properties/property/${id}/reservations/`
      );
      if (!data) {
        throw new Error("No property reservations data returned");
      }
      return data;
    },
    refetchOnWindowFocus: true,
  });
};

export const useLandlord = (id: string) => {
  return useQuery<TUser>({
    queryKey: ["landlord", id],
    queryFn: async () => {
      const { data } = await api.get(`/auth/${id}`);
      if (!data) {
        throw new Error("No landlord data returned");
      }
      return data;
    },
  });
};
