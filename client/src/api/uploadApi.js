import instance from "./axios"
// const instance = axios.create()

const uploadApi = {
    image: async (files) => {
        const data = new FormData()
        data.append("files", files)
        return await instance.post("/upload/image", data)
    } 
}

// const uploadApi = {
//     image: async (files) => {
//         const data = new FormData()
//         data.append("files", files)
//         return await axios.post("/upload/image", data)
//     } 
// }

export default uploadApi
