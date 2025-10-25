import { shuffleArray } from "@/lib/arrays";

export const englishLetters = "abcdefghijklmnopqrstuvwxyz";

export function substituteChars(chars: string = englishLetters): {
  substitutedChars: Map<string, string>;
  inverseSubstitutedChars: Map<string, string>;
} {
  let substitutedChars: Map<string, string> = new Map();
  let inverseSubstitutedChars: Map<string, string> = new Map();
  let i = 0;
  for (let char of shuffleArray(chars.split(""))) {
    const substitutedChar = englishLetters[i++]!;
    substitutedChars.set(char, substitutedChar);
    inverseSubstitutedChars.set(substitutedChar, char);
  }
  return {
    substitutedChars,
    inverseSubstitutedChars,
  };
}

export type UserSubstitutions = {
  substitutionMap: Map<string, string | null>;
  inverseSubstitutionMap: Map<string, string[]>;
};

export function newUserSubstitutions(
  chars: string = englishLetters
): UserSubstitutions {
  let substitutionMap: Map<string, string | null> = new Map();
  let inverseSubstitutionMap: Map<string, string[]> = new Map();
  for (let char of chars.split("")) {
    substitutionMap.set(char, null);
    inverseSubstitutionMap.set(char, []);
  }
  return {
    substitutionMap,
    inverseSubstitutionMap,
  };
}

export function setUserSubstitutionChar(
  userSubstitutions: UserSubstitutions,
  char: string,
  substitutedChar: string
): UserSubstitutions {
  userSubstitutions.substitutionMap.set(char, substitutedChar);
  userSubstitutions.inverseSubstitutionMap.set(substitutedChar, [
    char,
    ...(
      userSubstitutions.inverseSubstitutionMap.get(substitutedChar) ?? []
    ).filter((c) => c !== char),
  ]);
  // console.log(userSubstitutions);
  return userSubstitutions;
}

export function removeUserSubstitutionChar(
  userSubstitutions: UserSubstitutions,
  char: string,
  substitutedChar: string
): UserSubstitutions {
  if (userSubstitutions.substitutionMap.get(char) === substitutedChar) {
    userSubstitutions.substitutionMap.set(char, null);
  }
  userSubstitutions.inverseSubstitutionMap.set(substitutedChar, [
    ...(
      userSubstitutions.inverseSubstitutionMap.get(substitutedChar) ?? []
    ).filter((c) => c !== char),
  ]);
  // console.log(userSubstitutions);
  return userSubstitutions;
}

export function getSubstitutedChar(
  char: string,
  substitutionMap: Map<string, string | null>,
  fallback: string = char
): string {
  return char === char.toLowerCase()
    ? substitutionMap.get(char) ?? fallback
    : substitutionMap.get(char.toLowerCase())?.toUpperCase() ??
        fallback.toUpperCase();
}
