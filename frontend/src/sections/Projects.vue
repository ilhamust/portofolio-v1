<template>
  <section id="projects" class="py-20 bg-gray-50">
    <h2 class="text-3xl font-bold text-center mb-10">Project</h2>

    <div class="grid md:grid-cols-3 gap-6 px-10">
      <div
        v-for="project in projects"
        :key="project.id"
        class="bg-white p-5 rounded-lg shadow"
      >
        <h3 class="font-semibold text-lg">{{ project.title }}</h3>
        <p class="text-sm text-gray-600 mt-2">{{ project.description }}</p>

        <div class="mt-4 flex gap-3">
          <a
            :href="project.github_url"
            target="_blank"
            class="text-blue-600 text-sm"
          >
            GitHub
          </a>
          <a
            :href="project.demo_url"
            target="_blank"
            class="text-green-600 text-sm"
          >
            Demo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const projects = ref([]);

onMounted(async () => {
  const res = await api.get("/projects");
  projects.value = res.data;
});
</script>
