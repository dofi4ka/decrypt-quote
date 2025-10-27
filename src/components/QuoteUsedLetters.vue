<script setup lang="ts">
const props = defineProps<{
  usedLetters: string[];
  alphabet: string;
}>();
</script>

<template>
  <div class="flex justify-start gap-2 flex-wrap">
    <span
      v-for="letter in [...alphabet]"
      :key="letter"
      :class="{
        'text-gray-400': usedLetters.includes(letter.toLowerCase()),
        'bg-gray-100': !usedLetters.includes(letter.toLowerCase()),
      }"
      class="text-xl font-mono rounded-sm px-2 py-1"
    >
      {{ letter }}
    </span>
  </div>
</template>
