(function() {
    const targetPartialSrc = 'cdn.smlog.co.kr/core/img/main/systeming';
    const replacementSrc = '//jaewoongdev1203.github.io/baro_share_info_000001/baro_logo.png';
    const duration = 30 * 1000;

    function replaceImages() {
        const images = document.querySelectorAll(`img[src*="${targetPartialSrc}"]`);
        images.forEach(img => {
            if (img.src !== replacementSrc) {
                img.src = replacementSrc;
            }
        });
    }

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                replaceImages();
            }
        });
    });

    /**
     * 감시를 안전하게 시작하는 함수
     */
    function startObserving() {
        if (!document.body) {
            // body가 없으면 10ms 후에 다시 시도
            setTimeout(startObserving, 10);
            return;
        }

        replaceImages();
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // 30초 후 탐지 중단
        setTimeout(() => {
            observer.disconnect();
            console.log('Image detection stopped after 30 seconds.');
        }, duration);
    }

    // 실행 시작
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserving);
    } else {
        startObserving();
    }
})();
