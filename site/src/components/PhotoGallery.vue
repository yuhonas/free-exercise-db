<script>
import { ArrowPathIcon } from '@heroicons/vue/24/solid'
import placeholderUrl from '@/assets/placeholder.svg'

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
      loading: false,
      placeholderUrl
    }
  },
  computed: {
    hasPhotos() {
      return this.photos.length > 0
    },
    currentPhoto() {
      return this.photos[this.currentIndex]
    }
  },
  methods: {
    // NOTE: Assumes we have more then one image
    nextPhoto(event) {
      event.preventDefault()
      if (!this.hasPhotos) {
        return
      }

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
  <div v-if="hasPhotos" :class="{ loading: loading }" class="relative">
    <a href="#" @click="nextPhoto">
      <!-- use imagekit.io for dynamic image resizing,
      this is using https://raw.githubusercontent.com/yuhonas/free-exercise-db/exercises
      as the origin server -->
      <img
        :src="`https://ik.imagekit.io/yuhonas/${currentPhoto}`"
        :srcset="`https://ik.imagekit.io/yuhonas/${currentPhoto} 850w, https://ik.imagekit.io/yuhonas/tr:w-250,h-180/${currentPhoto} 200w`"
        sizes="(min-width: 765px) 200px,
            850px"
        loading="lazy"
        class="w-full object-cover rounded-t-lg p-2"
        @load="onImageLoad"
      />
    </a>
    <ArrowPathIcon class="w-4 h-3 absolute top-4 left-4 text-white text-sm opacity-80" />
  </div>
  <img
    v-else
    :src="placeholderUrl"
    alt="No image available"
    class="w-full object-cover rounded-t-lg p-2"
  />
</template>
<style scoped>
.loading img {
  filter: blur(2px);
}
</style>
