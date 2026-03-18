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

  const SYMBOL_PATHS = [
    { d: "M 50 8 L 68 26 L 32 26 Z", label: "top", shift: { x: 0, y: -6 } },
    { d: "M 32 30 L 68 30 L 50 50 L 68 70 L 32 70 Z", label: "center", shift: { x: 0, y: 0 }, scale: 0.85 },
    { d: "M 50 92 L 68 74 L 32 74 Z", label: "bottom", shift: { x: 0, y: 6 } },
    { d: "M 8 50 L 28 30 L 28 70 Z", label: "left", shift: { x: -6, y: 0 } },
  ];

  // 스타일 설정 (JSX 기반)
  const colors = {
    text: config.isDark ? "#FFFFFF" : "#000000",
    subText: config.isDark ? "rgba(255, 255, 255, 0.7)" : "#6B7280",
    symbol: config.isDark ? "#FFFFFF" : "#0066FF" // text-primary 임의 지정
  };

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
    textDecoration: 'none'
  });

  const margin = config.margin;
  const posMapping = {
    'top-right': { top: margin, right: margin },
    'bottom-left': { bottom: margin, left: margin },
    'bottom-right': { bottom: margin, right: margin },
    'top-left': { top: margin, left: margin }
  };
  Object.assign(container.style, posMapping[config.position] || posMapping['top-left']);

  const link = document.createElement('a');
  link.href = 'https://barolog.com';
  link.target = '_blank';
  link.style.display = 'flex';
  link.style.alignItems = 'flex-start';
  link.style.textDecoration = 'none';

  // SVG 생성 (50x50px)
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  Object.assign(svg.style, {
    width: '50px',
    height: '50px',
    flexShrink: '0',
    color: colors.symbol,
    fill: 'currentColor',
    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
  });

  const pathElements = SYMBOL_PATHS.map(item => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", item.d);
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-width", "1.5");
    path.style.strokeOpacity = "0.3";
    path.style.fillOpacity = "1";
    path.style.transformOrigin = "50px 50px";
    path.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), stroke-opacity 0.55s";
    svg.appendChild(path);
    return { el: path, data: item };
  });

  // 텍스트 영역 (ml-1, pt-[14px])
  const textGroup = document.createElement('div');
  Object.assign(textGroup.style, {
    marginLeft: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '14px'
  });

  // 타이틀 (text-[20px], font-black)
  const title = document.createElement('span');
  title.innerText = "BARO Interactive";
  Object.assign(title.style, {
    fontSize: '20px',
    fontWeight: '900',
    color: colors.text,
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    whiteSpace: 'nowrap',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  });

  // 서브타이틀 (text-[8.5px], mt-[4.5px])
  const subtitle = document.createElement('span');
  subtitle.innerText = "Digital Marketing Company";
  Object.assign(subtitle.style, {
    marginTop: '4.5px',
    fontSize: '8.5px',
    fontWeight: '600',
    color: colors.subText,
    lineHeight: '1',
    letterSpacing: '0.03em',
    opacity: '0.7',
    transition: 'opacity 0.55s',
    fontFamily: 'Pretendard, system-ui, sans-serif'
  });

  textGroup.appendChild(title);
  textGroup.appendChild(subtitle);
  link.appendChild(svg);
  link.appendChild(textGroup);
  container.appendChild(link);

  // Hover 이벤트
  container.addEventListener('mouseenter', () => {
    svg.style.transform = 'scale(1.04)';
    pathElements.forEach(({ el, data }) => {
      const scale = data.scale || 1.02;
      el.style.transform = `translate(${data.shift.x}px, ${data.shift.y}px) scale(${scale})`;
      el.style.strokeOpacity = "0.12";
    });
    subtitle.style.opacity = "1";
  });

  container.addEventListener('mouseleave', () => {
    svg.style.transform = 'scale(1)';
    pathElements.forEach(({ el }) => {
      el.style.transform = "translate(0, 0) scale(1)";
      el.style.strokeOpacity = "0.3";
    });
    subtitle.style.opacity = "0.7";
  });

  const appendToBody = () => {
    if (document.body) document.body.appendChild(container);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendToBody);
  } else {
    appendToBody();
  }
})();