import json
from bs4 import BeautifulSoup
from seleniumwire import webdriver
from selenium_stealth import stealth
from selenium.webdriver.common.by import By
import time
from bs4 import BeautifulSoup
import requests
import json
import gzip
import io
from datetime import datetime


def init():
    options = webdriver.ChromeOptions()
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36")
    driver = webdriver.Chrome(options=options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    driver.execute_script("Object.defineProperty(navigator, 'plugins', {get: () => [1, 2, 3, 4, 5]});")
    driver.execute_script("Object.defineProperty(navigator, 'languages', {get: () => ['ru-RU', 'ru']});")
    return driver

def otzovik_parse(source):
    page = 1
    reviews = []

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if 'otzovik' not in links[source].keys():
        return
    url = links[source]['otzovik']


    driver = init()
    review_urls=[]
    driver.get(url + str(page))
    time.sleep(15)

    while True:
        driver.get(url + str(page))
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        while soup.find('div', class_='review-list-2').find_all('div',class_='item') == -1:
            continue
        rews = soup.find('div', class_='review-list-2').find_all('div',class_='item')
        if len(rews)==0 or page==5:
            break
        for rew in rews:
            tag = rew.find('meta')
            rew_url = tag.get('content')
            review_urls.append(rew_url)
        page+=1
    print(review_urls)

    for url1 in review_urls:
        driver.get(url1)
        cur_rev={}
        while True:
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
            if not soup.find('a', class_='fit-with-ava') is None:
                break
            time.sleep(15)
        try:
            cur_rev['url']=url1
            cur_rev['name'] = soup.find('a', class_='fit-with-ava').find('span').text.replace('<wbr>','')
            cur_rev['rating'] = int(soup.find('div', class_='rating-score').find('span').text)
            cur_rev['plus'] = soup.find('div', class_='review-plus').text.replace('<b>Достоинства:</b>', '').replace('"', '').replace('Достоинства: ', '')
            cur_rev['minus'] = soup.find('div', class_='review-minus').text.replace('<b>Недостатки:</b>', '').replace('"', '').replace('Недостатки: ', '')
            cur_rev['date'] = soup.find('span', class_='review-postdate').find('span').text[1:]
            cur_rev['comment'] = soup.find('div', class_='review-body').text.replace('"', '').replace('<br>', '').replace('<span style="display: block;"><div class="otz_panel_inpage"><!-- #OTZOAD Yandex.RTB.R-A-102843-20 review_inpage_na --><div class="8t5pr2."><div id="yandex_rtb_R-A-102843-20_r201"></div></div></div></span>', '')
            cur_rev['summary_opinion'] = soup.find('span', class_='summary').text
            comments = soup.find_all('div', class_='comment')
            cur_rev['comments'] = []
            for comment in comments:
                comm = {}
                comm['author'] = comment.find('a', class_='user-login').text
                comm['date'] = comment.find('div', class_='comment-postdate').text
                comm['comment'] = comment.find('div', class_='comment-body').text.replace('<br>', '').replace('<span style="display: block;"><div class="otz_panel_inpage"><!-- #OTZOAD Yandex.RTB.R-A-102843-20 review_inpage_na --><div class="8t5pr2."><div id="yandex_rtb_R-A-102843-20_r201"></div></div></div></span>', '')
                cur_rev['comments'].append(comm)
            reviews.append(cur_rev)
        except:
            print(url1)
            continue

    month=1

    for rew in reviews:
        month=1
        if rew['date'].split()[1] == 'фев':
             month=2
        if rew['date'].split()[1] == 'мар':
             month=3
        if rew['date'].split()[1] == 'апр':
             month = 4
        if rew['date'].split()[1] == 'мая':
             month=5
        if rew['date'].split()[1] == 'июн':
             month=6
        if rew['date'].split()[1] == 'июл':
             month=7
        if rew['date'].split()[1] == 'авг':
             month=8
        if rew['date'].split()[1] == 'сен':
             month=9
        if rew['date'].split()[1] == 'окт':
             month=10
        if rew['date'].split()[1] == 'ноя':
             month=11
        if rew['date'].split()[1] == 'дек':
             month=12
        if rew['date'][0] == '0':
            rew['date'] = '1' + rew['date'][1:]
        try:
            date = datetime(int(rew['date'].split()[2]), month, int(rew['date'].split()[0]))
        except:
            date = datetime(int(rew['date'].split()[2]), month, int(rew['date'].split()[0]) - 1)
        timestamp = int(date.timestamp())
        rew['unix_date'] = timestamp



    for r in reviews:
        month = 1
        for rew in r['comments']:
            if rew['date'].split()[1] == 'фев':
                 month=2
            if rew['date'].split()[1] == 'мар':
                 month=3
            if rew['date'].split()[1] == 'апр':
                 month = 4
            if rew['date'].split()[1] == 'мая':
                 month=5
            if rew['date'].split()[1] == 'июн':
                 month=6
            if rew['date'].split()[1] == 'июл':
                 month=7
            if rew['date'].split()[1] == 'авг':
                 month=8
            if rew['date'].split()[1] == 'сен':
                 month=9
            if rew['date'].split()[1] == 'окт':
                 month=10
            if rew['date'].split()[1] == 'ноя':
                 month=11
            if rew['date'].split()[1] == 'дек':
                 month=12
            if rew['date'][0] == '0':
                rew['date'] = '1' + rew['date'][1:]
            try:
                date = datetime(int(rew['date'].split()[2]), month, int(rew['date'].split()[0]))
            except:
                try:
                    date = datetime(int(rew['date'].split()[2]), month, int(rew['date'].split()[0])-1)
                except:
                    date = datetime(2025, month, int(rew['date'].split()[0]) - 1)
            timestamp = int(date.timestamp())
            rew['unix_date'] = timestamp

    with open(f'../parsed/{source}_reviews_otzovik.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)
    print(len(reviews))

if __name__ == "__main__":
    otzovik_parse('petrol')

