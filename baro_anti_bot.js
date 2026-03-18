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

  // 상수 및 데이터 정의
  const SYMBOL_PATHS = [
    { d: "M 50 8 L 68 26 L 32 26 Z", label: "top", shift: { x: 0, y: -6 } },
    { d: "M 32 30 L 68 30 L 50 50 L 68 70 L 32 70 Z", label: "center", shift: { x: 0, y: 0 }, scale: 0.85 },
    { d: "M 50 92 L 68 74 L 32 74 Z", label: "bottom", shift: { x: 0, y: 6 } },
    { d: "M 8 50 L 28 30 L 28 70 Z", label: "left", shift: { x: -6, y: 0 } },
  ];

  const brandColor = "rgb(27, 147, 170)";
  const textColor = config.isDark ? "#FFFFFF" : "#0F172A"; // text-slate-900
  const subTextColor = config.isDark ? "rgba(255, 255, 255, 0.7)" : "#64748B"; // text-slate-500

  // 컨테이너 생성
  const container = document.createElement('div');
  container.id = 'baro-logo-root';
  Object.assign(container.style, {
    position: 'fixed',
    zIndex: '999999',
    opacity: config.alphaChannel,
    transition: 'all 0.3s'
  });

  const margin = config.margin;
  const posMapping = {
    'top-right': { top: margin, right: margin },
    'bottom-left': { bottom: margin, left: margin },
    'bottom-right': { bottom: margin, right: margin },
    'top-left': { top: margin, left: margin }
  };
  Object.assign(container.style, posMapping[config.position] || posMapping['top-left']);

  // 링크 및 내부 래퍼 (scale-[0.8] 및 origin-left 반영)
  const link = document.createElement('a');
  link.href = 'https://barolog.com';
  link.target = '_blank';
  Object.assign(link.style, {
    display: 'flex',
    alignItems: 'flex-start',
    textDecoration: 'none',
    transform: 'scale(0.8)',
    transformOrigin: 'left top',
    transition: 'opacity 0.3s',
    userSelect: 'none',
    cursor: 'pointer'
  });

  // SVG 생성
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("aria-hidden", "true");
  Object.assign(svg.style, {
    width: '50px',
    height: '50px',
    flexShrink: '0',
    color: brandColor,
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
    path.style.transformOrigin = "50% 50%";
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

  // 타이틀 (BARO LOG, Outfit 폰트 반영)
  const title = document.createElement('span');
  title.innerText = "BARO LOG";
  Object.assign(title.style, {
    fontSize: '20px',
    fontWeight: '900',
    color: textColor,
    lineHeight: '20px',
    letterSpacing: '-0.025em',
    fontFamily: 'Outfit, "Noto Sans KR", system-ui, sans-serif',
    transition: 'colors 0.3s'
  });

  // 서브타이틀 (Enterprise Ad Protection)
  const subtitle = document.createElement('span');
  subtitle.innerText = "Enterprise Ad Protection";
  Object.assign(subtitle.style, {
    marginTop: '4.5px',
    fontSize: '8.5px',
    fontWeight: '600',
    color: subTextColor,
    lineHeight: '1',
    letterSpacing: '0.03em',
    opacity: '0.7',
    fontFamily: 'system-ui, sans-serif',
    transition: 'opacity 0.55s'
  });

  textGroup.appendChild(title);
  textGroup.appendChild(subtitle);
  link.appendChild(svg);
  link.appendChild(textGroup);
  container.appendChild(link);

  // 이벤트 핸들러
  container.addEventListener('mouseenter', () => {
    link.style.opacity = '0.8';
    svg.style.transform = 'scale(1.04)';
    pathElements.forEach(({ el, data }) => {
      const s = data.scale || 1.02;
      el.style.transform = `translate(${data.shift.x}px, ${data.shift.y}px) scale(${s})`;
      el.style.strokeOpacity = "0.12";
    });
    subtitle.style.opacity = "1";
  });

  container.addEventListener('mouseleave', () => {
    link.style.opacity = '1';
    svg.style.transform = 'scale(1)';
    pathElements.forEach(({ el }) => {
      el.style.transform = "translate(0, 0) scale(1)";
      el.style.strokeOpacity = "0.3";
    });
    subtitle.style.opacity = "0.7";
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