import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// Standard Vite + React configuration for SPA builds (static output)
export default defineConfig({
	base: "./",
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: "dist",
		emptyOutDir: true,
		rollupOptions: {
			output: {
				entryFileNames: `[name]-[hash].js`,
				chunkFileNames: `[name]-[hash].js`,
				assetFileNames: `[name]-[hash].[ext]`
			}
		}
	},
});
