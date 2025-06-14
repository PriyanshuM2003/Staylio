import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchProperties,
  fetchPropertyDetails,
  fetchPropertyReservations,
  fetchLandlord,
  signupUser,
  loginUser,
  createProperty,
  uploadPropertyImage,
  bookProperty,
  fetchUserProperties,
  fetchUserReservations,
  toggleFavoriteProperty,
  fetchUserFavoriteProperties,
  fetchConversations,
  createConversation,
} from "@/services/api";
import { TBookPropertyPayload } from "@/types/payloads";

export const usePropertiesListData = (landlordId?: string) => {
  return useQuery({
    queryKey: ["properties", landlordId],
    queryFn: () => fetchProperties(landlordId),
  });
};

export const useUserPropertiesListData = () => {
  return useQuery({
    queryKey: ["user-properties"],
    queryFn: () => fetchUserProperties(),
  });
};

export const usePropertyDetails = (id: string) =>
  useQuery({
    queryKey: ["property_details", id],
    queryFn: () => fetchPropertyDetails(id),
  });

export const usePropertyReservations = (id: string) =>
  useQuery({
    queryKey: ["property_reservations", id],
    queryFn: () => fetchPropertyReservations(id),
    refetchOnWindowFocus: true,
  });

export const useLandlord = (id: string) =>
  useQuery({
    queryKey: ["landlord", id],
    queryFn: () => fetchLandlord(id),
  });

export const useUserReservations = () =>
  useQuery({
    queryKey: ["user-reservations"],
    queryFn: () => fetchUserReservations(),
  });
export const useConversations = () =>
  useQuery({
    queryKey: ["conversations"],
    queryFn: () => fetchConversations(),
  });

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create_conversation"],
    mutationFn: (userId: string) => createConversation(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    },
  });
};

export const useSignup = () =>
  useMutation({
    mutationKey: ["signup"],
    mutationFn: signupUser,
  });

export const useLogin = () =>
  useMutation({
    mutationKey: ["login"],
    mutationFn: loginUser,
  });

export const useCreateProperty = () =>
  useMutation({
    mutationKey: ["createProperty"],
    mutationFn: createProperty,
  });

export const useUploadPropertyImage = () =>
  useMutation({
    mutationKey: ["upload_property_image"],
    mutationFn: uploadPropertyImage,
  });

export const useBookProperty = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["book_property", id],
    mutationFn: (payload: TBookPropertyPayload) => bookProperty(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["property_reservations", id],
      });
    },
  });
};

export const useToggleFavorite = (propertyId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["toggle_favorite", propertyId],
    mutationFn: () => toggleFavoriteProperty(propertyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["user-properties"] });
      queryClient.invalidateQueries({ queryKey: ["user-favorite-properties"] });
      queryClient.invalidateQueries({
        queryKey: ["property_details", propertyId],
      });
    },
  });
};

export const useUserFavoriteProperties = () =>
  useQuery({
    queryKey: ["user-favorite-properties"],
    queryFn: fetchUserFavoriteProperties,
  });
