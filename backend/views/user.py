import os
import uuid

from flask import Blueprint, jsonify,request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from sqlalchemy.sql import func
from backend import db
import json


from backend.models import User, Places, Review, Wishlist

bp = Blueprint("mypage", __name__)
@bp.route("/mypage", methods=["GET"])
@jwt_required()
def mypage():
    userid = get_jwt_identity()
    user = User.query.get(userid)
    if not user:
        return jsonify({"message":"회원이 아닙니다."})

    places =(
        Places.query
        .filter(Places.type == "travel")
        .order_by(func.random())
        .limit(3)
        .all()
    )
    review = (
        Review.query.filter(Review.user_id == user.id).all()
    )
    wishlist = (
        db.session.query(Places)
        .join(Wishlist, Wishlist.places_id == Places.id)
        .filter(Wishlist.user_id == user.id)
        .all()
    )

    return jsonify({
        "user":{
            "id":user.id,
            "userid":user.userid,
            "username":user.username,
            "gender":user.gender,
            "email":user.email,
            "phone":user.phone,
            "user_img": user.profile_image
        },
        "recommend": [
            {
                "id": p.id,
                "name": p.name,
                "address": p.address,
                "closed_days": p.closed_days,
                "amenities": p.amenities,
                "image": json.loads(p.image_urls)
            }
            for p in places
        ],
        "review":[
            {
            "id": r.id,
            "title": r.title,
            "image": json.loads(r.review_image),
            "content": r.content,
        }
        for r in review
        ],
        "wishlist": [
            {
                "id": w.id,
                "name": w.name,
                "image": json.loads(w.image_urls),
            }
            for w in wishlist

        ]


    }), 200

ALLOWED_EXT = {'png', 'jpg', 'jpeg', 'gif'}

@bp.route("/mypagemodify", methods=["GET"])
@jwt_required()
def mypagemodify():
    userid = get_jwt_identity()
    user = User.query.get(userid)
    if not user:
        return jsonify({"message": "회원이 아닙니다."})
    return jsonify({
        "id":user.id,
        "userid":user.userid,
        "username": user.username,
        "gender": user.gender,
        "email": user.email,
        "phone": user.phone,
        "user_img": user.profile_image,
    })

@bp.route("/mypagemodify", methods=["PUT"])
@jwt_required()
def mypage_put():
    user = User.query.get(get_jwt_identity())

    username = request.form.get("username")
    email = request.form.get("email")
    phone = request.form.get("phone")

    # 닉네임 중복 체크
    if username and username != user.username:
        if User.query.filter_by(username=username).first():
            return jsonify({"message": "이미 사용중인 닉네임입니다."}), 409
        user.username = username

    # 이메일 중복 체크
    if email and email != user.email:
        if User.query.filter_by(email=email).first():
            return jsonify({"message": "이미 사용중인 이메일입니다."}), 409
        user.email = email

    if phone and phone != user.phone:
        if User.query.filter_by(phone=phone).first():
            return jsonify({"message": "이미 사용중인 전화번호입니다."}), 409
        user.phone = phone

    image = request.files.get("profile_image")

    if image and image.filename != '':
        filename = secure_filename(image.filename)
        ext = filename.rsplit('.', 1)[-1].lower()

        if ext not in ALLOWED_EXT:
            return jsonify({"message": "사용불가 이미지입니다."}), 400

        image_filename = f"{uuid.uuid4()}.{ext}"

        upload_path = os.path.join(
            current_app.root_path,
            "static/user_img",
            image_filename
        )

        os.makedirs(os.path.dirname(upload_path), exist_ok=True)
        image.save(upload_path)

        user.profile_image = f"user_img/{image_filename}"

    db.session.commit()
    return jsonify({"message": "회원 정보 수정 완료"})

@bp.route("/mypagemodify", methods=["DELETE"])
@jwt_required()
def mypage_delete():
    user = User.query.get(get_jwt_identity())

    if not user:
        return jsonify({"message":"회원이 아닙니다."})

    if user.profile_image and user.profile_image != "user_img/default.png":
        image_path = os.path.join(
            current_app.root_path,
            "static",
            user.profile_image
        )

        if os.path.exists(image_path):
            os.remove(image_path)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "회원 탈퇴 완료"})

