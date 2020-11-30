
from server.ProjektAdministration import ProjektAdministration
import argparse




parser = argparse.ArgumentParser(description='testing DB operations')
parser.add_argument('--name', type=str, default="leander")
parser.add_argument('--email', type=str, default="leander.peter@icloud.com")
parser.add_argument('--user_id', type=str, default="8ZgFztpdoyZd0rhpKkVkXEa3zdg1")

args = parser.parse_args()


try:

	pm = ProjektAdministration()
	pm.get_all_projects()
	print(pm)

except:

	print("Some error occured")



