import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		// Enable experimental features if needed
	},
	// Enable TypeScript strict mode
	typescript: {
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		ignoreBuildErrors: false,
	},
	eslint: {
		// Allow production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: false,
	},
};

export default withNextIntl(nextConfig);
