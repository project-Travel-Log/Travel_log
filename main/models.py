from datetime import datetime, timezone
from email.policy import default

from main import db


#####################################################################################

# Integer = 정수타입

# String(str) = 문자열(문자열 최대치를 정해줘야 함)

# DateTime = 시간

# Boolean = 참, 거짓

# Text = 입력 문자를 그대로 DB 최대치까지 저장 가능(매우 긴 텍스트)

#####################################################################################

# primary_key = 해당 컬럼을 기본키로 설정
#               보통 id 컬럼에 많이 사용함
#               중복, NULL 불가

# unique = 해당 컬럼 값이 테이블 안에서 유일해야함
#          이메일, 주민등록번호 같은 데이터에 주로 사용

# nullable = NULL 값을 허용할지 정할수 있음
#            False로 설정시 값이 들어가야함
#            비울수 없는 컬럼에서 사용해야함

# autoincrement = 정수형 컬럼에서 주로 사용, 새 레코드가 들어올 때마다 값이 자동으로 증가함
#                 주로 id컬럼에서 사용함

# ondelete='CASCADE' = 글 작성자가 탈퇴시 작성했던 글 삭제
#                      그냥 두면 오류가 발생할수 있기 때문에 삭제

# default = 새 레코드를 생성시 DB에 기본으로 들어가는 값

# onupdate = 변경시(수정, 추가) 들어가는 값

# datetime.now(timezone.utc) = 글을 작성하거나 수정시 utc 시간을 기준으로 저장됨 (함수로 작성해야 해서 lambda가 필수로 들어가야 함)

#####################################################################################

class User(db.Model):                                                                                                                                               # 사용자
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # user 테이블에 유저 정보가 저장되면 생성 순서대로 자동으로 만들어짐
    email = db.Column(db.String(50), unique=True, nullable=False)                                                                                                   # 이메일            # 필수입력    # 중복불가
    userid = db.Column(db.String(50), unique=True, nullable=False)                                                                                                  # 아이디            # 필수입력    # 중복불가
    password = db.Column(db.String(300), nullable=False)                                                                                                             # 비밀번호          # 필수입력
    username = db.Column(db.String(80), unique=True, nullable=False)                                                                                                # 닉네임            # 필수입력    # 중복불가
    gender = db.Column(db.String(10), nullable=False)                                                                                                               # 성별              # 필수입력    # enum 값
    phone = db.Column(db.String(30), unique=True, nullable=False)                                                                                                   # 전화번호          # 필수입력    # 중복불가
    profile_image = db.Column(db.String(200), nullable=False, default='user_img/default.jpg')                                                                       # 프로필사진        # 필수입력                기본값있음
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성일            # 자동입력                기본값있음

class Places(db.Model):                                                                                                                                             # 여행지
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # places 테이블에 여행지 정보가 저장되면 생성 순선대로 자동으로 만들어짐
    type = db.Column(db.String(10), nullable=False)                                                                                                                 # 타입설정          # 여행지, 축제, 액티비티 설정
    province = db.Column(db.String(120), nullable=False)                                                                                                            # 도                # 필수입력
    city = db.Column(db.String(120), nullable=False)                                                                                                                # 시/군/구          # 필수입력
    name = db.Column(db.String(120), nullable=False)                                                                                                                # 이름              # 필수입력
    address = db.Column(db.String(200), nullable=False)                                                                                                             # 주소              # 필수입력
    contact_number = db.Column(db.String(50), nullable=True)                                                                                                        # 대표 전화번호
    website_url = db.Column(db.String(200), nullable=True)                                                                                                          # 홈페이지
    closed_days = db.Column(db.String(200), nullable=True)                                                                                                          # 휴무일
    operating_hours = db.Column(db.String(200), nullable=False)                                                                                                     # 운영시간          # 필수입력
    admission_type = db.Column(db.String(10), nullable=False)                                                                                                       # 입장료 유무       # 필수입력      # enum 값
    parking_available = db.Column(db.String(10), nullable=False)                                                                                                    # 주차장 유무       # 필수입력      # enum 값
    parking_fee = db.Column(db.String(120), nullable=True)                                                                                                          # 주차장 요금       # 무료, 유료
    requires_reservation = db.Column(db.String(10), nullable=False)                                                                                                 # 예약 필요 여부    # 필수입력      # enum 값
    amenities = db.Column(db.Text, nullable=True)                                                                                                                   # 부대시설
    description = db.Column(db.Text, nullable=False)                                                                                                                # 소개글           # 필수입력
    image_urls = db.Column(db.Text, nullable=False)                                                                                                                 # 이미지           # 필수입력
    latitude = db.Column(db.Float, nullable=False)                                                                                                                  # 위도            # 필수입력
    longitude = db.Column(db.Float, nullable=False)                                                                                                                 # 경도            # 필수입력
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성시간          # 자동입력      # 기본값있음
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))     # 수정시간          # 자동입력      # 기본값있음

