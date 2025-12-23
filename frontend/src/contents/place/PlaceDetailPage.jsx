import React, { useEffect, useState } from "react";
import "./PlaceDetailPage.css";

const PlaceDetailPage = () => {

  const [mainImage, setMainImage] = useState(
    "/images/placedetail/snoopy2.jpg"
  );
  const [smallImages, setSmallImages] = useState([
    "/images/placedetail/snoopy3.jpg",
    "/images/placedetail/snoopy4.jpg",
    "/images/placedetail/snoopy5.jpg",
  ]);

  const handleImageSwap = (clickedImg, index) => {
    const currentMain = mainImage;
    setMainImage(clickedImg);

    const newSmallImages = [...smallImages];
    newSmallImages[index] = currentMain;
    setSmallImages(newSmallImages);
  };


  const slides = [
    "/images/placedetail/snoopy4.jpg",
    "/images/placedetail/snoopy3.jpg",
    "/images/placedetail/snoopy2.jpg",
  ];

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);


  const [likes, setLikes] = useState([false, false, false]);

  const toggleLike = (index) => {
    setLikes((prev) =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  const handleMoreClick = () => {
    console.log("더보기 버튼 클릭");
    // 여기에 원하는 동작을 추가하세요
  };

  return (
    <div className="spg-wrap">
      {/* 상단 이미지 */}
      <div className="spg-top">
        <img
          src="/images/placedetail/snoopy1.jpg"
          alt="snoopy"
          className="spg-header-image"
        />
      </div>
      <div className="spg-content">
        <h1 className="spg-jeju-title">JEJU</h1>
        <div className="sec1">
          <div className="text">
            <h2 className="spg-subplace-title">스누피 가든</h2>
            <p className="spg-subplace2-title">
              Snoopy Garden(스누피 가든)은 제주 구좌읍에 있는 피너츠(Peanuts) 만화 캐릭터 스누피와 친구들을 테마로 꾸민 체험형 정원형 관광지입니다. 제주의 자연
              속에서
              스누피의 세계를 느끼며 산책하고 즐길 수 있는 공간이에요.
              실내 공간은 '관계', '일상', '휴식', '행복', '상상' 등 다섯 가지 주제로 나뉘어 피너츠 만화 에피소드를 전시하고, 야외 정원에는 만화 속 장면을 재현한 조형물과
              다양한
              포토존이 있어 사진 찍기 좋습니다.
              또한 카페와 스누피 관련 굿즈를 판매하는 기념품 샵이 있어 가족, 연인, 친구 여행객 모두에게 인기 있는 관광 코스입니다. 약 2~3시간 정도 여유를 두고 둘러보는 것을
              추천합니다.
            </p>
          </div>

          <div className="image">
            <img
              src={mainImage}
              alt="main"
              className="spg-subheader-image"
            />
            <div className="spg-small-images-row">
              {smallImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className={`spg-subsmall-image-${i + 1}`}
                  onClick={() => handleImageSwap(img, i)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="sec3">
            <h3 className="spg-places-title">
            Things you can enjoy at this place
          </h3>
          <div className="spg-image-box-container">
            {[
              {
                img: "/images/placedetail/snoopy2.jpg",
                title: "관계",
                desc: '"연 먹는 나무" 주변을 둘러싼 피너츠 친구들과 만화가 슐츠를 만나 볼 수 있는 곳입니다',
              },
              {
                img: "/images/placedetail/snoopy3.jpg",
                title: "일상",
                desc: "피너츠 친구들의 일상에서 일어나는 인생 이야기를 담은 에피소드들이 전시된 곳인데 아이와 함께 즐겁게 관람할 수 있습니다",
              },
              {
                img: "/images/placedetail/snoopy4.jpg",
                title: "카페 스누피",
                desc: "내부에 위치한 카페 스누피는 피자와 샌드위치, 오므라이스등 간편한 식사를 할 수가 있습니다",
              },
            ].map((item, i) => (
              <div className="spg-box-wrapper" key={i}>
                <img
                  src={item.img}
                  alt=""
                  className={`spg-image-box-${i + 1}`}
                />
                <div className="spg-text-box-container">
                  <h4 className="spg-text-large">{item.title}</h4>
                  <p className="spg-text-small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="spg-more-button" onClick={handleMoreClick}>
            더보기
          </button>
        </div>
      </div>
      <div className="sec5">
        <div className="slider-container">
          {slides.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`spg-sublong-image ${
                slideIndex === i ? "active" : ""
              }`}
              alt=""
            />
          ))}
          <button
            className="slider-btn prev"
            onClick={() =>
              setSlideIndex(
                (slideIndex - 1 + slides.length) % slides.length
              )
            }
        >
        &#10094;
          </button>

          <button
            className="slider-btn next"
            onClick={() =>
              setSlideIndex((slideIndex + 1) % slides.length)
            }
          >
            &#10095;
          </button>

          <div className="slider-dots">
            {slides.map((_, i) => (
              <span
                key={i}
                className={`dot ${
                  slideIndex === i ? "active" : ""
                }`}
                onClick={() => setSlideIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="sec4">
        <iframe
          title="Snoopy Garden Map"
          className="spg-map"
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.1959274316896!2d126.7757308762726!3d33.444201649590816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x350d1bc32bdef82d%3A0x35c7b3cf574c06f5!2z7Iqk64iU7ZS86rGA65Og!5e0!3m2!1sko!2sus!4v1765953680091!5m2!1sko!2sus"
        />
        <p className="spg-map-description">찾아가는 길</p>
      </div>
      <div className="shape-box">
        <div className="recommended-container">
          <h1 className="title">RECOMMENDED</h1>

          {["성산일출봉", "제주 4.3 평화 공원", "카멜리아 힐"].map(
            (tag, i) => (
              <div className="item" key={i}>
                <img
                  src="/images/placedetail/snoopy1.jpg"
                  className="item-image"
                  alt=""
                />

                <div className="item-content">
                  <h2 className="item-title">Jeju</h2>
                  <div className="item-details">
                    <p>• 주소 : 제주특별자치도 제주시 구좌읍 금백조로 930</p>
                    <p>• 휴일 : 연중무휴</p>
                    <p>• 이용가능시설 : 카드 하우스 / 야외카드</p>
                  </div>
                </div>

                <div className="item-actions">
                  <span className="item-tag">{tag}</span>
                  <button
                    className="heart-btn"
                    onClick={() => toggleLike(i)}
                  >
                    {likes[i] ? "♥" : "♡"}
                  </button>
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
  );
};

export default PlaceDetailPage;