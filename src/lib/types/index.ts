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

export type BlogCategory = 'tutorial' | 'devlog' | 'release' | 'opinion';

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
