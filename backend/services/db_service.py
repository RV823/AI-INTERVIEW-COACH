import json
import os
import uuid
import datetime

class JSONDatabase:
    """Fallback file-based database if MongoDB is not reachable."""
    def __init__(self, filepath="data/store.json"):
        self.filepath = filepath
        os.makedirs(os.path.dirname(self.filepath), exist_ok=True)
        if not os.path.exists(self.filepath):
            self._save({"users": [], "interviews": [], "resumes": [], "coding_submissions": [], "leaderboard": []})
        self.data = self._load()

    def _load(self):
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {"users": [], "interviews": [], "resumes": [], "coding_submissions": [], "leaderboard": []}

    def _save(self, data=None):
        if data is not None:
            self.data = data
        with open(self.filepath, "w", encoding="utf-8") as f:
            json.dump(self.data, f, indent=2, default=str)

    def insert(self, collection_name, doc):
        if collection_name not in self.data:
            self.data[collection_name] = []
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        doc["created_at"] = doc.get("created_at", datetime.datetime.now(datetime.timezone.utc).isoformat())
        self.data[collection_name].append(doc)
        self._save()
        return doc["_id"]

    def find_one(self, collection_name, query):
        items = self.data.get(collection_name, [])
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                return item
        return None

    def find(self, collection_name, query=None, limit=50):
        items = self.data.get(collection_name, [])
        if not query:
            return items[:limit]
        result = []
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                result.append(item)
        return result[:limit]

    def update_one(self, collection_name, query, update):
        items = self.data.get(collection_name, [])
        for item in items:
            match = True
            for k, v in query.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                if "$set" in update:
                    item.update(update["$set"])
                if "$inc" in update:
                    for k, v in update["$inc"].items():
                        item[k] = item.get(k, 0) + v
                self._save()
                return True
        return False

# Initialize DB connection
def get_db():
    from config import Config
    try:
        from pymongo import MongoClient
        client = MongoClient(Config.MONGO_URI, serverSelectionTimeoutMS=1500)
        client.admin.command('ping')
        print("[Database] Connected to MongoDB Atlas / Local MongoDB")
        db = client.get_default_database()
        return ("mongodb", db)
    except Exception as e:
        print(f"[Database] MongoDB unavailable ({e}). Utilizing File JSON DB Fallback.")
        return ("json", JSONDatabase())

db_type, db_instance = get_db()
