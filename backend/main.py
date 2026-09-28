from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import itertools

app = FastAPI()

# Allow the Next.js dev server to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-memory storage (resets every time the server restarts) ---
tasks: list[dict] = []
id_counter = itertools.count(1)


class Task(BaseModel):
    text: str
    done: bool = False


class TaskUpdate(BaseModel):
    text: Optional[str] = None
    done: Optional[bool] = None


@app.get("/tasks")
def get_tasks():
    return tasks


@app.post("/tasks")
def create_task(task: Task):
    new_task = {"id": next(id_counter), "text": task.text, "done": task.done}
    tasks.append(new_task)
    return new_task


@app.put("/tasks/{task_id}")
def update_task(task_id: int, update: TaskUpdate):
    for t in tasks:
        if t["id"] == task_id:
            if update.text is not None:
                t["text"] = update.text
            if update.done is not None:
                t["done"] = update.done
            return t
    raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    global tasks
    tasks = [t for t in tasks if t["id"] != task_id]
    return {"ok": True}