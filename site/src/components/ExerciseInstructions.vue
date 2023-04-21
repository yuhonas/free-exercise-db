<script>
export default {
  props: {
    text: Array
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    expand(event) {
      event.preventDefault()
      this.expanded = true
    }
  }
}
</script>
<template>
  <section
    :class="{ collapsed: !expanded }"
    v-for="(instruction, index) in text"
    v-bind:key="index"
  >
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400" v-if="index == 0 || expanded">
      {{ instruction }}
    </p>
    <a
      href="#"
      @click="expand"
      v-if="index == 0 && !expanded"
      class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
    >
      More
      <svg
        aria-hidden="true"
        class="w-5 h-5 ml-1"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </a>
  </section>
</template>

<style scoped>
section.collapsed p {
  overflow: hidden;
  /* line-height: 2rem; */
  max-height: 6rem;
  -webkit-box-orient: vertical;
  display: block;
  display: -webkit-box;
  overflow: hidden !important;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
  /* font-size: 1.5rem; */
  /* width: 400px; */
  margin-bottom: 0px;
}
</style>
