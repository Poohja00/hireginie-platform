"""
auth_router.py

Handles authentication APIs.
"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.models import User
from app.schemas.schemas import UserCreate, UserLogin
from app.utils.security import hash_password, verify_password

router = APIRouter()


# ============================================================
# GENERATE RECRUITER CODES
# ============================================================

def generate_recruiter_codes(db: Session):

    count = db.query(User).count() + 1

    sourcing_code = f"SRC{count:03}"
    calling_code = f"CALL{count:03}"

    return sourcing_code, calling_code


# ============================================================
# REGISTER USER
# ============================================================

@router.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_pw = hash_password(user.password)

    sourcing_code = None
    calling_code = None

    # Only recruiters get codes
    if user.role == "employee":
        sourcing_code, calling_code = generate_recruiter_codes(db)

    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hashed_pw,
        role=user.role,
        sourcing_code=sourcing_code,
        calling_code=calling_code
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user_id": new_user.id
    }


# ============================================================
# LOGIN USER
# ============================================================

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    password_valid = verify_password(
        user.password,
        db_user.password_hash
    )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "name": db_user.name,
        "employee_code": db_user.sourcing_code or db_user.calling_code,
        "role": db_user.role
    }