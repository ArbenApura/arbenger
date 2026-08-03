export interface SkillGroup {
	name: string;
	skills: string[];
}

export const skillGroups: SkillGroup[] = [
	{
		name: 'Frontend',
		skills: ['JavaScript / TypeScript', 'SvelteKit', 'Svelte', 'Next.js', 'React', 'Tailwind CSS', 'SCSS / CSS', 'HTML'],
	},
	{
		name: 'Backend',
		skills: ['Node.js', 'Supabase', 'Firebase', 'PocketBase', 'MySQL', 'PHP', 'ORM'],
	},
	{
		name: 'Mobile',
		skills: ['Capacitor', 'Progressive Web Apps', 'Google Play deployment'],
	},
	{
		name: 'Hosting & DevOps',
		skills: ['Vercel', 'Render', 'Cloudflare Pages', 'Plesk', 'Webuzo', 'Nginx', 'VPS'],
	},
	{
		name: 'AI & APIs',
		skills: ['OpenAI API', 'LLM prompt engineering', 'REST APIs'],
	},
];
