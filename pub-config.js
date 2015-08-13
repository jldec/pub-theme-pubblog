module.exports =
{
  'pub-pkg':        'pub-theme-pubblog',
  generatorPlugins: './plugins/generator-plugin.js',
  sources:          './templates',
  staticPaths: [
    { path:'./css/pubblog.css', route:'/css', inject:true },
    { path:'./images/default.jpg', route:'/images' } // default image
  ]
}
