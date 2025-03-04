(function() {
    // Ініціалізація GPT
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    document.head.appendChild(script);

    // Визначення стилів
    var styles = `
        #banner-wrapper {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index: 999;
            display: none;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        }
        #buffer-zone {
            width: 100%;
            height: 20px;
            background-color: #ffffff;
        }
        #banner {
            width: 100%;
            height: 90px;
            background-color: #ffffff;
            transition: height 0.3s ease-out;
            overflow: hidden;
            will-change: height;
            text-align: center;
        }
        #banner.collapsed {
            height: 0 !important;
            background-color: transparent;
            box-shadow: none;
        }
        #div-gpt-ad-1234567890 {
            height: 90px;
            width: 100%;
            max-width: 1366px;
            margin: 0 auto;
            transition: opacity 0.3s ease-out;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #div-gpt-ad-1234567890 iframe {
            margin: 0 auto;
            display: block;
        }
        #banner.collapsed #div-gpt-ad-1234567890 {
            opacity: 0;
        }
        #hide-button {
            position: absolute;
            top: -16px;
            left: 10px;
            width: 32px;
            height: 32px;
            background-color: #333;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        #hide-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 7px solid #fff;
            transform: translate(-50%, -40%);
            transition: transform 0.3s ease;
        }
    `;

    // Додавання стилів до документа
    var styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Ініціалізація Google Tag
    window.googletag = window.googletag || {cmd: []};
    var initialHeight = 90;
    var adSlot;

    googletag.cmd.push(function() {
        var mapping = googletag.sizeMapping()
            .addSize([1349, 0], [[1366, 90], [1280, 90], [1200, 90], [1080, 90], [1024, 90], [1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([1280, 0], [[1280, 90], [1200, 90], [1080, 90], [1024, 90], [1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([1200, 0], [[1200, 90], [1080, 90], [1024, 90], [1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([1080, 0], [[1080, 90], [1024, 90], [1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([1024, 0], [[1024, 90], [1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([1000, 0], [[1000, 90], [980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([980, 0], [[980, 90], [970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([970, 0], [[970, 90], [960, 90], [950, 90], [728, 90]])
            .addSize([960, 0], [[960, 90], [950, 90], [728, 90]])
            .addSize([950, 0], [[950, 90], [728, 90]])
            .addSize([728, 0], [[728, 90], [468, 60]])
            .addSize([468, 0], [[468, 60], [320, 50], [320, 100]])
            .addSize([320, 0], [[320, 50], [320, 100]])
            .addSize([0, 0], [[320, 50]])
            .build();

        adSlot = googletag.defineSlot('/58302844/SLDS_Vikna_Catfish', [
            [1366, 90], [1280, 90], [1200, 90], [1080, 90], [1024, 90], [1000, 90],
            [980, 90], [970, 90], [960, 90], [950, 90], [728, 90],
            [468, 60], [320, 100], [320, 50]
        ], 'div-gpt-ad-1234567890')
            .defineSizeMapping(mapping)
            .setCollapseEmptyDiv(true)
            .addService(googletag.pubads());

        googletag.pubads().enableSingleRequest();
        googletag.pubads().collapseEmptyDivs(true);
        googletag.pubads().setTargeting("pos", ["bottom"]);
        googletag.pubads().setPublisherProvidedId('58302844');
        googletag.enableServices();
    });

    // Створення DOM-структури
    document.addEventListener('DOMContentLoaded', function() {
        var container = document.getElementById('banner-container');
        if (!container) return;

        container.innerHTML = `
            <div id="banner-wrapper">
                <div id="buffer-zone"></div>
                <div id="banner">
                    <div id="div-gpt-ad-1234567890"></div>
                </div>
                <div id="hide-button" title="Toggle banner"></div>
            </div>
        `;

        // Ініціалізація банера
        googletag.cmd.push(function() {
            googletag.display('div-gpt-ad-1234567890');
        });

        // Логіка роботи банера
        var hideButton = document.getElementById('hide-button');
        var banner = document.getElementById('banner');
        var wrapper = document.getElementById('banner-wrapper');
        var isCollapsed = false;

        googletag.pubads().addEventListener('slotRenderEnded', function(event) {
            if (event.slot === adSlot) {
                if (event.isEmpty) {
                    wrapper.style.display = 'none';
                } else {
                    wrapper.style.display = 'block';
                    var size = event.size;
                    initialHeight = size[1];
                    banner.style.height = initialHeight + 'px';
                    var adContainer = document.getElementById('div-gpt-ad-1234567890');
                    adContainer.style.height = initialHeight + 'px';

                    setTimeout(() => {
                        var iframe = adContainer.querySelector('iframe');
                        if (iframe) {
                            iframe.style.margin = '0 auto';
                            iframe.style.display = 'block';
                        }
                    }, 100);
                }
            }
        });

        hideButton.addEventListener('click', function() {
            isCollapsed = !isCollapsed;
            if (isCollapsed) {
                banner.classList.add('collapsed');
                hideButton.style.transform = 'rotate(180deg)';
            } else {
                banner.classList.remove('collapsed');
                banner.style.height = initialHeight + 'px';
                hideButton.style.transform = 'rotate(0deg)';
            }
        });
    });
})();
