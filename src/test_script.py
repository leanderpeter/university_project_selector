
from server.Projekt_Administration import Projekt_Administration
import argparse




parser = argparse.ArgumentParser(description='testing DB operations')
parser.add_argument('--name', type=str, default="leander")
parser.add_argument('--email', type=str, default="leander.peter@icloud.com")
parser.add_argument('--user_id', type=str, default="8ZgFztpdoyZd0rhpKkVkXEa3zdg1")

args = parser.parse_args()


try:

	pm = Projekt_Administration()
	pm.create_user(args.name, args.email, args.user_id)
	print("User created succesfully")

except:

	print("Some error occured")



