<script setup lang="ts">
import { ref } from "vue";
import { getRandomQuote, type QuoteData } from "./lib/quotes";
import Quote from "./components/Quote.vue";

const quote = ref<QuoteData>(getRandomQuote());

const nextQuote = () => {
  if (
    confirm(
      "Are you sure you want to replace the current quote with a new one?"
    )
  ) {
    quote.value = getRandomQuote();
  }
};
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold text-center mt-16 mb-8 font-mono">
      {{ "Decrypt the quote" }}
    </h1>
    <Quote :key="quote.id" :quote="quote" :nextQuote="nextQuote" />
  </main>
</template>
