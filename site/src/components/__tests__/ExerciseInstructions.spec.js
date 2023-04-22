import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ExerciseInstructions from '../ExerciseInstructions.vue'

describe('ExerciseInstructions', () => {
  // when passed an array of text it will render it inside a paragraph
  it('renders a single paragraph in non expanded form', () => {
    const instructions = [
      'This is the first instruction',
      'This is the second instruction',
      'This is the third instruction'
    ]
    const wrapper = mount(ExerciseInstructions, {
      props: { text: instructions }
    })

    let paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(1)
    expect(paragraphs.at(0).text()).toBe(instructions[0])
  })
})
