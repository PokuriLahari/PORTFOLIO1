import test from 'node:test';
import assert from 'node:assert/strict';
import { installFetchPatch, isExtensionError } from './fetch-patch';

test('isExtensionError correctly detects chrome and firefox extension sources', () => {
  assert.equal(
    isExtensionError('chrome-extension://eppiocemhmnlbhjplcgkofciiegomcon/executors/200.js:1:1090'),
    true
  );
  assert.equal(isExtensionError('moz-extension://abcd-1234/background.js'), true);
  assert.equal(isExtensionError('https://ais-dev.run.app/src/main.tsx'), false);
  assert.equal(isExtensionError(''), false);
  assert.equal(isExtensionError(null), false);
  assert.equal(isExtensionError(undefined), false);
});

test('handles getter-only fetch property and allows assignment after patch', () => {
  // Simulate an environment where target has a getter-only fetch property
  const fakeWindow: any = {};
  let originalCallCount = 0;
  const mockFetch = () => {
    originalCallCount++;
    return 'original';
  };

  Object.defineProperty(fakeWindow, 'fetch', {
    get() {
      return mockFetch;
    },
    // No setter - trying to assign will throw in strict mode
    configurable: true,
    enumerable: true,
  });

  // Verify that assigning directly would throw or fail
  assert.throws(
    () => {
      'use strict';
      fakeWindow.fetch = () => 'patched';
    },
    {
      name: 'TypeError',
    }
  );

  // Install our resilient patch
  const installed = installFetchPatch(fakeWindow);
  assert.equal(installed, true);

  // Now assignment must succeed without throwing!
  let customCallCount = 0;
  const customFetch = () => {
    customCallCount++;
    return 'custom';
  };

  assert.doesNotThrow(() => {
    fakeWindow.fetch = customFetch;
  });

  // Invoking fetch should now call customFetch
  const result = fakeWindow.fetch();
  assert.equal(result, 'custom');
  assert.equal(customCallCount, 1);
});
