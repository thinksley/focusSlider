/**
 * 无缝滚动焦点图幻灯片
 * @method
 * @param oUl string 左侧id元素
 * @param oOl string 右侧id元素
 * @return
 */
function Focus(opts){
	this.oUl=$('#'+opts.oUl);
	this.oOl=$('#'+opts.oOl);
	this.aLiUl=this.oUl.find('li');
	this.aLiOl=this.oOl.find('li');

	this.oUp=this.oOl.find('.up');
	this.oDown=this.oOl.find('.down');

	this.playing=false;  //开关
	this.idx=0;   
	this.idxOl=0;        //控制右侧ol动画的index   
	this.init();
}

Focus.prototype.init=function(){
	this.bindBom();

	for(var i=1;i<this.aLiUl.length;i++){
		this.aLiUl.eq(i).css('top',408);
	}

	if(this.aLiOl.length>4){
		
		this.oDown.show();
	}

}

Focus.prototype.bindBom=function(){
  	var _this=this;
  	var oneHeight=408;
  	var oneSlideOlHeight=90+6;
	this.oOl.delegate('li','click',function(){
		
		var index=$(this).index();

		if(!_this.playing){
			_this.playing=true;
			
			_this.aLiOl.eq(index).addClass('active').siblings('li').removeClass('active');
			
			if(_this.idx < index){
				
				_this.aLiUl.eq(index).css('top',oneHeight);
				_this.aLiUl.eq(_this.idx).animate({'top':-oneHeight},300,function(){})
			}
			else if(_this.idx > index){
				_this.aLiUl.eq(index).css('top',-oneHeight);
				_this.aLiUl.eq(_this.idx).animate({'top':oneHeight},300,function(){})
			}
			_this.aLiUl.eq(index).animate({'top':0},300,function(){
				 _this.playing=false;
			})
			
			_this.idx=index;
		}

		return false;
		
	})


	var offsetLen=this.aLiOl.length-4;  //右侧ol总条数减去当前显示数量4个

	this.oDown.bind('click',function(){
		if(_this.idxOl<offsetLen){
			_this.idxOl++;
			console.log(_this.idxOl)
			_this.oOl.find('ol').animate({'top':-oneSlideOlHeight*_this.idxOl},300);
			_this.oUp.show();
		}
		if(_this.idxOl==offsetLen){
			$(this).hide();
		}
		
	})

	this.oUp.bind('click',function(){
		if(_this.idxOl>0){
			_this.idxOl--;
			_this.oOl.find('ol').animate({'top':-oneSlideOlHeight*_this.idxOl},300);
			_this.oDown.show();
		}
		if(_this.idxOl==0){
			$(this).hide();
		}
		
	})

}

