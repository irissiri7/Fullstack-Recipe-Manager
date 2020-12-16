import { bucket } from '../firebase/adminSetUp.js'

const generateImageName = (recipeId, mimetype) => {
  return recipeId + '.' + mimetype.split('/')[1]
}

const uploadImage = async (recipeId, file) => {
  try {
    const imageName = generateImageName(recipeId, file.mimetype)
    const [upload] = await bucket.upload(file.path, {
      public: true,
      destination: imageName
    })
    const url = upload.metadata.mediaLink
    return [url, imageName]
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const deleteFileFromStorage = async (fileName) => {
  try {
    const file = bucket.file(fileName)
    await file.delete({ ignoreNotFound: true })
    console.log('File deleted from storage')
  } catch (error) {
    console.log('Could not delete image from storage')
    console.log(error)
  }
}

export default {
  uploadImage,
  deleteFileFromStorage
}
