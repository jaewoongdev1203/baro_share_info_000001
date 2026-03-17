(function() {
    const targetPartialSrc = 'cdn.smlog.co.kr/core/img/main/systeming';
    const replacementSrc = '//jaewoongdev1203.github.io/baro_share_info_000001/baro_logo.png';
    const duration = 30 * 1000;

    function replaceImages() {
        // src 속성에 targetPartialSrc 문자열이 포함된 모든 img 태그 탐지
        const images = document.querySelectorAll(`img[src*="${targetPartialSrc}"]`);
        images.forEach(img => {
            // 이미 바뀐 이미지인지 확인 후 교체
            if (img.src !== replacementSrc) {
                img.src = replacementSrc;
            }
        });
    }

    // 1. 초기 실행
    replaceImages();

    // 2. MutationObserver를 사용하여 동적으로 추가되는 요소 감시
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                replaceImages();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 3. 30초 후 탐지 중단
    setTimeout(() => {
        observer.disconnect();
        console.log('Image detection stopped after 30 seconds.');
    }, duration);
})();
