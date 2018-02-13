import tkinter as tk
import urllib.request
import json
from tkinter import *
from tkinter.messagebox import showinfo
from functools import partial   

class Window(Frame):


    def __init__(self, master=None):
        Frame.__init__(self, master)                 
        self.master = master
        self.init_window()







    #print reviews
    def reviews_popup(self, to_print, course_name):
        win = tk.Toplevel()
        win.wm_title(course_name)
        
        l = tk.Label(win, text=to_print)
        l.grid(row=0, column=0, sticky="ns")

        b = tk.Button(win, text="Okay", command=win.destroy)
        b.grid(row=1, column=0)


    #print courses
    def course_popup(self, name_id, course_name):
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
                review += "Quality: " + quality +  "\nTeacher review: " + teacher_review + "\nBooks required: " + books_req + "\nCourse review: " + course_review + "\nRecommendation: " + can_recommend + "\nPercentage mandatory: " + percentage_mand + "\nworth_credits" + worth_credits + "\nDifficulty: " +difficulty + "\nExam: " +exam + "\n\n\n"   
                

        #Creation of init_window
        self.reviews_popup(review, course_name)
    
    
    
    
    
    
    def init_window(self):

        # changing the title of our master widget      
        self.master.title("ReviUUer")

        # allowing the widget to take the full space of the root window
        self.pack(side=LEFT,    fill=BOTH, expand=1)

       

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

        
        for i in range(len(mock_course_data)):
            course_name[i] = str(mock_course_data[i]['name'])
            course_id[i] = str(mock_course_data[i]['id'])

            

            if((forloop%9) == 0 ):
                column_num = 0
                row_num = row_num + 1
                
            

            Buttonz[i] = (Button(self, text="" + str(course_name[i]), command=lambda i=i: self.course_popup(course_id[i], course_name[i])))
            Buttonz[i].grid(column = column_num, row = row_num, sticky="nsew")
            column_num = column_num + 1
            forloop = forloop + 1
            index = index + 1




            


        # creating a button instance
        # placing the button on my window
        #revButton.place(x=0, y=0)
        #revButton2.place(x=1, y=1)
        #revButton.grid(column=0, row=0)
        #revButton2.grid(column=1, row=0)

    
   


root = Tk()

#size of the window
root.geometry("800x400")

app = Window(root)
root.mainloop() 