const baseURL = 'http://localhost:8080/api';


// export const insertUser = (payload:any) => api.post(`/user`, payload)
// export const getAllUsers = () => api.get(`/users`)
// export const updateUserById = (id:any, payload:any) => api.put(`/user/${id}`, payload)
// export const deleteUserById = (id:any) => api.delete(`/user/${id}`)
// export const getUserById = (id:any) => api.get(`/user/${id}`)
//export const validateUser = (payload:any) => api.post(`/userValidate/${payload}`)

const validateUser = (body:any) => {
    fetch(baseURL+'/userValidate',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(body)
    }).then(res => res.json())
    .then(res => {
        return res;
    })
}


const apis = {
    // insertUser,
    // getAllUsers,
    // updateUserById,
    // deleteUserById,
    // getUserById,
    validateUser
}

export default apis