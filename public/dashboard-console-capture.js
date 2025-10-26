(function() {
  // Only run in iframe context
  if (window.self === window.top) return;
  
  const logs = [];
  const MAX_LOGS = 500;
  
  // Store original console methods
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
  };
  
  // Helper function to safely stringify objects
  function safeStringify(obj) {
    try {
      return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'function') return '[Function]';
        if (value instanceof Error) return value.toString();
        return value;
      }, 2);
    } catch (e) {
      return '[Object]';
    }
  }
  
  // Capture log function
  function captureLog(level, args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return safeStringify(arg);
      }
      return String(arg);
    }).join(' ');
    
    const logEntry = {
      timestamp,
      level,
      message,
      url: window.location.href
    };
    
    logs.push(logEntry);
    if (logs.length > MAX_LOGS) {
      logs.shift();
    }
    
    // Send to parent
    try {
      window.parent.postMessage({
        type: 'console-log',
        log: logEntry
      }, '*');
    } catch (e) {
      // Silent fail if postMessage is blocked
    }
  }
  
  // Override console methods
  console.log = function(...args) {
    captureLog('log', args);
    originalConsole.log.apply(console, args);
  };
  
  console.warn = function(...args) {
    captureLog('warn', args);
    originalConsole.warn.apply(console, args);
  };
  
  console.error = function(...args) {
    captureLog('error', args);
    originalConsole.error.apply(console, args);
  };
  
  console.info = function(...args) {
    captureLog('info', args);
    originalConsole.info.apply(console, args);
  };
  
  console.debug = function(...args) {
    captureLog('debug', args);
    originalConsole.debug.apply(console, args);
  };
  
  // Capture unhandled errors
  window.addEventListener('error', (event) => {
    captureLog('error', [`Unhandled error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`]);
  });
  
  // Capture unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    captureLog('error', [`Unhandled promise rejection: ${event.reason}`]);
  });
  
  // Send ready message
  function sendReady() {
    try {
      window.parent.postMessage({
        type: 'console-capture-ready',
        url: window.location.href,
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Send route change message
  function sendRouteChange() {
    try {
      window.parent.postMessage({
        type: 'route-change',
        route: {
          pathname: window.location.pathname,
          search: window.location.search,
          hash: window.location.hash,
          href: window.location.href
        },
        timestamp: new Date().toISOString()
      }, '*');
    } catch (e) {
      // Silent fail
    }
  }
  
  // Monitor route changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    sendRouteChange();
  };
  
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    sendRouteChange();
  };
  
  window.addEventListener('popstate', sendRouteChange);
  window.addEventListener('hashchange', sendRouteChange);
  
  // Send ready message when script loads
  if (document.readyState === 'complete') {
    sendReady();
    sendRouteChange();
  } else {
    window.addEventListener('load', () => {
      sendReady();
      sendRouteChange();
    });
  }
})();