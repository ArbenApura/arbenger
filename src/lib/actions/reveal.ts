// SCROLL-TRIGGERED REVEAL ANIMATION USING IntersectionObserver

export interface RevealOptions {
	delay?: number;
	threshold?: number;
	once?: boolean;
}

export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.1, once = true } = options;

	node.style.opacity = '0';
	node.style.transform = 'translateY(30px)';
	node.style.transition = `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateY(0)';
					if (once) observer.unobserve(node);
				}
			});
		},
		{ threshold },
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}

export function revealScale(node: HTMLElement, options: RevealOptions = {}) {
	const { delay = 0, threshold = 0.1, once = true } = options;

	node.style.opacity = '0';
	node.style.transform = 'scale(0.92)';
	node.style.transition = `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'scale(1)';
					if (once) observer.unobserve(node);
				}
			});
		},
		{ threshold },
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}

export function revealSlide(node: HTMLElement, options: RevealOptions & { direction?: 'left' | 'right' } = {}) {
	const { delay = 0, threshold = 0.1, once = true, direction = 'left' } = options;
	const x = direction === 'left' ? '-40px' : '40px';

	node.style.opacity = '0';
	node.style.transform = `translateX(${x})`;
	node.style.transition = `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'translateX(0)';
					if (once) observer.unobserve(node);
				}
			});
		},
		{ threshold },
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		},
	};
}
