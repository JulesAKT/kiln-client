import json

bullseye_colors = {}
bullseye_prices = {}


def GetBullsEyeColor(code):
    print("GetBullsEyeColor: " + code)
    # Other than codes that mean multicolored, Lustre Rods are also multicolored. Find them by part number.
    if (
        code[:3] == "002"
        or code[:3] == "003"
        or code[:3] == "006"
        or code[:3] == "004"
        or code[:3] == "008"
        or code == "001701"
        or code == "001707"
        or code == "001714"
        or code == "001717"
    ):
        return {
            "rgb": {"r": 255, "g": 255, "b": 255},
            "cmyk": {"c": 0, "m": 0, "y": 0, "k": 0},
            "multicolored": True,
        }
    else:
        color = bullseye_colors[code]
        color["multicolored"] = False
        return color


def ConvertToRGB(code):
    values = code.split("-")
    return {"r": values[0], "g": values[1], "b": values[2]}


def ConvertToCMYK(code):
    values = code.split("-")
    return {"c": values[0], "m": values[1], "y": values[2], "k": values[3]}


def DescribeGlass(code, color_name):
    return color_name


def GlassType(code):
    style_lookup = {
        "000": "Opal",
        "001": "Transparent",
        "002": "2-Color Streaky",
        "003": "3-Color Streaky",
        "004": "Collage",
        "006": "Ring mottle",
        "008": "Mixed",
    }
    type_lookup = {
        "0000": "Sheet Single-rolled 3mm",  #
        "0021": "Sheet Soft Ripple",
        "0022": "Sheet Herringbone Ripple",
        "0024": "Sheet Soft Ripple Iridized",
        "0027": "Seedy",
        "0025": "Sheet Herringbone Ripple Iridized",
        "0030": "Sheet Double-rolled 3mm",
        "0031": "Sheet Double-rolled 3mm Rainbow Iridized",
        "0032": "Sheet Double-rolled 3mm Patterned Iridized",
        "0037": "Sheet Double-rolled 3mm Silver Iridized",
        "0038": "Sheet Double-rolled 3mm Gold Iridized",
        "0043": "Sheet Reed 3mm",
        "0044": "Sheet Reed 3mm Iridized",
        "0045": "Sheet Accordion 3mm",
        "0046": "Sheet Accordion 3mm Iridized",
        "0047": "Sheet Prismatic 3mm Iridized",
        "0048": "Sheet Prismatic 3mm Iridized",
        "0050": "Sheet Thin rolled 2mm",
        "0051": "Sheet Thin rolled 2mm Rainbow Iridized",
        "0053": "Sheet Thin Reed 2mm",
        "0054": "Sheet Thin Reed 2mm Iridized",
        "0055": "Sheet Thin Accordion 2mm",
        "0056": "Sheet Thin Accordion 2mm Iridized",
        "0057": "Sheet Thin 2mm Silver Iridized",
        "0058": "Sheet Thin 2mm Gold Iridized",
        "0060": "Sheet Single-Rolled 6mm",
        "0070": "Sheet Granite",
        "0071": "Sheet Granite Iridized",
        "HR70": "Sheet Granite, Herringbn Ripple",
        "HR71": "Sheet Granite, Herringbn Ripple, Iridized",
        "RI70": "Sheet Granite, Ripple",
        "RI71": "Sheet Granite, Ripple, Iridized",
        "0380": "Tekta 3mm",
        "0480": "Tekta 4mm",
        "0680": "Tekta 6mm",
        "CA30": "Cascade 3mm",
        "CA37": "Cascade 3mm Silver Iridized",
        "GR30": "Graffiti 3mm",
        "IN30": "Infusion 3mm",
        "0065": "Billet",
        "0004": "Confetti",
        "M004": "Minimix",
        "0066": "Casting Cullet",
        "0001": "Frit Fine",
        "0002": "Frit Medium",
        "0003": "Frit Coarse",
        "0005": "Frit Extra Large",
        "0008": "Frit Powder",
        "RN01": "Iridiscent Frit Fine",
        "RN02": "Iridiscent Frit Medium",
        "RN03": "Iridiscent Frit Coarse",
        "RN05": "Iridiscent Frit Extra Large",
        "RN08": "Iridiscent Frit Powder",
        "0401": "Ribbon",
        "0507": "Stringer 0.5mm",
        "0107": "Stringer 1mm",
        "0272": "Stringer 2mm",
        "0576": "Rod 4-6mm",
        "0876": "Rod 7-9mm",
        "0309": "SizzleStix mixed colors/patterns 3mm",
        "0609": "SizzleStix mixed colors/patterns 6mm",
        "0371": "SizzleStix rainbow 3mm",
        "0671": "SizzleStix rainbow 6mm",
        "0971": "SizzleStix rainbow 3 & 6 mm",
    }

    print("Looking up: " + code)
    style = style_lookup[code[:3]]
    type = type_lookup[code[7:11].upper()]
    return style + " " + type


with open("./bullseye_price_bands.csv") as bullseye_price_file:
    price_lines = bullseye_price_file.readlines()
    for line in price_lines:
        words = line.rstrip("\n").split(",")
        product_code = words[0]
        band = words[1]
        bullseye_prices[product_code] = band


