import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'js/app.js',
  output: {
    file: 'js/bundle.js',
    format: 'esm'
  },
  plugins: [ resolve() ]
};
