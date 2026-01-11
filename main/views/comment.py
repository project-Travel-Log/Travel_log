from time import timezone

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from main import db
from main.models import Comment, Like

bp = Blueprint('comment', __name__)

@bp.route("/review/<int:review_id>", methods=["GET"])
@jwt_required(optional=True)
def get_comments(review_id):
    user_id = get_jwt_identity()

    comments = Comment.query.filter_by(
        review_id=review_id,
        parent_id=None
    ).order_by(Comment.created_at.asc()).all()

    def serialize(c):
        liked = False
        if user_id:
            liked = Like.query.filter_by(
                user_id=user_id,
                target_type="comment",
                target_id=c.id
            ).first() is not None

        return {
            "id": c.id,
            "content": c.content,
            "like_count": c.like_count,
            "liked": liked,
            "created_at": c.created_at.astimezone(timezone.utc).strftime("%Y-%m-%d"),
            "user": {
                "id": c.user.id,
                "username": c.user.username,
                "profile_img": c.user.profile_img
            },
            "replies": [serialize(r) for r in c.replies]
        }

    return jsonify([serialize(c) for c in comments])

@bp.route("/review/<int:review_id>", methods=["POST"])
@jwt_required()
def create_comment(review_id):
    user_id = get_jwt_identity()
    if not user_id:
        return jsonify({"message": "로그인이 필요합니다."}), 401

    data = request.get_json()  # JSON으로 받음
    if not data or "content" not in data or not data["content"].strip():
        return jsonify({"message": "댓글 내용이 필요합니다."}), 400

    print(data.get("content"))

    comment = Comment(
        content=data["content"].strip(),
        review_id=review_id,
        parent_id=data.get("parent_id"),
        user_id=user_id
    )

    try:
        db.session.add(comment)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({
            "message": "DB 저장 실패",
            "error": str(e),
            "data": data,
            "user_id": user_id,
            "review_id": review_id
        }), 500

    return jsonify({
        "message": "댓글 등록 성공",
        "comment": {
            "id": comment.id,
            "content": comment.content,
            "review_id": comment.review_id,
            "parent_id": comment.parent_id,
            "user_id": comment.user_id,
            "created_at": comment.created_at.isoformat()
        }
    })

# @bp.route("/<int:comment_id>", methods=["PUT"])
# @jwt_required()
# def update_comment(comment_id):
#     user_id = get_jwt_identity()
#     comment = Comment.query.get_or_404(comment_id)
#
#     if comment.user_id != user_id:
#         return jsonify({"message": "권한 없음"}), 403
#
#     comment.content = request.json["content"]
#     db.session.commit()
#     return jsonify({"message": "updated"})
#
# @bp.route("/<int:comment_id>", methods=["DELETE"])
# @jwt_required()
# def delete_comment(comment_id):
#     user_id = get_jwt_identity()
#     comment = Comment.query.get_or_404(comment_id)
#
#     if comment.user_id != user_id:
#         return jsonify({"message": "권한 없음"}), 403
#
#     db.session.delete(comment)
#     db.session.commit()
#     return jsonify({"message": "deleted"})
#
