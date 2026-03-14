from fastapi import APIRouter, UploadFile, File, Form, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.models import Candidate

import shutil
import os

router = APIRouter()

# Folder to store resumes
UPLOAD_FOLDER = "uploads/resumes"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# ------------------------------------------------
# CREATE CANDIDATE
# ------------------------------------------------
# Recruiter uploads candidate + resume

@router.post("/candidate/create")
def create_candidate(

    name: str = Form(...),
    client_name: str = Form(...),
    position: str = Form(...),
    source: str = Form(...),

    resume: UploadFile = File(...),

    db: Session = Depends(get_db)

):

    # Save resume file
    file_path = f"{UPLOAD_FOLDER}/{resume.filename}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)

    # Create candidate in database
    candidate = Candidate(

        name=name,
        client_name=client_name,
        position=position,
        source=source,

        resume_path=file_path,

        status="submitted"

    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return {
        "message": "Candidate created successfully",
        "candidate_id": candidate.id
    }


# ------------------------------------------------
# GET ALL CANDIDATES
# ------------------------------------------------

@router.get("/candidates")
def get_candidates(db: Session = Depends(get_db)):

    return db.query(Candidate).all()