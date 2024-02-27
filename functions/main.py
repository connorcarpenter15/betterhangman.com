from firebase_admin import initialize_app

# import other functions
from words.words import *
from user.on_user_created import *

# initialize firebase app
app = initialize_app()
