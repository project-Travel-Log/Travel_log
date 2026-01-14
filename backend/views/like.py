from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from backend import db
from backend.models import Like, Review, Comment, MyTravelLog

bp = Blueprint('like',__name__)


@bp.route("/like", methods=["POST"])
@jwt_required()
def toggle_like():
    user_id = get_jwt_identity()
    data = request.get_json()

    target_type = data.get("target_type")  # review / travel_log / comment
    target_id = data.get("target_id")

    if not target_type or not target_id:
        return jsonify({"message": "잘못된 요청"}), 400

    like = Like.query.filter_by(
        user_id=user_id,
        target_type=target_type,
        target_id=target_id
    ).first()

    if like:
        # 좋아요 취소
        db.session.delete(like)
        liked = False
        delta = -1
    else:
        # 좋아요
        like = Like(
            user_id=user_id,
            target_type=target_type,
            target_id=target_id
        )
        db.session.add(like)
        liked = True
        delta = 1

    # 대상 테이블 like_count 증감
    if target_type == "review":
        target = Review.query.get_or_404(target_id)
    elif target_type == "travelLog":
        target = MyTravelLog.query.get_or_404(target_id)
    elif target_type == "comment":
        target = Comment.query.get_or_404(target_id)
    else:
        return jsonify({"message": "알 수 없는 타입"}), 400

    target.like_count += delta
    db.session.commit()

    return jsonify({
        "liked": liked,
        "like_count": target.like_count
    })