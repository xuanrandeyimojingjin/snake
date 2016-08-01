/*一、解决类名的兼容函数
getClass("one",[range]可传可不传，传时不加[])
获取带有指定class名的元素的集合
one 指定的class名
思路：
	1.判断浏览器 document.getElementsByClassName
	2.如果浏览器是指定的用指定的方法
	  document.getElementsByClassName("one")
	3.没有做兼容（用已有的模拟）从所有的元素，通过类名进行挑选
	all[i].className是否包含指定的className  */
function getClass(className,range){
	//range 初始化
	var range=range||document;
	if(document.getElementsByClassName){//true时w3c
		return range.getElementsByClassName(className);
	}else{//false时是IE6-8
		var arr=[];
		var all=document.getElementsByTagName("*");
		for(var i=0;i<all.length;i++){
		//当前元素的classname是否包含指定的classname
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		return arr;
	}
}
/* "one two three"   "one""two""three"
checkClass(str,classname)检查str里面是否包含classname
思路：1.将str进行分割，转换成数组
	2.遍历数组，检查是否存在某一个元素等于指定的classname
	3.相等返回true，不相等返回false */
function checkClass(str,className){
	var arr=str.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==className){
			return true;
		}
	}
	return false;
}
/*二、文本的兼容性问题
思路：
getContent(obj,[val])----(div,"我是1")
1.判断浏览器
2.判断val参数,获取或者设置文本 */
function getContent(obj,val){
	if(obj.textContent){
		//w3c浏览器
		if(val){
			obj.textContent=val;
		}else{
			return obj.textContent;
		}
	}else{
		//IE浏览器
		if(val){
			obj.innerText=val;
		}else{
			return obj.innerText;
		}
	}
}
/*三、样式的兼容性问题
思路：
getStyle(obj,attr)-----(div,"width")
1.判断浏览器
2.IE6-8； obj.currentStyle.attr
3.w3c: getcomputedStyle(obj,null).attr */
function getStyle(obj,attr){
	if(obj.currentStyle){
		//IE浏览器,attr是个字符串
		return obj.currentStyle[attr];
	}else{
		//w3c浏览器
		return getComputedStyle(obj,null)[attr];
	}
}
/*四、获取元素的兼容性问题
思路： 
$(select)
$(".one")--通过className获取元素
$("#one")--通过id获取元素
$("div")--通过标签获取元素  (/^[a-z][a-z1-6]{0,8}$/.test(select))
$("<div>")--创建div
$(function(){})--传进来参数是函数时执行window.onload=function(){}
1.判断参数的第一个字符 str.charAt(0)
2.根据字符执行相应的分支，返回相应的元素
*/
// function $(select,content){
// 	if(typeof select=="string"){
//		select=trim(select);
// 		var content=content||document;
// 		var first=select.charAt(0);
// 		if(first=="."){
// 			return getClass(select.substring(1),content);//.
// 		}else if(first=="#"){
// 			return content.getElementById(select.substring(1));//id
// 		}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
// 			return content.getElementsByTagName(select);//tagName
// 		}else if(/^<[a-zA-Z][a-zA-Z1-6]{0,8}>$/.test(select)){
// 			return document.createElement(select.slice(1,-1));//<div>
// 		}
// 	}else if(typeof select=="function"){
// 		window.onload=function(){
// 			select();
// 		/*addEvent(window,"load",select);*/
// 		}
		
// 	}
// }



function $(selector,father){
   //给父容器设置默认值
   father=father||document;
   //对selector做判断
   if(typeof selector=="string"){
      //去除字符串左右的空格
      selector=selector.replace(/^\s*|\s*$/g,"");
      if(selector.charAt(0)=="."){//class名
        return getClass(selector.slice(1),father);
      }else if(selector.charAt(0)=="#"){//id名
        return father.getElementById(selector.slice(1));
      }else if(/^[a-zA-Z1-6]{1,6}$/.test(selector)){//标签名
        return father.getElementsByTagName(selector);
      }
      else if(/^<[a-z][a-z1-6]{0,8}>$/.test(selector)){
		return document.createElement(selector.slice(1,-1));//<div>
		}
   }else if(typeof selector=="function"){
    //是一个函数时执行window.onload时间
      /*window.onload=function(){
        selector();
      }*/
      addEvent(window,"load",selector);
   }
 }


/*function $(select,content){
	var content=content||document;
	var first=select.charAt(0);
	if(first=="."){
		return getClass(select.substring(1),content);//.
	}else if(first=="#"){
		return content.getElementById(select.substring(1));//id
	}else if(/^[a-z][a-z1-6]{0,8}$/.test(select)){
		return content.getElementsByTagName(select);//tagName
	}else if(/^<[a-z][a-z1-6]{0,8}>$/.test(select)){
		return document.createElement(select.slice(1,-1));//div
	}
}*/
/*五、getChild(obj)获取指定元素的子元素（元素节点）的集合
obj 是指定的元素
type是指定获取元素的类型，如果true只获取元素节点，如果false获取元素节点和有意义文本
思路：1.获取obj的所有的子元素
	  2.挑选 节点类型==1 时是元素节点（obj.nodeType==1）*/
