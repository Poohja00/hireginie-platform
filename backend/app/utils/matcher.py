"""
matcher.py

This file calculates similarity between:
Job Description (JD)
Candidate Resume (CV)

This is the core logic behind ATS candidate scoring.
"""

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_match_score(resume_text, job_description):

    """
    This function compares resume text with job description
    and returns a similarity score.
    """

    documents = [resume_text, job_description]

    # Convert text to numerical vectors
    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(documents)

    # Calculate similarity
    similarity = cosine_similarity(vectors[0:1], vectors[1:2])

    score = similarity[0][0]

    # Convert to percentage
    return round(score * 100, 2)