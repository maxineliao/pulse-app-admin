import { set } from "immutable";
import {
	ArrowDown,
	ArrowRight,
	ArrowUpRight,
	HeartPulse,
	MicVocal,
	Minus,
	MonitorSmartphone,
	Music,
	Plus,
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router";

import Images from "../../Images";

function SubscriptionPage() {
	const faq = [
		{
			id: "Q1",
			question: "PULSE Premium包含哪些進階功能？",
			answer: "除了享受 24bit / 192kHz Hi-Res無損音質，你也能隨時隨地使用 PULSE App，自訂歌單、AI智能推薦、個人電台等功能應有盡有。我們也提供網頁版免費試用，快來體驗看看吧～",
		},
		{
			id: "Q2",
			question: "多人方案有任何限制嗎？",
			answer: "沒有。無論是相距千里的家人或朋友，PULSE都歡迎你們一起享受音樂，無需受距離及 IP 的限制！",
		},
		{
			id: "Q3",
			question: "PULSE 接受哪些付款方式？",
			answer: "PULSE目前僅接受信用卡付款，更多付款方式已經在規畫中，敬請期待。",
		},
	];
	//錨點按鈕
	const studentPlanRef = useRef(null);

	return (
		<>
			<section
				className="subscription-banner d-flex align-items-center justify-content-center"
				style={{
					backgroundImage: `url(${Images.Subscription_Serenity_Musical_Escape})`,
				}}
			>
				<div className="banner-title container d-flex flex-column align-items-center">
					<h2 className="mb-0 fw-light">🔥立即升級</h2>
					<h2 className="mb-0 blur-font pc-item sub-title1 mt40">
						PULSEPREMIUM
					</h2>
					<h2 className="mb-0 pc-item fw-light mt40">
						無論一人獨享或親友同樂，隨時隨地感受無損音質的震撼。
					</h2>
					<h2 className="mb-0 mobile-item sub-title1 pt-4">PULSE</h2>
					<h2 className="mb-0 mobile-item sub-title1">PREMIUM</h2>
					<h2 className="mb-0 mobile-item fw-light pt-4">
						無論一人獨享或親友同樂，
					</h2>
					<h2 className="mb-0 mobile-item fw-light">
						隨時隨地感受無損音質的震撼。
					</h2>
					<h2 className="mb-0 fw-light">方案可隨時取消。</h2>
					<a
						className="explore-tab mt40 py-3 px-lg-5 px-3 d-flex align-items-center text-decoration-none"
						onClick={() => {
							studentPlanRef.current.scrollIntoView(true);
						}}
					>
						<h2 className="mb-0 ps-lg-3 ps-2 pe-lg-5 pe-3">
							探索方案
						</h2>
						<div className="bg-primary rounded-5 px-lg-5 py-lg-2 px-3 py-1">
							<ArrowDown className="text-black"></ArrowDown>
						</div>
					</a>
				</div>
			</section>
			<div className="content container">
				<section className="feature py-9 py-lg-10">
					<div className="row">
						<div className="col-12 text-center">
							<h1 className="sub-title2 pc-item">KEY FEATURES</h1>
							<h1 className="sub-title2 mobile-item">KEY</h1>
							<h1 className="sub-title2 mobile-item">FEATURES</h1>
							<h1 className="pt-4">Premium 特色功能</h1>
						</div>
					</div>
					<div className="row pt-lg-8 pt-0">
						<div className="col-md-6 col-lg-3">
							<div className="feature-card d-flex flex-column align-items-center">
								<div className="feature-card-img d-flex justify-content-center align-items-center">
									<Music
										style={{
											height: "78px",
											width: "86px",
											color: "rgba(19, 235, 214, 1)",
											filter: "drop-shadow(0 0 10px rgba(55, 124, 163, 1))",
										}}
									></Music>
								</div>
								<div className="pt-0 pt-lg-5 feature-text d-flex flex-column align-items-center">
									<h5 className="pt-lg-2 pt-0">無損音質</h5>
									<p className="mb-0">無可挑剔的細膩，</p>
									<p className="mb-0">超越CD的聆聽體驗。</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="feature-card d-flex flex-column align-items-center">
								<div className="feature-card-img d-flex justify-content-center align-items-center">
									<HeartPulse
										style={{
											height: "78px",
											width: "86px",
											color: "#FF9900",
											filter: "drop-shadow(0 0 10px #A37737)",
										}}
									></HeartPulse>
								</div>
								<div className="pt-0 pt-lg-5 feature-text d-flex flex-column align-items-center">
									<h5 className="pt-lg-2 pt-0">
										共享脈動帳號
									</h5>
									<p className="mb-0">無需同住一個屋簷下，</p>
									<p className="mb-0">
										PULSE讓你與好友零距離。
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="feature-card d-flex flex-column align-items-center">
								<div className="feature-card-img d-flex justify-content-center align-items-center">
									<MonitorSmartphone
										style={{
											height: "78px",
											width: "86px",
											color: "rgba(153, 235, 19, 1)",
											filter: "drop-shadow(0 0 10px rgba(163, 107, 55, 1))",
										}}
									></MonitorSmartphone>
								</div>
								<div className="pt-0 pt-lg-5 feature-text d-flex flex-column align-items-center">
									<h5 className="pt-lg-2 pt-0">多平台通用</h5>
									<p className="mb-0">
										上班偷聽用網頁播放器，
									</p>
									<p className="mb-0">
										健身通勤用PULSE App！
									</p>
								</div>
							</div>
						</div>
						<div className="col-md-6 col-lg-3">
							<div className="feature-card d-flex flex-column align-items-center">
								<div className="feature-card-img d-flex justify-content-center align-items-center">
									<MicVocal
										style={{
											height: "78px",
											width: "86px",
											color: "rgba(0, 255, 102, 1)",
											filter: "drop-shadow(0 0 10px rgba(19, 235, 214, 1))",
										}}
									></MicVocal>
								</div>
								<div className="pt-0 pt-lg-5 feature-text d-flex flex-column align-items-center">
									<h5 className="pt-lg-2 pt-0">開台一起聽</h5>
									<p className="mb-0">想分享您最愛的歌單？</p>
									<p className="mb-0">
										立即創建專屬你的直播電台
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="plan-block py-9 py-lg-10">
					<div className="row">
						<div
							ref={studentPlanRef}
							className="col-lg-6 plan-banner position-relative d-flex justify-content-center mb-lg-2"
						>
							<img
								className="pc-item"
								src={Images.Subscription_Student}
								alt="student"
							/>
							<img
								className="mobile-item"
								src={Images.Subscription_sm_Student}
								alt="student"
							/>
							<div className="plan-discription position-absolute">
								<h2 className="sub-title2">STUDENT</h2>
								<h2 className="sub-title2">PLAN</h2>
								<h1>學生方案</h1>
								<h5 className="fs-lg-5 fs-6">
									*須符合資格方可享學生優惠
								</h5>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">PARTY FOR ONE</h6>
									</div>
									<h1 className="fw-bold blur-font">
										1人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$59/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">
											PARTY FOR FRIENDS
										</h6>
									</div>
									<h1 className="fw-bold blur-font">
										4人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$168/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">PARTY FOR ALL</h6>
									</div>
									<h1 className="fw-bold blur-font">
										10人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$388/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
						</div>
					</div>
				</section>
				<section className="plan-block py-9 py-lg-10">
					<div className="row">
						<div className="col-lg-6 premium plan-banner position-relative d-flex justify-content-center mb-lg-2">
							<img
								className="pc-item"
								src={Images.Subscription_Premium}
								alt=""
							/>
							<img
								className="mobile-item"
								src={Images.Subscription_sm_Premium}
								alt=""
							/>
							<div className="plan-discription position-absolute">
								<h2 className="sub-title2">PREMIUM</h2>
								<h2 className="sub-title2">PLAN</h2>
								<h1>Premium方案</h1>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">PARTY FOR ONE</h6>
									</div>
									<h1 className="fw-bold blur-font">
										1人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$149/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">
											PULSE FOR FRIENDS & FAMILY
										</h6>
									</div>
									<h1 className="fw-bold blur-font">
										4人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$399/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
							<div className="plan-card rounded-4 d-flex justify-content-between align-items-center px-6 py-5 mb-5">
								<div className="discription">
									<div className="plan-card-header d-flex py-3">
										<img
											className="me-2"
											src={Images.Subscription_sm_icon}
											alt=""
										/>
										<h6 className="mb-0">
											PARTY FOR EVERYONE
										</h6>
									</div>
									<h1 className="fw-bold blur-font">
										10人方案
									</h1>
								</div>
								<div className="price d-flex align-items-center">
									<h3 className="fw-bold mt-5">NT$888/月</h3>
									<ArrowRight className="pc-arrow ms-3 mt-2"></ArrowRight>
								</div>
								<ArrowRight className="mobile-arrow"></ArrowRight>
							</div>
						</div>
					</div>
				</section>
				<section className="faq py-9 py-lg-10">
					<div className="row">
						<div className="col-12 pb-lg-8 pb-6 text-center">
							<h1 className="sub-title2">FAQ</h1>
							<h1>常見問題</h1>
						</div>
					</div>
					<div
						className="more-info mb-6 py-3 px-3 justify-content-center align-items-center"
						style={{ width: "65%" }}
					>
						<h5 className="pe-3 mb-0">更多訂閱方案</h5>
						<div className="bg-primary px-3 py-1 rounded-5">
							<ArrowUpRight className="text-black"></ArrowUpRight>
						</div>
					</div>
					<div>
						{faq.map((item) => {
							return (
								<div className="QA-group" key={item.id}>
									<div
										className="question d-flex justify-content-between align-items-center py-3"
										data-bs-toggle="collapse"
										href={`#${item.id}`}
										role="button"
										aria-expanded="false"
										aria-controls={item.id}
									>
										<div className="d-flex align-items-center">
											<h2 className="sub-title2">Q</h2>
											<h4 className="ps-6">
												{item.question}
											</h4>
										</div>
										<Minus className="icon minus" />
										<Plus className="icon plus" />
									</div>
									<div className="collapse" id={item.id}>
										<div className="d-flex flex-row align-items-center pb-4">
											<h2 className="sub-title2">A</h2>
											<p className="ps-6 mb-0">
												{item.answer}
											</p>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}

export default SubscriptionPage;
