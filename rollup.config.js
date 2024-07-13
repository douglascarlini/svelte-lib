import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';
import svg from 'rollup-plugin-svg-import';
import svelte from 'rollup-plugin-svelte';

export default {
    input: 'src/index.js',
    output: [
        { format: 'esm', sourcemap: true, file: 'dist/index.js' },
        { format: 'cjs', sourcemap: true, file: 'dist/index.cjs.js' }
    ],
    plugins: [
        svelte({
            emitCss: true,
            compilerOptions: {
                dev: !process.env.ROLLUP_WATCH,
                cssHash: ({ hash, css }) => hash(css)
            },
        }),
        postcss({ minimize: true }),
        svg({ stringify: true }),
        commonjs(),
        resolve(),
        terser()
    ],
    external: ['svelte/internal']
};
