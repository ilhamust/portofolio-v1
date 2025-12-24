import { supabase } from '../config/supabase.js'

/* ================= GET ================= */
export const getProjects = async (req, res) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json(data)
}

/* ================= CREATE ================= */
export const createProject = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const {
      title,
      description,
      tech_stack,
      github_url,
      demo_url
    } = req.body

    let image_url = null

    if (req.file) {
      const fileName = `projects/${Date.now()}-${req.file.originalname}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        })

      if (uploadError) {
        console.error('UPLOAD ERROR:', uploadError)
        return res.status(400).json({ message: uploadError.message })
      }

      const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)

      image_url = data.publicUrl
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        title,
        description,
        tech_stack,
        github_url,
        demo_url,
        image_url
      }])

    if (error) {
      console.error('DB ERROR:', error)
      return res.status(400).json({ message: error.message })
    }

    res.status(201).json({ message: 'Project berhasil ditambahkan', data })

  } catch (err) {
    console.error('SERVER ERROR:', err)
    res.status(500).json({ message: err.message })
  }
}




/* ================= UPDATE ================= */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params
    const {
      title,
      description,
      tech_stack,
      github_url,
      demo_url
    } = req.body

    const payload = {
      title,
      description,
      tech_stack,
      github_url,
      demo_url
    }

    // ⬆️ upload image baru jika ada
    if (req.file) {
      const fileName = `projects/${Date.now()}-${req.file.originalname}`

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype
        })

      if (uploadError) {
        return res.status(400).json({ message: uploadError.message })
      }

      payload.image_url = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName)
        .data.publicUrl
    }

    const { error } = await supabase
      .from('projects')
      .update(payload)
      .eq('id', id)

    if (error) {
      return res.status(500).json({ message: error.message })
    }

    res.json({ message: 'Project berhasil diupdate' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

/* ================= DELETE ================= */
export const deleteProject = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (error) {
    return res.status(500).json({ message: error.message })
  }

  res.json({ message: 'Project berhasil dihapus' })
}
