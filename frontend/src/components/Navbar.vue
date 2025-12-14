<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showMobileMenu = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')
// Hapus isDark jika website ini permanen Dark Mode sesuai Hero Section
// Atau biarkan jika ingin tetap ada fitur toggle (tapi defaultnya harus disesuaikan)
const isDark = ref(true) 

const menus = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang Saya' },
  { id: 'skills', label: 'Skill' },
  { id: 'projects', label: 'Project' },
  { id: 'contact', label: 'Kontak' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 20

  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    const top = section.offsetTop - 150
    const height = section.offsetHeight
    if (window.scrollY >= top && window.scrollY < top + height) {
      activeSection.value = section.id
    }
  })
}

function toggleDarkMode() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
      isScrolled
        ? 'bg-[#0B1120]/80 backdrop-blur-md shadow-lg border-white/5' // Saat Scroll: Gelap Transparan
        : 'bg-transparent' // Saat di Atas: Transparan (Menyatu dengan Hero)
    ]"
  >
    <div class="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

      <a href="#home" class="font-bold text-xl tracking-wide text-white flex items-center gap-1">
        Ilham<span class="text-cyan-400">.dev</span>
      </a>

      <div class="flex items-center gap-6">

        <nav class="hidden lg:flex items-center gap-8 font-medium text-sm">
          <a
            v-for="menu in menus"
            :key="menu.id"
            :href="'#' + menu.id"
            class="relative group py-1 transition-colors duration-300"
            :class="activeSection === menu.id ? 'text-white' : 'text-gray-400 hover:text-white'"
          >
            {{ menu.label }}
            <span
              class="absolute left-0 bottom-0 h-0.5 bg-cyan-400 transition-all duration-300"
              :class="activeSection === menu.id ? 'w-full' : 'w-0 group-hover:w-full'"
            />
          </a>
        </nav>

        <div class="hidden lg:block h-5 w-px bg-gray-700"></div>

        <button
          @click="toggleDarkMode"
          class="text-gray-400 hover:text-white transition p-1 rounded-full hover:bg-white/10"
          aria-label="Toggle dark mode"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m0 13.5V21m9-9h-2.25M5.25 12H3m15.364-6.364-1.591 1.591M7.227 16.773l-1.591 1.591m0-11.318 1.591 1.591m11.318 11.318 1.591 1.591M12 8.25A3.75 3.75 0 1112 15.75z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.75 9.75 0 0112 2.25A7.5 7.5 0 0021.75 12c0 1.1-.226 2.148-.598 3.002z" />
          </svg>
        </button>

        <button
          class="lg:hidden text-gray-300 hover:text-white text-2xl focus:outline-none"
          @click="showMobileMenu = true"
        >
          ☰
        </button>
      </div>
    </div>
  </header>

  <transition
    enter-active-class="transition-opacity duration-300 ease-linear"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-linear"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="showMobileMenu"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      @click="showMobileMenu = false"
    />
  </transition>

  <transition
    enter-active-class="transform transition ease-in-out duration-300"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transform transition ease-in-out duration-300"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <aside
      v-if="showMobileMenu"
      class="fixed top-0 right-0 w-[75%] max-w-xs h-full bg-[#111827] border-l border-gray-800 z-50 shadow-2xl p-6"
    >
      <div class="flex justify-between items-center mb-10">
        <span class="font-bold text-lg text-white">Menu</span>
        <button @click="showMobileMenu = false" class="text-gray-400 hover:text-white text-xl">✕</button>
      </div>

      <nav class="flex flex-col gap-6 font-medium">
        <a
          v-for="menu in menus"
          :key="menu.id"
          :href="'#' + menu.id"
          class="text-gray-400 hover:text-cyan-400 hover:pl-2 transition-all duration-300 border-b border-gray-800 pb-2"
          :class="{ 'text-cyan-400 pl-2': activeSection === menu.id }"
          @click="showMobileMenu = false"
        >
          {{ menu.label }}
        </a>
      </nav>
    </aside>
  </transition>
</template>