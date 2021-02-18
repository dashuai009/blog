import sys
import time

title = sys.argv[1]
f = open(title+".md", "x")
now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
tags = ",".join('"'+i+'"' for i in sys.argv[2:])

f.write("{\n")
f.write('\t"title":\"'+title+'\",\n')
f.write('\t"data":\"'+now+'\",\n')
f.write('\t"tags":['+tags+']\n')
f.write('}\n....------....-')
f.close()
