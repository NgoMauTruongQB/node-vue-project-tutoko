import instance from "./axios"

const uploadApi = {
    image: async (files) => {
        const data = new FormData()
        data.append('files', files)
        return await instance.post('/blog/upload-images', data)
    } 
}

export default uploadApi
