import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import PhotoGallery from '../PhotoGallery.vue'

describe('PhotoGallery', () => {
  // set test to pending, we'll come back to it later
  it.skip('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
