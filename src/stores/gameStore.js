import hangmanImagesNeutral from "$lib/images/objects/hangmanImagesNeutral.js";
import { writable } from "svelte/store";

export const gameStore = writable({
  currentGame: false,
  gameOver: false,
  isLoading: false,
  wordToGuess: [],
  wordDefinition: "",
  guessedWord: [],
  lettersGuessed: [],
  incorrectGuesses: 0,
  hangmanImage: hangmanImagesNeutral.scaffold,
});

export const gameHandlers = {
  startGame: (word, definition) => {
    word = [...word];

    gameStore.update((curr) => {
      return {
        ...curr,
        currentGame: true,
        wordToGuess: word,
        wordDefinition: definition,
        guessedWord: word.map((l) => (/[a-zA-Z]/.test(l) ? "" : l)),
      };
    });
  },

  guessLetter: (letter) => {
    let wordToGuess;
    let guessedWord;
    let lettersGuessed;
    let incorrectGuesses;

    gameStore.subscribe((game) => {
      wordToGuess = game.wordToGuess;
      guessedWord = game.guessedWord;
      lettersGuessed = game.lettersGuessed;
      incorrectGuesses = game.incorrectGuesses;
    });

    gameStore.update((curr) => {
      return {
        ...curr,
        lettersGuessed: lettersGuessed.includes(letter)
          ? lettersGuessed
          : lettersGuessed.concat(letter),
      };
    });

    if (wordToGuess.includes(letter)) {
      for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
          guessedWord[i] = letter;
        }
      }

      gameStore.update((curr) => {
        return {
          ...curr,
          guessedWord: guessedWord,
        };
      });

      if (guessedWord.every((l) => l)) {
        gameStore.update((curr) => {
          return {
            ...curr,
            gameOver: true,
          };
        });
      }
    } else {
      incorrectGuesses = incorrectGuesses + 1;

      switch (incorrectGuesses) {
        case 1:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.head,
            };
          });
          break;
        case 2:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.body,
            };
          });
          break;
        case 3:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.firstLeg,
            };
          });
          break;
        case 4:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.secondLeg,
            };
          });
          break;
        case 5:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.firstArm,
            };
          });
          break;
        case 6:
          gameStore.update((curr) => {
            return {
              ...curr,
              gameOver: true,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.secondArm,
            };
          });
          break;
        default:
      }
    }
  },

  resetGame: () => {
    gameStore.update((curr) => {
      return {
        ...curr,
        currentGame: false,
        gameOver: false,
        isLoading: false,
        wordToGuess: [],
        wordDefinition: "",
        guessedWord: [],
        lettersGuessed: [],
        incorrectGuesses: 0,
        hangmanImage: hangmanImagesNeutral.scaffold,
      };
    });
  },
};
