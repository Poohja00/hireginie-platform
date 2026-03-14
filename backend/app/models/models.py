"""
models.py

This file defines all database tables for the Hireginie platform.
Each Python class = one PostgreSQL table.
"""

# ============================================================
# IMPORTS
# ============================================================

from sqlalchemy import Column, Integer, String, TIMESTAMP, text
from sqlalchemy import UniqueConstraint
from app.database import Base


# ============================================================
# USERS TABLE
# ============================================================

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))

    email = Column(String(150), unique=True, index=True)

    # IMPORTANT: matches database column
    password_hash = Column(String(255))

    role = Column(String(50))

    sourcing_code = Column(String(10), unique=True)

    calling_code = Column(String(10), unique=True)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# COMPANY TABLE
# ============================================================

class Company(Base):

    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200))

    website = Column(String(200))

    industry = Column(String(100))


# ============================================================
# PROJECT TABLE
# ============================================================

class Project(Base):

    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200))

    company_id = Column(Integer)

    client_manager_id = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# JOB TABLE
# ============================================================

class Job(Base):

    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200))

    description = Column(String)

    location = Column(String(100))

    company_id = Column(Integer)

    project_id = Column(Integer)

    status = Column(String(50), default="open")


# ============================================================
# CANDIDATE TABLE
# ============================================================

class Candidate(Base):

    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    client_name = Column(String)

    position = Column(String)

    source = Column(String)

    resume_path = Column(String)

    contact = Column(String)

    location = Column(String)

    status = Column(String)

    current_ctc = Column(String)

    expected_ctc = Column(String)

    remark = Column(String)

    recruiter_id = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# APPLICATION TABLE
# ============================================================

class Application(Base):

    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(Integer)

    job_id = Column(Integer)

    stage = Column(String(50))

    status = Column(String(50))


# ============================================================
# EMPLOYEE TABLE
# ============================================================

class Employee(Base):

    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200))

    email = Column(String(200), unique=True)

    phone = Column(String(50))

    employee_code = Column(String(20), unique=True)

    designation = Column(String(100))

    department = Column(String(100))

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# SUBMISSION TABLE
# ============================================================

class Submission(Base):

    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)

    candidate_id = Column(Integer)

    job_id = Column(Integer)

    sourcing_code = Column(String(10))

    calling_code = Column(String(10))

    stage = Column(String(50), default="submitted")

    status = Column(String(50), default="active")

    domain_comment = Column(String(500))

    client_comment = Column(String(500))

    rejection_date = Column(String(50))

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# PIPELINE STAGES
# ============================================================

class PipelineStage(Base):

    __tablename__ = "pipeline_stages"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100))

    stage_order = Column(Integer)


# ============================================================
# STARRED JOBS
# ============================================================

class StarredJob(Base):

    __tablename__ = "starred_jobs"

    id = Column(Integer, primary_key=True, index=True)

    employee_id = Column(Integer)

    job_id = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )

    __table_args__ = (
        UniqueConstraint('employee_id', 'job_id'),
    )


# ============================================================
# SUBMISSION TIMELINE
# ============================================================

class SubmissionTimeline(Base):

    __tablename__ = "submission_timeline"

    id = Column(Integer, primary_key=True, index=True)

    submission_id = Column(Integer)

    action = Column(String(100))

    employee_id = Column(Integer)

    comment = Column(String)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# CHAT ROOMS
# ============================================================

class ChatRoom(Base):

    __tablename__ = "chat_rooms"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(200))

    room_type = Column(String(50))

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# CHAT ROOM MEMBERS
# ============================================================

class ChatRoomMember(Base):

    __tablename__ = "chat_room_members"

    id = Column(Integer, primary_key=True, index=True)

    room_id = Column(Integer)

    employee_id = Column(Integer)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )


# ============================================================
# CHAT MESSAGES
# ============================================================

class ChatMessage(Base):

    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)

    room_id = Column(Integer)

    sender_id = Column(Integer)

    message = Column(String)

    created_at = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP")
    )