import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolveTheme, toggleThemeValue } from './theme.js';

describe('theme logic unit tests', () => {
  it('toggles theme back and forth', () => {
    assert.equal(toggleThemeValue('light'), 'dark');
    assert.equal(toggleThemeValue('dark'), 'light');
  });

  it('respects explicitly saved user theme preference', () => {
    assert.equal(resolveTheme('dark', false), 'dark');
    assert.equal(resolveTheme('light', true), 'light');
  });

  it('falls back to system preference when no saved preference exists', () => {
    assert.equal(resolveTheme(null, true), 'dark');
    assert.equal(resolveTheme(null, false), 'light');
    assert.equal(resolveTheme('', true), 'dark');
    assert.equal(resolveTheme('invalid', false), 'light');
  });
});
