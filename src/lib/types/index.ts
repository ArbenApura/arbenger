export type ProductCategory = 'vscode-extensions' | 'chrome-plugins' | 'ai-tools' | 'misc-tools' | 'saas';

export type ProductStatus = 'coming-soon' | 'live' | 'beta' | 'deprecated';

export type ProductPlatform = 'vscode-marketplace' | 'chrome-web-store' | 'web' | 'desktop' | 'mobile';

export interface Product {
	slug: string;
	name: string;
	description: string;
	longDescription?: string;
	category: ProductCategory;
	status: ProductStatus;
	platform: ProductPlatform;
	externalUrl?: string;
	icon?: string;
	screenshot?: string;
	tags: string[];
	launchDate?: string;
	featured: boolean;
}

export interface ProductCategoryInfo {
	id: ProductCategory;
	name: string;
	description: string;
	icon: string;
	productCount: number;
}

export interface PageMeta {
	title: string;
	description: string;
	url: string;
	image?: string;
	type?: 'website' | 'article';
}

export interface JsonLdSchema {
	'@context': string;
	'@type': string;
	[key: string]: unknown;
}

export interface NavLink {
	label: string;
	href: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

export interface Locale {
	code: string;
	label: string;
	flag: string;
	enabled: boolean;
}

export type BlogCategory = 'tutorial';

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	updatedDate?: string;
	category: BlogCategory;
	tags: string[];
	readTime: number;
	coverImage?: string;
	featured: boolean;
}

export interface BlogCategoryInfo {
	id: BlogCategory;
	label: string;
}

export interface PortfolioProject {
	slug: string;
	name: string;
	tagline: string;
	year: string;
	category: string;
	role: string;
	status: string;
	recognition?: string;
	summary: string;
	problem?: string;
	solution?: string;
	features: string[];
	stack: string[];
	links: { label: string; url: string }[];
	cover?: string;
	screenshots?: string[];
	video?: { embedUrl: string; title: string };
	pdf?: { path: string; label: string };
}
