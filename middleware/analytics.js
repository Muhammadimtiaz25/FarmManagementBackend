// Middleware to inject Vercel Analytics script into HTML responses
const injectAnalyticsScript = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    // Only inject into HTML responses
    const contentType = res.get('Content-Type');
    if (contentType && contentType.includes('text/html') && typeof data === 'string') {
      // Check if the HTML has a closing body tag
      if (data.includes('</body>')) {
        // Inject Vercel Analytics script before closing body tag
        const analyticsScript = `
          <script src="https://cdn.vercel-insights.com/v1/script.js" defer></script>
          <script>
            window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
          </script>
        `;
        data = data.replace('</body>', `${analyticsScript}</body>`);
      }
    }
    originalSend.call(this, data);
  };

  next();
};

module.exports = injectAnalyticsScript;
