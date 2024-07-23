module.exports = {
    plugins: [
        require('postcss-replace')({
            pattern: /color-adjust/g,
            data: {
                replaceAll: 'print-color-adjust'
            }
        }),
        require('autoprefixer')
    ]
}
