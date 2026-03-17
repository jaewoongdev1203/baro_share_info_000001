(function() {
    const targetSrc = '//cdn.smlog.co.kr/core/img/main/systeming_9.png';
    const replacementSrc = '//jaewoongdev1203.github.io/baro_share_info_000001/baro_logo.png';
    const duration = 30*1000;

    function replaceImages() {
        const images = document.querySelectorAll(`img[src="${targetSrc}"], img[src="https:${targetSrc}"], img[src="http:${targetSrc}"]`);
        images.forEach(img => {
            img.src = replacementSrc;
        });
    }

    replaceImages();

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

    setTimeout(() => {
        observer.disconnect();
        console.log('Image detection stopped after 30 seconds.');
    }, duration);
})();
