import { supabase } from '../config/supabase.js'

export const createContact = async (req, res) => {
  const { name, email, message } = req.body

  const { error } = await supabase
    .from('contacts')
    .insert([{ name, email, message }])

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json({ message: 'Pesan berhasil dikirim' })
}

export const getContacts = async (req, res) => {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json(data)
}

export const deleteContact = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('contacts')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json({ message: 'Pesan berhasil dihapus' })
}
