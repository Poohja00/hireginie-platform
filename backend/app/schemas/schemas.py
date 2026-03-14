"""
schemas.py

Schemas define the structure of data sent to and from the API.
Think of them as rules for what data is allowed in requests.
"""

from pydantic import BaseModel


# This schema is used when creating a new user
# It defines what data the API expects during registration
class UserCreate(BaseModel):

    # Name of the user
    name: str

    # Email must be unique in the system
    email: str

    # Password will later be hashed before saving
    password: str

    # Role defines what type of user this is
    # admin / freelancer / employee / client
    role: str


# This schema is used for LOGIN
# The user only needs email and password
class UserLogin(BaseModel):

    # Email used to identify the user
    email: str

    # Password entered by the user
    password: str

    role: str

# -------------------------------------------------------------
# COMPANY SCHEMA
# -------------------------------------------------------------
# This schema defines what data is required when creating a company

class CompanyCreate(BaseModel):

    # Company name
    name: str

    # Company website
    website: str

    # Industry type (tech, finance, healthcare etc)
    industry: str
    # -------------------------------------------------------------
# JOB SCHEMA
# -------------------------------------------------------------
# Defines the data required to create a job

class JobCreate(BaseModel):

    # Job title
    title: str

    # Job description
    description: str

    # Job location
    location: str

    # Company that owns this job
    company_id: int

    # Project this job belongs to
    project_id: int

# -------------------------------------------------------------
# CANDIDATE SCHEMA
# -------------------------------------------------------------
# This schema defines what data is needed to create a candidate

class CandidateCreate(BaseModel):

    # Candidate full name
    name: str

    # Candidate email
    email: str

    # Candidate phone number
    phone: str

    # Resume link (later this will become a file upload)
    resume_url: str

# -------------------------------------------------------------
# EMPLOYEE CREATE SCHEMA
# -------------------------------------------------------------
# This defines the data format required when creating an employee.

class EmployeeCreate(BaseModel):

    name: str
    email: str
    phone: str
    employee_code: str
    designation: str
    department: str
# -------------------------------------------------------------
# CANDIDATE SUBMISSION SCHEMA
# -------------------------------------------------------------
# This defines the data required when a recruiter submits a candidate
# for a job.

class SubmissionCreate(BaseModel):

    candidate_id: int
    job_id: int
    recruiter_id: int
    sourcing_code: str
    calling_code: str

# -------------------------------------------------------------
# SUBMISSION STAGE UPDATE SCHEMA
# -------------------------------------------------------------
# Used when a client manager moves a candidate to a new stage.

class SubmissionStageUpdate(BaseModel):

    submission_id: int
    stage: str
    status: str

# -------------------------------------------------------------
# SUBMISSION STATUS UPDATE SCHEMA
# -------------------------------------------------------------
# Used when a client manager shortlists or rejects a candidate.

class SubmissionStatusUpdate(BaseModel):

    submission_id: int
    status: str   # shortlist / rejected

# -------------------------------------------------------------
# SUBMISSION CREATE SCHEMA
# -------------------------------------------------------------
# Used when recruiter submits candidate to a job

from pydantic import BaseModel

class SubmissionCreate(BaseModel):

    candidate_id: int

    job_id: int

    sourcing_code: str

    calling_code: str

    class SubmitCandidateRequest(BaseModel):
    candidate_id: int