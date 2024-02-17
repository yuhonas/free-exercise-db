<script>
import exercises from '../../../dist/exercises_es.json'
import ExerciseInstructions from './ExerciseInstructions.vue'
import PhotoGallery from './PhotoGallery.vue'

// import bookmark icon from heroicons
import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/vue/24/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/vue/24/solid'

import Fuse from 'fuse.js'

export default {
  components: {
    ExerciseInstructions,
    PhotoGallery,
    BookmarkIconOutline,
    BookmarkIconSolid
  },
  data() {
    return {
      query: '',
      exercises: exercises,
      searchResults: exercises,
      pageSize: 50,
      currentPage: 0,
      savedExercises: [],
      showSavedExercises: false,
      filterPrimaryMuscle: '',
      filterEquipment: '',
      filterLevel: '',
      filterForce: ''
    }
  },
  computed: {
    filteredExercises() {
      return this.searchResults.filter((exercise) => {
        return (
          (!this.filterPrimaryMuscle ||
            exercise.primaryMuscles.includes(this.filterPrimaryMuscle)) &&
          (!this.filterEquipment || exercise.equipment === this.filterEquipment) &&
          (!this.filterLevel || exercise.level === this.filterLevel) &&
          (!this.filterForce || exercise.force === this.filterForce)
        )
      })
    },

    uniquePrimaryMuscles() {
      const muscleCount = {}
      this.exercises.forEach((exercise) => {
        exercise.primaryMuscles.forEach((muscle) => {
          if (muscle) {
            muscleCount[muscle] = (muscleCount[muscle] || 0) + 1
          }
        })
      })
      return Object.keys(muscleCount)
        .map((muscle) => ({
          name: muscle,
          count: muscleCount[muscle]
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    uniqueEquipment() {
      const equipmentCount = {}
      this.exercises.forEach((exercise) => {
        const equipment = exercise.equipment
        if (equipment) {
          equipmentCount[equipment] = (equipmentCount[equipment] || 0) + 1
        }
      })
      return Object.keys(equipmentCount)
        .map((equipment) => ({
          name: equipment,
          count: equipmentCount[equipment]
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    uniqueLevels() {
      const levelCount = {}
      this.exercises.forEach((exercise) => {
        const level = exercise.level
        if (level) {
          levelCount[level] = (levelCount[level] || 0) + 1
        }
      })
      return Object.keys(levelCount).map((level) => ({ name: level, count: levelCount[level] }))
    },

    uniqueForces() {
      const forceCount = {}
      this.exercises.forEach((exercise) => {
        const force = exercise.force
        if (force) {
          forceCount[force] = (forceCount[force] || 0) + 1
        }
      })
      return Object.keys(forceCount)
        .map((force) => ({ name: force, count: forceCount[force] }))
        .sort((a, b) => a.name.localeCompare(b.name))
    },

    // TODO: Refactor this, it's a mess
    savedItemClasses() {
      let color = this.showSavedExercises ? 'blue' : 'gray'

      let colors = {
        [`bg-${color}-700`]: true,
        [`hover:bg-${color}-700`]: true,
        [`dark:bg-${color}-800`]: true,
        [`dark:hover:bg-${color}-700`]: true,
        [`dark:focus:ring-${color}-800`]: true,
        [`focus:ring-${color}-300`]: true
      }

      return colors
    },
    paginatedItems() {
      const startIndex = this.currentPage * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.searchResults.slice(0, endIndex)
    }
  },
  methods: {
    totalPages() {
      return Math.ceil(this.searchResults.length / this.pageSize)
    },
    saveExercise(exercise) {
      // add the exercise if it's not already in the array otherwise remove it
      if (!this.isBookedMarked(exercise)) {
        this.savedExercises.push(exercise)
      } else {
        this.savedExercises = this.savedExercises.filter((e) => e !== exercise)

        // if we ended up with no exercises then let's clear the search and reset the results
        if (this.savedExercises.length == 0) {
          this.query = ''
          this.searchResults = this.exercises
          this.showSavedExercises = false
        } else {
          this.searchResults = this.savedExercises
        }
      }
    },
    toggleSavedExercises() {
      // toggle between showing all exercises and saved exercises
      if (this.searchResults === this.savedExercises) {
        this.searchResults = this.exercises
        this.showSavedExercises = false
      } else if (this.savedExercises.length > 0) {
        this.searchResults = this.savedExercises
        this.showSavedExercises = true
      }
    },
    isBookedMarked(exercise) {
      return this.savedExercises.includes(exercise)
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

    // load saved exercises from local storage
    if (localStorage.getItem('savedExercises')) {
      this.savedExercises = JSON.parse(localStorage.getItem('savedExercises'))
    }
  },
  watch: {
    savedExercises: {
      handler: function (val) {
        localStorage.setItem('savedExercises', JSON.stringify(val))
      },
      deep: true
    },
    query(newValue, _) {
      const options = {
        keys: ['id', 'name']
      }

      this.currentPage = 0
      this.showSavedExercises = false

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
  <div class="w-full flex">
    <!-- Dropdowns para Muscles -->
    <div class="w-1/4 p-2">
      <select v-model="filterPrimaryMuscle" class="w-full p-2 border rounded">
        <option value="">Músculos</option>
        <!-- Opciones dinámicas basadas en los datos -->
        <!-- Suponiendo que tienes un array uniquePrimaryMuscles -->
        <option v-for="muscle in uniquePrimaryMuscles" :key="muscle" :value="muscle">
          {{ muscle.name }} ({{ muscle.count }})
        </option>
      </select>
    </div>

    <!-- Dropdown para Equipment -->
    <div class="w-1/4 p-2">
      <select v-model="filterEquipment" class="w-full p-2 border rounded">
        <option value="">Equipment</option>
        <option v-for="equipment in uniqueEquipment" :key="equipment" :value="equipment">
          {{ equipment.name }} ({{ equipment.count }})
        </option>
      </select>
    </div>

    <!-- Dropdown para Levels -->
    <div class="w-1/4 p-2">
      <select v-model="filterLevel" class="w-full p-2 border rounded">
        <option value="">Level</option>
        <option v-for="level in uniqueLevels" :key="level" :value="level">
          {{ level.name }} ({{ level.count }})
        </option>
      </select>
    </div>

    <!-- Dropdown para Forces -->
    <div class="w-1/4 p-2">
      <select v-model="filterForce" class="w-full p-2 border rounded">
        <option value="">Force Type</option>
        <option v-for="force in uniqueForces" :key="force" :value="force">
          {{ force.name }} ({{ force.count }})
        </option>
      </select>
    </div>
  </div>
  <div class="flex">
    <div class="w-full">
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
            name="search"
            type="search"
            autofocus="autofocus"
            id="search"
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Busca ejercicios, Instrucciones..."
            required
          />
        </div>
      </form>
    </div>
    <div class="w-24 relative">
      <button
        type="button"
        @click.prevent="toggleSavedExercises"
        :class="savedItemClasses"
        class="text-white absolute right-2.5 bottom-2.5 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
      >
        <BookmarkIconOutline
          class="w-5 h-5 mr-2 -ml-1 text-white"
          v-if="savedExercises.length == 0"
        />
        <BookmarkIconSolid class="w-5 h-5 mr-2 -ml-1 text-white" v-if="savedExercises.length > 0" />
        <span class="sr-only">Saved</span>
        <div
          class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900"
        >
          {{ savedExercises.length }}
        </div>
      </button>
    </div>
  </div>
  <div id="infinite-list">
    <div
      v-for="exercise in paginatedItems"
      v-bind:key="exercise.name"
      :class="savedItemClasses"
      class="exercise flex flex-col relative mt-4 items-center hover:bg-gray-300 cursor-pointer justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700"
    >
      <div class="w-full md:h-auto md:w-60">
        <PhotoGallery :photos="exercise.images" />
      </div>
      <div class="w-96 p-4 leading-normal" :class="{ bookedmarked: isBookedMarked(exercise) }">
        <a
          href=""
          @click.prevent="saveExercise(exercise)"
          class="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
        >
          <BookmarkIconOutline
            class="absolute drop-shadow top-4 right-4 md:top-2 md:right-2 w-8 md:w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
            v-if="!isBookedMarked(exercise)"
          />
          <BookmarkIconSolid
            class="absolute drop-shadow top-4 right-4 md:top-2 md:right-2 w-8 md:w-5 text-gray-400 hover:text-gray-500 cursor-pointer"
            v-if="isBookedMarked(exercise)"
          />
        </a>
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ exercise.name }}
        </h5>
        <ExerciseInstructions :text="exercise.instructions" />
      </div>
    </div>
  </div>
</template>
