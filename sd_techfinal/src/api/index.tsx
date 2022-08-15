import axios from 'axios'

const api = axios.create({
    baseURL : 'http://localhost:8000/api',
})

export const insertUser = (payload:any) => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)
export const updateUserById = (id:any, payload:any) => api.put(`/users/${id}`, payload)
export const deleteUserById = (id:any) => api.delete(`/users/${id}`)
export const getUserById = (id:any) => api.get(`/movie/${id}`)

const apis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default apis