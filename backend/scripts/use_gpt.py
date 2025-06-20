import openai
import os
from dotenv import load_dotenv
import json
import requests

API_KEY = 'shds-j46MROOAmFvYUakWMoBsSYCCI2M'

def process_reviews():

    load_dotenv()
    print(os.getenv("OPENAI_API_KEY"))
    URL = 'https://gptunnel.ru/v1/chat/completions'
    headers = {
        'Authorization': API_KEY,
        'Content-Type': 'application/json',
    }

    processed_reviews = {}

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    for source in links.keys():
        plus=[]
        minus=[]
        i=0
        with open(f"parsed/{source}_reviews.json", "r", encoding="utf-8") as f:
            reviews = json.load(f)
        for rev in reviews:
            rating = rev["rating"]
            text = rev["text"]
            messages = [
                {"role": "system",
                 "content": f"Моя компания выпускает топливные карты для B2B-сегмента. "
                            f"Ты NLP-ассистент для нее. "
                            f"Ты должен проанализировать отзыв моего клиента и выявить основное преимущество и недостаток моего продукта. "
                            f"Верни ответ в формате json объекта с 2 полями 'plus' и 'minus'. Больше ничего в ответе не пиши. "
                            f"Если в одном из полей нечего написать, оставь пустым."},
                {"role": "user", "content": f"Оценка клиента:{rating}, его отзыв: {text}"}
            ]
            response = requests.post(URL, headers=headers, json={'model': 'gpt-4o-mini', 'messages': messages})
            if response.status_code == 200:
                result = response.json()
                reply = result['choices'][0]['message']['content']
                try:
                    parsed = json.loads(reply)
                    if parsed["plus"] != '':
                        plus.append(parsed["plus"])
                    if parsed["minus"] != '':
                        minus.append(parsed["minus"])
                    print(i, plus, '\n', minus)
                except json.JSONDecodeError:
                    try:
                        parsed = json.loads('{' + reply.split('{')[1].split('}')[0] + '}')
                        if parsed["plus"] != '':
                            plus.append(parsed["plus"])
                        if parsed["minus"] != '':
                            minus.append(parsed["minus"])
                        print(i, plus, '\n', minus)
                    except json.JSONDecodeError:
                        print("Ответ не в формате JSON, выводим как есть:\n", reply)
                        continue
            else:
                print('Ошибка:', response.status_code, response.text)
                continue
            i+=1
        messages = [
            {"role": "system",
             "content": f"Ты должен помочь мне проанализировать списки сильных и слабых сторон, "
                        f"выявленных из отзывов моих клиентов и выявить ровно по 5 преимуществ и недостатков моего продукта, "
                        f"описав их кратко. Верни ответ в формате json объекта с 2 полями 'plus' и 'minus', "
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
                processed_reviews[source] = parsed
                print(processed_reviews[source])
            except json.JSONDecodeError:
                try:
                    parsed = json.loads('{' + reply.split('{')[1].split('}')[0] + '}')
                    processed_reviews[source] = parsed
                    print(processed_reviews[source])
                except json.JSONDecodeError:
                    print("Ответ не в формате JSON, выводим как есть:\n", reply)
                    continue
        else:
            print('Ошибка:', response.status_code, response.text)
            continue

    with open(f"../parsed/org_done/processed.json", "w", encoding="utf-8") as f:
        json.dump(processed_reviews, f, ensure_ascii=False, indent=2)
    return processed_reviews

if __name__ == "__main__":
    process_reviews()