class Review(db.Model):                                                                                                                                             # 후기
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # Review 테이블에 후기가 등록괴면 자동으로 생성
    title = db.Column(db.String(120), nullable=False)                                                                                                               # 제목            # 필수입력
    content = db.Column(db.Text, nullable=False)                                                                                                                    # 내용            # 필수입력
    like_count = db.Column(db.Integer, default=0, nullable=False)                                                                                                                     # 별점            # 필수입력
    review_image = db.Column(db.Text, nullable=False, default='[]')                                                                                                 # 이미지          # 필수입력     # 기본값있음
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성시간        # 자동입력     # 기본값있음
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))     # 수정시간        # 자동입력     # 기본값있음

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))                                                                                   # user 테이블 참조

    user = db.relationship('User', backref='reviews')

class Comment(db.Model):                                                                                                                                            # 댓글
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # Comment 테이블에 댓글 추가시 자동 생성
    content = db.Column(db.Text, nullable=False)                                                                                                                    # 내용             # 필수입력
    like_count = db.Column(db.Integer, default=0, nullable=False)                                                                                                                      # 별점                  # 필수입력
    target_type = db.Column(db.String(20), nullable=False)
    target_id = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성시간              # 자동입력     # 기본값있음
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))     # 수정시간              # 자동입력     # 기본값있음

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))                                                                                   # user 테이블 참조
    parent_id = db.Column(db.Integer, db.ForeignKey('comment.id', ondelete='CASCADE'), nullable=True)                                                               # 댓글의답글
    review_id = db.Column(db.Integer, db.ForeignKey('review.id', ondelete='CASCADE'))                                                                               # review 테이블 참조

    user = db.relationship('User', backref='comments')

    replies = db.relationship(
        'Comment',
        backref=db.backref('parent', remote_side=[id]),
        cascade='all, delete'
    )

class MyTravelLog(db.Model):                                                                                                                                        # 나의 여행로그
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # 게시글 생성시 자동 생성
    title = db.Column(db.String(120), nullable=False)                                                                                                               # 제목          # 필수입력
    content = db.Column(db.Text, nullable=False)                                                                                                                    # 내용          # 필수입력
    image = db.Column(db.Text, nullable=False, default='[]')                                                                                                                      # 사진          # 필수입력
    like_count = db.Column(db.Integer, default=0, nullable=False)                                                                                                                  # 별점                        # 필수입력
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성시간      # 자동입력      # 기본값있음
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))     # 수정시간      # 자동입력      # 기본값있음

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))                                                                                   # user 테이블 참조

    user = db.relationship('User', backref= 'travel_logs')

class Wishlist(db.Model):                                                                                                                                           # 찜목록
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)                                                                                                # 찜 등록시 자동으로 번호 생성
    created_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc))                                                  # 생성시간      # 자동입력      # 기본값있음
    updated_at = db.Column(db.DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))     # 수정시간      # 자동입력      # 기본값있음

    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'))                                                                                   # user 테이블 참조
    places_id = db.Column(db.Integer, db.ForeignKey('places.id', ondelete='CASCADE'))                                                                               # place 테이블 참조

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    target_type = db.Column(db.String(20), nullable=False)
    target_id = db.Column(db.Integer, nullable=False)

    created_at = db.Column(db.DateTime, default=db.func.now())

    __table_args__ = (db.UniqueConstraint("user_id", "target_type", "target_id", name="uix_user_target_like"),)