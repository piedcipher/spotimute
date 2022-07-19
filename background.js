let muted = false;

setInterval(() => {
    const nowPlayingBar = document.querySelector(".Root__now-playing-bar");
    const volumeRocker = document.querySelector(".volume-bar__icon-button");
    console.log(nowPlayingBar.children);
    if (nowPlayingBar?.children?.length === 1 && nowPlayingBar?.firstChild?.hasAttribute("data-testadtype")) {
        if (nowPlayingBar.firstChild.getAttribute("data-testadtype") !== "ad-type-none") {
            console.log("ad is playing");
            if (!muted) {
                volumeRocker?.click();
                muted = true;
            }
        } else {
            if (muted) {
                volumeRocker?.click();
            }
            muted = false;
        }
    }
}, 2000);