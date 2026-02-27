import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import VueEslintParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
    {
        files: ['**/*.{ts,tsx,vue}'],
        plugins: {
            vue: pluginVue,
            'simple-import-sort': simpleImportSort
        },
        rules: {
            ...js.configs.recommended.rules,
            ...pluginVue.configs['flat/recommended'].rules,
            'simple-import-sort/imports': 'error'
        },
        languageOptions: {
            parser: VueEslintParser,
            parserOptions: {
                parser: tsParser
            },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        }
    }
]
