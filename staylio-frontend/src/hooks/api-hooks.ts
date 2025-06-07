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
} from "@/services/api";
import { TBookPropertyPayload } from "@/types/payloads";
import { useRefetchStore } from "@/stores/useRefetchStore";

export const usePropertiesListData = (landlordId?: string) => {
  const refetchKey = useRefetchStore((state) => state.refetchKey);

  return useQuery({
    queryKey: ["properties", landlordId, refetchKey],
    queryFn: () => fetchProperties(landlordId),
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
