from seleniumwire import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
import requests
import json
import gzip
import io


url = "https://yandex.ru/maps/org/kardeks/1194700808/reviews/?ll=37.551047%2C55.682949&z=14"
reviews = []

def scrolldown(driver, element):
    last_scroll_top = 0
    while True:
        driver.execute_script("arguments[0].scrollTop = arguments[0].scrollHeight", element)
        time.sleep(1)  # Дать контенту догрузиться

        # Проверяем, достигли ли низа
        current_scroll_top = driver.execute_script("return arguments[0].scrollTop", element)
        if current_scroll_top == last_scroll_top:
            break  # Дальше не скроллится
        last_scroll_top = current_scroll_top
def getStartRew(driver):
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    script_tag = soup.find('script', attrs={'type': 'application/json'})
    if script_tag:
        # Получаем содержимое тега
        json_content = script_tag.string
        data = json.loads(json_content)
        return data['stack'][0]['results']['items'][0]['reviewResults']['reviews']
    else:
        print("Тег <script> с type='application/json' не найден.")
        return []

def init():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});")
    driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['ru-RU', 'ru']});")
    return driver

def yandex_parse(source):

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if 'yandex' not in links[source].keys():
        return

    url = links[source]['yandex']

    driver = init()
    driver.get(url)
    time.sleep(30)

    reviews.extend(getStartRew(driver))

    div = driver.find_element(By.CLASS_NAME, "scroll__container")
    scrolldown(driver, div)

    for request in driver.requests:
        if request.response:
            if "fetchReviews" in request.url:  # фильтр по ключевому слову
                time.sleep(2)
                response = request.response
                print("URL запроса:", request.url)
                print("Status:", response.status_code)
                print("Content-Type:", response.headers.get("Content-Type", "нет"))
                if response:
                    compressed = response.body
                    try:
                        with gzip.GzipFile(fileobj=io.BytesIO(compressed)) as f:
                            decompressed = f.read().decode('utf-8')
                            data = json.loads(decompressed)
                            print("✅ JSON успешно прочитан")
                            print(data)
                            reviews.extend(data['data']['reviews'])
                    except Exception as e:
                        print("❌ Ошибка при распаковке или парсинге:", e)

    with open(f'../parsed/{source}_reviews_yandex.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)
    time.sleep(1)

if __name__ == "__main__":
    yandex_parse('petrol')

