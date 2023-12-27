#! /usr/bin/python

import json

with open('./all_data.json') as f:
    #string = f.read(2)  # Don't ask what crap is at the start
    #print(string)
    data = json.load(f)

for id in data['users']:
    email = data['users'][id]['email']
    #print(email)
    userdata = data['userdata'].get(id)

    if userdata:
        preferences = userdata.get('preferences')
        if preferences:
            if preferences.get('do_not_mail',False):
                #print("Blocked: ",email)
                continue
    print(email)