print(bullseye_prices)

with open("./bullseye_color_conversion_chart_for_parsing.txt") as color_file:
    color_lines = color_file.readlines()

    for line in color_lines:
        words = line.split(" ")
        product_code = words[0]
        name = " ".join(words[1:-2])
        rgb = ConvertToRGB(words[-1].strip())
        cmyk = ConvertToCMYK(words[-2])
        # print(words[0])
        # print(words[-1].strip())
        price_band = "?"
        if product_code in bullseye_prices:
            price_band = bullseye_prices[product_code]

        bullseye_colors[product_code] = {
            "rgb": rgb,
            "cmyk": cmyk,
            "name": name,
            "price_band": price_band,
        }
    # Add magic missing colors back in. They're clear, as far as I'm concerned.
    bullseye_colors["001015"] = bullseye_colors["001016"] = bullseye_colors[
        "001019"
    ] = {
        "rgb": {"r": 255, "g": 255, "b": 255},
        "cmyk": {"c": 0, "m": 0, "y": 0, "k": 0},
    }
    # And for some reason, tekta clear (001100) is missing.
    bullseye_colors["001100"] = {
        "rgb": {"r": 255, "g": 255, "b": 255},
        "cmyk": {"c": 0, "m": 0, "y": 0, "k": 0},
    }
    # And brown topaz (001819) is missing
    bullseye_colors["001819"] = {
        "rgb": {"r": 252, "g": 247, "b": 221},
        "cmyk": {"c": 1, "m": 1, "y": 15, "k": 0},
    }

    #    for code in bullseye_colors.keys():
    #        bullseye_colors[code]["price_band"] = bullseye_prices[code]

    f = open("color_data.json", "w")
    f.write(json.dumps(bullseye_colors, indent=2))
    f.close()

with open("./bullseye_inventory_sheet_for_parsing.txt") as inventory_file:
    inventory_lines = inventory_file.readlines()
    bullseye_inventory = {}
    last_style = ""
    last_suffix = ""
    variant_list = []
    collage_name = ""
    for line in inventory_lines:
        code = line.split(" ")[0]
        print("Parsing: " + code)
        print("Line 0-2: " + line[0:2])
        if line[0:3] == "!!!":
            variant_list.append(line[3:].lstrip("-").rstrip("\n").split(" ")[0])
            print("Appending to Variant List: ")
            print(variant_list)
        elif line[0:2] == "!!":
            collage_name = line[2:]
        elif line[0] == "!":
            print("Section Header: " + line)
            variant_list = []

        else:
            # Check if we're a variant line, in which case we have the same style as the last line
            if line[0] == "-":
                suffix = line.split(" ")[0].split("-")[1]
                print("Suffix Variant: " + suffix)
                code = last_style + "-" + suffix
                last_suffix = suffix
            else:
                if "-" in code:
                    last_style, last_suffix = code.split("-")
                else:
                    last_style = code
            # Find the name - between the first space, and the next comma
            color_name = line.split(" ", 1)[1].split(",", 1)[0].rstrip("\n")
            # So... if our line has a full code, then we can just output it.
            if "-" in code:
                print("Outputting for: " + code)
                short_code = code.split("-")[0]
                bullseye_inventory[code] = {
                    "description": DescribeGlass(code, color_name),
                    "type": GlassType(code),
                    "color": GetBullsEyeColor(code.split("-")[0]),
                    "price_band": bullseye_prices[short_code],
                }
            else:
                # We're not a full code, so extend it.
                short_code = code.split("-")[0]
                for s in variant_list:
                    bullseye_inventory[code + "-" + s] = {
                        "description": DescribeGlass(code, color_name),
                        "type": GlassType(code + "-" + s),
                        "color": GetBullsEyeColor(code.split("-")[0]),
                        "price_band": bullseye_prices[short_code],
                    }

reaction_types = {}

with open("./bullseye_reactions_chart_for_parsing.txt") as reactions_file:
    reactions_lines = reactions_file.readlines()
    reaction_type = ""
    for line in reactions_lines:
        if line[0] == "!":
            reaction_type = line[1:].strip().replace("-BEARING", "")

        else:
            (code, name) = line.strip().split(" ", 1)
            reaction_types[code] = {"reaction_type": reaction_type, "name": name}

# Add a second, instability, column for cadmium, and other oddness.
with open("./bullseye_instabilities_for_parsing.txt") as reactions_file:
    reactions_lines = reactions_file.readlines()
    reaction_type = ""
    for line in reactions_lines:
        if line[0] == "!":
            reaction_type = line[1:].strip()

        else:
            (code, name) = line.strip().split(" ", 1)
            if code in reaction_types:
                reaction_types[code]["instability_type"] = reaction_type
            else:
                reaction_types[code] = {"instability_type": reaction_type, "name": name}



f = open("bullseye_inventory_data.json", "w")
f.write(json.dumps(bullseye_inventory, indent=2))
f.close()
f = open("bullseye_reaction_data.json", "w")
f.write(json.dumps(reaction_types, indent=2))
f.close()
