import os
import uuid

from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash
from werkzeug.utils import secure_filename
from marshmallow import ValidationError
from main import db
from main.models import User
from main.schemas.user_schema import UserCreateSchema
from main.schemas.login_schema import LoginSchema


bp = Blueprint('auth', __name__)

ALLOWED_EXT = {'png', 'jpg', 'jpeg', 'gif'}
DEFAULT_IMAGE = 'default.jpg'

@bp.route("/signUp", methods=["POST"])
def signUp():
    print("젭ㄹ")
    signSchema = UserCreateSchema()

    try:
        data = signSchema.load(request.form.to_dict())
    except ValidationError as err:
        return jsonify({
            'message' : "입력값 오류",
            'errors' : err.messages
        })
    if User.query.filter_by(userid=data['userid']).first():
        return jsonify({'message': '이미 존재하는  아이디'})
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': '이미 존재하는 닉네임'})
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': '이미 존재하는 이메일'})
    
    if User.query.filter_by(phone=data['phone']).first():
        return jsonify({'message': '이미 존재하는 전화번호'})
    
    hashed_pw = generate_password_hash(data['password'])
    
    image = request.files.get("profile_image")
    
    if image and image.filename !='':
        filename = secure_filename(image.filename)
        ext = filename.rsplit('.',1)[-1].lower()

        if ext not in ALLOWED_EXT:
            return jsonify({"message": "사용불가 이미지입니다."})
        image_filename = f"{uuid.uuid4()}.{ext}"

        upload_path = os.path.join(
            current_app.root_path,
            "static/user_img",
            image_filename
        )
        image.save(upload_path)
    else:
        image_filename = DEFAULT_IMAGE

    user = User(
        userid = data['userid'],
        username = data['username'],
        password = hashed_pw,
        email = data['email'],
        phone = data['phone'],
        gender = data['gender'],
        profile_image = image_filename
        )
    db.session.add(user)
    print('db전')
    db.session.commit()
    print('db후')
    return {'message': '회원 가입 성공' },201


@bp.route("/check", methods=["POST"])
def check_duplicate():
    data = request.get_json()

    field = data.get('field')
    value = data.get('value')

    if not field or not value:
        return jsonify({'message' : '잘못된 요청'}), 400

    field_map = {
        'userid' : User.userid,
        'username' : User.username,
        'email' : User.email,
        'phone' : User.phone,
    }


    if field not in field_map:
        return jsonify({'message' : '허용되지 않은 필드'})

    exists = User.query.filter(field_map[field] == value).first()

    return jsonify({'available' : False if exists else True})