let muted = false;

let nowPlayingBarObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.attributeName === "data-testadtype") {
            const nowPlayingBar = document.querySelector(".Root__now-playing-bar");
            const volumeRocker = document.querySelector(".volume-bar__icon-button");
            if (nowPlayingBar?.children?.length === 1 && nowPlayingBar?.firstChild?.hasAttribute("data-testadtype")) {
                if (nowPlayingBar.firstChild.getAttribute("data-testadtype") !== "ad-type-none") {
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
    }
});

let muteButtonObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.attributeName === "aria-label") {
            const volumeRocketLabel = document.querySelector(".volume-bar__icon-button")?.getAttribute('aria-label');
            if (volumeRocketLabel === "Mute") {
                muted = false;
            } else if (volumeRocketLabel === "Unmute") {
                muted = true;
            }
        }
    }
});

let nowPlayingBarRenderingObserver = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (document.querySelector(".Root__now-playing-bar")) {
            nowPlayingBarObserver.observe(document.querySelector(".Root__now-playing-bar"), { childList: true, subtree: true, attributes: true });
            muteButtonObserver.observe(document.querySelector(".volume-bar__icon-button"), { childList: true, subtree: true, attributes: true });
            nowPlayingBarRenderingObserver.disconnect();
        }
    }
});

nowPlayingBarRenderingObserver.observe(document, { childList: true, subtree: true, attributes: true });
