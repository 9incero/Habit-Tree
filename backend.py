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


class Date(BaseModel):
    save_date: str


class NewHabit(BaseModel):
    name: str
    achieve_num: int
    cycle: int
    details: str


@app.post("/save")
def save_date(date: Date):
    file = open("./database/date.txt", 'a')
    file.write(date.save_date)
    file.write('\n')
    file.close()
    return date.save_date


@app.get("/")
def read_marks():
    marks = {}
    file = open("./database/date.txt", 'r')
    lines = file.readlines()
    i = 0
    for line in lines:
        i += 1
        marks[i] = line[:-1]
    return marks


@app.post('/newhabit')
def newhabit():
    file = open("./database/newhabit.txt", 'a')
    file.write(NewHabit.name+','+NewHabit.achieve_num +
               ','+NewHabit.cycle+','+NewHabit.details)
    file.write('\n')
    file.close()
    return NewHabit
