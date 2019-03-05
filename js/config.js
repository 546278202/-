/*
 * 保存获取接口
 * 参数说明：
 * param:[url] 请求地址
 * param:[data] 参数
 * param:[okCallback] 回调函数
 * param:[post|get]方法
 * 使用方法：getData("dep/getAllTeachers.htm?a="+Math.random(),{},function(data){console.info(data);})
 */
function getData(url,data,okCallback,method,loadText) {
  var ajaxmethod = method||"get";
  var tipText = loadText||"加载中";
  $.ajax({
	    url : url,
	    data : data,
	    async : true,
	    type:ajaxmethod,
	    dataType:'json',
	    beforeSend:function(){
	    	$.showPreloader(tipText);
	    },
	    success : function(result,textStatus,jqXHR) {
	      if(jqXHR.status==200){
	        //回调
	        okCallback(result);
	      }
	    },
	    error : function(XMLHttpRequest, textStatus, errorThrown) {
	        //alert(textStatus);
            //console.info(XMLHttpRequest.status);
	    },
	    complete: function() {
	    	$.hidePreloader();
	    },
	  });
};


function getDataNoLoading (url, data,okCallback,method) {
    var ajaxmethod = method||"get";
    $.ajax({
        url : url,
        data : data,
        async : true,
        type:ajaxmethod,
        dataType:'json',
        success : function(result,textStatus,jqXHR) {
            if(jqXHR.status==200){
                //回调
                okCallback(result);
            }
        }
    });
};


/*
 * 名称：获取域名中指定参数的值
 * @param参数 paraName 要获取字段的名称
 * @returns 返回指定字段的值
 * 描述：处理浏览器时间不兼容问题（-变/）
 * */

//获取域名参数
function GetUrlParam(paraName) {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;
　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");
　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　}

/*
 * 名称：时间格式转换
 * @param参数 startDiffTime yyyy-mm-dd 需要转换的时间
 * @returns {*} yyyy/mm/dd
 * 描述：处理浏览器时间不兼容问题（-变/）
 * */
function GetDateDiff(startDiffTime) {
    startTime = startDiffTime.replace(/\-/g, "/");
    return startTime
};



/*
 * 根据时长转换成天小时分钟秒
 * @param参数 mss毫秒
 * @returns {*} 格式化后的天、小时、分钟、秒
 * */
function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = parseInt((mss % (1000 * 60)) / 1000);
    return (days<0?"0":days) + "天" + (hours<0?"0":hours) + "小时" + (minutes<0?"0":minutes) + "分钟" + (seconds<0?"0":seconds) + "秒";
}

/*
 * 时分秒转秒
 * @param time 需要格式化的时间
 * @returns {*} 格式化后的秒
 * @使用  time_to_sec("01:01:01")
 */
var time_to_sec = function(time) {
    var hour =parseInt(time.split(":")[0]*3600);
    var min = parseInt(time.split(":")[1]*60);
    var sec = parseInt(time.split(":")[2]==undefined?"00":time.split(":")[2]);
    return hour+min+sec;
}

/*
* 函数：数组去重
* 用法：arr.unique
* 描述：返回去重后的数据
*/
Array.prototype.unique = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
	  if(!json[this[i]]){
	   res.push(this[i]);
	   json[this[i]] = 1;
	  }
	}
	return res;
}

/*
* 函数：删除数组对象
* 用法：arr.removeByValue(value)
* 描述：删除数组指定值
*/
Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}


/*
* 函数：判断两个对象是否相等
* 用法：arr.removeByValue(value)
* 描述：判断两个对象是否相等，相等返回true，否则false
*/


