import pandas as pd
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True

driver = webdriver.Chrome("./chromedriver", chrome_options=options)

df = pd.read_csv("english.csv", header=0)

template = "https://translate.google.com/#view=home&op=translate&sl=en&tl=es&text={}"

info = df.shape[0]

translations = [0] * info

for i, row in df.iterrows():
    if i % 1000 == 0:
        driver.quit()
        time.sleep(2)
        driver = webdriver.Chrome("./chromedriver", chrome_options=options)

    if row["tense"] == "Afirmativo" or row["tense"] == "Negativo":
        phrase = row["answer"]
    else:
        phrase = row["subject"] + " " + row["answer"]
    phrase = phrase.replace(" ", "%20")

    url = template.format(phrase)
    driver.get(url)
    time.sleep(0.4)

    html = driver.page_source

    soup = BeautifulSoup(html, "html.parser")

    tag = soup.find("span", {"class": "tlid-translation"})
    print(i, info)
    translations[i] = tag.get_text().lower()
    print(phrase, translations[i])

driver.quit()
df["translation"] = translations
df.to_csv("englishALT.csv")
