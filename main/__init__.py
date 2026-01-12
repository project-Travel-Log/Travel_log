from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_marshmallow import Marshmallow
from flask_cors import CORS

from . import config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
ma = Marshmallow()

def create_app():
    app = Flask(__name__)
    app.config.from_object(config)


    # ORM, JWT, CORS
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    ma.init_app(app)
    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    # 블루프린트
    from .views import main_views, auth_views, place_views, user_views, review, wishlist,chatbot_views,like,mytravellog,comment
    app.register_blueprint(main_views.bp, url_prefix='/api')
    app.register_blueprint(auth_views.bp, url_prefix='/api')
    app.register_blueprint(place_views.bp, url_prefix='/api')
    app.register_blueprint(user_views.bp, url_prefix='/api')
    app.register_blueprint(review.bp, url_prefix='/api')
    app.register_blueprint(wishlist.bp, url_prefix='/api')
    app.register_blueprint(like.bp, url_prefix='/api')
    app.register_blueprint(chatbot_views.bp, url_prefix='/api')
    app.register_blueprint(mytravellog.bp, url_prefix='/api')
    app.register_blueprint(comment.bp, url_prefix='/api')
    return app