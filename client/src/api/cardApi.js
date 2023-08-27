import instance from "./axios"

const nameModel = '/card'

const cardApi = {
    addListFlashCards: async (data) => {
        return await instance.post(nameModel + '/list-flashcards', data)
    },
    addSetCards: async (data) => {
        return await instance.post(nameModel + '/set-cards', data)
    },
    deleteSetFlashCard: async (id) => {
        return await instance.delete(`${nameModel}/list-set-cards?id=${id}`)
    },
    getSetCards: async (id) => {
        return await instance.get(`${nameModel}/list-set-cards?id=${id}`)
    },
    getListSetCards: async () => {
        return await instance.get(nameModel + '/lists-flashcards')
    },
    addFlashCard: async (data) => {
        return await instance.post(nameModel + '/flashcard', data)
    },
    updateFlashCard: async (data) => {
        return await instance.patch(nameModel + '/flashcard', data)
    },
    deleteItemFlashCard: async (id) => {
        return await instance.delete(`${nameModel}/flashcard?id=${id}`)
    },
    studySetCards: async (id) => {
        return await instance.get(`${nameModel}/study?id=${id}`)
    },
    getFlashCardsPersonal: async () => {
        return await instance.get(nameModel + '/flashcards-personal')
    }
}

export default cardApi