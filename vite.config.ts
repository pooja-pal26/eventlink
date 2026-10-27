import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Without these the app silently falls back to a placeholder Supabase URL and
  // every registration fails with "Network problem". Fail the build instead.
  if (command === "build") {
    const env = loadEnv(mode, process.cwd(), "VITE_");
    const missing = ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"].filter((k) => !env[k]);
    if (missing.length) {
      throw new Error(`Build stopped: missing ${missing.join(", ")}. Set them in .env or the deploy build env.`);
    }
  }

  return {
  assetsInclude: ['**/*.mpeg'],
  server: {
    host: "::",
    port: 8080,
    allowedHosts:true,
    // allowedHosts: [
    //   "arlington-effects-eyes-knight.trycloudflare.com",
    //   "arbitrary-recommendation-unions-acrobat.trycloudflare.com",
    //   "centered-chess-import-neil.trycloudflare.com",
    //   "discussing-food-divide-biological.trycloudflare.com",
    //   "condo-hitachi-caught-post.trycloudflare.com",
    //   "desert-wet-collaborative-gives.trycloudflare.com",
    //   "inexpensive-clerk-valuation-anything.trycloudflare.com"
    // ],
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
});
