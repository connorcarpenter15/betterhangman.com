from firebase_admin import firestore, initialize_app

app = initialize_app()

username = "testing"

db = firestore.client()
docs = db.collection("users").where("username", "==", username).stream()

lst = list(docs)

print(len(lst))
