import openai
import os
from dotenv import load_dotenv
import json
import requests
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta

API_KEY = 'shds-j46MROOAmFvYUakWMoBsSYCCI2M'

def process_reviews_pm():

    load_dotenv()
    print(os.getenv("OPENAI_API_KEY"))
    URL = 'https://gptunnel.ru/v1/chat/completions'
    headers = {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
    }

    processed_reviews = {}


    # three_months_ago = datetime.now() - relativedelta(months=3)
    # three_months_ago_timestamp = three_months_ago.timestamp()
    i=0
    with open(f"../parsed/org_done/qqq.json", "r", encoding="utf-8") as f:
        reviews = json.load(f)
    with open(f"../parsed/org_done/processed_with_rate.json", "r", encoding="utf-8") as f:
        reviews_proc = json.load(f)
    for rev in reviews.keys():
        print(rev)
        if rev == '3month':
            continue
        else:

            plus = reviews[rev]['all_plus']
            minus = reviews[rev]['all_minus']

            messages = [
                {"role": "system",
                 "content": f"Ты должен помочь мне проанализировать списки сильных и слабых сторон, "
                            f"выявленных из отзывов моих клиентов и выявить по 5 преимуществ и недостатков моего продукта, "
                            f"описав их кратко, а так же несколько советов по тому, как мне улучшить свой продукт. Они не должны повторяться друг друга. Верни ответ в формате json объекта с 3 полями 'advice', 'plus' и 'minus', "
                            f"каждое из которых - массив из 5 строк. Больше ничего в ответе не пиши. \n "
                            f"Выявленные преимущества: {';'.join(plus)} \n "
                            f"Выявленные недостатки: {';'.join(minus)}"},
            ]
            response = requests.post(URL, headers=headers, json={'model': 'gpt-4o-mini', 'messages': messages})
            if response.status_code == 200:
                result = response.json()
                reply = result['choices'][0]['message']['content']
                try:
                    parsed = json.loads(reply)
                    for r in reviews_proc:
                        if r['name']==rev:
                            r['plus'] = parsed['plus']
                            r['minus'] = parsed['minus']
                            r['advice'] = parsed['advice']
                except json.JSONDecodeError:
                    try:
                        parsed = json.loads('{' + reply.split('{')[1].split('}')[0] + '}')
                        for r in reviews_proc:
                            if r['name'] == rev:
                                r['plus'] = parsed['plus']
                                r['minus'] = parsed['minus']
                                r['advice'] = parsed['advice']
                    except json.JSONDecodeError:
                        print("Ответ не в формате JSON, выводим как есть:\n", reply)
            else:
                print('Ошибка:', response.status_code, response.text)

    with open(f"../parsed/org_done/processed_with_rate.json", "w", encoding="utf-8") as f:
        json.dump(reviews_proc, f, ensure_ascii=False, indent=2)
    return processed_reviews

process_reviews_pm()