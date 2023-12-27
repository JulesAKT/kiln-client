Notes for generating an email list:

Export the Entire Database:

firebase database:get / --pretty >all_data.json

Stupid - in VSCode - change the encoding scheme - open it, and click on the UTF16-LE' thing at the bottom. Save it as 'Windows 1252'.

Run a script to grab all email addresses that aren't marked to not mail.


py generate_email_list.py

