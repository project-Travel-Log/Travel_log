import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPlaceId } from "../../API/places";
import WishToggleButton from '../../components/common/WishToggleButton';
import { checkWishlist, toggleWishlist } from "../../API/wishilist";

const PlaceDetailPage = () => {
    const { id } = useParams()
    const [place, setPlace] = useState(null)
    const [recommended, setRecommended] = useState([])
    const [mainImage, setMainImage] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [wished, setWished] = useState(false)
    const [rwished, setRwished] = useState({})
    const navigate = useNavigate();

    const IMAGE_BASE_URL = "http://localhost:5000/"

    useEffect(() => {
        getPlaceId(id)
            .then(res => {
                console.log("응답데이터", res.data)
                setPlace(res.data.place)
                setRecommended(res.data.recommended)
            })
            .catch(err => console.error(err))
    }, [id])

    useEffect(() => {
        if (!place?.id) return;
        checkWishlist(place.id)
            .then(res => {
                console.log("체크", res.data)
                setWished(res.data.wished)
            })
            .catch(err => {
                console.error("checkWishlist 실패", err);
            });
    }, [place?.id]);

    useEffect(() => {
        if (place?.image?.length > 0) {
            setMainImage(IMAGE_BASE_URL + place.image[0]);
            setSubImages(
                place.image.slice(1).map(img => IMAGE_BASE_URL + img)
            )
        }
    }, [place])
    
    useEffect(() => {
        if (!recommended?.length) {
            setRwished({});
            return;
        }

        Promise.all(
            recommended.map((item) =>
                checkWishlist(item.id)
                    .then((res) => ({ id: item.id, wished: !!res.data.wished }))
                    .catch(() => ({ id: item.id, wished: false }))
            )
        ).then((results) => {
            const next = {};
            results.forEach((r) => {
                next[r.id] = r.wished;
            });
            setRwished(next);
        });
    }, [recommended]);


    const handleImageSwap = (clickedImg, index) => {
        const currentMain = mainImage;
        setMainImage(clickedImg);

        const newSmallImages = [...subImages];
        newSmallImages[index] = currentMain;
        setSubImages(newSmallImages);
    };



    const handleWishToggle = () => {
        if (!place?.id) return;

        toggleWishlist(place.id)
            .then((res) => setWished(res.data.wished))
            .catch(console.error);
    };

    const handleRecWishToggle = (placeId) => {
        toggleWishlist(placeId)
            .then((res) => {
                setRwished((prev) => ({ ...prev, [placeId]: res.data.wished }));
            })
            .catch(console.error);
    };

    if (!place) return <div></div>
    const map = `https://www.google.com/maps?q=${place.latitude},${place.longitude}&z=16&output=embed`;

    return (
        <div className="place-wrap">
            <div className="place-inner">
                <div className="top-wrap">
                    <img src={IMAGE_BASE_URL + place.image[0]} alt="main" className="main__img" />
                    <WishToggleButton className="heart-btn" active={wished} onToggle={handleWishToggle} />
                </div>
                <div className="content-wrap">
                    <h1 className="title">{place.city}</h1>
                    <div className="section01-wrap">
                        <div className="text-wrap">
                            <h2 className="title">{place.name}</h2>
                            <p className="text">{place.description} </p>
                        </div>
                        <div className="img-wrap">
                            {mainImage && (
                                <img src={mainImage} alt="main" className="main__img" />
                            )}

                            <div className="sub__img-wrap">
                                {subImages.map((img, i) => (
                                    <img
                                        key={i}
                                        src={img}
                                        alt=""
                                        className={`sub__img sub__img-${i + 1}`}
                                        onClick={() => handleImageSwap(img, i)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="section03-wrap">
                        <div className="title">INFORMATION</div>
                        <div className="section03-inner">
                            <p className="text-wrap">
                                <span className="tit">주소 :</span>
                                &nbsp;
                                <span className="txt">{place.address} </span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">홈페이지 :</span>
                                &nbsp;
                                <span className="txt"><a href={place.website_url} target="_blank" title="새 창 열림">{place.website_url}</a></span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">대표 전화번호 :</span>
                                &nbsp;
                                <span className="txt">{place.contact_number} </span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">휴무일 :</span>
                                &nbsp;
                                <span className="txt">{place.closed_days}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">주차 :</span>
                                &nbsp;
                                <span className="txt">{place.parking_available}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">운영시간 :</span>
                                &nbsp;
                                <span className="txt">{place.operating_hours}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">주차장 요금 :</span>
                                &nbsp;
                                <span className="txt">{place.parking_fee}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">예약필요 여부 :</span>
                                &nbsp;
                                <span className="txt">{place.requires_reservation}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">부대시설 :</span>
                                &nbsp;
                                <span className="txt">{place.amenities}</span>
                            </p>
                            <p className="text-wrap">
                                <span className="tit">입장료 :</span>
                                &nbsp;
                                <span className="txt">{place.admission_type}</span>
                            </p>
                        </div>
                    </div>
                    <div className="section04-wrap">
                        <iframe
                            title="Snoopy Garden Map"
                            className="spg-map"
                            loading="lazy"
                            allowFullScreen
                            src={map}
                        />
                        <p className="text">찾아가는 길</p>
                    </div>
                    <div className="recommend-wrap">
                        <div className="recommended-inner">
                            <h1 className="title">RECOMMENDED</h1>

                            {recommended.map(
                                (item) => (
                                    <div className="item" key={item.id}>
                                        <div className="img-wrap">
                                            <img
                                                src={IMAGE_BASE_URL + item.image[0]}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="item-content" >
                                            <h2 className="item-title">{item.name}</h2>
                                            <div className="item-details">
                                                <p>
                                                    <span className="tit">주소 :</span>
                                                    &nbsp;
                                                    <span className="txt">{item.address}</span>
                                                </p>
                                                <p>
                                                    <span className="tit">휴일 :</span>
                                                    &nbsp;
                                                    <span className="txt">{item.closed_days}</span>
                                                </p>
                                                <p>
                                                    <span className="tit">이용가능시설 :</span>
                                                    &nbsp;
                                                    <span className="txt">{item.amenities}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="item-actions">
                                            <WishToggleButton className="heart-btn" active={!!rwished[item.id]}
                                                onToggle={() => handleRecWishToggle(item.id)} />
                                            <button className="detail-btn" onClick={() => navigate(`/places/detail/${item.id}`)}>
                                                상세 정보 보러가기
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetailPage;