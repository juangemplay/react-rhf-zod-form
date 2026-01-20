import '@testing-library/jest-dom/vitest';
import { beforeEach } from 'vitest';
import { resetSnowForm, setupSnowForm } from '../registry';
import { DEFAULT_COMPONENTS } from '../components';
import { DEFAULT_FORM_UI, DEFAULT_SUBMIT_BUTTON } from '../registry/componentRegistry';

// Setup default components before each test
beforeEach(() => {
  // Reset to clean state
  resetSnowForm();

  // Setup with default components for testing
  setupSnowForm({
    translate: (key: string) => key,
    components: DEFAULT_COMPONENTS,
    formUI: DEFAULT_FORM_UI,
    submitButton: DEFAULT_SUBMIT_BUTTON,
  });
});
