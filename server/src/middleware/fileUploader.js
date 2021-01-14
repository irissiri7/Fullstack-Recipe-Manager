import multer from 'multer'
import Configurations from '../configurations/Configurations.js'

const upload = multer({
  storage: Configurations.fileStorage,
  fileFilter: Configurations.fileFilter
}).single('image')

export default {
  upload
}
