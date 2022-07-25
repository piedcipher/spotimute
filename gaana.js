let muted = false;

let nowPlayingBarObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.attributeName === "style") {
            const nowPlayingBar = document.querySelector("#mq_ads");
            const volumeRocker = document.querySelector("#muteBtn");
            if (nowPlayingBar.getAttribute("style") !== "display: none;") {
                console.log("ad is playing");
                if (!muted) {
                    volumeRocker?.click();
                }
            } else {
                if (muted) {
                    volumeRocker?.click();
                }
            }
        }
    }
});

let muteButtonObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.attributeName === "class") {
            const volumeRocketLabel = document.querySelector("#muteBtn")?.classList;
            if (!volumeRocketLabel.contains("muteAds")) {
                muted = false;
            } else {
                muted = true;
            }
        }
    }
});

let nowPlayingBarRenderingObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (document.querySelector("#mq_ads")) {
            nowPlayingBarObserver.observe(document.querySelector("#mq_ads"), { childList: true, subtree: true, attributes: true });
            nowPlayingBarRenderingObserver.disconnect();
        }
    }
});

let muteButtonRenderingObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (document.querySelector("#muteBtn")) {
            muteButtonObserver.observe(document.querySelector("#muteBtn"), { childList: true, subtree: true, attributes: true });
            muteButtonRenderingObserver.disconnect();
        }
    }
});

nowPlayingBarRenderingObserver.observe(document, { childList: true, subtree: true, attributes: true });
muteButtonRenderingObserver.observe(document, { childList: true, subtree: true, attributes: true });