#!/usr/bin/env python
# -*- coding: utf-8 -*-

from psychopy import visual, core, event, gui
import pandas as pd
import os  # Import the os module

# Get participant info
exp_info = {'participant': ''}
dlg = gui.DlgFromDict(dictionary=exp_info, title='Experiment')
if dlg.OK == False:
    core.quit()

# Create a window
win = visual.Window(size=[800, 600], fullscr=False)

# Read the CSV file
this_dir = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(this_dir, 'C:/Users/rache/Desktop/LLM_Linda_questions_en.csv')
df = pd.read_csv(csv_path)

# Randomly select 20 questions
questions = df.sample(n=20).to_dict('records')

# Store responses
responses = []

# Loop through each question
for q in questions:
    question_text = q['question']  # Access 'question' column
    options = [q['choice1'], q['choice2']]  # Access 'choice1' and 'choice2' columns

    # Display the question
    question_stim = visual.TextStim(win, text=question_text, pos=(0, 0.4), wrapWidth=1.8, height=0.07)
    question_stim.draw()

    # Display the options
    option_texts = []
    for i, option in enumerate(options):
        option_stim = visual.TextStim(win, text=f"{i+1}. {option}", pos=(0, 0.2 - i * 0.2), height=0.06)
        option_stim.draw()
        option_texts.append(option_stim)

    win.flip()

    # Wait for a response
    keys = event.waitKeys(keyList=['1', '2'])
    response = int(keys[0])
    responses.append({'participant': exp_info['participant'], 'question': question_text, 'response': response})

    # Clear the screen
    win.flip()
    core.wait(0.5)

# Save responses to a new CSV file
output_filename = exp_info['participant'] + '_responses.csv'
output_path = os.path.join(this_dir, output_filename)
pd.DataFrame(responses).to_csv(output_path, index=False)

# Close the window
win.close()
core.quit()
