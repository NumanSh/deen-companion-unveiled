
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    watch: {
      // Exclude node_modules and other large directories from being watched
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
        '**/.git/**',
        '**/coverage/**',
        '**/public/**',
        '**/*.log',
        '**/tmp/**',
        '**/temp/**'
      ],
      // Use polling for file watching to reduce file descriptor usage
      usePolling: true,
      // Set polling interval to reduce system load
      interval: 1000
    },
    // Increase the maximum number of files that can be watched
    fs: {
      strict: false
    }
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize dependencies to reduce the number of files processed
  optimizeDeps: {
    exclude: ['lovable-tagger']
  }
}));
