<script>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

export default {
  components: {
    ArrowPathIcon
  },
  props: {
    photos: Array,
    required: true
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    nextPhoto(event) {
      event.preventDefault()
      // cycle through the photos array
      if (this.currentIndex === this.photos.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    }
  }
}
</script>
<template>
  <div class="relative">
    <a href="#" @click="nextPhoto">
      <img
        :src="`./exercises/${photos[currentIndex]}`"
        class="w-full object-cover rounded-t-lg p-2"
      />
    </a>
    <ArrowPathIcon class="w-4 h-3 absolute top-4 left-4 text-white text-sm opacity-80" />
  </div>
</template>
