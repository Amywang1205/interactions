function move(obj, attrs, duration,callback) {

    clearInterval(obj.timer);

    var startTime = new Date().getTime();
    //var b = parseFloat(getComputedStyle(obj)[attr]);
    //var c = target - b;

    //因为要运动多个属性，并且多个属性的s起始和结束的值并不一样，所有b的和c的值就不能共用，我们要根据属性的属性的不同，分别去存放b和c的值，同时存的值也要方便下面定时循环不同属性的过程中，很方便的就能找到
    //所以，我们可以定义一个对象，然后根据不同的属性存放不同的b和c
    var j = {};
    //遍历attrs，然后根据里面的值，生成不同的b和c
    for (var attr in attrs) {
        j[attr] = {}
        j[attr].b = parseFloat(getComputedStyle(obj)[attr]);
        j[attr].c = attrs[attr] - j[attr].b;
    }

    //console.dir(j);
    //
    //return;


    var d = duration;

    obj.timer = setInterval(function() {

        var t = new Date().getTime() - startTime;

        if ( t >= d ) {
            t = d;
        }

        //根据传入进来的属性，通过遍历的方式把所有要运动的属性都计算一次
        for (var attr in attrs) {
            var b = j[attr].b;
            var c = j[attr].c;
            var value = c*t/d + b;

            if ( attr == 'opacity' ) {
                obj.style[attr] = value;
            } else {
                obj.style[attr] = value + 'px';
            }
        }

        if ( t == d ) {
            clearInterval(obj.timer);
            if (typeof callback == 'function') {
                callback();
            }

        }

    }, 16);
}