Запустить фронтенд:

npm install
npm start

Запустить бекенд:

cd backend
python -m venv venv
venv/scripts/activate
pip install requirements.txt
uvicorn ppr_api:app --reload