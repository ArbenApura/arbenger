// IMPORTED TYPES
import type { NavLink, SocialLink } from '$lib/types';

export const navLinks: NavLink[] = [
	{ label: 'Projects', href: '/projects/' },
	{ label: 'Blog', href: '/blog/' },
	{ label: 'About', href: '/about/' },
	{ label: 'Contact', href: '/contact/' },
	{ label: 'Resume', href: '/resume/' },
];

export const socialLinks: SocialLink[] = [
	{
		platform: 'Upwork',
		url: 'https://www.upwork.com/freelancers/~01593bc7fcb529f110',
		icon: 'upwork',
		description: 'Freelance profile — long-term remote engagements since 2025.',
		stats: [
			{ label: 'Earned', value: '$20K+' },
			{ label: 'Hours', value: '3,590' },
		],
	},
	{
		platform: 'LinkedIn',
		url: 'https://www.linkedin.com/in/arbenapura',
		icon: 'linkedin',
		description: 'Professional network, experience, and open-to-work status.',
	},
	{
		platform: 'OnlineJobs.ph',
		url: 'https://onlinejobs.ph/jobseekers/info/5228430',
		icon: 'onlinejobs',
		description: 'Remote-work profile on the Philippines’ leading freelance marketplace.',
	},
	{
		platform: 'GitHub',
		url: 'https://github.com/ArbenApura',
		icon: 'github',
		description: 'Open-source code and side projects.',
	},
	{
		platform: 'Facebook',
		url: 'https://www.facebook.com/arbenapura.official',
		icon: 'facebook',
		description: 'Personal profile and updates.',
	},
];
