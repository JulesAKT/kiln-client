import json

with open("c:/temp/exported.json", encoding="utf8") as json_file:
    data = json.load(json_file)
    user_id = "68jLhdzhOAPhZVGnTsJBynJQEuG3"
    spectrum_project = "8f14f6f-08b7-347-c84d-f081d11ee2bb"
    bullseye_project = "12600f-6072-707f-5e8-6314711a353f"
    wissmach_project = "006c541-0386-61-607e-ac65701e7521"
    baoli_coe_85_project = "ae4db3-cb48-d0bd-2c6c-e537daae510"
    baoli_coe_90_project = "acfd65c-6ca-06da-aee0-b2ae70bf3303"
    spectrum_firings = {}
    bullseye_firings = {}
    wissmach_firings = {}
    baoli_coe_85_firings = {}
    baoli_coe_90_firings = {}

    segments = {}
    for firing_id in data["userdata"][user_id]["firings"]:
        firing = data["userdata"][user_id]["firings"][firing_id]
        print(json.dumps(firing))
        if firing["project_id"] == spectrum_project:
            spectrum_firings[firing_id] = firing
            for segment_id in data["userdata"][user_id]["segments"]:
                segment = data["userdata"][user_id]["segments"][segment_id]
                print(json.dumps(segment))
                if segment["firing_id"] == firing_id:
                    segments[segment_id] = segment
        if firing["project_id"] == bullseye_project:
            bullseye_firings[firing_id] = firing
            for segment_id in data["userdata"][user_id]["segments"]:
                segment = data["userdata"][user_id]["segments"][segment_id]
                if segment["firing_id"] == firing_id:
                    segments[segment_id] = segment
        if firing["project_id"] == wissmach_project:
            wissmach_firings[firing_id] = firing
            for segment_id in data["userdata"][user_id]["segments"]:
                segment = data["userdata"][user_id]["segments"][segment_id]
                if segment["firing_id"] == firing_id:
                    segments[segment_id] = segment
        if firing["project_id"] == baoli_coe_85_project:
            baoli_coe_85_firings[firing_id] = firing
            for segment_id in data["userdata"][user_id]["segments"]:
                segment = data["userdata"][user_id]["segments"][segment_id]
                if segment["firing_id"] == firing_id:
                    segments[segment_id] = segment
        if firing["project_id"] == baoli_coe_90_project:
            baoli_coe_90_firings[firing_id] = firing
            for segment_id in data["userdata"][user_id]["segments"]:
                segment = data["userdata"][user_id]["segments"][segment_id]
                if segment["firing_id"] == firing_id:
                    segments[segment_id] = segment

        print("Spectrum:")
        print(spectrum_firings)
        print("Bullseye")
        print(bullseye_firings)

    templates = {
        "segments": segments,
        "firings": {
            "Bullseye": bullseye_firings,
            "Spectrum": spectrum_firings,
            "Wissmach": wissmach_firings,
            "Baoli COE 85": baoli_coe_85_firings,
            "Baoli COE 90": baoli_coe_90_firings,
        },
    }

    # print( json.dumps(templates, indent = 2))

    f = open("template_data.json", "w")
    f.write(json.dumps(templates, indent=2))
    f.close()