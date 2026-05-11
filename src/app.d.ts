/// <reference types="@sveltejs/kit" />

declare namespace App {
	interface Platform {
		env?: {
			HYPERDRIVE: Hyperdrive;
			[key: string]: string | Hyperdrive;
		};
	}
}

interface Hyperdrive {
	connectionString: string;
}
