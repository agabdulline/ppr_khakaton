Правильный бекенд тут

для запуска сервера:


.venv/scripts/activate
pip install -r requirements.txt
cd scripts
uvicorn ppr_api:app --reload --host 0.0.0.0 --port 8000

так же необходимо запустить базу данных mysql с дампом бд (ppr.sql) и при необходимости указать ее данные в .env

