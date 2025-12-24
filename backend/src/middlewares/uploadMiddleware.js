import multer from 'multer'

// simpan di memory (langsung upload ke Supabase)
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('File harus berupa gambar'), false)
    }
  }
})

export default upload
