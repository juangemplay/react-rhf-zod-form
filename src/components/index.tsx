import type { RegisterableComponent } from '../types';

import { DefaultInput } from './DefaultInput';
import { DefaultTextarea } from './DefaultTextarea';
import { DefaultSelect } from './DefaultSelect';
import { DefaultCheckbox } from './DefaultCheckbox';
import { DefaultRadio } from './DefaultRadio';
import { DefaultNumberInput } from './DefaultNumberInput';
import { DefaultDatePicker } from './DefaultDatePicker';

export { DefaultInput, DefaultTextarea, DefaultSelect, DefaultCheckbox, DefaultRadio, DefaultNumberInput, DefaultDatePicker };

// =============================================================================
// Default Components Map
// =============================================================================

const EmailInput: RegisterableComponent = props => <DefaultInput {...props} type="email" />;
const PasswordInput: RegisterableComponent = props => <DefaultInput {...props} type="password" />;
const TimeInput: RegisterableComponent = props => <DefaultInput {...props} type="time" />;
const DateTimeLocalInput: RegisterableComponent = props => <DefaultInput {...props} type="datetime-local" />;
const TelInput: RegisterableComponent = props => <DefaultInput {...props} type="tel" />;
const UrlInput: RegisterableComponent = props => <DefaultInput {...props} type="url" />;
const ColorInput: RegisterableComponent = props => <DefaultInput {...props} type="color" />;
const FileInput: RegisterableComponent = props => <DefaultInput {...props} type="file" />;

/**
 * Default components for all built-in field types.
 * Import these if you want to use SnowForm's default styled components.
 * Requires importing '@snowpact/react-rhf-zod-form/styles.css'.
 *
 * @example
 * ```typescript
 * import { setupSnowForm, DEFAULT_COMPONENTS } from '@snowpact/react-rhf-zod-form';
 * import '@snowpact/react-rhf-zod-form/styles.css';
 *
 * setupSnowForm({
 *   translate: (key) => key,
 *   components: DEFAULT_COMPONENTS,
 * });
 * ```
 */
export const DEFAULT_COMPONENTS: Partial<Record<string, RegisterableComponent>> = {
  text: DefaultInput,
  email: EmailInput,
  password: PasswordInput,
  time: TimeInput,
  'datetime-local': DateTimeLocalInput,
  tel: TelInput,
  url: UrlInput,
  color: ColorInput,
  file: FileInput,
  textarea: DefaultTextarea,
  select: DefaultSelect,
  checkbox: DefaultCheckbox,
  radio: DefaultRadio,
  number: DefaultNumberInput,
  date: DefaultDatePicker,
} as const;
