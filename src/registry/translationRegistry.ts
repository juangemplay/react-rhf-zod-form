// =============================================================================
// Translation Registry
// =============================================================================

/**
 * Translation function type
 */
export type TranslationFunction = (key: string) => string;

/**
 * Default translations (English)
 */
const defaultTranslations: Record<string, string> = {
  'snowForm.submit': 'Submit',
  'snowForm.submitting': 'Submitting...',
  'snowForm.required': 'Required',
  'snowForm.selectPlaceholder': 'Select...',
};

/**
 * Custom translation function (set via setupSnowForm)
 */
let customTranslateFn: TranslationFunction | null = null;

/**
 * Custom static translations (set via setupSnowForm)
 */
let customTranslations: Record<string, string> = {};

/**
 * Translate a key:
 * 1. Check custom static translations first (highest priority)
 * 2. Then try the translate function (for dynamic keys like field labels)
 * 3. Finally fall back to built-in defaults
 */
const translate = (key: string): string => {
  // 1. Check custom static translations first
  if (key in customTranslations) {
    return customTranslations[key];
  }

  // 2. Try custom translate function
  if (customTranslateFn) {
    const result = customTranslateFn(key);
    if (result !== key) return result;
  }

  // 3. Fall back to built-in defaults
  return defaultTranslations[key] ?? key;
};

// =============================================================================
// Registration API
// =============================================================================

/**
 * Set the translation function.
 * Called internally by setupSnowForm.
 *
 * @param fn - Translation function (e.g., i18next t function)
 *
 * @example
 * ```typescript
 * import { useTranslation } from 'react-i18next';
 *
 * const { t } = useTranslation('data');
 * setTranslationFunction(t);
 * ```
 */
export function setTranslationFunction(fn: TranslationFunction): void {
  customTranslateFn = fn;
}

/**
 * Set custom static translations (highest priority).
 * These take precedence over both the translate function and built-in defaults.
 * Called internally by setupSnowForm.
 *
 * @param translations - Static translations to set
 *
 * @example
 * ```typescript
 * setTranslations({
 *   'snowForm.submit': 'Envoyer',
 *   'snowForm.submitting': 'Envoi en cours...',
 * });
 * ```
 */
export function setTranslations(translations: Record<string, string>): void {
  customTranslations = { ...translations };
}

/**
 * Get the translate function.
 * Used internally by SnowForm components.
 *
 * @returns The translate function
 */
export function getT(): TranslationFunction {
  return translate;
}

/**
 * Get all translation keys (useful for debugging)
 *
 * @returns Array of all translation keys
 */
export function getTranslationKeys(): string[] {
  return Object.keys(defaultTranslations);
}

// =============================================================================
// Reset (useful for testing)
// =============================================================================

/**
 * Reset translation registry to defaults (mainly for testing)
 */
export function resetTranslationRegistry(): void {
  customTranslateFn = null;
  customTranslations = {};
}
