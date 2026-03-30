<template>
  <div class="tag" :style="style">
    {{ label }}
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  textColor: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  if (!props.color) return {}
  return {
    backgroundColor: props.color,
    color: props.textColor || 'white'
  }
})
</script>

<style scoped>
.tag {
  padding: 0.25rem;
  background-color: var(--primary);
  color: var(--surface);
  font-size: 0.75rem;
  transition: background-color 0.4s ease;
}
</style>
