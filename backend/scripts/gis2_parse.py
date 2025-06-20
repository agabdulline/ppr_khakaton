import json

import requests

def gis2_parse(source):

    with open(f"../parsed/links.json", "r", encoding="utf-8") as f:
        links = json.load(f)
    if '2gis' not in links[source].keys():
        return

    url = links[source]['2gis']
    reviews=[]
    offset=0

    while True:
        response = requests.get(url[0]+str(offset)+url[1])
        if response.status_code == 200:
            # Преобразование ответа в JSON
            data = response.json()
            reviews.extend(data['reviews'])

            if len(data['reviews'])!=50:
                break
            offset+=50
        else:
            print(f'Ошибка: {response.status_code}')

    with open(f'../parsed/{source}_reviews_2gis.json', 'w', encoding='utf-8') as f:
        json.dump(reviews, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    gis2_parse('petrol')
