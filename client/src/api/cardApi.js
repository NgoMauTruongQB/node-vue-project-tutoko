import instance from "./axios"

const nameModel = '/card'

const cardApi = {
    addListFlashCards: async (data) => {
        return await instance.post(nameModel + '/list-flashcards', data)
    }
}

export default cardApi