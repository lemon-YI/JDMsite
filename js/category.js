/**
 * Created by 懿懿 on 2018/3/27.
 */
window.onload = function () {
    //左侧滑动
    //leftSwipe();
    iscrollLeft();
    //右侧侧滑动
    rightSwipe();
};
var leftSwipe = function () {
    /*
    * 1、实现上下滑动（touch事件 位移）
    *
    * */
    var parentBox = document.querySelector('.cate_left');

    var chlidBox = parentBox.querySelector('ul');

    var startY = 0;
    var distanceY = 0;
    var currentY = 0 ;
    chlidBox.addEventListener('touchstart',function (e) {
        startY = e.touches[0].clientY

    });
    chlidBox.addEventListener('touchmove',function (e) {
        var moveY  = e.touches[0].clientY;
        distanceY = moveY - startY;
        //将要去做定位的位置
        var translateY = distanceY +currentY;
        chlidBox.style.transform = 'translateY('+translateY+'px)'
        chlidBox.style.webkitTransform = 'translateY('+translateY+'px)'

    });
    chlidBox.addEventListener('touchend',function (e) {
        currentY = currentY  + distanceY
    });
};
var iscrollLeft = function () {
    new IScroll(document.querySelector('.cate_left')) ;
}

var rightSwipe = function () {
    new IScroll(document.querySelector('.cate_right'),{

        //设置参数，使滑动
        scrollX:true,
        scrollY:false
    });


}
