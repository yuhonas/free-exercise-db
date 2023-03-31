<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>
<script>
  import exercises from '../assets/exercises/all.json'
  import Fuse from 'fuse.js'

  export default {
    data() {
      return {
        query: "",
        exercises: exercises,
        searchResults: exercises
       }
    },
    methods: {
      getImageFromExercise(exercise) {
        var filePath = '../assets/exercises/' + exercise.images[0]

        return new URL(filePath, import.meta.url).href
      }
    },
    watch: {
      query(oldValue, newValue) {
        const options = {
          // includeScore: true,
          keys: ['name']
        }

        if(newValue) {
          const fuse = new Fuse(this.exercises, options)
          this.searchResults = fuse.search(newValue).map(r => r.item)
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
      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input v-model="query" type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
          <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
  </form>
    <ul class="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      <li v-for="exercise in searchResults">
        {{ exercise.name }}
        <img :src="getImageFromExercise(exercise)" style="width: 50px" />

      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
