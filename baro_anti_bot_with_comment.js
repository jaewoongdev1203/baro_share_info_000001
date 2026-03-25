(function() {
  // 이용자 IP 조회 및 순차적 메시지 출력 시퀀스
  async function startSequence(subtitle, redDot) {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // 부드러운 텍스트 교체 헬퍼 함수
    const updateTextWithFade = async (newHtml) => {
      subtitle.style.opacity = '0'; // 페이드 아웃
      await sleep(900);             // 트랜지션 대기 (0.5초 추가하여 0.9초)
      subtitle.innerHTML = newHtml;
      subtitle.style.opacity = '0.7'; // 페이드 인
      await sleep(900);             // 트랜지션 대기 (0.5초 추가하여 0.9초)
    };
    
    // 초기 상태: 붉은 점 숨김
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

    // IP 조회 성공 시 메시지 출력 (약 2초 유지)
    if (userIP) {
      await sleep(1200);
      await updateTextWithFade(`<span style='color: #22c55e;'>${userIP}</span><br>접속 환경 보호 중`);
      await sleep(2000);
    } else {
      await sleep(1000);
    }

    // 안심 메시지 출력 (약 1.5초 유지)
    await updateTextWithFade("안심하고 이용하세요");
    await sleep(1500);

    // 최종 상태: 부정클릭 감시중 + 붉은 점 표시
    await updateTextWithFade("부정클릭 감시중");
    subtitle.style.opacity = "0.9"; // 최종 불투명도 설정
    redDot.style.display = 'block';
    isSequenceFinished = true; // 시퀀스 완료 플래그 설정
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
    padding: '4px',
    minWidth: '120px' // 가로폭 변화 방지를 위한 최소 너비 설정
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
  Object.assign(subtitle.style, {
    fontSize: '11px',
    fontWeight: '600',
    color: subTextColor,
    lineHeight: '1.4',
    letterSpacing: '0.1em',
    opacity: '0', // 초기에는 숨김 (시퀀스 시작 시 페이드 인)
    fontFamily: 'Outfit,Noto Sans KR,system-ui,sans-serif',
    transition: 'opacity 0.9s ease-in-out', // 전환 시간을 0.5초 늘려 0.9초로 설정
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

  // 이벤트 핸들러 (시퀀스 완료 후 적용을 위해 변수화)
  let isSequenceFinished = false;

  container.addEventListener('mouseenter', () => {
    link.style.opacity = '0.8';
    if (isSequenceFinished) subtitle.style.opacity = "1";
  });

  container.addEventListener('mouseleave', () => {
    link.style.opacity = '1';
    if (isSequenceFinished) subtitle.style.opacity = "0.9";
  });

  // DOM 삽입 및 시퀀스 시작
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
