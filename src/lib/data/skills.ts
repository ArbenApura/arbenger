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
		skills: ['Node.js', 'Supabase', 'Firebase', 'PocketBase', 'PostgreSQL', 'MySQL', 'PHP', 'Drizzle ORM'],
	},
	{
		name: 'Mobile',
		skills: ['Capacitor', 'Google Play Billing', 'Progressive Web Apps', 'Google Play deployment'],
	},
	{
		name: 'Hosting & DevOps',
		skills: ['Vercel', 'Render', 'Cloudflare Pages', 'Plesk', 'Webuzo', 'Nginx', 'VPS', 'CI/CD', 'Monorepo'],
	},
	{
		name: 'Tools',
		skills: ['Git', 'GitHub'],
	},
	{
		name: 'AI & APIs',
		skills: ['OpenAI API', 'Google AI Studio API', 'DeepSeek', 'LLM prompt engineering', 'REST APIs'],
	},
];
