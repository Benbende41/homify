/** @type {import('stylelint').Config} */
export default {
    extends: ['stylelint-config-standard'],
    rules: {
        // Tailwind CSS v4 支持
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: [
                    'tailwind',
                    'apply',
                    'layer',
                    'config',
                    'variants',
                    'responsive',
                    'screen',
                    'theme',
                    'utility',
                    'import'
                ]
            }
        ],
        'function-no-unknown': [
            true,
            {
                ignoreFunctions: ['theme']
            }
        ],
        'import-notation': null,
        'declaration-property-value-no-unknown': null
    },
    overrides: [
        {
            files: ['*.scss', '**/*.scss'],
            extends: ['stylelint-config-standard-scss'],
            rules: {
                'scss/at-rule-no-unknown': [
                    true,
                    {
                        ignoreAtRules: [
                            'tailwind',
                            'apply',
                            'layer',
                            'config',
                            'variants',
                            'responsive',
                            'screen',
                            'theme',
                            'utility',
                            'import'
                        ]
                    }
                ],
                'import-notation': null,
                'declaration-property-value-no-unknown': null
            }
        },
        {
            files: ['*.vue', '**/*.vue'],
            extends: ['stylelint-config-standard-scss', 'stylelint-config-standard-vue/scss'],
            rules: {
                'scss/at-rule-no-unknown': [
                    true,
                    {
                        ignoreAtRules: [
                            'tailwind',
                            'apply',
                            'layer',
                            'config',
                            'variants',
                            'responsive',
                            'screen',
                            'theme',
                            'utility',
                            'import'
                        ]
                    }
                ],
                'import-notation': null,
                'declaration-property-value-no-unknown': null
            }
        }
    ]
}
