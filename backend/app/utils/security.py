"""
security.py

Handles password hashing and verification.
"""

from passlib.context import CryptContext

# This object handles password hashing and verification
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Function to hash passwords before storing in database
def hash_password(password: str):

    # Convert plain password into hashed password
    # This protects user credentials
    return pwd_context.hash(password)


# Function to verify password during login
def verify_password(plain_password, hashed_password):

    # Compare plain password with hashed password stored in DB
    return pwd_context.verify(plain_password, hashed_password)