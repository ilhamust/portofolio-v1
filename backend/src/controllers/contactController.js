import { supabase } from "../config/supabase.js";

export const createContact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const { error } = await supabase
    .from("contacts")
    .insert([{ name, email, message }]);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  res.status(201).json({ message: "Pesan berhasil dikirim" });
};
