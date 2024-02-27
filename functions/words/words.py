from firebase_functions.params import SecretParam
from firebase_functions import https_fn
from wordnik import swagger, WordsApi, WordApi

WORDNIK_APIKEY = SecretParam("WORDNIK_APIKEY")


@https_fn.on_call(region="us-east1", secrets=[WORDNIK_APIKEY])
def get_random_word(req: https_fn.CallableRequest):
    # get api key from Cloud Secret Manager
    api_key = WORDNIK_APIKEY.value

    api_url = "https://api.wordnik.com/v4"

    # create apis
    client = swagger.ApiClient(api_key, api_url)

    words_api = WordsApi.WordsApi(client)
    word_api = WordApi.WordApi(client)

    # extract random word and definition
    random_word = words_api.getRandomWord(minLength=6).word
    word_definition = word_api.getDefinitions(random_word)

    # check if api failed
    if random_word is None or word_definition is None:
        # throw an HttpsError
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.NOT_FOUND,
            message=("Failed to retrieve word."),
        )

    return {"word": random_word, "definition": word_definition[0].text}


@https_fn.on_call(region="us-east1", secrets=[WORDNIK_APIKEY])
def get_word_of_the_day(req: https_fn.CallableRequest):
    # get api key from Cloud Secret Manager
    api_key = WORDNIK_APIKEY.value

    api_url = "https://api.wordnik.com/v4"

    # create apis
    client = swagger.ApiClient(api_key, api_url)

    words_api = WordsApi.WordsApi(client)
    word_api = WordApi.WordApi(client)

    # extract word of the day and definition
    word_of_the_day = words_api.getWordOfTheDay().word
    word_definition = word_api.getDefinitions(word_of_the_day)

    # check if api failed
    if word_of_the_day is None or word_definition is None:
        # throw an HttpsError
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.NOT_FOUND,
            message=("Failed to retrieve word."),
        )

    return {"word": word_of_the_day, "definition": word_definition[0].text}
