<template>
  <nav class="fixed top-0 w-full bg-white shadow z-50">
    <ul class="flex justify-center gap-6 py-4 font-medium">
      <li v-for="menu in menus" :key="menu">
        <a :href="'#' + menu" class="hover:text-blue-600 capitalize">
          {{ menu }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
const menus = [
  "home",
  "about",
  "skills",
  "education",
  "experience",
  "projects",
  "contact"
];
</script>
