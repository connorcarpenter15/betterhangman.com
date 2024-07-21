from firebase_admin import firestore, auth
from firebase_functions import https_fn


@https_fn.on_call(region="us-east1")
def create_user(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Creates a user in
    Firebase Auth and stores user data in Firestore.

    Args:
        req: The request object."""
    user_data = req.data

    username = user_data.get("username")
    email = user_data.get("email")
    password = user_data.get("password")

    try:
        # create user in Firebase Authentication
        user = auth.create_user(email=email, password=password, display_name=username)

        # initialize Firestore client
        db = firestore.client()

        # store additional user data in Firestore
        users_ref = db.collection("users")
        users_ref.document(user.uid).set(
            {
                "username": username,
                "email": email,
                "gamesPlayed": 0,
                "wins": 0,
                "losses": 0,
                "dailyStreak": 0,
            }
        )

        return {"success": True, "message": "User created successfully"}

    except Exception as e:
        return {"success": False, "error": str(e)}


@https_fn.on_call(region="us-east1")
def check_username_availability(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Checks if a username is
    available.

    Args:
        req: The request object.

    Returns:
        True: The username is available.
        False: The username is not available.
    """

    username = req.data.get("username")

    db = firestore.client()
    docs = db.collection("users").where("username", "==", username).stream()

    if len(list(docs)) == 0:
        return True
    else:
        return False


@https_fn.on_call(region="us-east1")
def update_user_data(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Updates user data in
    Firestore.

    Args:
        req: The request object.
    """

    user_data = req.data
    uid = user_data.get("user")
    result = user_data.get("result")
    daily_puzzle = user_data.get("dailyPuzzle")

    db = firestore.client()

    users_ref = db.collection("users")

    if result and daily_puzzle:
        users_ref.document(uid).update(
            {
                "gamesPlayed": firestore.Increment(1),
                "wins": firestore.Increment(1),
                "dailyStreak": firestore.Increment(1),
            }
        )
    elif result and not daily_puzzle:
        users_ref.document(uid).update(
            {
                "gamesPlayed": firestore.Increment(1),
                "wins": firestore.Increment(1),
            }
        )
    elif not result and daily_puzzle:
        users_ref.document(uid).update(
            {
                "gamesPlayed": firestore.Increment(1),
                "losses": firestore.Increment(1),
                "dailyStreak": 0,
            }
        )
    else:
        users_ref.document(uid).update(
            {
                "gamesPlayed": firestore.Increment(1),
                "losses": firestore.Increment(1),
            }
        )


@https_fn.on_call(region="us-east1")
def get_user_data(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Returns user data from
    Firestore.

    Args:
        req: The request object.
    """

    user_id = req.data.get("user")

    db = firestore.client()

    users_ref = db.collection("users")
    user_data = users_ref.document(user_id).get().to_dict()

    return user_data
