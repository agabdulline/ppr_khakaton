import json

from datetime import datetime

def compare_files(source):

    reviews = []
    border = datetime(2024, 1, 1)

    with open("../parsed/links.json", "r", encoding="utf-8") as f:
         links = json.load(f)

    if '2gis' in links[source].keys():
        with open(f"../parsed/{source}_reviews_2gis.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = '2gis'
                date = cur_rew['date_created']
                dt = datetime.fromisoformat(date).replace(tzinfo=None)
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['text']
                    new_rew['name'] = cur_rew['user']['name']
                    try:
                        new_rew['answers']=[{
                            'name': cur_rew['official_answer']['org_name'],
                            'comment': cur_rew['official_answer']['text'],
                            'date': datetime.fromisoformat(cur_rew['official_answer']['date_created']).timestamp(),
                            'usual_date': datetime.fromisoformat(cur_rew['official_answer']['date_created']).strftime("%Y-%m-%d")
                        }]
                    except:
                        new_rew['answers']=[]
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    if 'yandex' in links[source].keys():
        with open(f"../parsed/{source}_reviews_yandex.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = 'yandex'
                date = cur_rew['updatedTime']
                dt = datetime.fromisoformat(date).replace(tzinfo=None)
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['text']
                    new_rew['name'] = cur_rew['author']['name']
                    try:
                        new_rew['answers'] = [{
                            'name': "ППР",
                            'comment': cur_rew['businessComment']['text'],
                            'date': datetime.fromisoformat(cur_rew['businessComment']['updatedTime']).timestamp(),
                            'usual_date': datetime.fromisoformat(cur_rew['businessComment']['updatedTime']).strftime("%Y-%m-%d")
                        }]
                    except:
                        new_rew['answers'] = []
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    if 'playmarket' in links[source].keys():
        with open(f"../parsed/{source}_reviews_playmarket.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = 'playmarket'
                date = cur_rew['date']
                dt = datetime.strptime(date, "%Y-%m-%d %H:%M:%S")
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['comment']
                    new_rew['name'] = cur_rew['name']
                    try:
                        if cur_rew['ans']:
                            new_rew['answers'] = [{
                            'name': cur_rew['ans'][0].replace('\"', ''),
                            'comment': cur_rew['ans'][1],
                            'date': cur_rew['ans'][2][0],
                            'usual_date': datetime.fromtimestamp(cur_rew['ans'][2][0]).strftime(
                                "%Y-%m-%d")
                        }]
                    except(IndexError):
                        print(IndexError)
                        new_rew['answers'] = []
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    if 'rustore' in links[source].keys():
        with open(f"../parsed/{source}_reviews_rustore.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = 'rustore'
                dt = datetime.fromtimestamp(cur_rew['unix_date'])
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['comment']
                    new_rew['name'] = cur_rew['name']
                    try:
                        new_rew['answers'] = [{
                            'name': "ППР",
                            'comment': cur_rew['ans'],
                            'date': cur_rew['unix_ans_date'],
                            'usual_date': datetime.fromtimestamp(cur_rew['unix_ans_date']).strftime(
                                "%Y-%m-%d")
                        }]
                    except:
                        new_rew['answers'] = []
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    if 'yell' in links[source].keys():
        with open(f"../parsed/{source}_reviews_yell.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = 'yell'
                date = cur_rew['date']
                dt = datetime.fromisoformat(date).replace(tzinfo=None)
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['comment']
                    new_rew['name'] = cur_rew['name']
                    try:
                        new_rew['answers'] = [{
                            'name': cur_rew['ans_author'],
                            'comment': cur_rew['ans'],
                            'date': dt.strftime("%Y-%m-%d"),
                            'usual_date': dt.timestamp()
                        }]
                    except:
                        new_rew['answers'] = []
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    if 'otzovik' in links[source].keys():
        with open(f"../parsed/{source}_reviews_otzovik.json", "r", encoding="utf-8") as f:
            rew = json.load(f)
            for cur_rew in rew:
                new_rew = {}
                new_rew['source'] = 'otzovik'
                dt = datetime.fromtimestamp(cur_rew['unix_date'])
                if dt < border:
                    continue
                else:
                    new_rew['date'] = dt.timestamp()
                    new_rew['usual_date'] = dt.strftime("%Y-%m-%d")
                    new_rew['comment'] = cur_rew['comment']
                    new_rew['plus'] = cur_rew['plus']
                    new_rew['minus'] = cur_rew['minus']
                    new_rew['summary_opinion'] = cur_rew['summary_opinion']
                    new_rew['name'] = cur_rew['name']
                    try:
                        new_rew['answers'] = [{
                            'name': comm['author'],
                            'comment': comm['comment'],
                            'date': datetime.fromtimestamp(comm['unix_date']).timestamp(),
                            'usual_date': datetime.fromtimestamp(comm['unix_date']).strftime("%Y-%m-%d")
                        } for comm in cur_rew['comments']]
                    except:
                        new_rew['answers'] = []
                    new_rew['rating'] = cur_rew['rating']
                    reviews.append(new_rew)

    with open(f"../parsed/{source}_reviews.json", "w", encoding="utf-8") as f:
        json.dump(reviews, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    compare_files('e1card')










