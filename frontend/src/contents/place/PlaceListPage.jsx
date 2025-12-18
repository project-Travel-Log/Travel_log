import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./PlaceListPage.css";


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
<button>Search</button>
<input placeholder="마음에 드는 여행지를 찾아보세요" />
</div>
</section>


<section className="section-b">
<Swiper
modules={[Grid, Pagination]}
slidesPerView={3}
grid={{ rows: 3, fill: "row" }}
spaceBetween={30}
pagination={{ clickable: true }}
className="mySwiper"
>
{Array.from({ length: 12 }).map((_, i) => (
<SwiperSlide key={i}>Slide {i + 1}</SwiperSlide>
))}
</Swiper>
</section>
</>
);
}