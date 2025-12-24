import jwt from 'jsonwebtoken'

export const login = (req, res) => {
  const { email, password } = req.body

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: 'Login gagal' })
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.json({ token })
}
