// IMPORTED TYPES
import type { EntryGenerator, PageLoad } from './$types';

// IMPORTED MODULES
import { error } from '@sveltejs/kit';
import { getPostBySlug, sortedPosts } from '$lib/data/blog';

export const entries: EntryGenerator = () => sortedPosts.map((post) => ({ slug: post.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPostBySlug(params.slug);
	if (!post) throw error(404, `Post "${params.slug}" not found`);
	return { post };
};
