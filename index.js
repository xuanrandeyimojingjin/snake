$(function() {

    var box=document.getElementsByClassName('box')[0];
    animate(box,{"height":400},1000,Tween.Back.easeInOut);  
    var start=document.getElementsByClassName('start')[0];
    var javas=document.getElementsByClassName('java')[0];
    start.onclick=function(){
        javas.src="imgs/123.gif";
        javas.style.left=195+"px";
        setTimeout(function(){
            animate(box,{"height":0},1000,Tween.Back.easeInOut,function(){
                play();
            });
            
        },3000);

    }


    //画场景 规划坐标
    function play(){


        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                var g = Math.floor(Math.random() * 30 + 155);
                var b = Math.floor(Math.random() * 100);
                $('<div>').addClass('block').attr('id', i + '-' + j).css({'backgroundColor': 'rgba(0,' + g + ',' + b + ',0.5)'}).appendTo('.changjing');
            }
        }
        var score=-1;
        var time=0;
        $('.changjing').css({'display':'block','transform':'translateY(0)'}).animate({opacity:1}).delay(1000);
    //初始化蛇
    var dict={
      '0-1':true,
      '0-2':true,
      '0-3':true,
    }
        //数据 画蛇
        var she = [{
            x: 0,
            y: 1
        }, {
            x: 0,
            y: 2
        }, {
            x: 0,
            y: 3
        }];
        
        var zhaodian=function(dian){
          return $('#'+dian.x+'-'+dian.y);
        }
        var init=function(){
          for (var i = 0; i < she.length; i++) {
              
              zhaodian(she[i]).addClass('she');
          }
        //    zhaodian(food).addClass('food');
        }
        init();
        for (var i = 0; i < she.length; i++) {
              $('#' + she[i].x + '-' + she[i].y).addClass('she');
        }
        //画食物
        var setfood=food();
        function food() {
          do{
            //不能放在蛇身上
            var a = Math.floor(Math.random() * 20);
            var b = Math.floor(Math.random() * 20);
          }while(dict[ a + '-' + b])
            $('#' + a + '-' + b).addClass('food');
            score+=1;
            $('#fenshu').find('span').html(score);
            return {
                x: a,
                y: b
            };
        }
        
        //动起来
        var fangxiang = 'you';
        var move = function() {
            var jiutou = she[she.length - 1];
            if (fangxiang === 'you') {
                var xintou = {
                    x: jiutou.x,
                    y: jiutou.y + 1
                };
                
            }else if (fangxiang === 'zuo') {
                var xintou = {
                    x: jiutou.x,
                    y: jiutou.y - 1
                };
             
            }else if (fangxiang === 'xia') {
                var xintou = {
                    x: jiutou.x + 1,
                    y: jiutou.y
                };
                
            }else if (fangxiang === 'shang') {
                var xintou = {
                    x: jiutou.x - 1,
                    y: jiutou.y
                };
                
            }
            $('#'+xintou.x+'-'+parseInt(xintou.y+1)).animate({left:5}).delay(20).animate({left:0})
            $('#'+xintou.x+'-'+parseInt(xintou.y-1)).animate({left:-5}).delay(20).animate({left:0})
            $('#'+(xintou.x+1)+'-'+parseInt(xintou.y)).animate({top:5}).delay(20).animate({top:0})
            $('#'+(xintou.x-1)+'-'+parseInt(xintou.y)).animate({top:-5}).delay(20).animate({top:0})

            if(xintou.x<0 ||xintou.x>19 ||xintou.y<0|| xintou.y>19){
               // $('<div>').addClass('tishi').appendTo('.changjing');
               $('.tishi').addClass('diaoluo');
              jieshu();
              return;
            }
            if(dict[xintou.x + '-' + xintou.y]){
                $('.tishi').addClass('diaoluo');
               jieshu();
              return;
            }
            //吃到食物
            she.push(xintou);
            dict[xintou.x + '-' + xintou.y]=true;
            // $('#' + xintou.x + '-' + xintou.y).addClass('she');
            zhaodian(xintou).addClass('she');
            if (xintou.x === setfood.x && xintou.y === setfood.y) {
                // $('#' + food.x + '-' + food.y).removeClass('food');
                zhaodian(xintou).removeClass('food')
               setfood = food();
            } else {
                //没有吃到食物
                var weiba = she.shift();
                delete dict[weiba.x + '-' + weiba.y]
                $('#' + weiba.x + '-' + weiba.y).removeClass('she');

               zhaodian(weiba).removeClass('she');
            }
        }
       var t;
       var kaishi=function(){
           clearInterval(t)
           t = setInterval(move, 200);
        }
        kaishi();
        var jieshu=function(){
           clearInterval(t)
        }
        $(document).on('keydown', function(e) {
          e.preventDefault();
          var biao={
            'zuo':37,'you':39,'shang':38,'xia':40
          }
          if(Math.abs(e.keyCode-biao[fangxiang])===2){
              return;
          }
            if (e.keyCode === 37) {
                fangxiang = 'zuo';
            }
            if (e.keyCode === 39) {
                fangxiang = 'you';
            }
            if (e.keyCode === 38) {
                fangxiang = 'shang';
            }
            if (e.keyCode === 40) {
                fangxiang = 'xia';
            }
        });
    }
    $('.button .agian ').on('click',function(){
        // $('.changjing').addclass('kong');
        location.reload();
        play();
        clearInterval(t);
      var t=setInterval(move,200);



    })
})
