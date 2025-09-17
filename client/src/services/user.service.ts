import axios from "@/libs/configs/axios";
import { endpoints } from "@/libs/constants/endpoints";

export const getCurrentUser = async (token: string) => {
  const res = await axios.get(endpoints.currentUser, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
