<script setup lang="ts">
import { type QuoteData } from "@/lib/quotes";
import { computed, onMounted, ref, useTemplateRef, reactive, watch } from "vue";
import QuoteLetter from "@/components/QuoteLetter.vue";
import {
  englishLetters,
  newUserSubstitutions,
  substituteChars,
} from "@/lib/substitutions";
import { clamp } from "@/lib/utils.ts";
import QuoteUsedLetters from "@/components/QuoteUsedLetters.vue";

const props = defineProps<{
  quote: QuoteData;
  nextQuote: () => void;
}>();

const uniqueQuoteChars = computed(() => {
  return new Set(props.quote.text.toLowerCase());
});

const quoteParsed = computed<string[][]>(() => {
  return props.quote.text.split(" ").map((word) => word.split(""));
});

const selectedLetter = ref<string | null>(null);

const selectLetter = (letter: string | null) => {
  selectedLetter.value = letter;
};

const lettersRefs = useTemplateRef("letters");
const letterMap = new Map<string, number>();

const keyToIndexes = (key: string): [number, number] => {
  const [wordIndex, letterIndex] = key.split("-");
  return [parseInt(wordIndex ?? "0") ?? 0, parseInt(letterIndex ?? "0") ?? 0];
};

const moveCursor = (key: string, deltaWord: number, deltaLetter: number) => {
  const [wordIndex, letterIndex] = keyToIndexes(key);

  if (deltaWord !== 0) {
    if (letterIndex !== 0 && deltaWord < 0) {
      deltaWord = 0;
    }
    const newIndex = letterMap.get(`${wordIndex + deltaWord}-0`);
    if (newIndex !== undefined) {
      lettersRefs.value?.[newIndex]?.focus();
    } else if (deltaWord > 0) {
      lettersRefs.value?.[(lettersRefs.value?.length ?? 1) - 1]?.focus();
    }
  } else if (deltaLetter !== 0) {
    const newIndex = (letterMap.get(key) ?? 0) + deltaLetter;

    lettersRefs.value?.[
      clamp(newIndex, 0, (lettersRefs.value?.length ?? 1) - 1)
    ]?.focus();
  }
};

const setCursor = (index: number) => {
  if (index >= 0 && index < (lettersRefs.value?.length ?? 0)) {
    lettersRefs.value?.[index]?.focus();
  } else if (index < 0) {
    lettersRefs.value?.[(lettersRefs.value?.length ?? 1) - 1]?.focus();
  }
};

onMounted(() => {
  let i = 0;
  for (const letterRef of lettersRefs.value ?? []) {
    letterMap.set(letterRef?.index ?? "", i++);
  }
});

const { substitutedChars, inverseSubstitutedChars } = substituteChars();
const userSubstitutions = reactive(newUserSubstitutions());
const isSolved = ref(false);

watch(
  () => userSubstitutions.substitutionMap,
  () => {
    // Пересчитываем solved при изменениях
    checkSolved();
  },
  { deep: true }
);

const checkSolved = (): boolean => {
  for (const [substitutedChar, originalChar] of inverseSubstitutedChars) {
    if (uniqueQuoteChars.value.has(originalChar)) {
      if (
        userSubstitutions.substitutionMap.get(substitutedChar) !== originalChar
      ) {
        return (isSolved.value = false);
      }
    }
  }

  return (isSolved.value = true);
};
</script>

<template>
  <div class="container mx-auto px-16">
    <div class="flex gap-2 flex-wrap">
      <div
        v-for="(word, wordIndex) in quoteParsed"
        :key="wordIndex"
        class="flex"
      >
        <div
          v-for="(letter, letterIndex) in word"
          :key="letterIndex"
          class="*:w-4 text-xl"
        >
          <QuoteLetter
            v-if="englishLetters.includes(letter.toLowerCase())"
            ref="letters"
            :index="`${wordIndex}-${letterIndex}`"
            :letter="letter"
            :selectedLetter="selectedLetter"
            :selectLetter="selectLetter"
            :moveCursor="moveCursor"
            :setCursor="setCursor"
            :substitutedChars="substitutedChars"
            :userSubstitutions="userSubstitutions"
            :isSolved="isSolved"
          />
          <div
            v-else
            class="flex flex-col justify-end font-mono text-center h-full"
          >
            <span>{{ letter }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center mt-4">
      <button
        class="bg-cyan-500 text-lg text-white px-3 py-1.5 rounded-md hover:bg-cyan-600 hover:cursor-pointer"
        @click="props.nextQuote"
      >
        Next Quote
      </button>
      <p class="italic text-right text-lg">{{ quote.author }}</p>
    </div>
  </div>
  <div class="container mx-auto px-16 mt-16">
    <h2 class="text-xl font-bold mb-4">Used letters:</h2>
    <div class="w-96">
      <QuoteUsedLetters
        :usedLetters="
          [...userSubstitutions.substitutionMap.values()].filter(
            (v) => typeof v === 'string'
          )
        "
        :alphabet="englishLetters"
      />
    </div>
  </div>
</template>
