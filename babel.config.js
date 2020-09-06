module.exports = {
  'presets': [
    'next/babel',
  ],
  'env': {
    'test': {
      'presets': [
        [
          'next/babel',
          {
            'preset-env': {
              'modules': 'commonjs',
            },
          },
        ],
      ],
    },
  },
}
