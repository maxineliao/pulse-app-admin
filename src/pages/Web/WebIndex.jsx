import { useEffect, useRef } from "react";
import {
	ArrowRight,
	ArrowUpRight,
	ChevronLeft,
	ChevronRight,
	CirclePlay,
} from "lucide-react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

import Images from "../../Images";

import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
gsap.registerPlugin(MotionPathPlugin);

import { Swiper, useSwiper, SwiperSlide } from "swiper/react";
const SwiperButtonNext = ({ children }) => {
	const swiper = useSwiper();
	return (
		<div
			className={`swiper-button-next rounded-circle d-none d-md-flex`}
			onClick={() => swiper.slideNext()}
		>
			{children}
		</div>
	);
};
const SwiperButtonPrev = ({ children }) => {
	const swiper = useSwiper();
	return (
		<div
			className={`swiper-button-prev rounded-circle d-none d-md-flex`}
			onClick={() => swiper.slidePrev()}
		>
			{children}
		</div>
	);
};

function WebIndex() {
	//GSAP START
	const navigate = useNavigate();
	const marqueeRef = useRef(null);
    const getStaggerEach = () => {
        const width = window.innerWidth;
        return width > 1600 ? 2 : 3;
    }
	const marqueeInit = () => {


        let marquee = gsap.timeline();
        let marqueeCards = marqueeRef.current.querySelectorAll(".card");
	    let duration = marqueeCards.length * getStaggerEach();
		marquee && marquee.kill();
		marquee
			.to(marqueeCards, {
				duration: duration,
				ease: "none",
				transformOrigin: "50% 40%",
				motionPath: {
					path: ".marquee-path",
					align: ".marquee-path",
					alignOrigin: [0.5, 0],
					autoRotate: true,
				},
				stagger: {
					each: getStaggerEach(),
					// amount: duration,
					start: 1,
					repeat: -1,
				},
			})
			.time(duration);
		for (var i = 0; i < marqueeCards.length; i++) {
			marqueeCards[i].addEventListener("mouseenter", (event) => {
				marquee.pause();
			});
		}
		for (var i = 0; i < marqueeCards.length; i++) {
			marqueeCards[i].addEventListener("mouseleave", (event) => {
				marquee.play();
			});
		}
	};
	function debounce(func) {
		var timer;
		return function (event) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(
				() => {
					func();
				},
				300,
				event
			);
		};
	}
	useEffect(() => {
		const currentUrl = new URL(window.location.href);
		const params = new URLSearchParams(currentUrl.search);
		if (params.has("code")) {
			navigate('/member_center')
		}
		marqueeInit();
	}, []);
	
	window.addEventListener("resize", debounce(marqueeInit));
	// GSAP END
	return (
		<main className="index">
			<section
				className="hero-header position-relative"
				style={{ backgroundImage: `url(${Images.linear})` }}
			>
				<picture>
					<source
						media="(min-width: 576px)"
						srcSet={Images["hero-banner"]}
					/>
					<img
						className="img-banner img-fluid h-100"
						src={Images["hero-banner-sm"]}
						alt="girl with headset"
					/>
				</picture>
				<div className="hero-content d-flex flex-wrap flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle mt-6 mt-sm-5 mt-lg-6">
					<p className="sub-title mb-4 mb-lg-11">
						🎧 無損音質感受音樂的脈動
					</p>
					<picture>
						<source
							media="(min-width: 992px)"
							srcSet={Images["hero-title-lg"]}
						/>
						<img
							className="img-title img-fluid mb-lg-5 mb-4"
							src={Images["hero-title-sm"]}
						/>
					</picture>
					<div className="btn-container d-flex justify-content-center flex-wrap flex-lg-nowrap">
						<a
							className="btn-customize-padding btn btn-lg rounded-pill text-white d-flex align-items-center order-lg-2"
							href="SubscriptionPlans.html"
						>
							查看方案
							<span className="btn-arrow btn-arrow-bg-light rounded-pill px-3 px-lg-5 py-1 py-lg-2 ms-5 d-lg-flex align-items-center justify-content-center d-none">
								<ArrowUpRight className="btn-icon"></ArrowUpRight>
							</span>
						</a>
						<Link
							className="btn-customize-padding bg-white-opacity btn btn-lg btn-outline-third rounded-pill text-white d-flex align-items-center me-lg-5 order-lg-1"
							to="/player"
						>
							Listen now
							<span className="btn-arrow rounded-pill bg-white px-3 px-lg-5 py-1 py-lg-2 ms-5 d-flex align-items-center justify-content-center">
								<ArrowUpRight className="text-dark btn-icon"></ArrowUpRight>
							</span>
						</Link>
					</div>
				</div>
			</section>

			<section className="py-9 py-lg-10">
				<div className="container">
					<p className="display-1 text-center text-uppercase mb-3 mb-lg-4">
						Melodies
						<br />
						That
						<br />
						Defy
						<br />
						Imagination
					</p>
					<p className="h1 text-center mb-6 mb-lg-8">
						超乎想像的音樂盛宴
					</p>
					{/* <!-- Slider main container --> */}
					<Swiper
						className="swiper"
						spaceBetween={30}
						// direction="horizontal"
						speed={1500}
						loop={true}
					>
						<SwiperButtonPrev>
							<ChevronLeft className="text-white"></ChevronLeft>
						</SwiperButtonPrev>
						<SwiperButtonNext>
							<ChevronRight className="text-white"></ChevronRight>
						</SwiperButtonNext>

						{/* <!-- Additional required wrapper --> */}
						{/* <!-- Slides --> */}
						<SwiperSlide className="swiper-slide mb-5 mb-md-0">
							<div className="row justify-content-center gy-4">
								<div className="col-md-6 col-lg-4">
									<div className="card card-lg card-dark bg-white-opacity h-100">
										<img
											src={Images["card-pic-1_1"]}
											className="card-img-top mb-5"
											alt="speaker"
										/>
										<div className="card-body">
											<h4 className="card-title mb-2">
												無損音質
											</h4>
											<p className="card-text">
												無可挑剔的細膩，超越CD的聆聽體驗
											</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 col-lg-4">
									<div className="card card-lg card-dark bg-white-opacity h-100">
										<img
											src={Images["card-pic-1_2"]}
											className="card-img-top mb-5"
											alt="list of songs"
										/>
										<div className="card-body">
											<h4 className="card-title mb-2">
												個人化推薦歌單
											</h4>
											<p className="card-text">
												系統自動推薦最適合你的歌單，讓你不斷發掘新的好聲音
											</p>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
						<SwiperSlide className="swiper-slide">
							<div className="row justify-content-center gy-4">
								<div className="col-md-6 col-lg-4">
									<div className="card card-lg card-dark bg-white-opacity h-100">
										<img
											src={Images["card-pic-1_3"]}
											className="card-img-top mb-5"
											alt="moody vibe"
										/>
										<div className="card-body">
											<h4 className="card-title mb-2">
												情境歌單
											</h4>
											<p className="card-text">
												選擇最適配心情的歌單，歡樂到悲傷都有PULSE陪伴
											</p>
										</div>
									</div>
								</div>
								<div className="col-md-6 col-lg-4">
									<div className="card card-lg card-dark bg-white-opacity h-100">
										<img
											src={Images["card-pic-1_4"]}
											className="card-img-top mb-5"
											alt="couple listening together"
										/>
										<div className="card-body">
											<h4 className="card-title mb-2">
												開台一起聽
											</h4>
											<p className="card-text">
												在線邀請所有人聆聽你最愛的曲目，一起聽音樂聊是非
											</p>
										</div>
									</div>
								</div>
							</div>
						</SwiperSlide>
						{/* </div> */}
					</Swiper>
				</div>
			</section>
			{/* <!-- 探索你愛的音樂類型 --> */}
			<section className="section-marquee py-9 py-lg-10 position-relative overflow-hidden">
				<div className="container">
					<p className="display-1 text-center text-uppercase">
						Your<i className="d-block d-md-none"></i> Musical
						<i className="d-block d-md-none"></i> Journey
					</p>
				</div>
				<div className="card-carousel" ref={marqueeRef}>
					<svg
						className="marquee-svg position-absolute translate-middle start-50"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 1408.63 248"
					>
						<path
							className="marquee-path"
							d="M.34,247.03C167.04,96.53,420.2,.5,703.66,.5s537.81,96.48,704.5,247.59"
							style={{
								fill: "none",
								stroke: "transparent",
							}}
						/>
					</svg>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_6"]}
							className="card-img-top"
							alt="鄉村"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								鄉村
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_4"]}
							className="card-img-top"
							alt="日語"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								日語
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_3"]}
							className="card-img-top"
							alt="古典"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								古典
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_1"]}
							className="card-img-top"
							alt="POP"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">POP</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_2"]}
							className="card-img-top"
							alt="ELECTRONIC"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								ELECTRONIC
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_5"]}
							className="card-img-top"
							alt="華語流行"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								華語流行
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
					<div className="card card-dark bg-white-opacity">
						<img
							src={Images["card-pic-2_7"]}
							className="card-img-top"
							alt="獨立樂團"
						/>
						<div className="card-body py-5">
							<h4 className="card-title text-center mb-0">
								獨立樂團
							</h4>
							<a
								href="player.html"
								className="card-link stretched-link"
							></a>
						</div>
					</div>
				</div>
				<p className="sub-title h1 text-center mb-3 mb-md-4">
					探索你愛的音樂類型
				</p>
				<p className="fs-6 text-center">
					不論熱門、小眾的音樂都在PULSE，
					<i className="d-block d-md-none"></i>
					盡情探索、隨心而聽
				</p>
			</section>
			{/* <!-- 趨勢排行週榜 --> */}
			<section className="py-9 py-lg-10">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-md-6 col-lg-5">
							<p className="display-1 text-uppercase mb-3 mb-lg-4">
								Weekly
								<br />
								Top
								<br />
								Hits
							</p>
							<p className="h1">趨勢排行週榜</p>
							<h5>週週推薦最新流行音樂，時刻走在流行最前線</h5>
						</div>
						<ul className="col-md-6">
							<li className="card card-horizontal">
								<div className="card-header d-flex justify-content-between bg-transparent px-0 py-3 border-bottom border-third border-opacity-10">
									<p className="mb-0">01</p>
									<img
										className="icon"
										src={Images["Logo_none-text"]}
										alt=""
									/>
								</div>
								<a
									href="player.html"
									className="card-link stretched-link"
								></a>
								<div className="card-body d-flex justify-content-between align-items-center">
									<div>
										<h3 className="card-title mb-3">
											Not Even Love
										</h3>
										<p className="card-text h6">
											ILLENIUM, Seven Lions
										</p>
									</div>
									<div className="position-relative">
										<img
											className="card-body-img"
											src={Images["card-pic-3_1"]}
											alt="not even love"
										/>
										<CirclePlay className="card-body-img-icon position-absolute start-50 top-50 translate-middle"></CirclePlay>
									</div>
								</div>
							</li>
							<li className="card card-horizontal">
								<div className="card-header d-flex justify-content-between bg-transparent px-0 py-3 border-bottom border-third border-opacity-10">
									<p className="mb-0">02</p>
									<img
										className="icon"
										src={Images["Logo_none-text"]}
										alt=""
									/>
								</div>
								<a
									href="player.html"
									className="card-link stretched-link"
								></a>
								<div className="card-body d-flex justify-content-between align-items-center">
									<div>
										<h3 className="card-title mb-3">
											It Runs Through Me
										</h3>
										<p className="card-text h6">
											Tom Misch
										</p>
									</div>
									<div className="position-relative">
										<img
											className="card-body-img"
											src={Images["card-pic-3_2"]}
											alt="not even love"
										/>
										<CirclePlay className="card-body-img-icon position-absolute start-50 top-50 translate-middle"></CirclePlay>
									</div>
								</div>
							</li>
							<li className="card card-horizontal">
								<div className="card-header d-flex justify-content-between bg-transparent px-0 py-3 border-bottom border-third border-opacity-10">
									<p className="mb-0">03</p>
									<img
										className="icon"
										src={Images["Logo_none-text"]}
										alt=""
									/>
								</div>
								<a
									href="player.html"
									className="card-link stretched-link"
								></a>
								<div className="card-body d-flex justify-content-between align-items-center">
									<div>
										<h3 className="card-title mb-3">
											Delilah
										</h3>
										<p className="card-text h6">
											Fred Again..
										</p>
									</div>
									<div className="position-relative">
										<img
											className="card-body-img"
											src={Images["card-pic-3_3"]}
											alt="not even love"
										/>
										<CirclePlay className="card-body-img-icon position-absolute start-50 top-50 translate-middle"></CirclePlay>
									</div>
								</div>
							</li>
							<li className="card card-horizontal">
								<div className="card-header d-flex justify-content-between bg-transparent px-0 py-3 border-bottom border-third border-opacity-10">
									<p className="mb-0">04</p>
									<img
										className="icon"
										src={Images["Logo_none-text"]}
										alt=""
									/>
								</div>
								<a
									href="player.html"
									className="card-link stretched-link"
								></a>
								<div className="card-body d-flex justify-content-between align-items-center">
									<div>
										<h3 className="card-title mb-3">
											Monster
										</h3>
										<p className="card-text h6">
											Don Diablo
										</p>
									</div>
									<div className="position-relative">
										<img
											className="card-body-img"
											src={Images["card-pic-3_4"]}
											alt="not even love"
										/>
										<CirclePlay className="card-body-img-icon position-absolute start-50 top-50 translate-middle"></CirclePlay>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
			{/* <!-- 訂閱方案 --> */}
			<section className="py-9 py-lg-10">
				<div className="container">
					<p className="display-1 text-uppercase mb-4 text-center">
						Pricing
					</p>
					<p className="h1 mb-4 text-center">訂閱方案</p>
					<h5 className="mb-8 text-center">
						多樣的收費方式，滿足你的各種需求
					</h5>
					<div className="row gy-5 justify-content-center">
						<div className="col-md-6 col-lg-4">
							<div className="card card-detailed card-dark h-100">
								<div className="card-body p-0 d-flex flex-column">
									<h5>免費試用</h5>
									<h2 className="card-title mb-0">FREE</h2>
									<a
										href="#"
										className="card-btn btn btn-primary w-100 fs-5 d-flex align-items-center justify-content-center position-relative"
									>
										選擇方案
										<ArrowRight className="card-btn-icon text-dark ms-3"></ArrowRight>
									</a>
									<ul className="card-text mt-3 mt-md-5">
										<li>可使用網頁播放器</li>
										<li>標準音質</li>
										<li>30天免費試用</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card card-detailed card-dark h-100">
								<div className="card-body p-0 d-flex flex-column">
									<h5>SOLO</h5>
									<h2 className="card-title mb-0">
										NT$149／月
									</h2>
									<a
										href="#"
										className="card-btn btn btn-primary w-100 fs-5 d-flex align-items-center justify-content-center position-relative"
									>
										選擇方案
										<ArrowRight className="card-btn-icon text-dark ms-3"></ArrowRight>
									</a>
									<ul className="card-text mt-3 mt-md-5 mb-7">
										<li>單人方案（限1人使用）</li>
										<li>可使用APP及網頁播放器</li>
										<li>無損音質</li>
										<li>可使用開台一起聽－直播電台功能</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-4">
							<div className="card card-detailed card-dark h-100">
								<div className="card-body p-0 d-flex flex-column">
									<h5>Family</h5>
									<h2 className="card-title mb-0">
										NT$399／月
									</h2>
									<a
										href="#"
										className="card-btn btn btn-primary w-100 fs-5 d-flex align-items-center justify-content-center position-relative"
									>
										選擇方案
										<ArrowRight className="card-btn-icon text-dark ms-3"></ArrowRight>
									</a>
									<ul className="card-text mt-3 mt-md-5 mb-7">
										<li>家庭方案（可供上限6人使用）</li>
										<li>可使用APP及網頁播放器</li>
										<li>無損音質</li>
										<li>可使用開台一起聽－直播電台功能</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="d-flex justify-content-center mt-6 mt-md-8">
						<Link
							className="btn-customize-padding bg-white-opacity btn btn-lg btn-outline-third rounded-pill w-auto text-white d-flex align-items-center me-lg-5 order-lg-1"
							to="/subscription_plans"
						>
							更多訂閱方案
							<span className="btn-arrow rounded-pill bg-white px-3 px-lg-5 py-1 py-lg-2 ms-5 d-flex align-items-center justify-content-center">
								<ArrowUpRight className="text-dark btn-icon"></ArrowUpRight>
							</span>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}

export default WebIndex;
