from firebase_functions.params import SecretParam
from firebase_functions import https_fn, scheduler_fn
from firebase_admin import firestore
import requests

WORDNIK_APIKEY = SecretParam("WORDNIK_APIKEY")


@https_fn.on_call(region="us-east1", secrets=[WORDNIK_APIKEY])
def get_random_word(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Returns a random word.
    Args:
            req: The request object.
    """

    # get api key from Cloud Secret Manager
    api_key = WORDNIK_APIKEY.value

    random_word_url = "https://api.wordnik.com/v4/words.json/randomWord?minLength=6"
    definition_url = "https://api.wordnik.com/v4/word.json/{}/definitions"

    # use requests to access api
    random_word = requests.get(random_word_url, headers={"api_key": api_key}).json()[
        "word"
    ]
    word_definition = requests.get(
        definition_url.format(random_word), headers={"api_key": api_key}
    ).json()[0]["text"]

    # check if api failed
    if random_word is None or word_definition is None:
        # throw an HttpsError
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.NOT_FOUND,
            message=("Failed to retrieve word."),
        )

    # select first definition if there are multiple
    if isinstance(word_definition, list):
        word_definition = word_definition[0]

    return {"word": random_word, "definition": word_definition}


@scheduler_fn.on_schedule(
    schedule="every day 05:00",
    region="us-east1",
    secrets=[WORDNIK_APIKEY],
    timezone=scheduler_fn.Timezone("America/New_York"),
)
def set_word_of_the_day(event: scheduler_fn.ScheduledEvent):
    """
    Triggerd every day at 2:00 AM. Sets the word of the day in Firestore.
    Args:
            event: The event object.
    """

    # get api key from Cloud Secret Manager
    api_key = WORDNIK_APIKEY.value

    word_of_the_day_url = "https://api.wordnik.com/v4/words.json/wordOfTheDay"
    definition_url = "https://api.wordnik.com/v4/word.json/{}/definitions"

    # use requests to access api
    word_of_the_day = requests.get(
        word_of_the_day_url, headers={"api_key": api_key}
    ).json()["word"]
    word_definition = requests.get(
        definition_url.format(word_of_the_day), headers={"api_key": api_key}
    ).json()[0]["text"]

    # check if api failed
    if word_of_the_day is None or word_definition is None:
        # throw an HttpsError
        raise https_fn.HttpsError(
            code=https_fn.FunctionsErrorCode.NOT_FOUND,
            message=("Failed to retrieve word."),
        )

    # select first definition if there are multiple
    if isinstance(word_definition, list):
        word_definition = word_definition[0]

    db = firestore.client()

    doc_ref = db.collection("words").document("word_of_the_day")
    doc_ref.set({"word": word_of_the_day, "definition": word_definition})


@https_fn.on_call(region="us-east1")
def get_word_of_the_day(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Returns the word of the day.
    Args:
            req: The request object.
    """

    db = firestore.client()
    doc = db.collection("words").document("word_of_the_day").get().to_dict()

    return doc
