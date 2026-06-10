import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Standard Vite + React configuration for SPA builds (static output)
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: "dist",
		emptyOutDir: true,
	},
});
