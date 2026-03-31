import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

/**
 * Dev-only Vite plugin: exposes POST /api/save-snap-config
 * so the in-browser Snap Controls panel can write the DEFAULTS
 * constant directly back into PortfolioShowcase.tsx.
 */
function snapConfigWriterPlugin() {
  return {
    name: 'snap-config-writer',
    configureServer(server: import('vite').ViteDevServer) {
      server.middlewares.use('/api/save-snap-config', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
        req.on('end', () => {
          try {
            const cfg = JSON.parse(body);
            const filePath = join(
              fileURLToPath(new URL('.', import.meta.url)),
              'src/app/components/PortfolioShowcase.tsx'
            );
            let source = readFileSync(filePath, 'utf-8');

            // Build replacement DEFAULTS block
            const newDefaults = `const DEFAULTS: SnapConfig = {
  zoneTop: ${cfg.zoneTop},
  zoneBottom: ${cfg.zoneBottom},
  easePower: ${cfg.easePower},
  gradientBoost: ${cfg.gradientBoost},
  cardHeight: ${cfg.cardHeight},
  snapEnabled: ${cfg.snapEnabled},
  snapIntensity: ${cfg.snapIntensity},
  stickyOffset: ${cfg.stickyOffset},
  scrollSmoothing: ${cfg.scrollSmoothing},
};`;

            // Replace existing DEFAULTS constant (matches from "const DEFAULTS" to closing "};")
            const defaultsRegex = /const DEFAULTS: SnapConfig = \{[\s\S]*?\n\};/;
            if (!defaultsRegex.test(source)) {
              res.statusCode = 500;
              res.end(JSON.stringify({ ok: false, error: 'Could not find DEFAULTS in source' }));
              return;
            }

            source = source.replace(defaultsRegex, newDefaults);
            writeFileSync(filePath, source, 'utf-8');

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
          } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    snapConfigWriterPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // Alias figma:asset to the src/assets directory for Figma exported assets
      'figma:asset': fileURLToPath(new URL('./src/assets', import.meta.url)),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
