<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  fullWidth: false,
})

const buttonClass = computed(() => {
  const classes = ['btn', `btn--${props.variant}`, `btn--${props.size}`]

  if (props.fullWidth) {
    classes.push('btn--full-width')
  }

  if (props.class) {
    classes.push(props.class)
  }

  return classes.join(' ')
})

const variantStyles: Record<Variant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-900 border border-gray-300',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

const computedStyle = computed(() => {
  const styles = [
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    variantStyles[props.variant],
    sizeStyles[props.size],
    props.fullWidth ? 'w-full' : '',
  ]
  return styles.filter(Boolean).join(' ')
})
</script>

<template>
  <button :class="[buttonClass, computedStyle]">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  outline: none;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
}

.btn--primary {
  background-color: #2563eb;
  color: white;

  &:hover:not(:disabled) {
    background-color: #1d4ed8;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  }

  &:active:not(:disabled) {
    background-color: #1e40af;
  }
}

.btn--secondary {
  background-color: #e5e7eb;
  color: #111827;

  &:hover:not(:disabled) {
    background-color: #d1d5db;
  }

  &:active:not(:disabled) {
    background-color: #9ca3af;
  }
}

.btn--danger {
  background-color: #dc2626;
  color: white;

  &:hover:not(:disabled) {
    background-color: #b91c1c;
    box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
  }

  &:active:not(:disabled) {
    background-color: #991b1b;
  }
}

.btn--ghost {
  background-color: transparent;
  color: #111827;
  border: 1px solid #d1d5db;

  &:hover:not(:disabled) {
    background-color: #f3f4f6;
    border-color: #9ca3af;
  }

  &:active:not(:disabled) {
    background-color: #e5e7eb;
  }
}

.btn--sm {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn--lg {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

.btn--full-width {
  width: 100%;
}
</style>
