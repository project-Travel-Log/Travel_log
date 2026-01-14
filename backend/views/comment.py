from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from backend import db
from backend.models import Comment, Review, MyTravelLog, User, Like  # 모델 임포트
from datetime import datetime, timezone, timedelta
import json

bp = Blueprint("comment", __name__)

# 한국 시간
KST = timezone(timedelta(hours=9))

# 댓글 조회
@bp.route("/comments/<target_type>/<int:target_id>", methods=["GET"])
@jwt_required(optional=True)
def get_comments(target_type, target_id):
    user_id = get_jwt_identity()  # 로그인 안 했으면 None

    if target_type == "review":
        comments = (Comment.query
                    .filter_by(target_type="review", target_id=target_id)
                    .order_by(Comment.created_at.desc())
                    .all())
    elif target_type == "travelLog":
        comments = (Comment.query
                    .filter_by(target_type="travelLog", target_id=target_id)
                    .order_by(Comment.created_at.desc())
                    .all())
    else:
        return jsonify({"message": "Invalid target type"}), 400

    comment_list = []
    for c in comments:
        liked = False
        if user_id:
            liked = Like.query.filter_by(
                user_id=user_id,
                target_type="comment",
                target_id=c.id
            ).first() is not None

        comment_list.append({
            "id": c.id,
            "content": c.content,
            "created_at": c.created_at.astimezone(KST).strftime("%Y년 %m월 %d일 %H:%M"),
            "user": {
                "id": c.user.id,
                "username": c.user.username,
                "profile_img": c.user.profile_image
            },
            "like_count": c.like_count,
            "liked": liked  # ✅ 추가
        })

    return jsonify(comment_list), 200


# 댓글 작성
@bp.route("/comments/<target_type>/<int:target_id>", methods=["POST"])
@jwt_required()
def create_comment(target_type, target_id):
    user_id = get_jwt_identity()
    data = request.get_json()
    content = data.get("content")

    if not content:
        return jsonify({"message": "댓글 내용을 입력해주세요."}), 400

    # 댓글 작성 대상 확인
    if target_type == "review":
        target = Review.query.get_or_404(target_id)
    elif target_type == "travelLog":
        target = MyTravelLog.query.get_or_404(target_id)
    else:
        return jsonify({"message": "Invalid target type"}), 400

    comment = Comment(
        content=content,
        user_id=user_id,
        target_type=target_type,
        target_id=target_id
    )
    db.session.add(comment)
    db.session.commit()

    return jsonify({
        "id": comment.id,
        "content": comment.content,
        "created_at": comment.created_at.astimezone(KST).strftime("%Y년 %m월 %d일 %H:%M"),
        "user": {
            "id": comment.user.id,
            "username": comment.user.username,
            "profile_img": comment.user.profile_image
        },
        "like_count": comment.like_count
    }), 201
