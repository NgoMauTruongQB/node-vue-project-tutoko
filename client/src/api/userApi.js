import instance from "./axios"

const nameModel = '/users'

const userApi = {
    create: async (data) => {
        return await instance.post(nameModel, data)
    },
    getAll: async (filters = {}) => {
        return await instance.get(nameModel, {
            params: filters,
        })
    },
    getById: async (id) => {
        return await instance.get(`${nameModel}/${id}`)
    },
    update: async (id, data) => {
        return await instance.patch(`${nameModel}/${id}`, data)
    },
    delete: async ({id, isDeleted = false}) => {
        return await instance.delete(`${nameModel}/${id}?is_delete=${isDeleted}`)
    },
    deleteForce: async (id) => {
        return await instance.delete(`${nameModel}/force/${id}`)
    },
    changePassword: async (data) => {
        return await instance.patch(nameModel + '/changePassword', data)
    },
    changeInformation: async (data) => {
        return await instance.patch(nameModel + '/information', data)
    },
}

export default userApi