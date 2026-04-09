<template>
  <div class="tag" :class="{ 'tag--custom': hasCustomColor }" :style="style">
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

const hasCustomColor = computed(() => Boolean(props.color))

const style = computed(() => {
  if (!hasCustomColor.value) return {}
  return {
    '--tag-custom-bg': props.color,
    '--tag-custom-text': props.textColor || 'white'
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

:root[data-theme='dark'] .tag:not(.tag--custom) {
  background: color-mix(in oklch, var(--primary) 22%, var(--surface));
  color: var(--primary);
}

:root[data-theme='dark'] .tag--custom {
  background-color: var(--tag-custom-bg);
  color: var(--tag-custom-text);
}

:root[data-theme='light'] .tag:not(.tag--custom) {
  background: color-mix(in oklch, var(--primary) 10%, var(--surface));
  color: var(--primary);
}

:root[data-theme='light'] .tag--custom {
  background: #b8c6b3;
  color: color-mix(in oklch, var(--tag-custom-bg) 58%, black);
}
</style>
