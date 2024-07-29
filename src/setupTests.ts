import '@testing-library/jest-dom';
import 'jest-environment-jsdom';
import cssModulesRequireHook from 'css-modules-require-hook';

const cssModulesMock = new Proxy({}, {
  get: () => String,
});

cssModulesRequireHook({
  extensions: ['.css', '.scss', '.sass', '.less'],
  generateScopedName: '[name]__[local]___[hash:base64:5]',
  processorOpts: { autoprefixer: { grid: true } },
  rootDir: 'src',
});

import { toMatchImageSnapshot } from 'jest-image-snapshot';
expect.extend({ toMatchImageSnapshot });

