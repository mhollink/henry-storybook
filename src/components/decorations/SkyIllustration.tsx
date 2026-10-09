export function SkyIllustration() {
	return (
		<svg
			className="sky-illustration"
			viewBox="0 0 680 490"
			role="img"
			aria-label="Een zachte avondlucht met wolken, een maan en gouden sterren"
		>
			<defs>
				<linearGradient id="skyFade" x1="0" x2="0" y1="0" y2="1">
					<stop offset="0%" stopColor="#b9d2e4" />
					<stop offset="100%" stopColor="#e8f0ef" />
				</linearGradient>
				<radialGradient id="moonGlow">
					<stop offset="0%" stopColor="#fff7dd" stopOpacity="0.86" />
					<stop offset="100%" stopColor="#fff7dd" stopOpacity="0" />
				</radialGradient>
			</defs>
			<rect width="680" height="490" rx="40" fill="url(#skyFade)" />
			<circle cx="473" cy="166" r="106" fill="url(#moonGlow)" />
			<path
				d="M480 76A59 59 0 1 0 553 161A64 64 0 0 1 480 76Z"
				fill="#f5e9b9"
				opacity="0.92"
			/>
			<g className="stars" fill="#cba65b">
				<path d="M154 77l4 13 13 4-13 4-4 13-4-13-13-4 13-4Z" />
				<path d="M312 49l3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" />
				<path d="M587 271l4 14 14 4-14 4-4 14-4-14-14-4 14-4Z" />
				<circle cx="388" cy="127" r="3" />
				<circle cx="272" cy="149" r="3" />
				<circle cx="606" cy="94" r="2.5" />
				<circle cx="104" cy="206" r="2.5" />
				<circle cx="405" cy="55" r="2.5" />
				<circle cx="215" cy="225" r="2.5" />
			</g>
			<path
				d="M154 286 Q238 175 353 238 T564 216"
				fill="none"
				stroke="#fdf9ef"
				strokeWidth="3"
				strokeDasharray="2 14"
				strokeLinecap="round"
				opacity="0.7"
			/>
			<g fill="#f9faf6">
				<path d="M-38 379 Q-22 329 31 344 Q58 290 126 312 Q152 280 198 305 Q259 299 276 353 Q315 347 337 393 L337 500H-38Z" />
				<path d="M299 414 Q325 368 378 379 Q403 322 465 349 Q494 310 549 337 Q595 321 615 378 Q661 367 712 415 V510H299Z" />
			</g>
			<path
				d="M0 460Q150 395 304 454T680 450V490H0Z"
				fill="#f4f4eb"
				opacity="0.9"
			/>
			<path
				d="M384 276l25-8-17 19 2-12-12-3Z"
				fill="#fffcf4"
				stroke="#829eb0"
				strokeWidth="2"
				strokeLinejoin="round"
			/>
			<path
				d="M394 275l18-24"
				stroke="#829eb0"
				strokeWidth="1.8"
				strokeLinecap="round"
			/>
		</svg>
	);
}
