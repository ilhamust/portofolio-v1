<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showMobileMenu = ref(false)
const isScrolled = ref(false)
const activeSection = ref('home')
const isDark = ref(false)

const menus = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Tentang Saya' },
  { id: 'skills', label: 'Skill' },
  { id: 'education', label: 'Pendidikan' },
  { id: 'experience', label: 'Pengalaman' },
  { id: 'projects', label: 'Project' },
  { id: 'contact', label: 'Kontak' },
]

function handleScroll() {
  isScrolled.value = window.scrollY > 10

  document.querySelectorAll('section').forEach(section => {
    const top = section.offsetTop - 120
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
      'sticky top-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/60 backdrop-blur-md shadow-sm'
        : 'bg-white'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center">

      <!-- Logo -->
      <a href="#home" class="font-bold text-xl text-gray-900">
        Ilham.dev
      </a>

      <!-- Right Area -->
      <div class="ml-auto flex items-center gap-6">

        <!-- Desktop Menu -->
        <nav class="hidden lg:flex items-center gap-8 font-medium">
          <a
            v-for="menu in menus"
            :key="menu.id"
            :href="'#' + menu.id"
            class="relative group pb-1 text-gray-800"
          >
            {{ menu.label }}
            <span
              class="absolute left-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-300"
              :class="activeSection === menu.id ? 'w-full' : 'w-0 group-hover:w-full'"
            />
          </a>
        </nav>

        <!-- Dark Mode -->
        <button
          @click="toggleDarkMode"
          class="text-gray-700 hover:opacity-70 transition"
          aria-label="Toggle dark mode"
        >
          <svg
            v-if="!isDark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0112 21.75
                 9.75 9.75 0 0112 2.25
                 A7.5 7.5 0 0021.75 12
                 c0 1.1-.226 2.148-.598 3.002z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v2.25m0 13.5V21
                 m9-9h-2.25M5.25 12H3
                 m15.364-6.364-1.591 1.591
                 M7.227 16.773l-1.591 1.591
                 m0-11.318 1.591 1.591
                 m11.318 11.318 1.591 1.591
                 M12 8.25A3.75 3.75 0 1112 15.75z"
            />
          </svg>
        </button>

        <!-- Mobile Button -->
        <button
          class="lg:hidden text-2xl"
          @click="showMobileMenu = true"
        >
          ☰
        </button>
      </div>
    </div>
  </header>

  <!-- MOBILE OVERLAY -->
  <div
    v-if="showMobileMenu"
    class="fixed inset-0 bg-black/40 z-40"
    @click="showMobileMenu = false"
  />

  <!-- MOBILE DRAWER -->
  <aside
    v-if="showMobileMenu"
    class="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-lg p-6 transition-transform"
  >
    <div class="flex justify-between items-center mb-8">
      <span class="font-bold text-lg">Menu</span>
      <button @click="showMobileMenu = false" class="text-xl">✕</button>
    </div>

    <nav class="flex flex-col gap-5 font-medium">
      <a
        v-for="menu in menus"
        :key="menu.id"
        :href="'#' + menu.id"
        class="text-gray-800"
        @click="showMobileMenu = false"
      >
        {{ menu.label }}
      </a>
    </nav>
  </aside>
</template>
