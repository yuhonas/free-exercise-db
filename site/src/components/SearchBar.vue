<script>
import exercises from '../assets/exercises.json'
import Instructions from './Instructions.vue'

import Fuse from 'fuse.js'

export default {
  components: {
    Instructions
  },
  data() {
    return {
      query: '',
      exercises: exercises,
      searchResults: exercises,
      pageSize: 50,
      currentPage: 0
    }
  },
  computed: {
    paginatedItems() {
      const startIndex = this.currentPage * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.searchResults.slice(0, endIndex)
    }
  },
  methods: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.pageSize)
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        if (this.totalPages() >= this.currentPage + 1) {
          // FIXME: Add a slight delay to the endless scroll
          // as it causes repaint issues otherwise
          setTimeout(() => {
            this.currentPage = this.currentPage + 1
          }, 400)
        }
      }
    })
  },
  watch: {
    query(oldValue, newValue) {
      const options = {
        keys: ['name']
      }

      this.currentPage = 0
      if (this.query.length > 1) {
        const fuse = new Fuse(this.exercises, options)
        this.searchResults = fuse.search({ name: newValue }).map((r) => r.item)
      } else {
        this.searchResults = this.exercises
      }
    }
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="onSubmit">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            aria-hidden="true"
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          v-model="query"
          type="search"
          autofocus="autofocus"
          id="default-search"
          class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Exercises, Instructions"
          required
        />
        <button
          type="button"
          class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </form>
    <div id="infinite-list">
      <div
        v-for="exercise in paginatedItems"
        v-bind:key="exercise.name"
        class="flex flex-col mt-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <img
          :alt="exercise.name"
          :src="`./exercises/${exercise.images[0]}`"
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-l"
        />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ exercise.name }}
          </h5>
          <Instructions :text="exercise.instructions" />
        </div>
      </div>
    </div>
  </div>
</template>
