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

const generateImageName = (id, mimetype, folder) => {
  const baseName = id + '.' + mimetype.split('/')[1]
  return folder ? folder + baseName : baseName
}

const uploadImageToStorage = async (id, file, folder = null) => {
  try {
    const imageName = generateImageName(id, file.mimetype, folder)
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
