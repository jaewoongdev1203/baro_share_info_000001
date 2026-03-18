(function() {
  const defaultConfig = {
    position: "top-left",
    margin: "10px",
    alphaChannel: "1",
    isDark: false
  };

  const config = (typeof baro_anti_bot !== 'undefined') ? {
    position: baro_anti_bot.position || defaultConfig.position,
    margin: baro_anti_bot.margin || defaultConfig.margin,
    alphaChannel: baro_anti_bot.alphaChannel || "1",
    isDark: baro_anti_bot.isDark || defaultConfig.isDark
  } : defaultConfig;

  // 스크립트를 하나씩 순서대로 로드하는 함수
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.crossOrigin = "anonymous";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  const container = document.createElement('div');
  container.id = 'baro-logo-root';
  container.style.position = 'fixed';
  container.style.zIndex = '999999';
  container.style.opacity = config.alphaChannel;

  const margin = config.margin;
  const posMapping = {
    'top-right': { top: margin, right: margin },
    'bottom-left': { bottom: margin, left: margin },
    'bottom-right': { bottom: margin, right: margin },
    'top-left': { top: margin, left: margin }
  };
  Object.assign(container.style, posMapping[config.position] || posMapping['top-left']);

  const SYMBOL_PATHS = [
    { d: "M 50 8 L 68 26 L 32 26 Z", label: "top", shift: { x: 0, y: -6 } },
    { d: "M 32 30 L 68 30 L 50 50 L 68 70 L 32 70 Z", label: "center", shift: { x: 0, y: 0 }, scale: 0.85 },
    { d: "M 50 92 L 68 74 L 32 74 Z", label: "bottom", shift: { x: 0, y: 6 } },
    { d: "M 8 50 L 28 30 L 28 70 Z", label: "left", shift: { x: -6, y: 0 } },
  ];

  const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

  const init = async () => {
    try {
      // 순서 중요: React -> ReactDOM -> Framer Motion 순으로 로드
      await loadScript("https://unpkg.com/react@18/umd/react.production.min.js");
      await loadScript("https://unpkg.com/react-dom@18/umd/react-dom.production.min.js");
      await loadScript("https://unpkg.com/framer-motion@10.16.4/dist/framer-motion.js");

      const React = window.React;
      const ReactDOM = window.ReactDOM;
      const motion = window.Motion || window.framerMotion.motion;

      function BaroLogo() {
        const [isHovered, setIsHovered] = React.useState(false);
        const themeColor = config.isDark ? "#FFFFFF" : "#000000";
        const subColor = config.isDark ? "rgba(255,255,255,0.7)" : "#6B7280";

        return React.createElement(
          "a",
          {
            href: "https://barolog.com",
            target: "_blank",
            style: { textDecoration: 'none', display: 'flex', alignItems: 'flex-start', cursor: 'pointer', userSelect: 'none' },
            onMouseEnter: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false)
          },
          React.createElement(
            "div",
            { style: { width: '40px', height: '40px', marginRight: '10px' } },
            React.createElement(
              "svg",
              { viewBox: "0 0 100 100", style: { width: '100%', height: '100%', fill: themeColor } },
              SYMBOL_PATHS.map((item) => 
                React.createElement(motion.path, {
                  key: item.label,
                  d: item.d,
                  animate: {
                    x: isHovered ? item.shift.x : 0,
                    y: isHovered ? item.shift.y : 0,
                    scale: isHovered && item.scale ? item.scale : 1,
                    opacity: isHovered ? 0.8 : 1
                  },
                  transition: { duration: 0.6, ease: EASE_OUT_EXPO }
                })
              )
            )
          ),
          React.createElement(
            "div",
            { style: { display: 'flex', flexDirection: 'column' } },
            React.createElement(
              "span",
              { style: { fontSize: '16px', fontWeight: 'bold', color: themeColor, lineHeight: '1.2' } },
              "BARO Interactive"
            ),
            React.createElement(
              motion.span,
              {
                style: { fontSize: '12px', color: subColor },
                animate: { opacity: isHovered ? 1 : 0.7, x: isHovered ? 2 : 0 },
                transition: { duration: 0.4 }
              },
              "Digital Marketing Company"
            )
          )
        );
      }

      const root = ReactDOM.createRoot(container);
      root.render(React.createElement(BaroLogo));
      document.body.appendChild(container);

    } catch (err) {
      console.error("Baro Logo initialization failed:", err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();