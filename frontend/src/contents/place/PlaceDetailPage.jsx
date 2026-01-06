import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaceId } from "../../API/places";
import WishToggleButton from '../../components/common/WishToggleButton';
import "./PlaceDetailPage.css";

const PlaceDetailPage = () => {
    const { id } = useParams()
    const [place, setPlaceId] = useState(null)
    const [mainImage, setMainImage] = useState(null);
    const [subImages, setSubImages] = useState([]);
    const [slideIndex, setSlideIndex] = useState(0);
    const [likes, setLikes] = useState([false, false, false]);


    useEffect(() => {
        getPlaceId(id)
            .then(res => {
                console.log("응답데이터", res.data);
                setPlaceId(res.data)
            })
            .catch(err => console.error(err))
    }, [id])
    
    const IMAGE_BASE_URL = "http://localhost:5000/"
    useEffect(() => {
        if (place?.image?.length > 0) {
            setMainImage(IMAGE_BASE_URL + place.image[0]);
            setSubImages(
                place.image.slice(1).map(img => IMAGE_BASE_URL + img)
            )
        }
    }, [place])
    if (!place) return <div></div>

    const handleImageSwap = (clickedImg, index) => {
        const currentMain = mainImage;
        setMainImage(clickedImg);

        const newSmallImages = [...subImages];
        newSmallImages[index] = currentMain;
        setSubImages(newSmallImages);
    };
    const map = `https://www.google.com/maps?q=${place.latitude},${place.longitude}&z=16&output=embed`;

    const toggleLike = (index) => {
        setLikes((prev) =>
            prev.map((v, i) => (i === index ? !v : v))
        );
    };

    return (
        <div className="place-wrap">
            <div className="place-inner">
                <div className="top-wrap">
                    <img src={IMAGE_BASE_URL + place.image[0]} alt="main" className="main__img" />
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

                            {["성산일출봉", "제주 4.3 평화 공원", "카멜리아 힐"].map(
                                (tag, i) => (
                                    <div className="item" key={i}>
                                        <div className="img-wrap">
                                            <img
                                                src="/images/placedetail/snoopt1.jpg"
                                                alt=""
                                            />
                                        </div>

                                        <div className="item-content">
                                            <h2 className="item-title">Jeju</h2>
                                            <div className="item-details">
                                                <p>
                                                    <span className="tit">주소 :</span>
                                                    &nbsp;
                                                    <span className="txt">제주특별자치도 제주시 구좌읍 금백조로 930</span>
                                                </p>
                                                <p>
                                                    <span className="tit">휴일 :</span>
                                                    &nbsp;
                                                    <span className="txt">연중무휴</span>
                                                </p>
                                                <p>
                                                    <span className="tit">이용가능시설 :</span>
                                                    &nbsp;
                                                    <span className="txt">카드 하우스 / 야외카드</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="item-actions">
                                            <span className="item-tag">{tag}</span>
                                            <WishToggleButton className="heart-btn" />
                                            <button className="detail-btn">
                                                상세 정보 보러가기
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}

                            <div className="pagination">
                                <button>&lt;&lt;</button>
                                <button>&lt;</button>
                                <button className="current">1</button>
                                <button>&gt;</button>
                                <button>&gt;&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceDetailPage;