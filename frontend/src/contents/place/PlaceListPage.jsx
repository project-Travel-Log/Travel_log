import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./PlaceListPage.css";

const places = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  img: `/images/placelist/sub${i + 1}.png`, // 경로 맞게 수정!
  title: "Journey begins here",
  desc: "여행지에서 마주하는 풍경은 사진보다 넓고, 일상보다 깊다. \n낮은 언덕위에서 내려다본 도시의 노다.",
}));

export default function ProvincePage() {
  return (
    <>
      <section className="section-wrap">
        <div className="section-img">
          <img src="/images/placelist/main.png" alt="여행지" />
        </div>

        <h2>평창</h2>
        <p>평창의 다양한 여행지를 만나보세요!</p>

        <div className="section-search">
          <button type="button" className="searchBtn">Search</button>
          <input className="searchInput" placeholder="마음에 드는 여행지를 찾아보세요" />
        </div>
      </section>

      <section className="section-b">
        <Swiper
          modules={[Grid, Pagination]}
          spaceBetween={32}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1.2, grid: { rows: 1 } },        // 모바일
            768: { slidesPerView: 2, grid: { rows: 2 } },        // 태블릿
            1024: { slidesPerView: 3, grid: { rows: 3, fill: "row" } }, // PC
          }}
          className="mySwiper"
        >
          {places.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="card">
                <div className="card-img">
                  <img src={item.img} alt={item.title} />
                </div>

                <div className="card-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
}