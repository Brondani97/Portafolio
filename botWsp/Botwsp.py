import pyautogui
import pyautogui as pg
import webbrowser
from time import sleep
import time
import pandas as pd


data = pd.read_csv("telefonos.txt", header=None)

for i in range(len(data)):

    celular = str(data[0][i])

    celular2 = "+"+celular
    webbrowser.open("https://web.whatsapp.com/send?phone="+celular2)
    sleep(10)

    with open("mensajes.txt", "r") as file:
        for line in file:
            pyautogui.typewrite(line)
            pyautogui.press("enter")



    time.sleep(7)
    pg.hotkey('ctrl', 'w')  # Cerrar la pestaña
