import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PhotoGallery from '../PhotoGallery.vue'

describe('PhotoGallery', () => {
  it('when passed an array of photos it should render properly', () => {
    const wrapper = mount(PhotoGallery, {
      props: {
        photos: ['https://www.example.com/3_4_Sit-Up.jpg']
      }
    })
    // it should render an image with example.jpg as the src
    expect(wrapper.find('img').attributes('src')).toBe(
      'https://ik.imagekit.io/yuhonas/https://www.example.com/3_4_Sit-Up.jpg'
    )
  })
})
