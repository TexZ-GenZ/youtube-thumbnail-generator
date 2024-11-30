&lt;template>
  &lt;div class="bg-white shadow rounded-lg p-6">
    &lt;h2 class="text-lg font-semibold mb-4">Create Animation</h2>
    &lt;form @submit.prevent="handleSubmit">
      &lt;div class="mb-4">
        &lt;label for="prompt" class="block text-sm font-medium text-gray-700">
          Enter your mathematical expression or description
        &lt;/label>
        &lt;textarea
          id="prompt"
          v-model="prompt"
          rows="4"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          :disabled="isLoading"
          placeholder="Example: Plot a 3D sine wave with amplitude 2"
        >&lt;/textarea>
      &lt;/div>
      &lt;div class="flex items-center justify-between">
        &lt;button
          type="submit"
          :disabled="isLoading || !prompt.trim()"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          &lt;span v-if="isLoading">Generating...&lt;/span>
          &lt;span v-else>Generate Animation&lt;/span>
        &lt;/button>
        &lt;button
          type="button"
          @click="prompt = ''"
          :disabled="isLoading || !prompt"
          class="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          Clear
        &lt;/button>
      &lt;/div>
    &lt;/form>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'generate', prompt: string): void
}>()

const prompt = ref('')

function handleSubmit() {
  if (prompt.value.trim()) {
    emit('generate', prompt.value.trim())
  }
}
&lt;/script>
