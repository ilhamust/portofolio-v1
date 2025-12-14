<script setup>
import { ref } from "vue";
import api from "../services/api";

const form = ref({
  name: "",
  email: "",
  message: ""
});

const isLoading = ref(false);
const success = ref(false);
const errorMsg = ref("");

const submitForm = async () => {
  try {
    isLoading.value = true;
    errorMsg.value = "";
    success.value = false;

    // Mengirim data ke backend
    await api.post("/contacts", form.value);

    success.value = true;
    form.value = { name: "", email: "", message: "" };
    
    // Hilangkan pesan sukses setelah 5 detik
    setTimeout(() => {
      success.value = false;
    }, 5000);

  } catch (err) {
    console.error(err);
    errorMsg.value = "Gagal mengirim pesan. Silakan coba lagi nanti.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <section id="contact" class="py-20 bg-[#0B1120] text-white relative overflow-hidden">
    
    <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
    <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute top-20 right-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
      
      <div class="text-center mb-16">
        <span class="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-400/10 rounded-full border border-cyan-400/20">
             Contact
        </span>
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Mari <span class="text-blue-500">Bekerja Sama</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Punya ide proyek menarik atau sekadar ingin menyapa? Jangan ragu untuk menghubungi saya.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        
        <div class="flex flex-col justify-center">
          <h3 class="text-2xl font-bold mb-6">Let's Talk!</h3>
          <p class="text-gray-400 mb-8 leading-relaxed">
            Saya selalu terbuka untuk mendiskusikan proyek pengembangan website, 
            peluang kemitraan, atau sekadar bertukar pikiran tentang teknologi.
          </p>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-cyan-400 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-medium">Email</h4>
                <a href="mailto:hello@ilham.dev" class="text-gray-400 hover:text-cyan-400 transition-colors">hello@ilham.dev</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-blue-400 shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 class="text-white font-medium">Lokasi</h4>
                <p class="text-gray-400">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>

          <div class="mt-10 pt-8 border-t border-gray-800">
             <p class="text-sm text-gray-500 mb-4">Temukan saya di sosial media:</p>
             <div class="flex gap-4">
                <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                  <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/></svg>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                   <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
             </div>
          </div>
        </div>

        <div class="bg-white/5 border border-white/5 p-8 rounded-2xl backdrop-blur-sm shadow-xl relative group">
           <div class="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

           <form @submit.prevent="submitForm" class="relative space-y-5 z-10">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  id="name"
                  placeholder="Masukkan nama Anda" 
                  required
                  class="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                />
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input 
                  v-model="form.email" 
                  type="email" 
                  id="email"
                  placeholder="nama@email.com" 
                  required
                  class="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors" 
                />
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
                <textarea 
                  v-model="form.message" 
                  id="message"
                  rows="4"
                  placeholder="Tulis pesan Anda di sini..." 
                  required
                  class="w-full bg-[#111827] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                :disabled="isLoading"
                class="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold py-3.5 rounded-lg
                       hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span v-if="isLoading">
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
                <span v-else>Kirim Pesan</span>
                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <div v-if="success" class="p-3 bg-green-500/10 border border-green-500/20 text-green-400 text-sm rounded-lg text-center animate-pulse">
                ✅ Pesan berhasil dikirim! Saya akan segera membalasnya.
              </div>
              <div v-if="errorMsg" class="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg text-center">
                {{ errorMsg }}
              </div>

           </form>
        </div>

      </div>
    </div>
  </section>
</template>