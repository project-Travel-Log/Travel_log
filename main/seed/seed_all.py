import json
from main import create_app, db
from main.models import Places, Review, MyTravelLog, Comment

app = create_app()
app.app_context().push()

def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def seed_all():
    # 순서 중요 (FK 때문에)
    Comment.query.delete()
    MyTravelLog.query.delete()
    Review.query.delete()
    Places.query.delete()
    db.session.commit()

    # 1. Places
    places_data = load_json("main/seed/places.json")
    places = []
    for item in places_data:
        item["image_urls"] = json.dumps(item["image_urls"], ensure_ascii=False)
        places.append(Places(**item))
    db.session.add_all(places)
    db.session.commit()
    print("✅ Places 완료")

    # 2. Reviews
    reviews_data = load_json("main/seed/reviews.json")
    reviews = []
    for item in reviews_data:
        item["review_image"] = json.dumps(item["review_image"], ensure_ascii=False)
        reviews.append(Review(**item))
    db.session.add_all(reviews)
    db.session.commit()
    print("✅ Reviews 완료")

    # 3. MyTravelLog
    logs_data = load_json("main/seed/my_travel_logs.json")
    logs = []
    for item in logs_data:
        item["image"] = json.dumps(item["image"], ensure_ascii=False)
        logs.append(MyTravelLog(**item))
    db.session.add_all(logs)
    db.session.commit()
    print("✅ TravelLogs 완료")

    # 4. Comments (리뷰 + 여행로그)
    review_comments = load_json("main/seed/comments.json")
    travel_comments = load_json("main/seed/travel_log_comments.json")

    comments = []
    for item in review_comments + travel_comments:
        comments.append(Comment(**item))

    db.session.add_all(comments)
    db.session.commit()
    print("✅ Comments 완료")

    print("🎉 전체 시드 완료!")

if __name__ == "__main__":
    seed_all()

# python -m main.seed.seed_all
