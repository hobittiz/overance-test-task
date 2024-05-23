import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import formView from '@/components/formView.vue'
import { nextTick } from 'vue'

describe('formView', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(formView)
  })

  it('renders the component properly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('adds a new input field when "Add new input" button is clicked', async () => {
    const addButton = wrapper.find('button.addNewField')
    await addButton.trigger('click')
    expect(wrapper.findAll('.input').length).toBe(4)
  })

  it('removes an input field when "Remove" button is clicked', async () => {
    const removeButton = wrapper.find('.delete-item')
    await removeButton.trigger('click')
    expect(wrapper.findAll('.input').length).toBe(2)
  })

  it('counts vowels correctly', async () => {
    const input = wrapper.findAll('input[type="text"]')[1]
    await input.setValue('aeiou')
    expect(wrapper.findAll('.vowel-count')[0].text()).toBe('Vowels: 5')
  })

  it('highlights input fields based on search text', async () => {
    const searchInput = wrapper.find('.searchInput')
    await searchInput.setValue('test')

    const inputFields = wrapper.findAll('.default-field')

    inputFields.forEach((input) => {
      expect(input.classes()).not.toContain('active')
    })

    await searchInput.setValue('this is a test')
    await inputFields[0].setValue('this is a test')
    await nextTick()

    expect(searchInput.classes()).toContain('active')
    expect(inputFields[0].classes()).toContain('active')
  })
})
