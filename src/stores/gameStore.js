import hangmanScaffold from "$lib/images/hangman_scaffold.png";
import hangmanHead from "$lib/images/hangman_head.png";
import hangmanBody from "$lib/images/hangman_body.png";
import hangmanFirstLeg from "$lib/images/hangman_first_leg.png";
import hangmanSecondLeg from "$lib/images/hangman_second_leg.png";
import hangmanFirstArm from "$lib/images/hangman_first_arm.png";
import hangmanSecondArm from "$lib/images/hangman_second_arm.png";
import { writable } from "svelte/store";

export const gameStore = writable({
  currentGame: false,
  gameOver: false,
  isLoading: false,
  wordToGuess: [],
  guessedWord: [],
  lettersGuessed: [],
  incorrectGuesses: 0,
  hangmanImage: hangmanScaffold,
});

export const gameHandlers = {
  startGame: (word) => {
    word = [...word];

    gameStore.update((curr) => {
      return {
        ...curr,
        currentGame: true,
        wordToGuess: word,
        guessedWord: word.map(() => "_"),
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

      if (guessedWord.every((l) => l !== "_")) {
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
              hangmanImage: hangmanHead,
            };
          });
          break;
        case 2:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanBody,
            };
          });
          break;
        case 3:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanFirstLeg,
            };
          });
          break;
        case 4:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanSecondLeg,
            };
          });
          break;
        case 5:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanFirstArm,
            };
          });
          break;
        case 6:
          gameStore.update((curr) => {
            return {
              ...curr,
              gameOver: true,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanSecondArm,
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
        wordToGuess: null,
        lettersGuessed: [],
        incorrectGuesses: 0,
        hangmanImage: hangmanScaffold,
      };
    });
  },
};
