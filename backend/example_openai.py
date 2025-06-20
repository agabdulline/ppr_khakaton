import requests
import json

API_KEY = 'shds-j46MROOAmFvYUakWMoBsSYCCI2M'
URL = 'https://gptunnel.ru/v1/chat/completions'

headers = {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
}

# Ввод отзыва
user_feedback = input("Введите отзыв клиента:\n")

# Формируем запрос
messages = [
    {
        'role': 'system',
        'content': (
            "Ты NLP-ассистент для финтех-компании B2B-сегмента. "
            "Проанализируй отзыв клиента и верни JSON следующей структуры:\n"
            "{\n"
            "  \"тональность\": \"позитивная | нейтральная | негативная\",\n"
            "  \"аспекты\": [\"аспект1\", \"аспект2\", ...],\n"
            "  \"рекомендации\": [\"рекомендация1\", \"рекомендация2\", ...]\n"
            "}\n"
            "Если отзыв негативный и про нашу компанию — напиши, как улучшить.\n"
            "Если про конкурента — напиши, как мы можем закрыть эту боль.\n"
            "Если позитивный — выдели, что сработало хорошо."
        )
    },
    {
        'role': 'user',
        'content': user_feedback
    }
]

# Отправка запроса
response = requests.post(URL, headers=headers, json={'model': 'gpt-4o-mini', 'messages': messages})

# Вывод результата
if response.status_code == 200:
    result = response.json()
    reply = result['choices'][0]['message']['content']
    try:
        parsed = json.loads(reply)
        print(json.dumps(parsed, indent=2, ensure_ascii=False))
    except json.JSONDecodeError:
        print("Ответ не в формате JSON, выводим как есть:\n", reply)
else:
    print('Ошибка:', response.status_code, response.text)
