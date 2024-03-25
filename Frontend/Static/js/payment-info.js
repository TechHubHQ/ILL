    (function() {
        if (typeof _bsa !== 'undefined' && _bsa) {
            // format, zoneKey, segment:value, options
            _bsa.init('flexbar', 'CKYI627U', 'placement:w3layoutscom');
        }
    })();

    (function() {
        if (typeof _bsa !== 'undefined' && _bsa) {
            // format, zoneKey, segment:value, options
            _bsa.init('stickybox', 'CKYI653J', 'placement:w3layoutscom');
        }
    })();

    (function() {
        if (typeof _bsa !== 'undefined' && _bsa) {
            // format, zoneKey, segment:value, options
            _bsa.init('fancybar', 'CKYDL2JN', 'placement:demo');
        }
    })();

    $(document).ready(function() {
        $('#horizontalTab').easyResponsiveTabs({
            type: 'default', //Types: default, vertical, accordion           
            width: 'auto', //auto or any width like 600px
            fit: true // 100% fit in a container
        });
    });

    window.ga = window.ga || function() {
        (ga.q = ga.q || []).push(arguments)
    };
    ga.l = +new Date;
    ga('create', 'UA-149859901-1', 'demo.w3layouts.com');
    ga('require', 'eventTracker');
    ga('require', 'outboundLinkTracker');
    ga('require', 'urlChangeTracker');
    ga('send', 'pageview');

    addEventListener("load", function() {
        setTimeout(hideURLbar, 0);
    }, false);

    function hideURLbar() {
        window.scrollTo(0, 1);
    }