////isEqual：判断两个对象是否键值对应相等
function isEqual(a,b){
	  //如果a和b本来就全等
	  if(a===b){
	    //判断是否为0和-0
	    return a !== 0 || 1/a ===1/b;
	  }
	  //判断是否为null和undefined
	  if(a==null||b==null){
	    return a===b;
	  }
	  //接下来判断a和b的数据类型
	  var classNameA=toString.call(a),
	    classNameB=toString.call(b);
	  //如果数据类型不相等，则返回false
	  if(classNameA !== classNameB){
	    return false;
	  }
	  //如果数据类型相等，再根据不同数据类型分别判断
	  switch(classNameA){
	    case '[object RegExp]':
	    case '[object String]':
	    //进行字符串转换比较
	    return '' + a ==='' + b;
	    case '[object Number]':
	    //进行数字转换比较,判断是否为NaN
	    if(+a !== +a){
	      return +b !== +b;
	    }
	    //判断是否为0或-0
	    return +a === 0?1/ +a === 1/b : +a === +b;
	    case '[object Date]':
	    case '[object Boolean]':
	    return +a === +b;
	  }
	  //如果是对象类型
	  if(classNameA == '[object Object]'){
	    //获取a和b的属性长度
	    var propsA = Object.getOwnPropertyNames(a),
	      propsB = Object.getOwnPropertyNames(b);
	    if(propsA.length != propsB.length){
	      return false;
	    }
	    for(var i=0;i<propsA.length;i++){
	      var propName=propsA[i];
	      //如果对应属性对应值不相等，则返回false
	      if(a[propName] !== b[propName]){
	        return false;
	      }
	    }
	    return true;
	  }
	  //如果是数组类型
	  if(classNameA == '[object Array]'){
	    if(a.toString() == b.toString()){
	      return true;
	    }
	    return false;
	  }
}

//校长 15822021845
/*var baseParameter={
    "openid":"o6r0ewnHvlaMZ8OLLfK6Zl-2qGuc",//最后从cookie里去13820868470
    "org_id":"167",  //最后从cookie里去
    "identity":"1", //身份0家长1教师
    "version":"3"   //终端
}*/

//财务审批员  13011326106 111111
/*var baseParameter={
    "openid":"o6r0ewqi9b_Xnm4SPA-UhWanqwLc",//最后从cookie里去13820868470
    "org_id":"167",  //最后从cookie里去
    "identity":"1", //身份0家长1教师
    "version":"3"   //终端
}*/

 //刘
/* var baseParameter={
   "openid":"o6r0ewjPSqbfXTIe5E1TM-eHjkJw",//最后从cookie里去13820868470
   "org_id":"167",  //最后从cookie里去
   "identity":"1", //身份0家长1教师
   "version":"3"   //终端
}*/

/*//朱福利 13820868470
var baseParameter={
    "openid":"o6r0ewvFtr3Tlfmp6Ei-S9xtcC00",//最后从cookie里去13820868470
    "org_id":"167",  //最后从cookie里去
    "identity":"1", //身份0家长1教师
    "version":"3"   //终端
}*/

//刘洋
/*var baseParameter={
    "openid":"o6r0ewo_u8k30KCcLaxZCNuaFfHs",//最后从cookie里去13820868470
    "org_id":"167",  //最后从cookie里去
    "identity":"1", //身份0家长1教师
    "version":"3"   //终端
}*/

//万
var baseParameter={
    "openid":"o6r0ewiDPDvGcfS25kJMSNXs1VwQ",//最后从cookie里去13820868470
    "org_id":"167",  //最后从cookie里去
    "identity":"1", //身份0家长1教师
    "version":"3"   //终端
}

/*var baseParameter={
    "openid":getCookie("openid"),//最后从cookie里去13820868470
    "org_id":getCookie("org_id"),  //最后从cookie里去
    "identity":getCookie("identity"), //身份0家长1教师
    "version":"3"   //终端
}*/


/*
* 基础数据
* 描述：关系/支付状态/权限名称/主域名
* 通过id这index直接调用
*/
var allRelation=['父亲', '母亲', '爷爷', '奶奶', '外公', '外婆', '其他'];
var state={0:"未支付",1:"已支付",2:"申请退款",3:"已退全款",4:"已退部分款",5:"已驳回",9:"不参与"};
var authorityJson={1:"管理员",2:"校长",3:"任课教师",4:"班主任",5:"年级组长",6:"学生组管理员",7:"部门管理员",8:"教师组管理员",9:"功能管理员"};
var domainName="http://yun.5tree.cn";//"http://t.shijiwxy.5tree.cn";

/*
 *函数： 获取cookie的值
 *
 */
function getCookie(name) {
    var cookies = document.cookie.split(";");
    for(var i=0;i<cookies.length;i++) {
        var cookie = cookies[i];
        var cookieStr = cookie.split("=");
        if(cookieStr && cookieStr[0].trim()==name) {
            return  decodeURI(cookieStr[1]);
        }
    }
}

/*
 * 函数：获取字符串长度
 * @param startDiffTime:字符串.gblen();
 *
 */

String.prototype.gblen = function() {
    var len = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}

/*
 * 函数：图片加载失败统一选用默认图片处理
 * 全局函数：所有图片加载失败时默认都调用
 */
