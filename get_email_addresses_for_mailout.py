#!/usr/bin/python

import json

# Grab the file with: firebase auth:export f:\temp\kilnhelper_users_may23.json --format=json
with open("f:/temp/kilnhelper_users_may23.json", encoding="UTF-8") as json_file:
    users_array = json.load(json_file)['users']
    users = {x['localId']:x for x in users_array}

# Grab userdata key from the firebase console.


with open('f:/temp/kilnhelper_userdata_may23.json', encoding="UTF-8") as json_file:
    userdata = json.load(json_file)

for user in userdata:
    try:
        if(userdata[user]['preferences']['do_not_mail'] == True):
            #print("Skipping -",user)
            continue
    except KeyError:
        pass
    try:
        print(users[user]['email'])
    except KeyError:
        #print("SKIPPING - not found in user DB: ",user)
        pass
