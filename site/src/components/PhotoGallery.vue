<script>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'

export default {
  components: {
    ArrowPathIcon
  },
  props: {
    photos: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      loading: false
    }
  },
  methods: {
    // NOTE: Assumes we have more then one image
    nextPhoto(event) {
      event.preventDefault()
      this.loading = true

      // cycle through the photos array
      if (this.currentIndex === this.photos.length - 1) {
        this.currentIndex = 0
      } else {
        this.currentIndex++
      }
    },
    onImageLoad() {
      // NOTE: we're really only doing this because the images aren't optimized for size
      // and it can pause uncomfortably when loading the next image
      this.loading = false
    }
  }
}
</script>
<template>
  <div class="relative" :class="{ loading: loading }">
    <a href="#" @click="nextPhoto">
      <img
        :src="`./exercises/${photos[currentIndex]}`"
        class="w-full object-cover rounded-t-lg p-2"
        @load="onImageLoad"
      />
    </a>
    <ArrowPathIcon class="w-4 h-3 absolute top-4 left-4 text-white text-sm opacity-80" />
  </div>
</template>
<style scoped>
.loading img {
  filter: blur(2px);
}
</style>
