import api from "@/common/composables/axios";

export async function login({ email, password }) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function changePassword({ password, password_confirmation }) {
  const response = await api.post("/change-password", {
    password,
    password_confirmation,
  });
  return response.data;
}
