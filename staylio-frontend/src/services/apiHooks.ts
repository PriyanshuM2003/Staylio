import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { TProperty } from "@/types/types";

export const usePropertiesListData = () => {
  return useQuery<TProperty[]>({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data } = await api.get("/properties/");
      return data.data;
    },
  });
};
