$(function() {
    if (document.oncontextmenu = new Function("return false;"),
    document.onkeydown = document.onkeyup = document.onkeypress = function(e) {
        var n = e || window.event || arguments.callee.caller.arguments[0];
        if (n) {
            if ("F11" == n.code || "F12" == n.code)
                return !1;
            "keyup" == n.type && ("ArrowLeft" == n.code ? (u(),
            f()) : "ArrowRight" == n.code ? (u(),
            h()) : "Space" == n.code ? p() : "Enter" == n.code && r())
        }
        return !0
    }
    ,
    $('[data-toggle="tooltip"]').tooltip(),
    -1 != location.href.indexOf("mine97")) {
        var t = [{
            type: "热歌榜",
            mid: ""
        }, {
            type: "新歌榜",
            mid: ""
        }, {
            type: "飙升榜",
            mid: ""
        }, {
            type: "抖音榜",
            mid: ""
        }, {
            type: "电音榜",
            mid: ""
        }, {
            type: "电台榜",
            mid: ""
        }]
          , o = parseInt(function(e) {
            for (var n = window.location.search.substring(1).split("&"), t = 0; t < n.length; t++) {
                var o = n[t].split("=");
                if (o[0] == e)
                    return o[1]
            }
            return !1
        }("index"))
          , s = (o = o || parseInt(localStorage.getItem("songTypeIndex")) || 0,
        l(),
        0)
          , i = [{
            singer: "资讯台",
            name: "CNR中国之声",
            id: "386"
        }, {
            singer: "资讯台",
            name: "CRI环球资讯",
            id: "1005"
        }, {
            singer: "资讯台",
            name: "河北新闻广播",
            id: "1644"
        }, {
            singer: "音乐台",
            name: "怀集音乐之声",
            id: "4804"
        }, {
            singer: "音乐台",
            name: "河北音乐广播",
            id: "1649"
        }, {
            singer: "音乐台",
            name: "江苏经典流行音乐",
            id: "4938"
        }, {
            singer: "交通台",
            name: "CNR中国交通广播",
            id: "4985"
        }, {
            singer: "经济台",
            name: "CNR经济之声",
            id: "387"
        }, {
            singer: "文艺台",
            name: "CNR文艺之声",
            id: "387"
        }]
          , c = localStorage.getItem("songList")
          , a = (c = c && "undefined" !== c ? JSON.parse(c) : []).length - 1
          , e = 0;
        let n = document.createElement("audio");
        function l(e) {
            $("#list").attr("data-original-title", t[o].type),
            e && $("#list").tooltip("show")
        }
        function u() {
            n.autoplay = !0,
            localStorage.setItem("paused", "0")
        }
        function r() {
            var e;
            document.fullscreenElement ? ($(".align-self-center").show(),
            document.exitFullscreen && document.exitFullscreen(),
            document.webkitExitFullscreen && document.webkitExitFullscreen(),
            document.mozCancelFullScreen && document.mozCancelFullScreen(),
            document.msExitFullscreen && document.msExitFullscreen()) : ($(".align-self-center").hide(),
            (e = document.documentElement).requestFullscreen && e.requestFullscreen(),
            e.webkitRequestFullscreen && e.webkitRequestFullscreen(),
            e.mozRequestFullScreen && e.mozRequestFullScreen(),
            e.msRequestFullscreen && e.msRequestFullscreen())
        }
        function d(e, n) {
            let t = document.createElement("a");
            t.style.display = "none",
            t.href = n,
            t.setAttribute("download", e),
            document.body.appendChild(t),
            t.click()
        }
        function p() {
            n.paused ? n.play() : n.pause(),
            localStorage.setItem("paused", n.paused ? "1" : "0")
        }
        function m() {
            var e = c[a];
            e && (n.src = e.url),
            $("#songname").text(e.name + " - " + e.singer),
            $("#bg").css("background-image", "url(" + e.pic + ")")
        }
        function g() {
            $.post("https://open.drea.cc/openapi/res/get", {
                FilePath: "img/dongman/pc"
            }, function(e) {
                if (e.isSuccess) {
                    let n = e.data.url;
                    $("#bg").css("background-image", "url(" + n + ")"),
                    "电台榜" == t[o].type ? (s >= i.length - 1 ? s = 0 : s++,
                    e = i[s],
                    100 == c.length && c.shift(),
                    c.push({
                        pic: n,
                        name: e.name,
                        singer: e.singer,
                        url: "https://lhttp.qtfm.cn/live/" + e.id + "/64k.mp3"
                    }),
                    localStorage.setItem("songList", JSON.stringify(c)),
                    a = c.length - 1,
                    m()) : $.post("https://open.drea.cc/openapi/music/rand", {
                        type: t[o].type,
                        mid: t[o].mid
                    }, function(e) {
                        e.isSuccess && (100 == c.length && c.shift(),
                        e.data.pic = n,
                        c.push(e.data),
                        localStorage.setItem("songList", JSON.stringify(c)),
                        a = c.length - 1,
                        m())
                    })
                }
            })
        }
        function f() {
            0 < c.length ? (0 < a && (a -= 1),
            m()) : g()
        }
        function h() {
            0 < c.length && a < c.length - 1 ? (a += 1,
            m()) : g()
        }
        function y() {
            $.get("https://open.drea.cc/openapi/config/count/get", {
                url: "drea.cc"
            }, function(e) {
                e.isSuccess && $("#assessCount").text(e.data + " 人 / 次")
            })
        }
        n.volume = .9,
        n.autoplay = "1" !== localStorage.getItem("paused"),
        n.onended = ()=>{
            h()
        }
        ,
        n.onerror = ()=>{
            n.autoplay && (c.splice(a, 1),
            localStorage.setItem("songList", JSON.stringify(c)),
            a -= 1,
            ++e <= 5 ? h() : (e = 0,
            n.autoplay = !1,
            localStorage.setItem("paused", "1")))
        }
        ,
        n.onplay = ()=>{
            $("#pause").removeClass("pause")
        }
        ,
        n.onpause = ()=>{
            $("#pause").addClass("pause")
        }
        ,
        n.ontimeupdate = ()=>{
            $(".progress-bar").css("width", 100 * n.currentTime / n.duration + "%")
        }
        ,
        n.onended(),
        n.paused ? $("#pause").addClass("pause") : $("#pause").removeClass("pause"),
        $(".progress").on("click", function(e) {
            e = e.offsetX / $(".progress").width();
            $(".progress-bar").css("width", 100 * e + "%"),
            n.currentTime = n.duration * e
        }),
        $("#main").on("dblclick", function() {
            r()
        }),
        $("#pause").on("click", function() {
            p()
        }),
        $("#pre").on("click", function() {
            u(),
            f()
        }),
        $("#next").on("click", function() {
            u(),
            h()
        }),
        $("#list").on("click", function() {
            (o += 1) >= t.length && (o = 0),
            localStorage.setItem("songTypeIndex", o),
            l(!0),
            u(),
            h()
        }),
        $("#music").on("click", function() {
            var e = c[a];
            e && e.name && d(e.name, e.url)
        }),
        $("#pic").on("click", function() {
            var e = c[a];
            e && e.name && d(e.name, e.pic)
        }),
        $("#show").on("click", function() {
            $(".align-self-center").is(":visible") ? $(".align-self-center").hide() : $(".align-self-center").show()
        }),
        $("#max").on("click", function() {
            r()
        }),
        $.post("https://open.drea.cc/openapi/config/count/set", {
            url: "drea.cc"
        }),
        y(),
        setInterval(function() {
            y()
        }, 3e4)
    }
});