function getChild(obj,type){
	type=type==undefined?true:type;//初始化type
	var arr=[];
	var child=obj.childNodes;
	if(type){//只获取元素节点
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1){
				arr.push(child[i]);
			}
		}
		return arr;
	}else{//获取元素节点和有意义文本
		for(var i=0;i<child.length;i++){
			if(child[i].nodeType==1||(child[i].nodeType==3&&child[i].nodeValue.replace(/^\s+|\s+$/g,""))){
				arr.push(child[i]);
			}
		}
		return arr;
	}
}
/*六、获取子节点的第一个*/
function firstChild(obj){
	return getChild(obj)[0];
}
/*七、获取子节点的最后一个*/
function lastChild(obj){
	return getChild(obj)[getChild(obj).length-1];
}
/*八、通过指定下标获取子节点*/
function numChild(obj,type,num){
	return getChild(obj,type)[num];
}
/*九、beforeChild(obj,div)
给元素最前面插一个元素
obj  父元素
div  要插入的元素
思路：1.获取obj第一个子元素
	  2.obj.insertBefore(div,firstChild)*/
function beforeChild(obj,child){
	var first=firstChild(obj);
	obj.insertBefore(child,first);
}
/*十、获取obj的下一个兄弟节点
如果有兄弟节点则返回该节点，如果没有直接返回false
getnext(obj,true)
obj  指定的对象
type  类型true  忽略文本（默认）
	      false  不能忽略文本
思路：1.判断是否有下一个兄弟节点(next)。如果没有返回false
	  2.有 判断next是否元素节点（有意义文本）
	  3.更新next，继续寻找兄弟节点
	    判断next是否为空，如果空返回false，如果不空重复步骤2*/ 
