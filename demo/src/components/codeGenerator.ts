import type { DemoConfig, ComponentMode } from './types';

export function generateInstallCode(): string {
  return `npm install react-hook-form @hookform/resolvers zod
npm install @snowpact/react-rhf-zod-form`;
}

export function generateSetupCode(mode: ComponentMode): string {
  if (mode === 'custom') {
    return `// Run once at app startup (e.g., app/setup.ts, _app.tsx, main.tsx)
import { setupSnowForm } from '@snowpact/react-rhf-zod-form';
import type { RegisteredComponentProps, FormUILabelProps } from '@snowpact/react-rhf-zod-form';
// NO CSS import needed - custom components handle their own styling

// Example custom input component
function CustomInput({ value, onChange, placeholder, disabled, name }: RegisteredComponentProps<string>) {
  return (
    <input
      id={name}
      name={name}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-3 py-2 border-2 border-purple-300 rounded-lg
                 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
    />
  );
}

// Example custom label component
function CustomLabel({ children, required, invalid, htmlFor }: FormUILabelProps) {
  return (
    <label htmlFor={htmlFor} className={\`font-semibold \${invalid ? 'text-red-600' : 'text-purple-700'}\`}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

setupSnowForm({
  translate: (key) => key,
  components: {
    text: CustomInput,
    email: (props) => <CustomInput {...props} type="email" />,
    password: (props) => <CustomInput {...props} type="password" />,
    // ... other components
  },
  formUI: {
    label: CustomLabel,
    description: ({ children }) => <p className="text-purple-500">{children}</p>,
    errorMessage: ({ message }) => <p className="text-red-600">{message}</p>,
  },
  submitButton: ({ loading, disabled, children }) => (
    <button
      type="submit"
      disabled={disabled || loading}
      className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white
                 font-semibold rounded-lg disabled:opacity-50"
    >
      {loading ? 'Processing...' : children}
    </button>
  ),
});`;
  }

  return `// Run once at app startup (e.g., app/setup.ts, _app.tsx, main.tsx)
import {
  setupSnowForm,
  DEFAULT_COMPONENTS,
  DEFAULT_FORM_UI,
  DEFAULT_SUBMIT_BUTTON,
} from '@snowpact/react-rhf-zod-form';
import '@snowpact/react-rhf-zod-form/styles.css'; // Required for default components

setupSnowForm({
  translate: (key) => key,
  components: DEFAULT_COMPONENTS,
  formUI: DEFAULT_FORM_UI,
  submitButton: DEFAULT_SUBMIT_BUTTON,
});`;
}

export function generateFormCode(config: DemoConfig): string {
  const debugProp = config.showDebugMode ? '\n      debug={true}' : '';

  if (config.renderMode === 'children') {
    return `import { SnowForm } from '@snowpact/react-rhf-zod-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().optional(),
  role: z.enum(['admin', 'user', 'guest']),
  acceptTerms: z.boolean().refine(val => val === true, 'Required'),
});

function MyForm() {
  return (
    <SnowForm
      schema={schema}
      defaultValues={{ firstName: '' }}${debugProp}
      onSubmit={async (data) => {
        await saveToApi(data);
      }}
      overrides={{
        firstName: { label: 'First Name', placeholder: 'John' },
        lastName: { label: 'Last Name', placeholder: 'Doe' },
        email: { label: 'Email', type: 'email' },
        bio: { label: 'Bio', type: 'textarea' },
        role: {
          label: 'Role',
          options: [
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
          ],
        },
        acceptTerms: { label: 'I accept the terms' },
      }}
    >
      {({ renderField, renderSubmitButton }) => (
        <div className="grid grid-cols-2 gap-4">
          <div>{renderField('firstName')}</div>
          <div>{renderField('lastName')}</div>
          <div className="col-span-2">{renderField('email')}</div>
          <div className="col-span-2">{renderField('bio')}</div>
          <div>{renderField('role')}</div>
          <div>{renderField('acceptTerms')}</div>
          <div className="col-span-2">
            {renderSubmitButton({ children: 'Create Account' })}
          </div>
        </div>
      )}
    </SnowForm>
  );
}`;
  }

  return `import { SnowForm } from '@snowpact/react-rhf-zod-form';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18'),
  bio: z.string().optional(),
  role: z.enum(['admin', 'user', 'guest']),
  satisfaction: z.number().min(1).max(5).optional(),
  acceptTerms: z.boolean().refine(val => val === true, 'Required'),
});

function MyForm() {
  return (
    <SnowForm
      schema={schema}
      defaultValues={{ firstName: '' }}${debugProp}
      onSubmit={async (data) => {
        await saveToApi(data);
      }}
      overrides={{
        firstName: { label: 'First Name', placeholder: 'John' },
        lastName: { label: 'Last Name', placeholder: 'Doe' },
        email: {
          label: 'Email',
          type: 'email',
          description: 'We will never share your email',
        },
        age: { label: 'Age' },
        bio: { label: 'Bio', type: 'textarea' },
        role: {
          label: 'Role',
          options: [
            { value: 'admin', label: 'Administrator' },
            { value: 'user', label: 'User' },
            { value: 'guest', label: 'Guest' },
          ],
        },
        satisfaction: {
          label: 'Satisfaction',
          render: ({ value, onChange }) => (
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => onChange(star)}
                  className={value >= star ? 'text-yellow-400' : 'text-gray-300'}
                >
                  ★
                </button>
              ))}
            </div>
          ),
        },
        acceptTerms: { label: 'I accept the terms' },
      }}
    />
  );
}`;
}
