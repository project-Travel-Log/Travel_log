import json
from main import create_app, db
from main.models import Places

app = create_app()
app.app_context().push()

def seed_places():
    with open("main/seed/places.json", encoding="utf-8") as f:
        data = json.load(f)

    Places.query.delete()
    db.session.commit()

    place_list = []  # ✅ 리스트는 클래스명과 절대 겹치지 않게

    for item in data:
        item["image_urls"] = json.dumps(item["image_urls"], ensure_ascii=False)
        place_list.append(Places(**item))  # ✅ 모델 클래스 호출

    for p in place_list:
        db.session.add(p)

    db.session.commit()
    print(f"✅ {len(place_list)}개 데이터 삽입 완료")

if __name__ == "__main__":
    seed_places()