/*$("img").error(function(e){
    var  $this=$(this);
    setTimeout(function () {
        $this.attr('src', "http://yun.5tree.cn/shijiwxy/weixin/images/error.gif");
    },100)

});*/

$('img').error(function(){
    $(this).attr('src',"http://yun.5tree.cn/shijiwxy/weixin/images/error.gif");
})

/*
 * 函数：链接JSON成为一个新对象
 * 描述：a,b 连个JSON祝贺成一个新的JSON
 */
function extend(destination, source){
    for (var property in source)
        destination[property] = source[property];
    return destination;
}

/*
* 函数：获取jssdk权限
* 描述：通过服务器获取微信硬件访问权限
*/
function getJPermissions(orgid){
    var returnObj="";
    $.ajax({
        "url":domainName+'/shijiwxy/wechat/portal/getWxJsConfig.json',
        "method" : "POST",
        "data" : {
            org_id:orgid,
            url:window.location.href,
            token:JSON.parse(sessionStorage.baseUser).token,
            version:3,
            udid:JSON.parse(sessionStorage.baseUser).udid
        },
        "cache" : false,
        "async" : false,
        success : function(result,textStatus,jqXHR) {
                if(jqXHR.status==200){
                    //回调
                    returnObj=result.data;
                }}
    });
    return returnObj
}

/*
 * 函数：图片大图浏览
 * 使用场景：通知详情/作业详情/校园通知/博客
 * 使用方法：initPhotoSwipeFromDOM('.my-gallery'); zepto对象
 *
 */
var initPhotoSwipeFromDOM = function(gallerySelector) {

    var parseThumbnailElements = function(el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;

        for(var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i]; // <figure> element
            if(figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0]; // <a> element
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if(figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if(linkEl.children.length > 0) {
                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl; // save link to element for getThumbBoundsFn
            items.push(item);
        }
        return items;
    };

    // find nearest parent element
    var closest = function closest(el, fn) {
        return el && ( fn(el) ? el : closest(el.parentNode, fn) );
    };

    var onThumbnailsClick = function(e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        // find root element of slide
        var clickedListItem = closest(eTarget, function(el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if(!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if(childNodes[i].nodeType !== 1) {
                continue;
            }
            if(childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if(index >= 0) {
            openPhotoSwipe( index, clickedGallery );
        }
        return false;
    };

    // parse picture index and gallery index from URL (#&pid=1&gid=2)
    var photoswipeParseHash = function() {
        var hash = window.location.hash.substring(1),
            params = {};
        if(hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if(!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if(pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if(params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };

    var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function(index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();
                return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
            },
            isClickableElement : function(el){
                return true;
            }

        };
        if(fromURL) {
            if(options.galleryPIDs) {
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if( isNaN(options.index) ) {
            return;
        }
        if(disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };

    var galleryElements = document.querySelectorAll( gallerySelector );
    for(var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i+1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if(hashData.pid && hashData.gid) {
        openPhotoSwipe( hashData.pid ,  galleryElements[ hashData.gid - 1 ], true, true );
    }
};

/*
* 函数：获取照片的原始尺寸
* 参数为dom对象
* 返回宽高
*/

function getNaturalSize (Domlement) {
    var natureSize = {};
    if(window.naturalWidth && window.naturalHeight) {
        natureSize.width = Domlement.naturalWidth;
        natureSize.height = Domlement.naturalHeight;
    } else {
        var img = new Image();
        img.src = Domlement.src;
        natureSize.width = img.width;
        natureSize.height = img.height;
    }
    return natureSize;
}

/*
*函数：判断图片是否完成并且获取原始尺寸
*/
function getWH(obj){
    var natural = getNaturalSize(obj);
    $(obj).show();
    if($(obj).next().length>0){
        $(obj).next().hide();
    }
    $(obj).parent().attr("data-size",natural.width+"x"+natural.height);
}

/*
* 函数：获取JSON长度
*/
function getJsonLength(jsonData){
    var jsonLength = 0;
    for(var item in jsonData){
        jsonLength++;
    }
    return jsonLength;
}

/*
*统计代码
*/
var _mtac = {};
(function() {
    var mta = document.createElement("script");
    mta.src = "http://pingjs.qq.com/h5/stats.js?v2.0.2";
    mta.setAttribute("name", "MTAH5");
    mta.setAttribute("sid", "500592445");
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(mta, s);
})();
