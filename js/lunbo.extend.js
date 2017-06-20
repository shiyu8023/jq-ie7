;~

    function ($, document, window) {
        var obj = {
            sy: true,
            imgUl: $('.imgUl'),
            circleUl: $('.circleUl'),
            imgStr: '',
            circleStr: '',
            timer: null,
            imgIndex: 0,
            imgDom: function (data) {
                for (var i = 0; i < data.length; i++) {
                    this.imgStr += '<li class=imgLi><img src=' + data[i] + ' alt=""/></li>';
                }
                this.imgUl.html(this.imgStr);
            },
            circleDom: function (data) {
                for (var i = 0; i < data.length - 1; i++) {
                    if (i == 0) {
                        this.circleStr += '<li class="circleLi active"></li>';
                    } else {
                        this.circleStr += '<li class=circleLi></li>';
                    }

                }
                this.circleUl.html(this.circleStr);
            },
            autoSwiper: function (data) {
                var length = data.length;
                var me = this;
                me.timer = setInterval(function () {
                    me.imgIndex++;
                    $('.circleLi').eq(me.imgIndex).addClass('active').siblings().removeClass('active');
                    $('.imgUl').animate({
                        left: -800 * me.imgIndex + 'px'
                    }, 500, function () {
                        if (me.imgIndex == length - 1) {
                            $('.circleLi').eq(0).addClass('active').siblings().removeClass('active');
                            $(this).css('left', '0');
                            me.imgIndex = 0;
                        }
                    })
                }, 2000)
            },
            circleClick: function (data) {
                var me = this;
                $('.circleLi').on('click', function () {
                    if (me.sy) {
                        me.sy = false;
                        clearInterval(me.timer);
                        me.imgIndex = $(this).index();
                        $('.imgUl').animate({
                            left: -800 * (me.imgIndex) + 'px'
                        }, 500, function () {
                            me.sy = true
                        });
                        $(this).addClass('active').siblings().removeClass('active');
                        me.autoSwiper(data);
                    } else {
                        console.log('防止重复点击')
                    }
                })
            },
            circleHover: function (data) {
                var me = this;
                $('.imgLi').on('mouseover', function () {
                    clearInterval(me.timer);
                }).on('mouseout', function () {
                    me.autoSwiper(data);
                })
            },
            init: function (data) {
                this.imgDom(data);
                this.circleDom(data);
                this.autoSwiper(data);
                this.circleClick(data);
                this.circleHover(data);
            }

        };

        function Lunbo(data) {
            this.imgArr = data
        }
        Lunbo.prototype.doImg = function () {
            if (this.imgArr instanceof Array) {
                obj.init(this.imgArr)
            } else {
                throw new Error('参数必须是数组')
            }

        };

        function img(imgArr) {
            var lunbo = new Lunbo(imgArr);
            lunbo.doImg();
        }
        window.img = img;
    }($, document, window);