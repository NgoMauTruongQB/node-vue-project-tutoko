import uploadApi from "../api/uploadApi";

export default function uploadImage(loader) {
    return {
        upload: () => {
            return new Promise(async (resolve, reject) => {
                loader.file.then(async (file) => {
                    try {
                        if(!file) return;
                        
                        // Call API Upload image to server
                        const response = await uploadApi.image(file)

                        console.log(response)

                        if(response){
                            const urlImage = `${process.env.VITE_APP_ENDPOINT_URL}/${response?.filename}` // đường dẫn url ảnh của bạn
                            //result { default: urlImage}
                            resolve({ default: urlImage})
                        }
                    } catch (error) {
                        // reject(error)
                    } 
                })
            })
        }
    }
}