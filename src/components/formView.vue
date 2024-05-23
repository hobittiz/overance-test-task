<template>
  <div class="container mx-auto min-h-screen flex-col items-center flex py-12">
    <h1 class="text-4xl mb-10 font-bold">Overance test task</h1>
    <form class="w-1/2" @submit.prevent>
      <div class="flex-col flex gap-3">
        <input
          type="text"
          placeholder="Search..."
          :class="[
            'searchInput transition duration-300 bg-gray-50 border border-gray-300 focus:border-blue-500 outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white',
            {
              '!border-green-400 shadow shadow-green-500/50 active': isSearchMatched
            }
          ]"
          v-model="searchText"
          @input="highlightFields"
        />
        <div class="input flex gap-2 items-center" v-for="field in fields" :key="field.id">
          <span class="vowel-count w-1/6">Vowels: {{ field.vowelCount }}</span>
          <input
            type="text"
            placeholder="Input your text..."
            class="default-field transition duration-300 bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            :class="{
              '!border-green-400 shadow shadow-green-500/50 active':
                searchText && field.value.includes(searchText)
            }"
            v-model="field.value"
            @input="updateVowelCount(field.id)"
          />
          <button
            type="button"
            class="delete-item flex items-center justify-center transition duration-300 w-full max-w-8 aspect-square bg-red-400 rounded-full hover:bg-red-500 hover:rotate-90"
            :disabled="fields.length === 1"
            :class="{ 'grayscale pointer-events-none': fields.length === 1 }"
            @click="removeField(field.id)"
          >
            <svg class="w-2/4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
              <path
                d="M7 4a.995.995 0 0 0-.707.293l-2 2a.999.999 0 0 0 0 1.414L11.586 15l-7.293 7.293a.999.999 0 0 0 0 1.414l2 2a.999.999 0 0 0 1.414 0L15 18.414l7.293 7.293a.999.999 0 0 0 1.414 0l2-2a.999.999 0 0 0 0-1.414L18.414 15l7.293-7.293a.999.999 0 0 0 0-1.414l-2-2a.999.999 0 0 0-1.414 0L15 11.586 7.707 4.293A.996.996 0 0 0 7 4z"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          class="addNewField transition duration-300 select-none w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          :disabled="fields.length >= maxFields"
          :class="{ 'grayscale pointer-events-none': fields.length >= maxFields }"
          @click="addField"
        >
          Add new input
        </button>
      </div>
    </form>
    <p class="cratedby mt-12 text-sm text-state-400">
      Created by
      <a
        href="https://www.linkedin.com/in/volodymyr-tsyrul-32b755171/"
        class="transition duration-300 text-sky-500 hover:text-sky-700 font-semibold"
        >Volodymyr Tsyrul</a
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Field {
  id: number
  value: string
  vowelCount: number
}

const searchText = ref<string>('')
const maxFields = 10
const isSearchMatched = ref<boolean>(false)
const fields = ref<Field[]>([
  { id: Date.now() + Math.random(), value: '', vowelCount: 0 },
  { id: Date.now() + Math.random(), value: '', vowelCount: 0 },
  { id: Date.now() + Math.random(), value: '', vowelCount: 0 }
])

const addField = (): void => {
  if (fields.value.length < maxFields) {
    fields.value.push({ id: Date.now() + Math.random(), value: '', vowelCount: 0 })
  }
}

const removeField = (id: number): void => {
  if (fields.value.length > 1) {
    fields.value = fields.value.filter((field) => field.id !== id)
  }
}

const updateVowelCount = (id: number): void => {
  const field = fields.value.find((field) => field.id === id)
  if (field) {
    field.vowelCount = countVowels(field.value)
  }
  highlightFields()
}

const countVowels = (str: string): number => {
  const vowels = 'aeiouAEIOU'
  return Array.from(str).filter((char) => vowels.includes(char)).length
}

const highlightFields = (): void => {
  if (!searchText.value.length) return
  isSearchMatched.value = fields.value.some((field) => field.value.includes(searchText.value))
}
</script>
