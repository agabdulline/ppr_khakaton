import json

org_names=['petrol', 'opti24', 'e1card', 'likard', 'rn-kart', 'polniy-bak', 'kardeks']
org_ru_names=['Петрол плюс', 'ОПТИ24', 'Е1card', 'Лукойл ликард', 'РН-карт', 'Полный бак', 'Кардекс']

def calc_rating():

    arr_org = []

    with open(f"../parsed/org_done/processed.json", "r", encoding="utf-8") as f:
        organizations = json.load(f)
    for org in organizations.keys():
        organizations[org]['name'] = org_ru_names[org_names.index(org)]
        if org != 'petrol':
            with open(f"../parsed/org_done/{org}_reviews.json", "r", encoding="utf-8") as f:
                reviews = json.load(f)
            sum_rate, num_rev = 0, 0
            for review in reviews:
                sum_rate += review['rating']
                num_rev += 1
            organizations[org]['rating'] = sum_rate/num_rev
        else:
            with open(f"../parsed/org_done/petrol_reviews.json", "r", encoding="utf-8") as f:
                reviews = json.load(f)
            names=["2gis", "yandex", "rustore", "playmarket", "otzovik", "yell"]
            sum_rate, num_rev = [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]
            for review in reviews:
                sum_rate[names.index(review['source'])] += review['rating']
                num_rev[names.index(review['source'])]  += 1
            organizations[org]['rating'] = [{names[i]: sum_rate[i]/num_rev[i]} for i in range(len(names))]
            organizations[org]['rating'].append({'avg': sum(sum_rate)/sum(num_rev)})
        arr_org.append(organizations[org])

    with open(f"../parsed/org_done/processed_with_rate.json", 'w', encoding='utf-8') as f:
        json.dump(arr_org, f, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    calc_rating()