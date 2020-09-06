import babel from '@rollup/plugin-babel'
import pkg from './package.json' // eslint-disable-line import/extensions

export default ['umd', 'es'].map(format => ({
  input: 'index.js',
  output: {
    file: `dist/${pkg.name}.${format}.js`,
    name: format === 'umd' ? pkg.name : undefined,
    format,
    sourcemap: true,
    globals: {
      react: 'React',
      'redux-saga': 'ReduxSaga',
      '@abel/runtime/regenerator': 'regeneratorRuntime',
    },
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
    }),
  ],
  external: ['react', 'redux-saga', '@babel/runtime/regenerator'],
}))
