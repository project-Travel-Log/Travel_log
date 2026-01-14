from flask import Blueprint, request, jsonify
from backend.models import Places
import json
from sqlalchemy.sql import func

bp = Blueprint("places", __name__)

@bp.route("/places", methods=["GET"])
def places():
    place_type = request.args.get("type")

    query = Places.query
    if place_type:
        query = query.filter_by(type=place_type)

    places = query.all()

    result = []
    for p in places:
        result.append({
            "id": p.id,
            "type": p.type,
            "city": p.city,
            "name": p.name,
            "description": p.description,
            "image": json.loads(p.image_urls),
        })

    return jsonify(result),200


@bp.route("/places/detail/<int:place_id>", methods=["GET"])
def place_detail(place_id):
    places = Places.query.get_or_404(place_id)

    # 같은 type의 다른 여행지 3개 랜덤 조회
    random_places = (
        Places.query
        .filter(
            Places.type == places.type,
            Places.id != places.id
        )
        .order_by(func.random())
        .limit(3)
        .all()
    )

    return jsonify({
        "place": {
            "id": places.id,
            "type": places.type,
            "city": places.city,
            "name": places.name,
            "description": places.description,
            "image": json.loads(places.image_urls),
            "address": places.address,
            "contact_number": places.contact_number,
            "website_url": places.website_url,
            "closed_days": places.closed_days,
            "operating_hours": places.operating_hours,
            "admission_type": places.admission_type,
            "parking_available": places.parking_available,
            "parking_fee": places.parking_fee,
            "requires_reservation": places.requires_reservation,
            "amenities": places.amenities,
            "latitude": places.latitude,
            "longitude": places.longitude,
        },
        "recommended": [
            {
                "id": p.id,
                "name": p.name,
                "address": p.address,
                "closed_days": p.closed_days,
                "amenities": p.amenities,
                "image": json.loads(p.image_urls)
            }
            for p in random_places
        ]
    })

