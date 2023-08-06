import instance from "./axios"

const nameModel = '/card'

const cardApi = {
    addListFlashCards: async (data) => {
        return await instance.post(nameModel + '/list-flashcards', data)
    },
    addSetCards: async (data) => {
        return await instance.post(nameModel + '/set-cards', data)
    },
    getSetCards: async (id) => {
        return await instance.get(`${nameModel}/list-set-cards?id=${id}`)
    },
    getListSetCards: async () => {
        return await instance.get(nameModel + '/lists-flashcards')
    }

}

export default cardApi