(function() {
    var videoElement = document.getElementById('myVideo');
    var controls_img = document.querySelector('.controls_img');
    if (videoElement) {
        videoElement.addEventListener('click', function() {
            if (this.paused) {
                this.play();
                controls_img.style.display = 'none';
            } else {
                this.pause();
                controls_img.style.display = 'block';
            }
        });

        // 在鼠标悬停时显示控制
        videoElement.addEventListener('mouseenter', function() {
            this.controls = true;
        });

        // 在鼠标移开时隐藏控制
        videoElement.addEventListener('mouseleave', function() {
            this.controls = false;
        });
        // 当点击 controlsImg 时控制视频播放
        controls_img.addEventListener('click', function() {
            if (videoElement.paused) {
                videoElement.play();
                controls_img.style.display = 'none';
            } else {
                videoElement.pause();
                controls_img.style.display = 'block';
            }
        });
    }
})();

var mySwiper = new Swiper('.home-banner .swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            // dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // autoplay: {
        //     delay: 5000,
        //     disableOnInteraction: false,
        // },
        on: {
            init: function() {
                swiperAnimateCache(this);
                swiperAnimate(this);
            },
            slideChangeTransitionEnd: function() {

                swiperAnimate(this);
                //this.slides.eq(this.activeIndex).find('.ani').removeClass('ani'); 
            }
        },

    })
    // mySwiper.el.onmouseover = function() {
    //     mySwiper.autoplay.stop();
    // }
    // mySwiper.el.onmouseout = function() {
    //     mySwiper.autoplay.start();
    // }

/**
 * 初始化Swiper实例。
 * 
 * @param {string} swiperContainer - 主Swiper容器的选择器。
 * @param {string} thumbsContainer - 缩略图Swiper容器的选择器。
 * @param {Object} config - 自定义配置对象，默认为空对象。
 * @returns {void} 无返回值。
 */
function initializeSwiper(swiperContainer, thumbsContainer, config = {}) {
    // 默认配置参数
    const defaultConfig = {
        // 设置自动播放
        autoplay: true,
        autoplay: {
            delay: 6000, // 设置自动播放延迟为6秒
        },
        // 响应式设置
        breakpoints: {
            "@0.00": {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            "@0.75": {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            "@1.00": {
                slidesPerView: 4,
                spaceBetween: 10,
            },
            "@1.50": {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
        freeMode: true,
        watchSlidesProgress: true,
        grabCursor: true,
        // 导航按钮设置
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    };

    // 合并用户自定义配置与默认配置
    const mergedConfig = {...defaultConfig,
        ...config
    };

    // 初始化主Swiper实例
    var swiper = new Swiper(swiperContainer, mergedConfig);

    // 初始化缩略图Swiper实例
    var swiper2 = new Swiper(thumbsContainer, {
        autoplay: mergedConfig.autoplay,
        spaceBetween: 10,
        grabCursor: mergedConfig.grabCursor,
        // navigation: mergedConfig.navigation,
        // direction: "vertical",
        effect: 'fade',
        on: {
            // 缩略图切换时，同步主Swiper和内容显示
            slideChange: function() {
                if (thumbsContainer === '.mySwiper2-timeContent1') {
                    var activeIndex = swiper2.activeIndex;
                    document.querySelectorAll('.feature-contents').forEach((el, index) => {
                        if (index === activeIndex) {
                            el.classList.add('active');
                        } else {
                            el.classList.remove('active');
                        }
                    });
                } else if (thumbsContainer === '.mySwiper2-timeContent') {
                    var activeIndex = swiper2.activeIndex;
                    document.querySelectorAll('.bg_imgs').forEach((el, index) => {
                        if (index === activeIndex) {
                            el.classList.add('active');
                        } else {
                            el.classList.remove('active');
                        }
                    });
                }
            }
        },
        fadeEffect: {
            crossFade: true,
        },
        thumbs: {
            swiper: swiper,
        },
    });

    // 初始化时显示第一个特征内容
    setTimeout(() => {
        document.querySelector('.feature-contents').classList.add('active');
        document.querySelector('.bg_imgs').classList.add('active');
    }, 0);

    // 鼠标移入时自动切换到对应的Swiper项
    document.querySelectorAll(`${swiperContainer} .swiper-slide`).forEach((slide, index) => {
        slide.addEventListener('mouseenter', () => {
            swiper2.slideTo(index);
        });
    });
}
initializeSwiper(".mySwiper-timeline", ".mySwiper2-timeContent", {
    autoplay: false,
});
initializeSwiper(".mySwiper-timeline1", ".mySwiper2-timeContent1", {
    autoplay: false,
});
var swiper1 = new Swiper('.swiper-container1', {
    slidesPerView: 3,
    spaceBetween: -20,
    centeredSlides: true,
    centeredSlidesBounds: true,
    loop: true,
    // initialSlide: 1,
    navigation: {
        nextEl: '.swiper-container1 .swiper-button-next',
        prevEl: '.swiper-container1 .swiper-button-prev',
    },

});
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const counters = document.querySelectorAll('.count');
        const speed = 200; // 调整速度

        const countUp = (element) => {
            const targetValue = +element.getAttribute('data-target');
            let currentValue = 0;

            const updateCount = () => {
                const increment = targetValue / speed;

                if (currentValue < targetValue) {
                    currentValue += increment;
                    element.innerText = formatNumber(Math.ceil(currentValue));
                    setTimeout(updateCount, 1);
                } else {
                    element.innerText = formatNumber(targetValue);
                }
            };
            updateCount();
        };

        const resetCount = (element) => {
            element.innerText = '0';
        };

        const formatNumber = (num) => {
            if (num >= 1000000) {
                return (num / 1000000).toFixed(0) + 'M';
            }
            return num;
        };

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // 50% 可见时触发
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    countUp(entry.target);
                } else {
                    resetCount(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    });
})();