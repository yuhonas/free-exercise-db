<script>
export default {
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
  <a href="#" @click="nextPhoto">
    <img
      :src="`./exercises/${photos[currentIndex]}`"
      class="w-full object-cover rounded-t-lg p-2"
    />
  </a>
</template>
