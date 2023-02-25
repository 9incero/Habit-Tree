from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os


app = FastAPI()
origins = [
    "http://localhost:3000",

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


def load_habit_list():
    global habit_list
    habit_list = []
    file = open("./database/newhabit.txt", 'r')
    for habit in file.readlines():
        habit_list.append(habit.split(',')[0])
    file.close()
    print(habit_list)


habit_list = []
load_habit_list()


class NewHabit(BaseModel):
    name: str
    goal: int
    cycle: int
    details: str
    start: str
    color: str


class Achievedate(BaseModel):
    name: str
    date: str


@app.get('/readhabit')
def habitdate():
    habit = {}
    file = open("./database/newhabit.txt", 'r')
    for line in file.readlines():
        tmp = line.split(',')[1:6]
        print(tmp)
        tmp.append(line.split(',')[6][:-1])
        print(tmp)
        habit[line.split(',')[0]] = tmp
    file.close()
    return habit


file = open("./database/newhabit.txt", 'r')
i = len(file.readlines())


@app.post('/newhabit')
def newhabit(item: NewHabit):
    global i
    file = open("./database/newhabit.txt", 'a')
    file.write(
        f"{i},{item.name},{item.goal},{item.cycle},{item.details},{item.start},{item.color}")
    file.write('\n')
    file.close()
    load_habit_list()
    i += 1
    return item


@app.post('/achievedate')
def achivevdate(item: Achievedate):
    file = open("./database/achievedate.txt", 'a')
    file.write(f"{item.name},{item.date}")
    file.write('\n')
    file.close()
    return item


@app.post('/deleteachieve')
def deleteachieve(item: Achievedate):
    with open("./database/achievedate.txt", "r") as f:
        lines = f.readlines()
    with open("./database/achievedate.txt", "w") as f:
        for line in lines:
            if line.strip("\n") != f"{item.name},{item.date}":
                f.write(line)
    return item


@app.get('/counthabit')
def counthabit():
    counth = {}
    file = open("./database/newhabit.txt", 'r')
    for line in file.readlines():
        counth[line.split(',')[1]] = 0
    file.close()
    print(counth)
    with open("./database/achievedate.txt", "r") as f:
        for line in f.readlines():

            counth[line.split(',')[0]] += 1

    return counth
