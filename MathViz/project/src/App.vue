&lt;template>
  &lt;div class="min-h-screen bg-gray-100">
    &lt;header class="bg-white shadow">
      &lt;div class="max-w-7xl mx-auto py-6 px-4">
        &lt;h1 class="text-3xl font-bold text-gray-900">MathViz</h1>
      &lt;/div>
    &lt;/header>

    &lt;main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      &lt;div class="px-4 py-6 sm:px-0">
        &lt;div class="flex flex-col md:flex-row gap-6">
          &lt;div class="w-full md:w-1/2">
            &lt;AnimationInput @generate="generateAnimation" :isLoading="isLoading" />
          &lt;/div>
          &lt;div class="w-full md:w-1/2">
            &lt;PreviewWindow :animationUrl="currentAnimation" />
          &lt;/div>
        &lt;/div>
        &lt;AnimationHistory 
          :animations="animationHistory" 
          @select="selectAnimation"
          class="mt-8" 
        />
      &lt;/div>
    &lt;/main>
  &lt;/div>
&lt;/template>

&lt;script setup lang="ts">
import { ref } from 'vue'
import AnimationInput from './components/AnimationInput.vue'
import PreviewWindow from './components/PreviewWindow.vue'
import AnimationHistory from './components/AnimationHistory.vue'

const isLoading = ref(false)
const currentAnimation = ref('')
const animationHistory = ref([])

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

async function generateAnimation(prompt: string) {
  try {
    isLoading.value = true
    const response = await fetch(`${API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    })
    
    if (!response.ok) {
      throw new Error('Animation generation failed')
    }
    
    const data = await response.json()
    currentAnimation.value = `${API_URL}${data.animation_url}`
    animationHistory.value = [
      { prompt, url: currentAnimation.value, timestamp: new Date().toISOString() },
      ...animationHistory.value
    ]
  } catch (error) {
    console.error('Error generating animation:', error)
    alert('Failed to generate animation. Please try again.')
  } finally {
    isLoading.value = false
  }
}

function selectAnimation(animation: any) {
  currentAnimation.value = animation.url
}
&lt;/script>
