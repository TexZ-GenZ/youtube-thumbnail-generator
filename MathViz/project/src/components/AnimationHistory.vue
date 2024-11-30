&lt;template>
  &lt;div class="bg-white shadow rounded-lg p-6">
    &lt;h2 class="text-lg font-semibold mb-4">History</h2>
    &lt;div v-if="animations.length === 0" class="text-gray-500 text-center p-4">
      No animations generated yet
    &lt;/div>
    &lt;div v-else class="space-y-4">
      &lt;div
        v-for="(animation, index) in animations"
        :key="index"
        class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
        @click="$emit('select', animation)"
      >
        &lt;div class="text-sm text-gray-900">{{ animation.prompt }}&lt;/div>
        &lt;div class="text-xs text-gray-500 mt-1">
          {{ new Date(animation.timestamp).toLocaleString() }}
        &lt;/div>
      &lt;/div>
    &lt;/div>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
interface Animation {
  prompt: string
  url: string
  timestamp: string
}

defineProps<{
  animations: Animation[]
}>()

defineEmits<{
  (e: 'select', animation: Animation): void
}>()
