import json
import os

list_dir = os.listdir("./")

list_json = open("list.json", "w")
list_item = []
for file in list_dir:
    if(file.endswith(".md")):
        f = open(file)
        lines = f.read()
        lines = lines.split("....------....-")
        list_item.append(lines[0])
        f.close()

list_json.write("["+",".join(i for i in list_item)+"]")
list_json.close()
