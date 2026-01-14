from flask import Blueprint

from flask import Blueprint, request, jsonify
from sqlalchemy.sql import func
from backend.models import Places, Review
import json

bp = Blueprint('main', __name__)

@bp.route("/", methods=["GET"])
def main():
    def get_random_place(place_type, limit):
        places = (
            Places.query
            .filter_by(type=place_type)
            .order_by(func.random())
            .limit(limit)
            .all()
        )

        return [
            {
                "id": place.id,
                "type": place.type,
                "image": json.loads(place.image_urls),
            }
            for place in places
        ]

    def get_random_reviews(limit):
        reviews = (
            Review.query
            .order_by(func.random())
            .limit(limit)
            .all()
        )

        return [
            {
                "id": r.id,
                "title": r.title,
                "image": json.loads(r.review_image),
                "content": r.content,
            }
            for r in reviews
        ]

    return jsonify({
        "travel": get_random_place("travel", 3),
        "activity": get_random_place("activity", 6),
        "festival": get_random_place("festival", 8),
        "reviews": get_random_reviews(3)
    }), 200