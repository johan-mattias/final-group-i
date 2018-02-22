import tkinter as tk
import urllib.request
import json
from tkinter import *
from tkinter.messagebox import showinfo
from functools import partial   
from tkinter import ttk


import tkinter as tk


def on_configure(event):
    # update scrollregion after starting 'mainloop'
    # when all widgets are in canvas
    canvas.configure(scrollregion=canvas.bbox('all'))

def show_frame(page_name):
        '''Show a frame for the given page name'''
        print("hej")
        mupp = page_name
        mupp.tkraise()

root = tk.Tk()

# --- create canvas with scrollbar ---

canvas = tk.Canvas(root)
canvas.pack(anchor=N, fill=BOTH ,expand=True, side=tk.LEFT)

scrollbar = tk.Scrollbar(root, command=canvas.yview)
scrollbar.pack(side=tk.LEFT, fill='y')

canvas.configure(yscrollcommand = scrollbar.set)

# update scrollregion after starting 'mainloop'
# when all widgets are in canvas
canvas.bind('<Configure>', on_configure)

# --- put frame in canvas ---

frame = tk.Frame(canvas)
new_frame = tk.Frame(canvas)
canvas.create_window((0,0), window=frame, anchor='nw')





var = StringVar()
label = Label(frame, textvariable=var, relief=FLAT )
var.set("Hey!? How are you doing?\nHey!? How are you doing?\nHey!? How are you doing?\nHey!? How are you doing?\nHey!? How are you doing?\nHey!? How are you doing?\nHey!? How are you doing?\n")
asdf_label = Label(new_frame, textvariable="asdf")

button1 = tk.Button(frame, text="new frame", command=lambda: show_frame(new_frame))                       
button1.pack(side='bottom')
        



asdf_label.pack()
label.pack()
root.mainloop()