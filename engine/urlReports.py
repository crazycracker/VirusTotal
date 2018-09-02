import requests
import sys

apikey = sys.argv[1]
url = sys.argv[2]
headers = {
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "gzip,  My Python requests library example client or username"
}
params = {'apikey': apikey, 'resource': url}
response = requests.post('https://www.virustotal.com/vtapi/v2/url/report',
                         params=params, headers=headers)
json_response = response.json()
newfile = url + "_report.txt"
f = open(newfile, "w+")
f.write(str(json_response))
f.close()
print(json_response)
sys.stdout.flush()
