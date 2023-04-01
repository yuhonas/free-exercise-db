<script>
import exercises from '../assets/exercises/all.json'
import Fuse from 'fuse.js'

export default {
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
      return this.searchResults.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.searchResults.length / this.pageSize)
    },
    pages() {
      const pages = []
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i)
      }
      return pages
    }
  },
  watch: {
    query(oldValue, newValue) {
      const options = {
        keys: ['name']
      }

      if (this.query.length > 1) {
        const fuse = new Fuse(this.exercises, options)
        this.searchResults = fuse.search(newValue).map((r) => r.item)
      } else {
        this.searchResults = this.exercises
      }
    }
  }
}
</script>
<template>
  <div>
    <form>
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
    <a
      v-for="exercise in paginatedItems"
      href=""
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
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {{ exercise.instructions[0] }}
        </p>
      </div>
    </a>

    <!--
  <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px">
      <li class="page-item" :class="{ disabled: currentPage === 0 }">
        <a href="#" @click="prevPage" class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li>
      <li>
      </li>
      <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
        <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#" @click="setPage(page)">{{ page + 1 }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
        <a class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#" @click="nextPage">Next</a>
      </li>
    </ul>
  </nav> -->

    <!-- <nav>
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 0 }">
        <a class="page-link" href="#" @click="prevPage">Previous</a>
      </li>
      <li class="page-item" v-for="page in pages" :key="page" :class="{ active: currentPage === page }">
        <a class="page-link" href="#" @click="setPage(page)">{{ page + 1 }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
        <a class="page-link" href="#" @click="nextPage">Next</a>
      </li>
    </ul>
  </nav> -->
  </div>
</template>
