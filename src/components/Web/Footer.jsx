import { MoveUp } from "lucide-react";
import footerLogo from '../assets/images/Logo_b.png';
function Footer() {
    const scrollToTop = () => {
        window.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
    }

	return (
		<footer className="footer bg-white z-3 position-relative">
			<div className="container d-flex justify-content-between align-items-end flex-wrap">
				<img
					src={footerLogo}
					alt="PULSE logo"
					className="img img-fluid"
				/>
				<button
					className="scroll-top btn btn-dark rounded-3 order-sm-3"
                    onClick={scrollToTop}
				>
					<MoveUp /> 
				</button>
				<p className="content text-black m-0 order-sm-2 mt-5 mt-sm-0">
					Copyright © 2025 PULSE
				</p>
			</div>
		</footer>
	);
}

export default Footer;