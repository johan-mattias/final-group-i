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
canvas.create_window((0,0), window=frame, anchor='nw')

#print reviews
def reviews_popup(to_print, course_name):
    #win = tk.Toplevel()
    #win.wm_title(course_name)
    #l = tk.Label(win, text=to_print)
    #l.grid(row=0, column=0, sticky="ns")
    #b = tk.Button(win, text="Okay", command=win.destroy)
    #b.grid(row=1, column=0)
    asdf = Tk()
    S = Scrollbar(asdf)
    T = Text(asdf, height=800, width=400)
    S.pack(side=RIGHT, fill=Y)
    T.pack(side=LEFT, fill=Y)
    S.config(command=T.yview)
    T.config(yscrollcommand=S.set)
    T.insert(END, to_print)





#print courses
def course_popup(name_id, course_name):
    #Initiate variables        
    reviews_array = []
    review = ""

    #Get Mock reviews data
    get_data = open('./database/mock_reviews.json')
    mock_data = json.load(get_data)


    for i in range(len(mock_data)):
        quality = str(mock_data[i]['quality'])
        course_id = str(mock_data[i]['course_id'])
        teacher_review = str(mock_data[i]['teacher_review'])
        books_req = str(mock_data[i]['books_req'])
        course_review = str(mock_data[i]['course_review'])
        can_recommend = str(mock_data[i]['can_recommend'])
        percentage_mand = str(mock_data[i]['percentage_mand'])
        worth_credits = str(mock_data[i]['worth_credits'])
        difficulty = str(mock_data[i]['difficulty'])
        teacher_id = str(mock_data[i]['teacher_id'])
        exam = str(mock_data[i]['exam'])
        asdf_id = str(mock_data[i]['id'])
        #review += "Quality: " + quality + "\nCourse ID: " + course_id + "\nTeacher review: " + teacher_review + "\nBooks required: " + books_req + "\nCourse review: " + course_review + "\nRecommendation: " + can_recommend + "\nPercentage mandatory: " + percentage_mand + "\nworth_credits" + worth_credits + "\nDifficulty: " +difficulty + "\nExam: " +exam + "\n\n\n"
        
        if(name_id == course_id):
            review += "Quality: " + quality +  "\nTeacher review: " + teacher_review + "\nBooks required: " + books_req + "\nCourse review: " + course_review + "\nRecommendation: " + can_recommend + "\nPercentage mandatory: " + percentage_mand + "\nWorth credits: " + worth_credits + "\nDifficulty: " +difficulty + "\nExam: " +exam + "\n\n\n"   
            

    #Creation of init_window
    reviews_popup(review, course_name)

l = tk.Label(frame)

#Get Mock courses data
get_course_data = open('./database/mock_courses.json')
mock_course_data = json.load(get_course_data)

#Initiate variables
column_num = 0
row_num = 0
index = 0
forloop = 1
Buttonz = [""] *len(mock_course_data)
course_name = [""] *len(mock_course_data)
course_id = [""] *len(mock_course_data)
placement = "left"


for i in range(len(mock_course_data)):
    course_name[i] = str(mock_course_data[i]['name'])
    course_id[i] = str(mock_course_data[i]['id'])

    

    if((forloop%9) == 0 ):
        placement = "right"
        row_num = row_num + 1
        
    
    
    Buttonz[i] = Button(l, text="" + str(course_name[i]), command=lambda i=i: course_popup(course_id[i], course_name[i]), height = 5, width = 10).pack()
    column_num = column_num + 1
    forloop = forloop + 1
    index = index + 1




# --- add widgets in frame ---


#Buttonx = Button(l, text="asdf").pack()
#Buttony = Button(l, text="mupp").pack()


l.pack()


root.geometry("800x400")
# --- start program ---

root.mainloop()