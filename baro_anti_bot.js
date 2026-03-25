(function() {
  async function startSequence(subtitle, redDot) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const updateTextWithFade = async (newHtml) => {
      subtitle.style.opacity = '0';
      await sleep(900);
      subtitle.innerHTML = newHtml;
      subtitle.style.opacity = '0.7';
      await sleep(900);
    };
    
    redDot.style.display = 'none';
    subtitle.style.opacity = '0';
    subtitle.innerHTML = "<span style='color: #000000;'>BaroLog</span><br>솔루션 가동 중";
    await sleep(100);
    subtitle.style.opacity = '0.7';
    
    let userIP = null;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      userIP = data.ip;
      console.log('Current User WAN IP:', userIP);
    } catch (error) {
      console.error('Failed to fetch user IP:', error);
    }

    if (userIP) {
      await sleep(1200);
      await updateTextWithFade(`<span style='color: #22c55e;'>${userIP}</span><br>접속 환경 보호 중`);
      await sleep(2000);
    } else {
      await sleep(1000);
    }

    await updateTextWithFade("안심하고 이용하세요");
    await sleep(1500);

    await updateTextWithFade("부정클릭 감시중");
    subtitle.style.opacity = "0.9";
    redDot.style.display = 'block';
    isSequenceFinished = true;
  }

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

  const brandColor = "rgb(27, 147, 170)";
  const textColor = config.isDark ? "#FFFFFF" : "#0F172A";
  const subTextColor = config.isDark ? "rgba(255, 255, 255, 0.7)" : "#64748B";

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

  const textGroup = document.createElement('div');
  Object.assign(textGroup.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    padding: '4px',
    minWidth: '120px'
  });

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

  const subtitleWrapper = document.createElement('div');
  Object.assign(subtitleWrapper.style, {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '2px'
  });

  const subtitle = document.createElement('span');
  Object.assign(subtitle.style, {
    fontSize: '11px',
    fontWeight: '600',
    color: subTextColor,
    lineHeight: '1.4',
    letterSpacing: '0.1em',
    opacity: '0',
    fontFamily: 'Outfit,Noto Sans KR,system-ui,sans-serif',
    transition: 'opacity 0.9s ease-in-out',
    paddingLeft: '2px'
  });

  const redDot = document.createElement('div');
  Object.assign(redDot.style, {
    width: '8px',
    height: '8px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    opacity: '0.8'
  });

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

  let isSequenceFinished = false;

  container.addEventListener('mouseenter', () => {
    link.style.opacity = '0.8';
    if (isSequenceFinished) subtitle.style.opacity = "1";
  });

  container.addEventListener('mouseleave', () => {
    link.style.opacity = '1';
    if (isSequenceFinished) subtitle.style.opacity = "0.9";
  });

  const appendToBody = () => {
    if (document.body) {
      document.body.appendChild(container);
      startSequence(subtitle, redDot);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', appendToBody);
  } else {
    appendToBody();
  }
})();