'''
All important imports ***
'''
from flask import request
from google.auth.transport import requests
import google.oauth2.id_token
from server.ProjektAdministration import ProjektAdministration
'''
*** All important imports
'''

def secured(function):
	'''
	NOT THE FINAL SECURITY DECORATOR
	USAGE ONLY TO SHOWCASE FIREBASE AUTH VIA GOOGLE

	later the security decorator should be updated to grant access for diffrent user roles
	Dozent == 2
	admin == 1
	student == 0
	'''
	firebase_request_adapter = requests.Request()

	def wrapper(*args, **kwargs):
		'''
		Here firebase receives the token that the frontend has 'sendet'/saved in cookies
		'''
		id_token = request.cookies.get("token")
		error_message = None
		claims = None
		objects = None

		if id_token:
			try:
				# Verify the token against the Firebase Auth API. This example
				# verifies the token on each page load. For improved performance,
				# some applications may wish to cache results in an encrypted
				# session store (see for instance
				# http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
				claims = google.oauth2.id_token.verify_firebase_token(
					id_token, firebase_request_adapter
					)
				if claims is not None:
					adm = ProjektAdministration()

					google_user_id = claims.get("google_user_id")
					email = claims.get("email")
					name = claims.get("name")

					user = amd.get_user_by_google_id(google_user_id)
					if user is not None:
						''' 
						User is already in the system but some variation in the variables have occured.
						To prevent corrupt data or errors we update the data from the user.
						'''
						user.set_name(name)
						user.set_email(email)
						adm.save_user(user)
					else:
						'''
						System dont know the user -> user object is created and saved into the DB
						'''
						user = adm.create_user(name, email, google_user_id)
					print(request.method, request.path, 'asked by:', name, email)

					objects = function(*args, **kwargs)
					return objects
				else:
					return '', 401 # UNAUTHORIZED
			except ValueError as exc:
				'''
				If checks failed (token expired etc this exception will be raised)
				'''
				error_messag = str(exc)
				return exc, 401 # UNAUTHORIZED
		return '', 401 # UNAUTHORIZED
	return wrapper



