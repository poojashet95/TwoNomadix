# Travel Planner Backend

FastAPI + Neo4j Python driver + CognoDB.

## Run

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python -m app.seed.seed_data
uvicorn app.main:app --reload
```

Windows activation:

```powershell
.venv\Scripts\activate
```

API docs: http://localhost:8000/docs
