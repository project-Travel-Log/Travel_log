from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS
import os

from . import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)

    app.secret_key = os.getenv(
        "FLASK_SECRET_KEY",
        "dev-secret-key-change-me"
    )

    # ORM, JWT, CORS
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": ["http://localhost","http://localhost:3000","http://localhost:80"]}})

    # 블루프린트
    from .views import main, auth, place, user, review, wishlist,chatbots,like,mytravellog,comment
    app.register_blueprint(main.bp, url_prefix='/api')
    app.register_blueprint(auth.bp, url_prefix='/api')
    app.register_blueprint(place.bp, url_prefix='/api')
    app.register_blueprint(user.bp, url_prefix='/api')
    app.register_blueprint(review.bp, url_prefix='/api')
    app.register_blueprint(wishlist.bp, url_prefix='/api')
    app.register_blueprint(like.bp, url_prefix='/api')
    app.register_blueprint(chatbots.bp, url_prefix='/api')
    app.register_blueprint(mytravellog.bp, url_prefix='/api')
    app.register_blueprint(comment.bp, url_prefix='/api')
    return app