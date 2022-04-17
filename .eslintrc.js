module.exports = {
  extends: ['@shoveller/eslint-config'],
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        'react-hooks/rules-of-hooks': ['off'],
        // hook의 dep array는 반드시 지켜야 한다
        'react-hooks/exhaustive-deps': ['off'], // Checks effect dependencies
      },
    },
  ],
}
