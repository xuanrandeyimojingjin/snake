$(function(){
  var musics=[
   
    { src:'media/爱的华尔兹.mp3',name:'爱的华尔兹',artistan:'俞灏明',duration:'04:35'},
    { src:'media/爱，频率.mp3',name:'爱，频率',artistan:'安七炫',duration:'04:35'},
    { src:'media/日不落.mp3',name:'日不落',artistan:'蔡依林',duration:'03:35'},
    { src:'media/可以了.mp3',name:'可以了',artistan:'陈奕迅',duration:'02:35'},
    { src:'media/放开.mp3',name:'放开',artistan:'王艺翔',duration:'01:35'},
    { src:'media/雪.mp3',name:'雪',artistan:'樊凡',duration:'04:35'},
    { src:'media/我想大声告诉你.mp3',name:'我想大声告诉你',artistan:'爱乐团',duration:'05:35'},
    {src:'media/燕归巢.mp3',name:'燕归巢',artistan:'张靓颖',duration:'03:37'},
    {src:'media/十年.mp3',name:'十年',artistan:'韩红',duration:'05:13'},
    {src:'media/白天不懂夜的黑.mp3',name:'白天不懂夜的黑',artistan:'刘涛',duration:'04:14'},
    {src:'media/有一点动心.mp3',name:'有一点动心',artistan:'陈奕迅',duration:'02:00'},
    {src:'media/第一夫人.mp3',name:'第一夫人',artistan:'张杰',duration:'03:44'}
  ];

  $(musics).each(function(index,val){
    $('<li class="player-list-li" data-id="'+index+'"><span class="player-list-song">'+val.name+'</span><span class="player-list-singer" title="'+val.artistan+'">'+val.artistan+'</span><span class="player-list-during">'+val.duration+'</span><span class="player-list-operate"><div class="op1"></div><div class="op2"></div><div class="op3"></div><div class="op4"></div></span></li>').appendTo('.player-list ul');
  })
  var currentIndex;
  $('.player-list li').on('click',function(){
    currentIndex=parseInt($(this).attr('data-id'));
    audio.src=musics[currentIndex].src;
    audio.play();
  })

  //删除歌曲
  $('.player-list .op4').on('click',function(e){
    e.stopPropagation();
    var i=$('.player-list .op4').index(this);
    $(this).closest('li').remove();
    musics.splice(i,1);
  })

  var audio=$('#audio').get(0);//dom对象
  var $audio=$('#audio');

  //自动切换下一首
  $audio.on('ended',function(){
    $('.btnright').trigger('click');
  })

  //播放暂停
  $('.btnon').on('click',function(){
    if(audio.paused){
      audio.play();     
    }else{
      audio.pause();     
    }
  })
    $audio.on('play',function(){
      $('.btnon').addClass('shutiao');
      $('.player-list li').removeClass('lvse').eq(currentIndex).addClass('lvse');
      var v=musics[currentIndex];
      $('.player-mini .geming1').text(v.name);
      $('.player-mini .gexing').text(v.artistan);
      $('.player-mini .getime').text(v.duration);
    })
    $audio.on('pause',function(){
      $('.btnon').removeClass('shutiao');
    })
  

  //shift+p可以播放或暂停
  $(document).on('keyup',function(e){
    if(e.shiftKey&&e.keyCode===80){
    $('.btnon').trigger('click');
    }
  })

  //歌曲上一首
  $('.btnleft').on('click',function(){
    currentIndex-=1;
    if(!currentIndex){
      currentIndex=0;
    }
    if(currentIndex<0){
      currentIndex=musics.length-1;
    }
    audio.src=musics[currentIndex].src;
    audio.play();
  })
  //歌曲下一首
  $('.btnright').on('click',function(){
    currentIndex+=1;
    if(!currentIndex){
      currentIndex=0;
    }
    if(currentIndex>=musics.length){
      currentIndex=0;
    }
    audio.src=musics[currentIndex].src;
    audio.play();
  })


  //音量
  $('.btnvoice-bar').on('click',function(e){
    audio.volume=e.offsetX/$(this).width();
  })
  $('.btnvoice').on('click',function(){
    if(!$(this).attr('aa')){
      $(this).attr('aa',audio.volume);
      audio.volume=0;
    }else{
      audio.volume=$(this).attr('aa');
      $(this).removeAttr('aa');
    }  
  })
  $audio.on('volumechange',function(){
    if(audio.volume===0){
      $('.btnvoice').addClass('mute');
    }else{
      $('.btnvoice').removeClass('mute');
    }
    var w=audio.volume*$('.btnvoice-bar').width();
    $('.btnvoice-bar .topbar').width(w);
    $('.btnvoice-bar .diandian').css({left:w-$('.btnvoice-bar .diandian').width()/2});
  })
  $('.btnvoice-bar .diandian').on('click',function(e){
    e.stopPropagation();
  })
  //拖拽调音量
  $('.btnvoice-bar .diandian').on('mousedown',function(e){
    e.stopPropagation();
    $(this).closest('.btnvoice-bar').addClass('moving');
    $(document).on('mousemove',function(e){
      var left=e.pageX-$('.btnvoice-bar').offset().left;
      var v=left/$('.btnvoice-bar').width();
      v=(v>1)?1:v;
      v=(v<0)?0:v;
      audio.volume=v;
    })
  })
  $(document).on('mouseup',function(e){
    $('.btnvoice-bar').removeClass('moving');
    $(document).off('mousemove');
  })


  //进度
  var $jindutiao=$('.player-mini .jindutiao');
  var $dangqian=$('.player-mini .dangqian');
  var $zhishidian=$('.player-mini .zhishidian');
  $audio.on('timeupdate',function(){
    var x=(audio.currentTime/audio.duration)*$jindutiao.width();
    $dangqian.width(x);
    $zhishidian.css({left:x-$zhishidian.width()/2});
  })
  $jindutiao.on('click',function(e){
    audio.currentTime=e.offsetX/$jindutiao.width()*audio.duration;
  })
  $zhishidian.on('click',function(e){
    e.stopPropagation();
  })
  //拖拽调进度
  $zhishidian.on('mousedown',function(e){
    e.stopPropagation();
    $(document).on('mousemove',function(e){
      var left=e.pageX-$jindutiao.offset().left;
      var v=left/$jindutiao.width()*audio.duration;
      audio.currentTime=v;
    })
  })
  $(document).on('mouseup',function(e){
    $(document).off('mousemove');
  })

  //时间点
  $tips=$('.player-mini .tips');
  $jindutiao.on('mouseover',function(e){
    time=e.offsetX/$jindutiao.width()*audio.duration;
    /*$tips.find('span').html(change(time));*/
    $tips.css({
      display:'block',
      left:e.offsetX-$tips.width()/2
    })
  })
  $jindutiao.on('mousemove',function(e){
    $tips.css({
      left:e.offsetX-$tips.width()/2
    })
  })
  $jindutiao.on('mouseout',function(){
    $jindutiao.off('mousemove');
    $tips.css('display','none');
  })


  //清理
  $('.player .qingkong').on('click',function(){
    $('.player-list ul').empty();
    audio.src='';
    $('.player-mini .geming1').text('qq音乐');
    $('.player-mini .gexing').text('听我想听的歌');
    $('.player-mini .getime').text('');
    $('.openlist span').text('0');
  })

  $('.caozuo .btncircle').on('click',function(){
    $('.caozuo .btncircle .circlelist').css('display','block');
  })

})