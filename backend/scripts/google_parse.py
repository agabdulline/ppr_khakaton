from seleniumwire import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.actions.wheel_input import ScrollOrigin
import time
from bs4 import BeautifulSoup
import requests
import json
import gzip
import io
from datetime import datetime
import random

def scrolldown(driver, element):
    last_height = 0
    while True:
        current_height = driver.execute_script("""
            let el = arguments[0];
            el.scrollTop += 300;
            return el.scrollTop;
        """, element)

        time.sleep(1)

        if current_height == last_height:
            break  # Достигли дна
        last_height = current_height

def init():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});")
    driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['ru-RU', 'ru']});")
    return driver

def parse_response(review):
    global reviews, border_crossed
    data = json.loads(json.loads(review.split('\n')[3])[0][2])[0]
    for i in data:
        cur_rew = {}
        cur_rew['id'] = i[0]
        cur_rew['name'] = i[1][0]
        cur_rew['rating'] = int(i[2])
        cur_rew['comment'] = i[4]
        cur_rew['date'] = datetime.utcfromtimestamp(int(i[5][0]))
        cur_rew['ans'] = i[7]
        border_crossed = (cur_rew['date'] > border)
        if border_crossed:
            cur_rew['date'] = str(cur_rew['date'])
            reviews.append(cur_rew)


def checkurls(requests):
    global reviews
    global analysed_urls
    time.sleep(2)
    for request in requests:
        if request.response:
            if 'batchexecute' in request.url:
                response = request.response
                print("URL запроса:", request.url)
                print("Status:", response.status_code)
                print("Content-Type:", response.headers.get("Content-Type", "нет"))
                if response:
                    compressed = response.body
                    try:
                        with gzip.GzipFile(fileobj=io.BytesIO(compressed)) as f:
                            decompressed = f.read().decode('utf-8')

                            print("✅ JSON успешно прочитан")
                            parse_response(decompressed)
                    except Exception as e:
                        print("❌ Ошибка при распаковке или парсинге:", e)


def google_parse(source):
    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if 'playmarket' not in links[source].keys():
        return

    url = links[source]['playmarket']
    reviews = []
    border = datetime(2024, 1, 1)
    border_crossed = 1
    count_req = 0

    driver = init()
    driver.get(url)

    need_attempts = 2
    for i in range(need_attempts):
        driver.execute_script("window.scrollBy(0, 500);")
        time.sleep(1)


    rew_btn = driver.find_element(By.XPATH, '//*[contains(@aria-label, "Оценки и отзывы")]')
    rew_btn.click()
    rew_window = driver.find_element(By.XPATH, "//*[contains(@class, 'fysCi') and contains(@class, 'Vk3ZVd')]")
    time.sleep(2)
    sort_btn = driver.find_element(By.ID, 'sortBy_1')
    sort_btn.click()
    time.sleep(2)
    need_btn = driver.find_element(By.CLASS_NAME, 'qjTEB')
    need_btn.click()
    time.sleep(2)
    origin = ScrollOrigin.from_element(rew_window)
    actions = ActionChains(driver)

    while border_crossed:
        for j in range(30):
            actions.scroll_from_origin(origin, 0, 400).perform()
            time.sleep(random.uniform(0.1, 1.0))
        checkurls(driver.requests[count_req:])
        count_req = len(driver.requests)
        print(reviews[-1]['date'])
        if int(reviews[-1]['date'].split('-')[0])<2024:
            break
        # with open('ff.json', 'w', encoding='utf-8') as f:
        #     json.dump(reviews, f, ensure_ascii=False, indent=4)

    with open(f'../parsed/{source}_reviews_playmarket.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

    time.sleep(5)

if __name__ == "__main__":
    google_parse('petrol')
