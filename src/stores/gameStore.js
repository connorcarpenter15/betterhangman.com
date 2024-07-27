import hangmanImagesNeutral from "$lib/images/hangman_neutral/hangmanImagesNeutral.js";
import { writable } from "svelte/store";
import { getRandomWord, auth, db } from "$lib/firebase/firebase.client.js";
import { doc, getDoc } from "firebase/firestore";

export const gameStore = writable({
  currentGame: false,
  gameOver: false,
  isLoading: false,
  wordToGuess: [],
  wordDefinition: "",
  guessedWord: [],
  lettersGuessed: [],
  incorrectGuesses: 0,
  hangmanImage: hangmanImagesNeutral.face,
  dailyWord: false,
});

export const gameHandlers = {
  startGame: async (isDailyWord = false) => {
    let word;
    let definition;
    let wordResponse;
    let errorText;

    // set loading to true for word retrieval
    gameStore.update((curr) => {
      return {
        ...curr,
        isLoading: true,
        hangmanImage: hangmanImagesNeutral.scaffold,
        dailyWord: isDailyWord,
      };
    });

    try {
      // call appropriate function based on word of the day or random
      if (isDailyWord) {
        const wordPromise = await getDoc(doc(db, "words", "dailyWord"));
        wordResponse = wordPromise.data();
      } else {
        const wordPromise = getRandomWord();

        // Wait for both word retrieval and word mapping
        [wordResponse] = await Promise.all([wordPromise]);
        wordResponse = wordResponse.data;
      }

      // Extract word and definition from the response
      word = wordResponse.word.toLowerCase();
      definition = Array.isArray(wordResponse.definition)
        ? wordResponse.definition.join("; ")
        : wordResponse.definition;

      // map word to array
      word = [...word];

      // update game store
      gameStore.update((curr) => {
        return {
          ...curr,
          currentGame: true,
          wordToGuess: word,
          wordDefinition: definition,
          guessedWord: word.map((l) => (/[a-zA-Z]/.test(l) ? "" : l)),
        };
      });
    } catch (e) {
      // handle errors
      errorText = e;
    } finally {
      // set loading to false after word is retrieved
      gameStore.update((curr) => {
        return {
          ...curr,
          isLoading: false,
        };
      });
    }
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
        gameHandlers.endGame(true);
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
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.secondArm,
            };
          });
          break;
        case 7:
          gameStore.update((curr) => {
            return {
              ...curr,
              incorrectGuesses: incorrectGuesses,
              hangmanImage: hangmanImagesNeutral.face,
            };
          });

          gameHandlers.endGame(false);
          break;
        default:
      }
    }
  },

  endGame: (result = false) => {
    gameStore.update((curr) => {
      return {
        ...curr,
        gameOver: true,
      };
    });

    let dailyPuzzle;

    gameStore.subscribe((game) => {
      dailyPuzzle = game.dailyWord;
    });

    // updateUserData({
    //   user: auth.currentUser.uid,
    //   result: result,
    //   dailyPuzzle: dailyPuzzle,
    // });
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
        dailyWord: false,
      };
    });
  },
};
