import axios from "@/libs/configs/axios";

export const getCurrentUser = async (token: string) => {
  const res = await axios.get("/users/current-user/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
