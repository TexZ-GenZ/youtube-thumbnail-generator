&lt;template>
  &lt;div class="bg-white shadow rounded-lg p-6">
    &lt;h2 class="text-lg font-semibold mb-4">Preview</h2>
    &lt;div 
      class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden"
    >
      &lt;video
        v-if="animationUrl"
        :src="animationUrl"
        controls
        class="w-full h-full object-contain"
      >
        Your browser does not support the video tag.
      &lt;/video>
      &lt;div v-else class="text-gray-500 text-center p-4">
        Generate an animation to see the preview here
      &lt;/div>
    &lt;/div>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
defineProps<{
  animationUrl: string
}>()
&lt;/script>
