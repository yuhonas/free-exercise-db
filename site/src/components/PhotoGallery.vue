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
      // NOTE: we're really only doing this because of the dynamic image resizing
      // on a cache miss there is a slight delay with imagekit as it resizes the image
      this.loading = false
    }
  }
}
</script>
<template>
  <div :class="{ loading: loading }" class="relative">
    <a href="#" @click="nextPhoto">
      <!-- use imagekit.io for dynamic image resizing,
      this is using https://raw.githubusercontent.com/yuhonas/free-exercise-db/exercises
      as the origin server -->
      <img
        :src="`https://ik.imagekit.io/yuhonas/${photos[currentIndex]}`"
        :srcset="`https://ik.imagekit.io/yuhonas/${photos[currentIndex]} 850w, https://ik.imagekit.io/yuhonas/tr:w-250,h-180/${photos[currentIndex]} 200w`"
        sizes="(min-width: 765px) 200px,
            850px"
        loading="lazy"
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
