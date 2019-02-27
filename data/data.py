from subprocess import call

en = "english.csv"
es = "spanish.csv"

enc = en[:-4]
esc = es[:-4]

cmd = "mongoimport -d verbs -c {} --type csv --file {} --headerline"

call(cmd.format(enc, en), shell=True)
call(cmd.format(esc, es), shell=True)
