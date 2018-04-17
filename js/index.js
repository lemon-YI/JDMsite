/**
 * Created by 懿懿 on 2018/3/26.
 */
window.onload = function () {
    //初始化页面功能
    //搜索
    search();
    //轮播图
    banner();
    //倒计时
    downTime();
};
var search = function () {
    //1、页面初始化的时候 ，距离顶部是0的距离的时候，透明度是0
    //2、当页面滚动的时候，随着页面距离顶部的距离变大，透明度变大
    //3、当滚动的距离超过轮播图的距离时候，保持不变

    //获取dom元素
    var search = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    //距离范围
    var height = banner.offsetHeight;
    //监听滚动事件
    window.onscroll = function () {
        var top = document.body.scrollTop+document.documentElement.scrollTop;
        var  opacity = 0;
        if(top > height){
            opacity = 0.85;
        }else {
            opacity = 0.85 * (top / height)
        }
        search.style.background = 'rgba(216,80,92,'+opacity+')';
    }
};

var banner = function () {
    //大容器
    var banner = document.querySelector('.jd_banner');

    var width = banner.offsetWidth;
    //图片容器
    var imageBox = banner.querySelector('ul:first-child');
    //点容器
    var pointBox = banner.querySelector('ul:last-child');
    //所有的点
    var points = pointBox.querySelectorAll('li');

    //提取公用的方法
    var addTransition = function () {

        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX('+translateX+'px)';//移动轮播图的宽度
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';//移动轮播图的宽度
    };
    //1、无缝滚动&无缝滑动（定时器  过度 位移）
    var index = 1;  
    var timer = setInterval(function () {
        index++;
        //过度
        addTransition()
        //位移
        setTranslateX(-index*width);

    },1000);
    //监听过度 结束的这个时间点，定位到1
    imageBox.addEventListener('transitionend',function () {
        //索引=9的时候 瞬间定位到1
       if(index >= 9){
           index = 1;
           //清除动画过度
           removeTransition()
           //定位
           setTranslateX(-index*width);
       }else if(index <= 0){
           //当索引为0的时瞬间定位到8
           index = 8;
            //清除动画过度
           removeTransition();
           //定位
           setTranslateX(-index*width);
       }
        setPoints()
    });
    //给对应的点盒子无缝滑动
    var setPoints = function () {
        for(var i= 0;i < points.length;i++){
            points[i].classList.remove('now');
        }
        points[index-1].classList.add('now');
    };

    var startX = 0;//记录开始X的坐标
    var distanceX = 0;//记录坐标坐标轴的改变的
    //为了严谨
    var isMove = false;
    imageBox.addEventListener('touchstart',function (e) {
        // console.log("touchstart")
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    console.log(imageBox);
    imageBox.addEventListener('touchmove',function (e) {
        // console.log("touchmove");
        var moveX = e.touches[0].clientX;
        distanceX = moveX - startX;
        var translateX = -index*width + distanceX;
        removeTransition();
        setTranslateX(translateX);
        isMove = true;
    });
    imageBox.addEventListener('touchend',function (e) {
        console.log("touchend");
        //有一个范围  如果大于三分之一切换图片，反之吸附图片
        if( isMove){
            // console.log(distanceX)
            if(Math.abs(distanceX) < width/3){

                // 4、当滑动距离不够时候  吸附回去 （过度 位移）
                //过度
                addTransition()
                //位移
                setTranslateX(-index*width);

            }else {
                //5、当滑动距离够了的时候 跳转 上一张  下一张 (判断方法 过度 位移)
                  if(distanceX > 0){
                      //向右滑  上一张
                      index --;
                  }else {
                      //向左滑  下一张
                      index ++;
                  }
                //加过度
                addTransition();
                //加定位
                setTranslateX(-index*width);

            }
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            //过度
            addTransition();
            //位移
            setTranslateX(-index*width);

        },1500);

        startX = 0;
        distanceX = 0;
        isMove = false;
    });




};

var downTime = function () {
    /*
    * 1、模拟倒计时时间 11小时
    * 2、利用定时器 1秒一次 重新展示时间
    * */
    var time =  60*60*1;
    var skTime = document.querySelector('.sk_time');
    var spans = skTime.querySelectorAll('span');
    var timer = setInterval(function () {

        time --;
        //格式化事件
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s  = time % 60;

        //设置时间
        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;
        spans[3].innerHTML = Math.floor(s / 10);
        spans[4].innerHTML = m % 10;
        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;
        
        
        if( time <= 0){
            clearInterval(timer);
        }
    },1000)
};