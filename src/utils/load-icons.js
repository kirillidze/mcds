const iconsContext = require.context("@/assets/icons/", true, /^\.\/.*\.svg$/)
const icons = iconsContext.keys().map(icon => icon.slice(2, -4))
export default icons