function getNext(obj,type){
	type=type==undefined?true:type;
	if(type){//忽略文本
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||next.nodeType==3){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{//不能忽略文本
		var next=obj.nextSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.nextSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}
/*十一、insertAfter(obj,div,true)
给元素最后面插一个元素
obj  要插入的位置
div  要插入的元素
type  类型true  忽略文本
	      false  不能忽略文本  
思路：1.是否有下一个兄弟节点
	  	1.1.有兄弟节点往下一个兄弟节点的前面插入元素
	  2.没有兄弟节点
	  	2.1.直接往父元素后面插入*/
function insertAfter(obj,div,type){
	type=type==undefined?true:type;
	var next=getNext(obj,type);
	var parent=obj.parentNode;
	if(next){
		parent.insertBefore(div,next);
	}else{
		parent.appendChild(div);
	}
}
/*十二、获取obj的上一个兄弟节点（同十）
如果有兄弟节点则返回该节点，如果没有直接返回false
getprevious(obj,true)
obj  指定的对象
type  类型true  忽略文本（默认）
	      false  不能忽略文本
思路：1.判断是否有上一个兄弟节点(previous)。如果没有返回false
	  2.有 判断previous是否元素节点（有意义文本）
	  3.更新previous，继续寻找兄弟节点
	    判断previous是否为空，如果空返回false，如果不空重复步骤2*/
function getPrevious(obj,type){
	type=type==undefined?true:type;
	if(type){//忽略文本
		var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||next.nodeType==3){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}else{//不能忽略文本
		var next=obj.previousSibling;
		if(next==null){
			return false;
		}
		//next的类型是注释或文本,更新节点
		while(next.nodeType==8||(next.nodeType==3&&!(next.nodeValue.replace(/^\s+|\s+$/g,"")))){
			next=next.previousSibling;
			if(next==null){
				return false;
			}
		}
		return next;
	}
}

/*十三、addEvent(obj,type,fn)给元素添加事件
obj  指定的对象
type  事件类型
fn  事件处理程序*/
function addEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.addEventListener(type,fn,false);
	}else{
		obj.attachEvent("on"+type,fn);
	}
}
//removeEvent(obj,type,fn)给元素删除事件
function removeEvent(obj,type,fn){
	if(obj.addEventListener){
		obj.removeEventListener(type,fn,false);
	}else{
		obj.detachEvent("on"+type,fn);
	}
}
/*十四、offset(obj)获取元素到浏览器的距离
left=所有具有定位属性的父元素的offsetLeft+所有具有定位属性的父元素的左边框+自身offsetLeft
思路：1.获取所有具有定位属性的父元素 position=relative或者absolute
2.计算offsetLeft+borderLeftWidth
3.返回最终结果，是个对象{left：200，top：300}*/
function offset(obj){
	var result={left:0,top:0};
	var arr=[];//存放obj和具有定位属性的父元素
	arr.push(obj);
	var parent=obj.parentNode;
	while(parent.nodeName!="BODY"){//获取定位属性的父元素
		if(getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute"){
			arr.push(parent);
		}
		parent=parent.parentNode;
	}
	//计算所有具有定位属性的父元素的offsetLeft+所有具有定位属性的父元素的左边框+自身offsetLeft
	for(var i=0;i<arr.length;i++){
		//抛掉自身的边框，如果父元素没有边框边框为0；
		var leftWidth=getStyle(arr[i],"borderLeftWidth")?parseInt(getStyle(arr[i],"borderLeftWidth")):0;
		var topWidth=getStyle(arr[i],"borderTopWidth")?parseInt(getStyle(arr[i],"borderTopWidth")):0;
		if(i==0){
			leftWidth=0;topWidth=0;
		}
		result.left+=arr[i].offsetLeft+leftWidth;
		result.top+=arr[i].offsetTop+topWidth;
	}
	return result;
}
/*十五、滚轮事件*/
function mousewheel(obj,downfn,upfn){
	if(document.attachEvent){
		obj.attachEvent("onmousewheel",scrollFn);
	}else if(document.addEventListener){
		obj.addEventListener("mousewheel",scrollFn,false);
		obj.addEventListener("DOMMouseScroll",scrollFn,false);
	}
	function scrollFn(e){
		var ev=e||window.event;
		var dir=ev.wheelDelta||ev.detail;

		if(ev.preventDefault){
			ev.preventDefault(); //阻止默认浏览器动作(W3C)
		}else{
			ev.returnValue=false;//IE中阻止函数器默认动作的方式
		}
		
		if(dir==-120||dir==3){
			downfn.call(obj);
		}else if(dir==120||dir==-3){
			upfn.call(obj);
		}
	}
}
/*十六、设置cookie(属性名，属性值，保存时间)
setCookie("weather","sunny",3)*/
function setCookie(name,val,time){
	if(time){//设置存活时间的
		var date=new Date();
		date.setDate(date.getDate()+time);
		//date.setTime(date.getTime()+4*1000*60*60*24);
		document.cookie=name+"="+val+";expires="+date;
	}else{//临时cookie
		document.cookie=name+"="+val;
	}
}
/*删除cookie*/
function delCookie(name){
	var date=new Date();
	date.setDate(date.getTime()-1000);
	document.cookie=name+"=aa;expires="+date;
}
/*获取cookie
1.split("; ")  arr=["user=zhangsan","pass=123456","weather=sunny"]
2.arr[0] "="     arr2=["user","zhangsan"]*/
function getCookie(name){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0;i<arr.length;i++){
		var arr2=arr[i].split("=");
		if(arr2[0]==name){
			return arr2[1];
		}
	}
}
/*十七、trim（str，type）去除字符指定位置的空格
type 默认去除两边
left 去除开头空格
right 去除右边
both 去除两边
all 去掉所有空包括中间*/
function trim(str,type){
	type=type?type:both;
	if(type=="left"){
		var reg=/^\s*/g;
		return str.replace(reg,"");		
	}else if(type=="right"){
		var reg=/\s*$/g;
		return str.replace(reg,"");
	}else if(type=="both"){
		var reg=/^\s*|\s*$/g;
		return str.replace(reg,"");
	}else if(type=="all"){
		var reg=/\s*/g;
		return str.replace(reg,"");
	}
}
/*十八、ajax({
	type:"get",   设置请求的方式 get post
	url："new.php",    地址 必传
	data:{"name":"zhangsan"}  "name=zhangsan&age=18"
	asynch:true,   是否异步true
	dataType:"json",json  string  xml
	success:function(data){
		//数据获取成功后，处理数据
	}
})*/
function ajax(option){
	if (!option.url) {return};
	var type=option.type==undefined?"get":option.type;
	var url=option.url;
	var dataType=option.dataType==undefined?"string":option.dataType;
	var asynch=option.asynch==undefined?true:option.asynch;
	var data="";
	if (typeof option.data=="string") {
		data=option.data;
	}else if (option.data instanceof Object) {
		for (var i in option.data) {
          data+=i+"="+option.data[i]+"&";			
		};
	data=data.slice(0,-1);
	};
var xml=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject("Microsoft.XMLHTTP");

if (type=="get") {
	if(data){
		xml.open("get",url+"?"+data,asynch);
	}else{
		xml.open("get",url,asynch);
	}
}else if (type=="post") {
	xml.open("post",url,asynch);
};



if (type=="get") {
	xml.send(null);
}else if (type=="post") {
	xml.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xml.send(data);
};

xml.onreadystatechange=function(){
	if (xml.readyState==4) {
		if (xml.status==200) {
			if (dataType=="string") {
				option.success(xml.responseText);
			}else if (dataType=="json") {
				var data=JSON.parse(xml.responseText);
				option.success(data);
			}else if (dataType=="xml") {
				option.success(xml.responseXML);
			};
		};
	};
}



}