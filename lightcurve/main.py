# lightcurve/main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health_check():
    return {"status": "ok"}

# Example endpoint (you can add more later)
@app.get("/example")
def example():
    return {"message": "Lightcurve service is running!"}
