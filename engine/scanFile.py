import sys
import requests
import os

apiKey = sys.argv[1]
filename = sys.argv[2]
params = {
    'apikey': apiKey}
files = {'file': (filename, open(filename, 'rb'))}
response = requests.post(
    'https://www.virustotal.com/vtapi/v2/file/scan', files=files, params=params)
json_response = response.json()
newfile = filename + "_scans.txt"
f = open(newfile, "w+")
f.write(str(json_response))
f.close()
print(json_response)
sys.stdout.flush()
