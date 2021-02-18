import json
import os
import sys
fsock = open('error.log', 'w')
sys.stderr = fsock

list_dir = os.listdir("./")

list_json = open("list.json", "w")
list_item = []
for file in list_dir:
    if(file.endswith(".md")):
        f = open(file)
        lines = f.read()
        lines = lines.split("....------....-")
        # print(lines[0])
        try:
            tmp = json.loads(lines[0])
            if(tmp['title']+".md" != file):
                fsock.write(tmp["title"] + "文档title命名错误！\n\n")
        except Exception as e:
            fsock.write("出错文件是：" + lines[0]+"\n\n")
            fsock.write(str(e))
        list_item.append(lines[0])
        f.close()

list_json.write("["+",".join(i for i in list_item)+"]")
list_json.close()
fsock.close()
