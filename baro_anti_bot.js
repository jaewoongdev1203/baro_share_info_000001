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

  // 로고 데이터 정의
  const SYMBOL_PATHS = [
    { d: "M 50 8 L 68 26 L 32 26 Z", label: "top", shift: { x: 0, y: -6 } },
    { d: "M 32 30 L 68 30 L 50 50 L 68 70 L 32 70 Z", label: "center", shift: { x: 0, y: 0 }, scale: 0.85 },
    { d: "M 50 92 L 68 74 L 32 74 Z", label: "bottom", shift: { x: 0, y: 6 } },
    { d: "M 8 50 L 28 30 L 28 70 Z", label: "left", shift: { x: -6, y: 0 } },
  ];

  const themeColor = config.isDark ? "#FFFFFF" : "#000000";
  const subColor = config.isDark ? "rgba(255,255,255,0.7)" : "#6B7280";

  // 컨테이너 생성
  const container = document.createElement('div');
  container.id = 'baro-logo-root';
  Object.assign(container.style, {
    position: 'fixed',
    zIndex: '999999',
    opacity: config.alphaChannel,
    display: 'flex',
    alignItems: 'flex-start',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none',
    transition: 'opacity 0.3s'
  });

  const margin = config.margin;
  const posMapping = {
    'top-right': { top: margin, right: margin },
    'bottom-left': { bottom: margin, left: margin },
    'bottom-right': { bottom: margin, right: margin },
    'top-left': { top: margin, left: margin }
  };
  Object.assign(container.style, posMapping[config.position] || posMapping['top-left']);

  // 링크 생성
  const link = document.createElement('a');
  link.href = 'https://barolog.com';
  link.target = '_blank';
  link.style.display = 'flex';
  link.style.textDecoration = 'none';

  // SVG 생성
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  Object.assign(svg.style, { width: '40px', height: '40px', marginRight: '10px', fill: themeColor });

  const pathElements = SYMBOL_PATHS.map(item => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", item.d);
    path.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s";
    path.style.transformOrigin = "center";
    svg.appendChild(path);
    return { el: path, data: item };
  });

  // 텍스트 영역 생성
  const textGroup = document.createElement('div');
  textGroup.style.display = 'flex';
  textGroup.style.flexDirection = 'column';

  const title = document.createElement('span');
  title.innerText = "BARO Interactive";
  Object.assign(title.style, { fontSize: '16px', fontWeight: 'bold', color: themeColor, lineHeight: '1.2' });

  const subtitle = document.createElement('span');
  subtitle.innerText = "Digital Marketing Company";
  Object.assign(subtitle.style, { fontSize: '12px', color: subColor, transition: 'all 0.4s', opacity: '0.7' });

  textGroup.appendChild(title);
  textGroup.appendChild(subtitle);
  link.appendChild(svg);
  link.appendChild(textGroup);
  container.appendChild(link);

  // 호버 이벤트 리스너
  container.addEventListener('mouseenter', () => {
    pathElements.forEach(({ el, data }) => {
      const scale = data.scale || 1;
      el.style.transform = `translate(${data.shift.x}px, ${data.shift.y}px) scale(${scale})`;
      el.style.opacity = "0.8";
    });
    subtitle.style.opacity = "1";
    subtitle.style.transform = "translateX(2px)";
  });

  container.addEventListener('mouseleave', () => {
    pathElements.forEach(({ el }) => {
      el.style.transform = "translate(0, 0) scale(1)";
      el.style.opacity = "1";
    });
    subtitle.style.opacity = "0.7";
    subtitle.style.transform = "translateX(0)";
  });

  // DOM 삽입
  const appendToBody = () => {
    if (document.body) document.body.appendChild(container);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendToBody);
  } else {
    appendToBody();
  }
})();