const context = require.context('./', true, /\.\/[^/]+\/index\.jsx$/);

context.keys().forEach((filePath) => {
  // Remove the './' and './svg' from the object key
  const componentName = filePath.replace(/^.+\/([^/]+)\/index\.jsx/, '$1');
  if (process.env.NODE_ENV === 'development') console.log('%cExporting component: ', 'color:green', componentName);
  module.exports[componentName] = context(filePath).default;
});
