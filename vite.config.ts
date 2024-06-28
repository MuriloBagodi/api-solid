import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environmentMatchGlobs: [['src/routes/**/*.controller.ts', 'prisma']],
    dir: 'src', // Essa linha
  },
})
