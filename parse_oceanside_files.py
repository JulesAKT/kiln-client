import json
import csv
import re

oceanside_colors = {}


def DescribeGlass(code, color_name):
    return color_name


with open("./oceanside_catalogue.csv", newline="") as inventory_file:
    csvreader = csv.reader(inventory_file, quoting=csv.QUOTE_ALL)
    oceanside_inventory = {}
    other_glass_inventory_entries = {}
    name_lookup = {}
    last_style = ""

    for row in csvreader:
        code = row[0].encode("ASCII", "ignore").decode()
        # print("Parsing: " + code)
        #        print("Line 0-2: " + line[0:2])
        if code[0] == "!":
            # print("Section Header: " + code)
            last_style = code[1:]
        else:
            # print("Outputting for: " + code)
            description = (
                row[1].encode("ASCII", "ignore").decode().strip("..").rstrip(" ")
            )
            oceanside_inventory[code] = {
                "description": description,
                "type": last_style,
            }
            shortname = description.split(" Fusible")[0]
            # print("Adding shortname:" + shortname)
            name_lookup[shortname] = code
            # Also put the whole word in, as Oceanside don't really do consistency
            name_lookup[description] = code

            if last_style == "NOODLES":
                other_glass_inventory_entries[code] = description.replace(
                    "Noodles ", ""
                )
            elif last_style == "STRINGERS":
                other_glass_inventory_entries[code] = description.replace(
                    "Stringers ", ""
                )
            elif last_style == "6MM RODS":
                other_glass_inventory_entries[code] = description.replace(
                    "Rods ", ""
                ).replace(" 6MM", "")


frit_grade_names = {
    "F1": "Powder",
    "F2": "Fine",
    "F3": "Medium",
    "F5": "Coarse",
    "F7": "Mosaic",
}

frit_inventory_entries = {}
with open("./oceanside_frit_catalogue.csv", newline="") as inventory_file:
    csvreader = csv.reader(inventory_file, quoting=csv.QUOTE_ALL)
    for row in csvreader:
        root_code = row[0].encode("ASCII", "ignore").decode()
        # First... if there's no root SKU, then we can skip this line.
        if root_code == "":
            continue

        print("Parsing: " + row[0])
        description_root = row[1].encode("ASCII", "ignore").decode()
        for grade_code in row[4:8]:
            if grade_code == "N/A":
                continue
            grade = grade_code.split("-")[0]
            oceanside_inventory[grade + "-" + root_code] = {
                "type": "FRIT",
                "description": frit_grade_names[grade] + " - " + description_root,
            }
            frit_inventory_entries[grade + "-" + root_code] = description_root

        #        print("Line 0-2: " + line[0:2])


with open("./oceanside_reactions_chart_for_parsing.txt") as reactions_file:
    reactions_lines = reactions_file.readlines()
    reaction_types = {}
    reaction_type = ""
    for line in reactions_lines:
        if line[0] == "!":
            reaction_type = line[1:].strip()

        else:
            (code, name) = line.strip().split(" ", 1)
            name = (
                name.encode("ASCII", "ignore")
                .decode()
                .replace("High", "")
                .replace("Medium", "")
                .replace("Low", "")
                .rstrip(" ")
            )
            reaction_types[code] = {"reaction_type": reaction_type, "name": name}

# Next... bodge in all the frit codes based on their name.

# frit_inventory_entries = {k:v for (k:v) in oceanside_inventory.items() if v[type] == "FRIT"}

for code in frit_inventory_entries:
    # print(frit_inventory_entries[code])

    root_glass = name_lookup.get(frit_inventory_entries[code])
    if root_glass:
        if reaction_types.get(root_glass):
            reaction_types[code] = reaction_types[root_glass]
            print(
                "Frit: "
                + code
                + " is based on "
                + root_glass
                + " and has reaction_type:"
            )
            print(reaction_types[root_glass])

# Similar Job.... but bodge in 'other' things.

for code in other_glass_inventory_entries:
    # print(frit_inventory_entries[code])

    root_glass = name_lookup.get(other_glass_inventory_entries[code])
    if root_glass:
        if reaction_types.get(root_glass):
            reaction_types[code] = reaction_types[root_glass]
            print(
                "Other: "
                + code
                + " is based on "
                + root_glass
                + " and has reaction_type:"
            )
            print(reaction_types[root_glass])


f = open("oceanside_inventory_data.json", "w")
f.write(json.dumps(oceanside_inventory, indent=2))
f.close()
f = open("oceanside_reaction_data.json", "w")
f.write(json.dumps(reaction_types, indent=2))
f.close()
