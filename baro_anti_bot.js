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

  // 텍스트 영역
  const textGroup = document.createElement('div');
  Object.assign(textGroup.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '4px'
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

  // 서브타이틀 래퍼 및 텍스트
  const subtitleWrapper = document.createElement('div');
  Object.assign(subtitleWrapper.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '2px'
  });

  const subtitle = document.createElement('span');
  subtitle.innerText = "부정클릭 감시중";
  Object.assign(subtitle.style, {
    fontSize: '11px',
    fontWeight: '600',
    color: subTextColor,
    lineHeight: '1',
    letterSpacing: '0.1em',
    opacity: '0.7',
    fontFamily: 'Outfit,Noto Sans KR,system-ui,sans-serif',
    transition: 'opacity 0.55s',
    paddingLeft: '2px'
  });

  // 깜빡이는 붉은 점
  const redDot = document.createElement('div');
  Object.assign(redDot.style, {
    width: '8px',
    height: '8px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    opacity: '0.8'
  });

  // 점멸 애니메이션
  redDot.animate([
    { opacity: 0.2 },
    { opacity: 1 }
  ], {
    duration: 800,
    iterations: Infinity,
    direction: 'alternate',
    easing: 'ease-in-out'
  });

  subtitleWrapper.appendChild(subtitle);
  subtitleWrapper.appendChild(redDot);

  textGroup.appendChild(title);
  textGroup.appendChild(subtitleWrapper);
  link.appendChild(textGroup);
  container.appendChild(link);

  // 이벤트 핸들러
  container.addEventListener('mouseenter', () => {
    link.style.opacity = '0.8';
    subtitle.style.opacity = "1";
  });

  container.addEventListener('mouseleave', () => {
    link.style.opacity = '1';
    subtitle.style.opacity = "0.9";
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