import json
from bs4 import BeautifulSoup
import requests
from datetime import datetime

def rustore_parse(source):
    page = 1
    reviews = []

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if 'rustore' not in links[source].keys():
        return
    url = links[source]['rustore']

    while True:
        response = requests.get(url[0]+str(page)+url[1])
        soup = BeautifulSoup(response.text, 'html.parser')
        sc = soup.find_all('script')
        stri = ""
        for i in sc:
            if 'self.__next_f.push([1,"5:[' in i.text:
                stri=i.text
        stri=json.loads(stri.replace('self.__next_f.push(', '', 1)[:-1])
        print(json.loads(stri[1][2:])[3]['children'][1][3]['children'])
        stri = json.loads(stri[1][2:])[3]['children'][1][3]['children'][3]['children'][6][3]['children'][3]
        if(len(stri)==0):
            break
        for rew in stri:
            rew1=rew[3]['children']
            cur_rew = {}
            cur_rew['name']=rew1[0][3]['children'][0][3]['children']
            cur_rew['date']=rew1[0][3]['children'][1][3]['children']
            cur_rew['rating']=int(rew1[0][3]['children'][3][3]['children'][3])
            cur_rew['comment']=rew1[1][3]['children'][0]
            try:
                cur_rew['ans_date']=rew1[3][0][3]['children'][1][3]['children']
                if len(rew1[3][1][3]['children'][0]) == 3:
                    cur_rew['ans'] = rew1[3][1][3]['children'][0][0][3]['children'] + rew1[3][1][3]['children'][0][1][3][
                        'text'] + rew1[3][1][3]['children'][0][2][3]['children']
                else:
                    cur_rew['ans'] = rew1[3][1][3]['children'][0]
            except:
                cur_rew['ans_date'] = ''
                cur_rew['ans'] = ''
            print(cur_rew['name'])
            reviews.append(cur_rew)
        page+=1

    months = set()

    for rew in reviews:
        print(rew['ans_date'])
        try:
            months.add(rew['ans_date'].split()[1])
            month=1
            if rew['ans_date'].split()[1] == 'фев':
                 month=2
            if rew['ans_date'].split()[1] == 'мар':
                 month=3
            if rew['ans_date'].split()[1] == 'апр':
                 month = 4
            if rew['ans_date'].split()[1] == 'май':
                 month=5
            if rew['ans_date'].split()[1] == 'июн':
                 month=6
            if rew['ans_date'].split()[1] == 'июл':
                 month=7
            if rew['ans_date'].split()[1] == 'авг':
                 month=8
            if rew['ans_date'].split()[1] == 'сен':
                 month=9
            if rew['ans_date'].split()[1] == 'окт':
                 month=10
            if rew['ans_date'].split()[1] == 'ноя':
                 month=11
            if rew['ans_date'].split()[1] == 'дек':
                 month=12

            date = datetime(int(rew['ans_date'].split()[2]), month, int(rew['ans_date'].split()[0]))
            timestamp = int(date.timestamp())
            rew['unix_ans_date'] = timestamp
        except Exception as e:
            print(e)

    for rew in reviews:
        print(rew['ans_date'])
        try:
            months.add(rew['date'].split()[1])
            month=1
            if rew['date'].split()[1] == 'фев':
                 month=2
            if rew['date'].split()[1] == 'мар':
                 month=3
            if rew['date'].split()[1] == 'апр':
                 month = 4
            if rew['date'].split()[1] == 'май':
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

            date = datetime(int(rew['date'].split()[2]), month, int(rew['date'].split()[0]))
            timestamp = int(date.timestamp())
            rew['unix_date'] = timestamp
        except Exception as e:
            print(e)

    with open('../parsed/likard_reviews_rustore.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    rustore_parse('petrol')