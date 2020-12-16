import { bucket } from '../firebase/adminSetUp.js'
import fs from 'fs-extra'

const emptyTempImageFolder = async () => {
  try {
    await fs.emptyDir('./images')
    console.log('successfully emptied image folder!')
  } catch (err) {
    console.error(err)
  }
}

const generateImageName = (recipeId, mimetype) => {
  return recipeId + '.' + mimetype.split('/')[1]
}

const uploadImageToStorage = async (recipeId, file) => {
  try {
    const imageName = generateImageName(recipeId, file.mimetype)
    const [upload] = await bucket.upload(file.path, {
      public: true,
      destination: imageName
    })
    const url = upload.metadata.mediaLink
    emptyTempImageFolder()
    return [url, imageName]
  } catch (error) {
    console.log(error.message)
    return null
  }
}

const deleteImageFromStorage = async (fileName) => {
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
  uploadImageToStorage,
  deleteImageFromStorage
}
