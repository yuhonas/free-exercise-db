import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PhotoGallery from '../PhotoGallery.vue'

describe('PhotoGallery', () => {
  it.skip('when passed an array of photos it should render properly', () => {
    const wrapper = mount(PhotoGallery, { props: { photos: ['example.jpg'] } })
    // it should render an image with example.jpg as the src
    expect(wrapper.find('img').attributes('src')).toBe('example.jpg')
  })
})
