import prettierConfig from 'eslint-config-prettier';

export default [
  {
    ignores: ['node_modules/**', 'legacy/**'],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        URLSearchParams: 'readonly',
        // CDN libraries
        mermaid: 'readonly',
        marked: 'readonly',
        // Cross-file app globals (defined in one script, used in another)
        SECTIONS: 'readonly',
        SECTION_CONTENT: 'readonly',
        PERSONAS: 'readonly',
        currentPersona: 'writable',
        selectPersona: 'readonly',
        initPersona: 'readonly',
        updatePersonaBanner: 'readonly',
        togglePersonaMenu: 'readonly',
        applyStoredTheme: 'readonly',
        initSearch: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      eqeqeq: ['error', 'always'],
      'no-console': 'off',
    },
  },
  prettierConfig,
];
