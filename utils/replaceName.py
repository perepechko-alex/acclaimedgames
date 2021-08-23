import csv, glob, os, sys

files = []
nameToReplace = sys.argv[1]
replacedName = sys.argv[2]

if os.name == 'nt':
    files = glob.glob(".\data\in\**\*.csv", recursive=True)
else:
    files = glob.glob("./data/in/**/*.csv", recursive=True)

for f in files:
    with open (f, 'r') as file:
        filedata = file.read()
    filedata = filedata.replace(nameToReplace, replacedName)

    with open(f, 'w') as file:
        file.write(filedata)

print ("Replaced all instances of " + str(nameToReplace) + " with " + (replacedName))

