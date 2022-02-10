(function () {
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
            (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1] :
                (s = ua.match(/rv:([\d.]+)/)) ? sys.ie = s[1] :
                    (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
    var browser = "Unknown";
    var tip = document.createElement('div')
    var closeBtn = document.createElement('button')
    var contentHTML = '您当前使用的浏览器版本过低，部分样式或功能无法正常工作，建议使用最新的 360 极速浏览器并切换到极速模式。或者使用最新的Chrome浏览器、Edge浏览器或Firefox浏览器';
    var handleClickClose = function (event) {
        document.body.removeChild(tip)
    }
    var startAppend = function () {
        document.body.appendChild(tip)
        tip.appendChild(closeBtn)
    }

     
    closeBtn.style.cursor = 'pointer'
    closeBtn.style.float="right"
    closeBtn.innerText = '关闭'
    closeBtn.style.border="none"
    closeBtn.style.background="none"

    if (closeBtn.addEventListener) {
        closeBtn.addEventListener('click', handleClickClose)
    } else {
        // IE8 及以下
        closeBtn.attachEvent('onclick', handleClickClose)
    }

    tip.style.position = 'relative'
    tip.style.backgroundColor = 'yellow'
    tip.style.color = 'red'
    tip.style.position = 'fixed'
    tip.style.top = 0
    tip.style.right = 0
    tip.style.left = 0
    tip.style.padding = '5px 20px'
    tip.style.fontSize = '14px'
    
    
    if (sys.ie) {
            // 不兼容ie
            browser = "IE";
            tip.innerHTML = contentHTML  
            startAppend()
         
    }
    if (sys.firefox < 89) {
        console.log('sys.firefox: ', sys.firefox);
        browser = "Firefox";
        tip.innerHTML = contentHTML  
        startAppend()
    }
    if (sys.chrome) {
        browser = "Chrome";

        var getChromeVersion = function () {
            var arr = navigator.userAgent.split(' ');
            var chromeVersion = '';
            for (var i = 0; i < arr.length; i++) {
                if (/chrome/i.test(arr[i]))
                    chromeVersion = arr[i]
            }
            if (chromeVersion) {
                return Number(chromeVersion.split('/')[1].split('.')[0]);
            } else {
                return false;
            }
        }

        if (getChromeVersion()) {
            var version = getChromeVersion();
            // 如果 360 极速浏览器并切换到极速模式低于86版本
            if (version < 69) {
                tip.innerHTML = contentHTML
                startAppend()
            }
        }
    }
    if (sys.opera) {
        browser = "Opera";
        tip.innerHTML = contentHTML  
        startAppend()
    }
    if (sys.safari) {
        browser = "Safari";
    }
})()