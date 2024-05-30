const url ='https://api.cloudinary.com/v1_1/dpqsoqaks/image/upload'
 
const uploadImg =async (image)=>{

    const formData = new FormData()
    formData.append('file',image)
    formData.append('upload_preset','greenGrocery_product')

    const dataResponse = await fetch(url,{
        method:'POST',
        body: formData
    })

    return dataResponse.json()
}

export default uploadImg