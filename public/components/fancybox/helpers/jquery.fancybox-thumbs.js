!function(e){var t=e.fancybox;t.helpers.thumbs={defaults:{width:50,height:50,position:"bottom",source:function(t){var n;return t.element&&(n=e(t.element).find("img").attr("src")),!n&&"image"===t.type&&t.href&&(n=t.href),n}},wrap:null,list:null,width:0,init:function(t,n){var i,r=this,o=t.width,a=t.height,s=t.source;i="";for(var u=0;u<n.group.length;u++)i+='<li><a style="width:'+o+"px;height:"+a+'px;" href="javascript:jQuery.fancybox.jumpto('+u+');"></a></li>';this.wrap=e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"),this.list=e("<ul>"+i+"</ul>").appendTo(this.wrap),e.each(n.group,function(t){var i=s(n.group[t]);i&&e("<img />").load(function(){var n,i,s,u=this.width,l=this.height;r.list&&u&&l&&(n=u/o,i=l/a,s=r.list.children().eq(t).find("a"),n>=1&&i>=1&&(n>i?(u=Math.floor(u/i),l=a):(u=o,l=Math.floor(l/n))),e(this).css({width:u,height:l,top:Math.floor(a/2-l/2),left:Math.floor(o/2-u/2)}),s.width(o).height(a),e(this).hide().appendTo(s).fadeIn(300))}).attr("src",i)}),this.width=this.list.children().eq(0).outerWidth(!0),this.list.width(this.width*(n.group.length+1)).css("left",Math.floor(.5*e(window).width()-(n.index*this.width+.5*this.width)))},beforeLoad:function(e,t){return t.group.length<2?(t.helpers.thumbs=!1,void 0):(t.margin["top"===e.position?0:2]+=e.height+15,void 0)},afterShow:function(e,t){this.list?this.onUpdate(e,t):this.init(e,t),this.list.children().removeClass("active").eq(t.index).addClass("active")},onUpdate:function(t,n){this.list&&this.list.stop(!0).animate({left:Math.floor(.5*e(window).width()-(n.index*this.width+.5*this.width))},150)},beforeClose:function(){this.wrap&&this.wrap.remove(),this.wrap=null,this.list=null,this.width=0}}}(jQuery);