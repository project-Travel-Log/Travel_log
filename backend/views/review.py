from datetime import timedelta, timezone, datetime
import math
import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from backend import db
from backend.models import Review, Like, User, Comment
import json

bp = Blueprint('review',__name__)


KST = timezone(timedelta(hours=9))

@bp.route("/review", methods=["GET"])
def reviewList():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    keyword = request.args.get("keyword", "").strip()

    offset = (page - 1) * limit

    query = Review.query.join(User)

    if keyword:
        query = query.filter(
            or_(
                Review.title.ilike(f"%{keyword}%"),
                User.username.ilike(f"%{keyword}%")
            )
        )

    total = query.count()

    reviews = (
        query
        .order_by(Review.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    result = []
    for idx, review in enumerate(reviews, start=1):
        kst_time = review.created_at.astimezone(KST)

        result.append({
            "no": offset + idx,
            "id": review.id,
            "title": review.title,
            "created_at": kst_time.strftime("%Y년 %m월 %d일"),
            "like_count": review.like_count,
            "user": {
                "id": review.user.id,
                "username": review.user.username
            }
        })

    return jsonify({
        "reviews": result,
        "totalPages": math.ceil(total / limit)
    })

@bp.route("/review/<int:review_id>",methods=['GET','POST'])
@jwt_required(optional=True)
def reviewDetail(review_id):
    review = Review.query.get_or_404(review_id)
    kst_time = review.created_at.astimezone(KST)

    user_id = get_jwt_identity()


    liked = False
    if user_id:
        liked = Like.query.filter_by(
            user_id=user_id,
            target_type="review",
            target_id=review.id
        ).first() is not None
    return jsonify({
        "id": review.id,
        "title": review.title,
        "content": review.content,
        "review_image": json.loads(review.review_image),

        "like_count": review.like_count,
        "liked": liked,
        "created_at": kst_time.strftime("%Y년 %m월 %d일 "),

        "user": {
            "id": review.user.id,
            "username": review.user.username
        }
    }), 200

@bp.route("/review/write", methods=["POST"])
@jwt_required()
def reviewWrite():
    user_id = get_jwt_identity()

    title = request.form.get("title")
    content = request.form.get("content")
    files = request.files.getlist("images")


    if not title or not content:
        return jsonify({"message" : "제목과 내용은 필수 입니다."}), 400

    upload_folder = os.path.join(current_app.root_path, "static", "review_img")
    os.makedirs(upload_folder, exist_ok=True)

    review_image = []

    if files:
       for file in files:
           if file and file.filename:
               ext = file.filename.rsplit('.',1)[-1]
               filename = f"{uuid.uuid4()}.{ext}"
               save_path = os.path.join(upload_folder, filename)
               file.save(save_path)
               review_image.append(f"static/review_img/{filename}")

    if not review_image:
        review_image = ["static/review_img/review_df.png"]

    kst_now = datetime.now(timezone(timedelta(hours=9)))
    review = Review(
        title=title,
        content=content,
        user_id=user_id,
        review_image=json.dumps(review_image),
        created_at = kst_now,
        updated_at = kst_now
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({
        "message": "리뷰 등록 완료",
        "review_id": review.id,
        "review_image": review_image
    }), 201
