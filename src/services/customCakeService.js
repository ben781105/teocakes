
import api from "../api/axios"

export const submitCustomRequest = async (formData) => {
  const response = await api.post("/custom-requests/", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  })
  return response.data
}