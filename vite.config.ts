import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/gas': {
        target: 'https://script.google.com/macros/s/AKfycbz51BT_AkEuCx4kXt2aLg_N3T8ggTa8266CwfMoowMYa_IR5hAlRdRPXqq24f4pxCTV/exec',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/gas/, '')
      }
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
