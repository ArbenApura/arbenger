/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Platform {
		env?: {
			[key: string]: string;
		};
	}
}
