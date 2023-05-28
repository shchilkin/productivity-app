module.exports = {
    plugins: ["@typescript-eslint", "xstate"],
    extends: [
        "next/core-web-vitals",
        "plugin:jest-dom/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:xstate/recommended"
    ],
    rules: {
        "@typescript-eslint/no-unused-vars": "error",
        "xstate/spawn-usage": "error",
        "xstate/no-infinite-loop": "error",
        "xstate/no-imperative-action": "error",
        "xstate/no-ondone-outside-compound-state": "error",
        "xstate/invoke-usage": "error",
        "xstate/entry-exit-action": "error",
        "xstate/prefer-always": "error",
        "xstate/no-misplaced-on-transition": "error",
        "xstate/no-invalid-transition-props": "error",
        "xstate/no-invalid-state-props": "error",
        "xstate/no-async-guard": "error",
        "xstate/event-names": ["error", "macroCase"],
        "xstate/state-names": ["error", "camelCase"],
        "xstate/no-inline-implementation": "error",
        "xstate/no-auto-forward": "warn",
        "sort-imports": ["error", {
            "ignoreCase": false,
            "ignoreDeclarationSort": false,
            "ignoreMemberSort": false,
            "memberSyntaxSortOrder": ["none", "all", "multiple", "single"],
            "allowSeparatedGroups": false
        }]
    }
}
