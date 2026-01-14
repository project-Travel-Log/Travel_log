from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend import db
from backend.models import Wishlist

bp = Blueprint('wishlist', __name__)
@bp.route("/wishlist", methods=["POST"])
@jwt_required()
def toggle_wishlist():
    user_id = get_jwt_identity()
    places_id = request.json.get("places_id")

    wish = Wishlist.query.filter_by(
        user_id=user_id,
        places_id=places_id
    ).first()

    if wish:
        db.session.delete(wish)
        db.session.commit()
        return jsonify({"wished": False})
    else:
        wish = Wishlist(user_id=user_id, places_id=places_id)
        db.session.add(wish)
        db.session.commit()
        return jsonify({"wished": True})

@bp.route("/wishlist/<int:places_id>", methods=["GET"])
@jwt_required()
def check_wishlist(places_id):
    user_id = get_jwt_identity()
    wish = Wishlist.query.filter_by(user_id=user_id, places_id=places_id).first()
    return jsonify({"wished": bool(wish)})