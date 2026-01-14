from datetime import timedelta, datetime, timezone
import math
import os
import uuid
from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import or_
from backend import db
from backend.models import MyTravelLog, Like, User
import json

bp = Blueprint('mytravellog', __name__)
KST = timezone(timedelta(hours=9))

@bp.route('/travelLog', methods=['GET'])
def mytravellog_list():
    page = int (request.args.get('page', 1))
    limit = int (request.args.get('limit', 10))
    keyword = request.args.get('keywords', '').strip()

    offset = (page - 1) * limit

    query = MyTravelLog.query.join(User)

    if keyword:
        query = query.filter(
            or_(
                MyTravelLog.title.ilike(f"%{keyword}%"),
                User.username.ilike(f"%{keyword}%")
            )
        )

    total = query.count()

    mytravellogs = (
        query
        .order_by(MyTravelLog.created_at.desc())
        .offset(offset)
        .limit(limit)
        .all()
    )

    result = []
    for idx, mytravellog in enumerate(mytravellogs, start=1):
        kst_time = mytravellog.created_at.astimezone(KST)

        result.append({
            "no": offset + idx,
            "id": mytravellog.id,
            "title": mytravellog.title,
            "created_at": kst_time.strftime("%Y년 %m월 %d일"),
            "like_count": mytravellog.like_count,
            "user": {
                "id": mytravellog.user.id,
                "username": mytravellog.user.username
            }
        })

    return jsonify({
        "mytravellogs": result,
        "totalPages": math.ceil(total / limit)
    })

@bp.route("/travelLog/<int:mytravellog_id>",methods=['GET','POST'])
@jwt_required(optional=True)
def mytravellog_Detail(mytravellog_id):
    mytravellog = MyTravelLog.query.get_or_404(mytravellog_id)
    kst_time = mytravellog.created_at.astimezone(KST)

    user_id = get_jwt_identity()


    liked = False
    if user_id:
        liked = Like.query.filter_by(
            user_id=user_id,
            target_type="travelLog",
            target_id=mytravellog.id
        ).first() is not None
    return jsonify({
        "id": mytravellog.id,
        "title": mytravellog.title,
        "content": mytravellog.content,
        "image": json.loads(mytravellog.image),

        "like_count": mytravellog.like_count,
        "liked": liked,
        "created_at": kst_time.strftime("%Y년 %m월 %d일 "),

        "user": {
            "id": mytravellog.user.id,
            "username": mytravellog.user.username
        }
    }), 200

@bp.route("/travellog/write", methods=["POST"])
@jwt_required()
def travelLogwWrite():
    user_id = get_jwt_identity()

    title = request.form.get("title")
    content = request.form.get("content")
    files = request.files.getlist("images")

    print(title)
    print(content)
    print(files)

    if not title or not content:
        return jsonify({"message" : "제목과 내용은 필수 입니다."}), 400

    upload_folder = os.path.join(current_app.root_path, "static", "mytravellog_img")
    os.makedirs(upload_folder, exist_ok=True)

    image = []

    if files:
       for file in files:
           if file and file.filename:
               ext = file.filename.rsplit('.',1)[-1]
               filename = f"{uuid.uuid4()}.{ext}"
               save_path = os.path.join(upload_folder, filename)
               file.save(save_path)
               image.append(f"static/mytravellog_img/{filename}")

    if not image:
        image = ["static/mytravellog_img/mytravellog_df.png"]

    kst_now = datetime.now(timezone(timedelta(hours=9)))
    mytravellog = MyTravelLog(
        title=title,
        content=content,
        user_id=user_id,
        image=json.dumps(image),
        created_at = kst_now,
        updated_at = kst_now
    )

    db.session.add(mytravellog)
    db.session.commit()

    return jsonify({
        "message": "나의 여행로그 등록 완료",
        "mytravellog_id": mytravellog.id,
        "image": image
    }), 201