"use server";
import { api } from "@/lib/axios";
import { getAccessToken } from "@/services/actions";
import {
  TConveration,
  TMessage,
  TProperty,
  TReservation,
  TUser,
} from "@/types/types";
import {
  TBookPropertyPayload,
  TCreatePropertyPayload,
  TLoginPayload,
  TSignupPayload,
  TUploadPropertyImagePayload,
} from "@/types/payloads";

export const fetchProperties = async (
  landlordId?: string
): Promise<TProperty[]> => {
  const token = await getAccessToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const { data } = await api.get("/properties/", {
    headers,
    params: landlordId ? { landlord_id: landlordId } : {},
  });

  return data.data;
};

export const fetchUserProperties = async (): Promise<TProperty[]> => {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get("/properties/user-properties", {
    headers,
  });
  if (!data) throw new Error("No user properties found");

  return data.data;
};

export const fetchUserFavoriteProperties = async (): Promise<TProperty[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error("User is not authenticated");

  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get("/properties/user-properties", {
    headers,
    params: { is_favorites: true },
  });

  return data.data;
};

export const fetchPropertyDetails = async (id: string): Promise<TProperty> => {
  const token = await getAccessToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const { data } = await api.get(`/properties/property/${id}`, { headers });
  if (!data) throw new Error("No property data returned");
  return data;
};

export const fetchPropertyReservations = async (
  id: string
): Promise<TReservation[]> => {
  const token = await getAccessToken();
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const { data } = await api.get(`/properties/property/${id}/reservations/`, {
    headers,
  });
  if (!data) throw new Error("No reservations found");
  return data;
};

export const fetchLandlord = async (id: string): Promise<TUser> => {
  const { data } = await api.get(`/auth/${id}`);
  if (!data) throw new Error("No landlord data");
  return data;
};

export const fetchUserReservations = async (): Promise<TReservation[]> => {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get("/auth/my-reservations/", {
    headers,
  });

  if (!data) throw new Error("No user reservations found");
  return data;
};

export const signupUser = async (payload: TSignupPayload) => {
  const signupData = {
    username: payload.username,
    email: payload.email,
    password1: payload.password,
    password2: payload.confirmPassword,
  };
  const { data } = await api.post("/auth/register/", signupData);
  return data;
};

export const loginUser = async (payload: TLoginPayload) => {
  const { data } = await api.post("/auth/login/", payload);
  return data;
};

export const createProperty = async (payload: TCreatePropertyPayload) => {
  const token = await getAccessToken();
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  const { data } = await api.post("/properties/create-property/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return data;
};

export const uploadPropertyImage = async (
  payload: TUploadPropertyImagePayload
) => {
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
};

export const bookProperty = async (
  id: string,
  payload: TBookPropertyPayload
) => {
  const token = await getAccessToken();
  const formData = new FormData();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

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
};

export const toggleFavoriteProperty = async (
  id: string
): Promise<{ is_favorite: boolean }> => {
  const token = await getAccessToken();
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const { data } = await api.post(
    `/properties/property/${id}/toggle_favorite/`,
    {},
    { headers }
  );

  return data;
};

export const fetchConversations = async (): Promise<TConveration[]> => {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get(`/chat/`, { headers });
  if (!data) throw new Error("No converations returned");
  return data;
};

export const fetchConversationsDetail = async (
  id: string
): Promise<{ conversation: TConveration; messages: TMessage[] }> => {
  const token = await getAccessToken();
  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get(`/chat/${id}/`, { headers });
  if (!data) throw new Error("No conversation detail returned");

  return {
    conversation: data.conversation,
    messages: data.messages || [],
  };
};
export const startConversation = async (
  userId: string
): Promise<{ success: boolean; conversation_id: string }> => {
  const token = await getAccessToken();
  if (!token) throw new Error("User is not authenticated");

  const headers = { Authorization: `Bearer ${token}` };

  const { data } = await api.get(`/chat/start/${userId}/`, { headers });
  if (!data?.success) throw new Error("Failed to start conversation");

  return data;
};
