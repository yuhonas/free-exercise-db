import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  it('should find a exercise by name', async () => {
    const wrapper = mount(SearchBar, {})

    const input = wrapper.find('input[name="search"]')

    await input.setValue('Alternate Incline Dumbbell Curl')

    // within the first div of an id of "infinite-list" the first result should contain the headline "Alternate Incline Dumbbell Curl"
    expect(wrapper.find('#infinite-list div:first-child').text()).toContain(
      'Alternate Incline Dumbbell Curl'
    )
  })

  it('should return an empty result set for a non match', async () => {
    const wrapper = mount(SearchBar, {})

    const input = wrapper.find('input[name="search"]')

    await input.setValue('fjjhfshdjh')

    // expect their to be 0 children within the #infinite-list div
    expect(wrapper.find('#infinite-list').element.children.length).toBe(0)
  })
})
