// PARALLAX SCROLL EFFECT — MOVES ELEMENT AT A FRACTION OF SCROLL SPEED

import { browser } from '$app/environment';

export function parallax(node: HTMLElement, speed: number = 0.3) {
	if (!browser) return { destroy() {} };

	function handleScroll() {
		const rect = node.getBoundingClientRect();
		const scrolled = window.scrollY;
		const offset = (scrolled - node.offsetTop + window.innerHeight) * speed;
		node.style.transform = `translateY(${offset}px)`;
	}

	window.addEventListener('scroll', handleScroll, { passive: true });
	handleScroll();

	return {
		destroy() {
			window.removeEventListener('scroll', handleScroll);
		},
	};
}
