import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";

const SwiperButtonNext = ({ children, swiperIndex }) => {
	const swiper = useSwiper();
	return (
		<div
			className={`swiper-button-next-player-${swiperIndex}`}
			onClick={() => swiper.slideNext()}
		>
			{children}
		</div>
	);
};
const SwiperButtonPrev = ({ children, swiperIndex }) => {
	const swiper = useSwiper();
	return (
		<div
			className={`swiper-button-prev-player-${swiperIndex}`}
			onClick={() => swiper.slidePrev()}
		>
			{children}
		</div>
	);
};
import {
	HeartIcon,
	ChevronRight,
	ChevronLeft,
} from "lucide-react";

import PlayerImages from "../../Images";
import PlayerCardPlaylist from "../../components/Player/PlayerCardPlaylist";
import PlayerCardArtist from "../../components/Player/PlayerCardArtist";

export default function PlayerIndex() {
	return (
		<div className="col-lg-9 col-12 player-scrollbar">
			<div className="mySwiper-player-1">
				<Swiper
					modules={[Pagination]}
					spaceBetween={30}
					slidesPerView={1}
					speed={1500}
					loop={true}
					centeredSlides={true}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					pagination={{
						clickable: true,
					}}
				>
					<SwiperSlide>
						<div
							className="carousel-img-1 p-sm-6 p-5 d-flex flex-column"
							style={{
								backgroundImage: `url(${PlayerImages["carousel-1"]})`,
							}}
						>
							<h6>Trending New Hit</h6>
							<h1 className="mt-sm-5 mt-3">Not Even Love</h1>
							<h5 className="mt-3">ILLENIUM, Seven Lions</h5>
							<div className="d-flex mt-auto">
								<button
									type="button"
									className="btn d-flex align-items-center btn-player-listen me-3"
								>
									<h5 className="me-2 mb-0">Listen Now</h5>
									<ChevronRight className="btn-player-arrow-right"></ChevronRight>
								</button>
								<button
									type="button"
									className="btn btn-player-listen-heart rounded-circle"
								>
									<HeartIcon />
								</button>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className="carousel-img-2 p-sm-6 p-5 d-flex flex-column"
							style={{
								backgroundImage: `url(${PlayerImages["carousel-2"]})`,
							}}
						>
							<h6 className="">Top 50</h6>
							<h1 className="mt-sm-5 mt-3">New Song Ranking</h1>
							<h5 className="mt-3">
								Check out the top trending tracks in the Hot New
								Song Rankings.
								<br />
								Discover your next favorite hit today!
							</h5>
							<div className="d-flex mt-auto">
								<button
									type="button"
									className="btn d-flex align-items-center btn-player-listen me-3"
								>
									<h5 className="me-2 mb-0">Listen Now</h5>
									<ChevronRight className="btn-player-arrow-right"></ChevronRight>
								</button>
								<button
									type="button"
									className="btn btn-player-listen-heart rounded-circle"
								>
									<HeartIcon />
								</button>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div
							className="carousel-img-3 p-sm-6 p-5 d-flex flex-column"
							style={{
								backgroundImage: `url(${PlayerImages["carousel-3"]})`,
							}}
						>
							<h6>Top 10</h6>
							<h1 className="mt-sm-5 mt-3">Top Albums</h1>
							<h5 className="mt-3">
								Dive into the top albums of the moment.
								<br />
								Discover the sounds everyone is raving about!
							</h5>
							<div className="d-flex mt-auto">
								<button
									type="button"
									className="btn d-flex align-items-center btn-player-listen me-3"
								>
									<h5 className="me-2 mb-0">Listen Now</h5>
									<ChevronRight className="btn-player-arrow-right"></ChevronRight>
								</button>
								<button
									type="button"
									className="btn btn-player-listen-heart rounded-circle"
								>
									<HeartIcon />
								</button>
							</div>
						</div>
					</SwiperSlide>

					<SwiperButtonNext swiperIndex={1}>
						<ChevronRight />
					</SwiperButtonNext>
					<SwiperButtonPrev swiperIndex={1}>
						<ChevronLeft />
					</SwiperButtonPrev>
				</Swiper>
			</div>
			<div className="mySwiper-player-2 mt-5 px-5">
				<Swiper
					className="pt-8 pb-5"
					modules={[Pagination]}
					spaceBetween={30}
					// slidesPerView={4}
					speed={1500}
					loop={true}
					centeredSlides={false}
					autoHeight={false}
					breakpoints={{
						1400: {
							slidesPerView: 4,
						},
						1200: {
							slidesPerView: 3,
						},
						768: {
							slidesPerView: 3,
						},
						576: {
							slidesPerView: 1,
						},
					}}
				>
					<div className="position-absolute top-0 start-0 z-1 d-flex align-items-center justify-content-between w-100 py-5">
						<div>
							<h5 className="mb-0">最近播放</h5>
						</div>
						<div className="d-flex gap-2">
							<SwiperButtonPrev swiperIndex={2}>
								<ChevronLeft />
							</SwiperButtonPrev>
							<SwiperButtonNext swiperIndex={2}>
								<ChevronRight />
							</SwiperButtonNext>
						</div>
					</div>
					<SwiperSlide>
						<PlayerCardPlaylist
							cardImage={PlayerImages["playlist-1"]}
							cardTitle={"已按讚的歌曲"}
							cardText={"這裡是你按讚過的所有歌曲，一次全收錄！"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardPlaylist
							cardImage={PlayerImages["playlist-2"]}
							cardTitle={"每周最新發現"}
							cardText={"專屬你的每週新鮮音樂合輯"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardPlaylist
							cardImage={PlayerImages["playlist-6"]}
							cardTitle={"韓國流行音樂合輯"}
							cardText={"SEVENTEEN、(G)I-DLE 和更多藝人"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardPlaylist
							cardImage={PlayerImages["playlist-7"]}
							cardTitle={"Forest Bathing"}
							cardText={`Immerse in nature's calm and refresh your mind and body.`}
						/>
					</SwiperSlide>
				</Swiper>
			</div>
			<div className="mySwiper-player-2 mt-5 px-5 mb-5">
				<Swiper
					className="pt-8"
					spaceBetween={30}
					// slidesPerView={5}
					speed={1500}
					loop={true}
					centeredSlides={false}
					pagination={{
						clickable: true,
					}}
					breakpoints={{
						1400: {
							slidesPerView: 5,
						},
						1200: {
							slidesPerView: 4,
						},
						768: {
							slidesPerView: 3,
						},
						475: {
							slidesPerView: 2,
						},
					}}
				>
					<SwiperSlide>
						<PlayerCardArtist
							cardImage={PlayerImages["people-1"]}
							cardTitle={"Don Diablo"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardArtist
							cardImage={PlayerImages["people-2"]}
							cardTitle={"IU"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardArtist
							cardImage={PlayerImages["people-3"]}
							cardTitle={"Tom Misch"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardArtist
							cardImage={PlayerImages["people-2"]}
							cardTitle={"Taylor Swift"}
						/>
					</SwiperSlide>
					<SwiperSlide>
						<PlayerCardArtist
							cardImage={PlayerImages["people-2"]}
							cardTitle={"Taylor Swift"}
						/>
					</SwiperSlide>
					<div className="position-absolute top-0 start-0 z-1 d-flex align-items-center justify-content-between w-100 py-5">
						<div>
							<h5>你最愛的藝人</h5>
						</div>
						<div className="d-flex gap-2">
							<SwiperButtonPrev swiperIndex={2}>
								<ChevronLeft />
							</SwiperButtonPrev>
							<SwiperButtonNext swiperIndex={2}>
								<ChevronRight />
							</SwiperButtonNext>
						</div>
					</div>
				</Swiper>
			</div>
		</div>
	);
}
