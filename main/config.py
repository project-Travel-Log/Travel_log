import os

BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = 'sqlite:///{}'.format(os.path.join(BASE_DIR, 'Travel.db'))
SQLALCHEMY_TRACK_MODIFICATIONS = False

JWT_SECRET_KEY = "super-secret-key"

JWT_TOKEN_LOCATION = ["headers"]
JWT_HEADER_NAME = "Authorization"
JWT_HEADER_TYPE = "Bearer"

JWT_ACCESS_TOKEN_EXPIRES = False  # (테스트 중엔 만료 꺼두기)
