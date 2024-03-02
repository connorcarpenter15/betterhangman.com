from firebase_admin import firestore, auth
from firebase_functions import https_fn


@https_fn.on_call(region="us-east1")
def create_user(req: https_fn.CallableRequest):
    """
    Triggered on HTTPS request from the frontend. Creates a user in
    Firebase Auth and stores user data in Firestore. Args: req: The request
    object.
    """

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
            }
        )

        return {"success": True, "message": "User created successfully"}

    except Exception as e:
        return {"success": False, "error": str(e)}
