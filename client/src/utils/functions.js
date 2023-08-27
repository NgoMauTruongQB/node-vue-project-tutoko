import uploadApi from "../api/uploadApi"

export default function uploadImage(loader) {
    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                loader.file.then(async (file) => {
                    try {
                        if(!file) return
                        
                        const response = await uploadApi.image(file)
                        console.log(response)

                        if(response){
                            console.log(response)
                            const urlImage = `${process.env.VITE_APP_ENDPOINT_URL}/blog/open-image?image_name=${response.data}` // đường dẫn url ảnh của bạn
                            console.log(urlImage)
                            resolve({ default: urlImage})
                        }
                    } catch (error) {
                        console.log(error)
                    } 
                })
            })
        }
    }
}