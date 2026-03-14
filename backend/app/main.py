"""
main.py

Boots the FastAPI server for Hireginie ATS.
"""

# ============================================================
# IMPORTS
# ============================================================

from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import shutil
import os

# Database
from app.database import engine, Base, get_db

# Models
from app.models import models

# Schemas
from app.schemas import schemas

# Routers
from app.routers.auth_router import router as auth_router
from app.routers.chat_router import router as chat_router
from app.routers import candidate_router

# AI utilities
from app.utils.resume_parser import parse_resume
from app.utils.matcher import calculate_match_score


# ============================================================
# CREATE DATABASE TABLES
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# CREATE FASTAPI APP
# ============================================================

app = FastAPI(
    title="Hireginie API",
    description="Recruitment Operating System Backend",
    version="1.0"
)


# ============================================================
# ENABLE CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REGISTER ROUTERS
# ============================================================

app.include_router(auth_router)
app.include_router(chat_router)
app.include_router(candidate_router.router)


# ============================================================
# HOME ROUTE
# ============================================================

@app.get("/")
def home():
    return {"message": "Hireginie API is running"}


# ============================================================
# COMPANY
# ============================================================

@app.post("/company/create")
def create_company(company: schemas.CompanyCreate, db: Session = Depends(get_db)):

    new_company = models.Company(
        name=company.name,
        website=company.website,
        industry=company.industry
    )

    db.add(new_company)
    db.commit()
    db.refresh(new_company)

    return {
        "message": "Company created successfully",
        "company_id": new_company.id
    }


# ============================================================
# PROJECT
# ============================================================

@app.post("/project/create")
def create_project(project_name: str, company_id: int, client_manager_id: int, db: Session = Depends(get_db)):

    new_project = models.Project(
        name=project_name,
        company_id=company_id,
        client_manager_id=client_manager_id
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {
        "message": "Project created successfully",
        "project_id": new_project.id
    }


# ============================================================
# GET ALL PROJECTS
# ============================================================

@app.get("/projects")
def get_projects(db: Session = Depends(get_db)):

    projects = db.query(models.Project).all()

    results = []

    for project in projects:

        company = db.query(models.Company).filter(
            models.Company.id == project.company_id
        ).first()

        results.append({
            "id": project.id,
            "name": project.name,
            "company": company.name if company else None,
            "client_manager_id": project.client_manager_id
        })

    return results


# ============================================================
# JOBS
# ============================================================

@app.post("/job/create")
def create_job(job: schemas.JobCreate, db: Session = Depends(get_db)):

    new_job = models.Job(
        title=job.title,
        description=job.description,
        location=job.location,
        company_id=job.company_id,
        project_id=job.project_id,
        status="open"
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job created successfully",
        "job_id": new_job.id
    }


# ============================================================
# GET JOBS FOR PROJECT
# ============================================================

@app.get("/project/{project_id}/jobs")
def get_project_jobs(project_id: int, db: Session = Depends(get_db)):

    jobs = db.query(models.Job).filter(
        models.Job.project_id == project_id
    ).all()

    results = []

    for job in jobs:
        results.append({
            "job_id": job.id,
            "title": job.title,
            "location": job.location
        })

    return results


# ============================================================
# GET ALL JOBS
# ============================================================

@app.get("/jobs")
def get_all_jobs(db: Session = Depends(get_db)):

    jobs = db.query(models.Job).all()

    results = []

    for job in jobs:
        results.append({
            "id": job.id,
            "title": job.title,
            "location": job.location,
            "project_id": job.project_id
        })

    return results

# ============================================================
# JOB TRACKER
# ============================================================

@app.get("/tracker/job/{job_id}")
def get_job_tracker(job_id: int, db: Session = Depends(get_db)):

    submissions = db.query(models.Submission).filter(
        models.Submission.job_id == job_id
    ).all()

    results = []

    for sub in submissions:

        candidate = db.query(models.Candidate).filter(
            models.Candidate.id == sub.candidate_id
        ).first()

        results.append({
            "submission_id": sub.id,
            "candidate_name": candidate.name if candidate else "Unknown",
            "sourcing_code": sub.sourcing_code,
            "calling_code": sub.calling_code,
            "status": sub.stage,
            "domain_comment": sub.domain_comment,
            "client_remarks": sub.client_comment,
            "rejection_date": sub.rejection_date,
            "created_at": sub.created_at
        })

    return results

    # ============================================================
# JOB PIPELINE STATS
# ============================================================

@app.get("/job/{job_id}/stats")
def get_job_stats(job_id: int, db: Session = Depends(get_db)):

    submissions = db.query(models.Submission).filter(
        models.Submission.job_id == job_id
    ).all()

    total = len(submissions)

    submitted = len([s for s in submissions if s.stage == "submitted"])
    screening = len([s for s in submissions if s.stage == "screening"])
    interview = len([s for s in submissions if s.stage == "interview"])
    offer = len([s for s in submissions if s.stage == "offer"])
    rejected = len([s for s in submissions if s.status == "rejected"])

    return {
        "total_candidates": total,
        "submitted": submitted,
        "screening": screening,
        "interview": interview,
        "offer": offer,
        "rejected": rejected
    }
# ============================================================
# EMPLOYEE
# ============================================================

@app.post("/employee/create")
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):

    existing_employee = db.query(models.Employee).filter(
        models.Employee.email == employee.email
    ).first()

    if existing_employee:
        raise HTTPException(status_code=400, detail="Employee already exists")

    new_employee = models.Employee(
        name=employee.name,
        email=employee.email,
        phone=employee.phone,
        employee_code=employee.employee_code,
        designation=employee.designation,
        department=employee.department
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return {
        "message": "Employee created successfully",
        "employee_id": new_employee.id
    }


# ============================================================
# RESUME UPLOAD
# ============================================================

@app.post("/candidate/upload-resume")
def upload_resume(file: UploadFile = File(...)):

    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    file_path = os.path.join(upload_folder, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "message": "Resume uploaded successfully",
        "file_path": file_path
    }


# ============================================================
# PARSE RESUME
# ============================================================

@app.post("/candidate/parse-resume")
def parse_resume_api(file_path: str):

    resume_text = parse_resume(file_path)

    return {
        "resume_preview": resume_text[:1000]
    }


# ============================================================
# MATCH RESUME TO JOB
# ============================================================

@app.post("/candidate/match-score")
def match_resume_to_job(file_path: str, job_description: str):

    resume_text = parse_resume(file_path)
    score = calculate_match_score(resume_text, job_description)

    return {
        "match_score": score
    }


# ============================================================
# ADMIN DASHBOARD
# ============================================================

@app.get("/admin/dashboard")
def admin_dashboard(db: Session = Depends(get_db)):

    projects = db.query(models.Project).all()
    jobs = db.query(models.Job).all()
    candidates = db.query(models.Candidate).all()
    submissions = db.query(models.Submission).all()

    hired = len([s for s in submissions if s.stage == "hired"])

    return {

        "projects": len(projects),
        "jobs": len(jobs),
        "candidates": len(candidates),
        "hires": hired,

        "pipeline": {
            "submitted": len([s for s in submissions if s.stage == "submitted"]),
            "screening": len([s for s in submissions if s.stage == "screening"]),
            "interview": len([s for s in submissions if s.stage == "interview"]),
            "offer": len([s for s in submissions if s.stage == "offer"]),
            "hired": hired,
            "rejected": len([s for s in submissions if s.status == "rejected"])
        }

    }