// IMPORTED TYPES
import type { EntryGenerator, PageLoad } from './$types';

// IMPORTED MODULES
import { error } from '@sveltejs/kit';
import { getProjectBySlug, projects } from '$lib/data/projects';

export const prerender = true;

export const entries: EntryGenerator = () => projects.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = getProjectBySlug(params.slug);
	if (!project) {
		throw error(404, 'Project not found');
	}
	return { project };
};
