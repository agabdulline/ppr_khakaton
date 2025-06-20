from seleniumwire import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
import requests
import json
import gzip
import io


url="https://www.yell.ru/moscow/com/kardeks_11387775/reviews/"
reviews = []

def init():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});")
    driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['ru-RU', 'ru']});")
    return driver

def yell_parse(source):

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if 'yell' not in links[source].keys():
        return

    url = links[source]['yell']

    driver = init()

    driver.get(url)
    time.sleep(2)
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(2)
    while True:
        try:
            btn = driver.find_element(By.XPATH, '//*[contains(@ng-click, "showMoreReviews")]')
            btn.click()
            time.sleep(5)
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        except:
            break
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    rews = soup.find_all('div', class_='reviews__item')
    for rew in rews:
        cur_rew = {}
        data_review = rew.get('data-review')
        cur_rew['comment'] = json.loads(data_review)['text'].replace('\n', '').replace('\r', '')
        cur_rew['name']=rew.find('div', class_='reviews__item-user').find('a').find('div', class_='reviews__item-user-name').text
        cur_rew['rating']=int(rew.find('div', class_='reviews__item-content').find('div', class_='rating').find('span').text.replace(' ', '').replace('\n', '').replace('\r', ''))
        cur_rew['date']=rew.find('span', class_='reviews__item-added').get('content')
        try:
            cur_rew['ans_author']=rew.find('div', class_='replies').find('b').text
            data_ans=rew.find('div', class_='replies').find('div', class_='replies__item').get('data-reply')
            cur_rew['ans']=json.loads(data_ans)['text'].replace('\n', '').replace('\r', '')
        except:
            cur_rew['ans_author']=''
            cur_rew['ans']=''
        reviews.append(cur_rew)

    with open('../parsed/kardeks_reviews_yell.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    yell_parse('petrol')