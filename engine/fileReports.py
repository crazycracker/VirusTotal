import sys
import requests

apiKey = sys.argv[1]
resource = sys.argv[2]
params = {'apikey': apiKey,
          'resource': resource}
headers = {
    "Accept-Encoding": "gzip, deflate",
    "User-Agent": "gzip,  My Python requests library example client or username"
}
response = requests.get('https://www.virustotal.com/vtapi/v2/file/report',
                        params=params, headers=headers)
json_response = response.json()
newfile = resource + "_file_report.txt"
f = open(newfile, "w+")
f.write(str(json_response))
f.close()
print(json_response)
sys.stdout.flush()
