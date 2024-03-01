from firebase_admin import firestore


def create_user_document(data, context):
    """
    Triggered by creation or deletion of a Firebase Auth user object.
    Args:
           data (dict): The event payload.
           context (google.cloud.functions.Context): Metadata for the event.
    """

    uid = data["uid"]
    username = data["displayName"]
    email = data["email"]

    db = firestore.client()
    users_ref = db.collection("users")

    users_ref.document(uid).set(
        {"username": username, "email": email, "gamesPlayed": 0, "wins": 0, "losses": 0}
    )
