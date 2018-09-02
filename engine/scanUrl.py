import requests
import sys

apikey = sys.argv[1]
url = sys.argv[2]
params = {'apikey': apikey, 'url': url}
response = requests.post(
    'https://www.virustotal.com/vtapi/v2/url/scan', data=params)
json_response = response.json()
newUrl = url + "_scans.txt"
f = open(newUrl, "w+")
f.write(str(json_response))
f.close()
print(json_response)
sys.stdout.flush()
