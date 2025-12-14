<template>
  <section id="contact" class="py-20">
    <h2 class="text-3xl font-bold text-center mb-8">Kontak</h2>

    <form @submit.prevent="submitForm" class="max-w-md mx-auto space-y-4">
      <input v-model="form.name" type="text" placeholder="Nama" class="w-full border p-2 rounded" />
      <input v-model="form.email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
      <textarea v-model="form.message" placeholder="Pesan" class="w-full border p-2 rounded"></textarea>

      <button class="w-full bg-blue-600 text-white py-2 rounded">
        Kirim Pesan
      </button>

      <p v-if="success" class="text-green-600 text-sm text-center">
        Pesan berhasil dikirim
      </p>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import api from "../services/api";

const form = ref({
  name: "",
  email: "",
  message: ""
});

const success = ref(false);

const submitForm = async () => {
  await api.post("/contacts", form.value);
  success.value = true;
  form.value = { name: "", email: "", message: "" };
};
</script>
