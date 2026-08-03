// IMPORTED TYPES
import type { PortfolioProject } from '$lib/types';

export const projects: PortfolioProject[] = [
	{
		slug: 'door-lock-module',
		name: 'Door Lock Module',
		tagline: 'Smart door lock with RFID and face recognition for a university faculty room.',
		year: '2026',
		category: 'IoT · Web App',
		role: 'Proponent · full-stack & hardware',
		status: 'Completed',
		recognition: 'Registered with IPOPHL · Feb 2026',
		summary:
			'Capstone for Bulacan State University: an Arduino-powered smart door lock with RFID and face recognition, managed through a SvelteKit web app.',
		problem:
			'Unauthorized access to the faculty room of the Information Technology and Decision Sciences (ITDS) Department at Bulacan State University — Sarmiento Campus.',
		solution:
			'An Arduino-powered smart door lock system with RFID and face recognition, plus a management website for real-time access control: assign, change, or remove face profiles and RFID cards from any browser.',
		features: [
			'RFID authentication from two readers (front and back of the door)',
			'Face recognition through the web interface',
			'Real-time access logs',
			'Role-based permissions for admins and staff',
			'Special access requests workflow',
			'Automated notifications',
			'LCD, LED, and buzzer status feedback',
			'UPS backup power during outages',
		],
		stack: ['SvelteKit', 'Supabase', 'Face API JS', 'Arduino Mega 2560', 'ESP8266 NodeMCU', 'RFID RC522', 'Vercel'],
		links: [{ label: 'Video demo', url: 'https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/view' }],
		video: {
			embedUrl: 'https://drive.google.com/file/d/1nP0sxq7zsu-T9uGX4PkL9_r0YTN7GDT7/preview',
			title: 'Door Lock Module demo',
		},
		pdf: {
			path: '/projects/door-lock-module/IMRAD-Smart-Door-Lock-Face-Recognition-and-RFID-Technology-for-ITDS-Department-SC.pdf',
			label: 'Research paper (IMRAD)',
		},
	},
	{
		slug: 'top-one-uwu',
		name: 'Top One Uwu',
		tagline: 'Free AI-powered writing assistant for students — featured in Inquirer.net.',
		year: '2022',
		category: 'Web App · AI',
		role: 'Solo developer',
		status: 'Archived',
		recognition: 'Featured in Inquirer.net',
		summary:
			'A free AI-powered writing and study assistant for students, built at 19 while exploring SvelteKit. Went viral in the Programming Philippines community and was covered by Inquirer.net.',
		problem:
			'Paid grammar-checking apps hide their best features behind premium upgrades — students needed a free alternative.',
		solution:
			'A completely free web app combining grammar fixing, rewriting, summarizing, essay writing, and plagiarism checking, run entirely on free tiers of Supabase, OpenAI, and Render.',
		features: [
			'Grammar fixer',
			'Content rephraser',
			'Content expander',
			'Content summarizer',
			'Essay writer',
			'Essay title generator',
			'Plagiarism checker',
		],
		stack: ['SvelteKit', 'Supabase', 'OpenAI API', 'Tailwind CSS', 'Render'],
		links: [
			{
				label: 'Inquirer.net article',
				url: 'https://technology.inquirer.net/118079/19-yo-student-develops-free-alternative-grammar-checking-web-app',
			},
		],
		cover: '/projects/top-one-uwu/cover.png',
		screenshots: ['/projects/top-one-uwu/screenshot-1.png'],
	},
	{
		slug: 'calculus-courseware',
		name: 'Basic Calculus Courseware',
		tagline: 'Client-built e-learning platform for a doctoral program.',
		year: '2022',
		category: 'Web App · E-learning',
		role: 'Contracted full-stack developer',
		status: 'Completed',
		summary:
			'A courseware platform for Basic Calculus with student and teacher accounts — courses, lessons, videos, modules, interactive worksheets, and assessments.',
		problem: 'A client completing a doctoral degree needed a courseware platform tailored to teaching Basic Calculus.',
		solution:
			'A comprehensive web application covering the whole teaching workflow: enrolled students, lessons, academic quarters, video materials, modules, worksheets, and assessments.',
		features: [
			'Student and teacher accounts',
			'Course and lesson management',
			'Video material storage',
			'Module delivery',
			'Interactive worksheets',
			'Assessments',
			'Academic quarter tracking',
		],
		stack: ['Next.js', 'React', 'Firebase'],
		links: [],
		cover: '/projects/calculus-courseware/cover.png',
		screenshots: ['/projects/calculus-courseware/screenshot-1.png'],
	},
	{
		slug: 'exemplary-league-portal',
		name: 'ELITS Membership Portal',
		tagline: 'Digital membership and blog portal for my student organization — built as Vice-President.',
		year: '2023',
		category: 'Web App',
		role: 'Solo developer · org VP',
		status: 'Completed',
		summary:
			'Streamlined the membership process for the Exemplary League of Information Technology Students (ELITS) at Bulacan State University — Sarmiento Campus, with a blog alongside.',
		problem: 'The student organization relied on manual sign-ups; membership needed a digital workflow.',
		solution: 'A web application that streamlines ELITS membership, with a built-in blog covering a variety of topics.',
		features: ['Digital membership process', 'Built-in blog'],
		stack: ['SvelteKit', 'Tailwind CSS', 'Supabase'],
		links: [],
		cover: '/projects/exemplary-league-portal/cover.png',
		screenshots: [
			'/projects/exemplary-league-portal/screenshot-1.png',
			'/projects/exemplary-league-portal/screenshot-2.png',
		],
	},
];

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
	return projects.find((p) => p.slug === slug);
}
