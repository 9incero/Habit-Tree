

with open("./database/test.txt", "r", encoding='UTF8') as f:
    lines = f.readlines()
with open("./database/test.txt", "w") as f:
    for line in lines:
        if line.strip("\n") != "밥,2023-02-23":
            f.write(line)
