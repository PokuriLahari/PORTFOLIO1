import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  toggleProjectExpansion,
  isProjectExpanded,
  isExpandableProject,
  getProjectDuration,
  PROJECT_DETAILS
} from './project-expand.js';

describe('project-expand logic unit tests', () => {
  it('identifies expandable vs non-expandable projects', () => {
    assert.equal(isExpandableProject('sage'), true);
    assert.equal(isExpandableProject('watchdog'), true);
    assert.equal(isExpandableProject('aws-builder'), false);
  });

  it('defaults to not expanded when projectId is not in state', () => {
    const state = {};
    assert.equal(isProjectExpanded(state, 'sage'), false);
    assert.equal(isProjectExpanded(state, 'watchdog'), false);
    assert.equal(isProjectExpanded(state, 'aws-builder'), false);
  });

  it('toggles a project from unexpanded to expanded', () => {
    const initialState = {};
    const updated = toggleProjectExpansion(initialState, 'sage');
    assert.equal(isProjectExpanded(updated, 'sage'), true);
    assert.equal(isProjectExpanded(updated, 'watchdog'), false);
  });

  it('prevents expanding aws-builder as requested', () => {
    const initialState = {};
    const updated = toggleProjectExpansion(initialState, 'aws-builder');
    assert.equal(isProjectExpanded(updated, 'aws-builder'), false);
  });

  it('toggles an already expanded project back to collapsed', () => {
    const initialState = { sage: true, watchdog: false };
    const updated = toggleProjectExpansion(initialState, 'sage');
    assert.equal(isProjectExpanded(updated, 'sage'), false);
    assert.equal(isProjectExpanded(updated, 'watchdog'), false);
  });

  it('preserves other project expansion states when one is toggled', () => {
    const state1 = { sage: true, watchdog: true };
    const state2 = toggleProjectExpansion(state1, 'sage');
    assert.equal(isProjectExpanded(state2, 'sage'), false);
    assert.equal(isProjectExpanded(state2, 'watchdog'), true);
  });

  it('provides verified project durations matching 2026 commits and publications', () => {
    assert.match(getProjectDuration('sage'), /Aug 2026 – Oct 2026/);
    assert.match(getProjectDuration('watchdog'), /Jun 2026 – Oct 2026/);
    assert.match(getProjectDuration('aws-builder'), /Published Oct 2026/);
    assert.equal(PROJECT_DETAILS['sage'].techStack.length, 9);
    assert.equal(PROJECT_DETAILS['watchdog'].techStack.length, 8);
    assert.equal(PROJECT_DETAILS['aws-builder'].techStack.length, 8);
  });
});
