<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import {
  getSubstitutedChar,
  type UserSubstitutions,
  setUserSubstitutionChar,
  removeUserSubstitutionChar,
  englishLetters,
} from "@/lib/substitutions";

const props = defineProps<{
  index: string;
  letter: string;
  selectedLetter: string | null;
  selectLetter: (letter: string | null) => void;
  moveCursor: (index: string, deltaWord: number, deltaLetter: number) => void;
  setCursor: (index: number) => void;
  substitutedChars: Map<string, string>;
  userSubstitutions: UserSubstitutions;
  isSolved: boolean;
}>();

const isSelected = () => props.selectedLetter === props.letter.toLowerCase();

const handleFocus = () => {
  props.selectLetter(props.letter.toLowerCase());
};

const inputValue = () => {
  return getSubstitutedChar(
    getSubstitutedChar(props.letter, props.substitutedChars),
    props.userSubstitutions.substitutionMap,
    ""
  );
};

const handleKeyDown = (event: KeyboardEvent) => {
  event.preventDefault();
  if (event.key === "ArrowRight" && !event.ctrlKey) {
    props.moveCursor(props.index, 0, 1);
  } else if (event.key === "ArrowLeft" && !event.ctrlKey) {
    props.moveCursor(props.index, 0, -1);
  } else if (event.key === "ArrowRight" && event.ctrlKey) {
    props.moveCursor(props.index, 1, 0);
  } else if (event.key === "ArrowLeft" && event.ctrlKey) {
    props.moveCursor(props.index, -1, 0);
  } else if (event.key === "Home" || event.key === "ArrowUp") {
    props.setCursor(0);
  } else if (event.key === "End" || event.key === "ArrowDown") {
    props.setCursor(-1);
  } else if (englishLetters.includes(event.key.toLowerCase())) {
    if (inputValue() !== "") {
      removeUserSubstitutionChar(
        props.userSubstitutions,
        getSubstitutedChar(
          props.letter.toLowerCase(),
          props.substitutedChars
        ).toLowerCase(),
        inputValue().toLowerCase()
      );
    }
    setUserSubstitutionChar(
      props.userSubstitutions,
      getSubstitutedChar(
        props.letter.toLowerCase(),
        props.substitutedChars
      ).toLowerCase(),
      event.key.toLowerCase()
    );
    props.moveCursor(props.index, 0, 1);
  } else if (event.key === "Backspace") {
    removeUserSubstitutionChar(
      props.userSubstitutions,
      getSubstitutedChar(
        props.letter.toLowerCase(),
        props.substitutedChars
      ).toLowerCase(),
      inputValue().toLowerCase()
    );
    props.moveCursor(props.index, 0, -1);
  } else if (event.key === "Delete") {
    removeUserSubstitutionChar(
      props.userSubstitutions,
      getSubstitutedChar(
        props.letter.toLowerCase(),
        props.substitutedChars
      ).toLowerCase(),
      inputValue().toLowerCase()
    );
    props.moveCursor(props.index, 0, 1);
  }
};

const handleBlur = () => {
  props.selectLetter(null);
};

const inputRef = useTemplateRef("input");
const focus = () => {
  if (!inputRef.value) {
    return;
  }
  inputRef.value.focus();
};

defineExpose({
  focus,
  index: props.index,
});

const dublicate = computed(
  () =>
    (props.userSubstitutions.inverseSubstitutionMap.get(
      inputValue().toLowerCase()
    )?.length ?? 0) > 1
);
</script>

<template>
  <div class="flex flex-col font-mono text-center">
    <!-- <span>{{ letter }}</span> -->
    <span class="text-gray-500">{{
      getSubstitutedChar(letter, props.substitutedChars)
    }}</span>
    <input
      ref="input"
      type="text"
      class="text-center caret-transparent border-b-2 focus:outline-none focus:border-purple-600 focus:bg-purple-300"
      :class="{
        'bg-cyan-200 border-cyan-500': isSelected(),
        'border-gray-300 bg-gray-100': !isSelected() && inputValue() === '',
        'border-gray-300': !isSelected() && inputValue() !== '',
        'bg-red-200 border-red-500': dublicate && !isSelected(),
        'bg-orange-200 border-orange-500': dublicate && isSelected(),
        'bg-green-200 border-green-500': isSolved,
      }"
      :value="inputValue()"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeyDown"
    />
  </div>
</template>
