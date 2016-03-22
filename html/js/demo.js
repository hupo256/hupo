$(function(){
	/*******************
	 *
	 * 首页交互
	 *
	 *******************/
	//主菜单栏切换
	var m_menus = $('#m_menu').find('a');
		m_menus.on('click', function () {
			m_menus.removeClass('on');
			$(this).addClass('on');
			// return false;
		});

	// 首页应用说明切换
	var _sum = $('#summary').children('li'),
		_sumtabs = $('#sumtabs').children('li'),
		summ = new OP_Tools.TabAnimate(_sum, _sumtabs);
	summ.addMouseover();

	// 首页APP列表切换
	var _app = $('#appulbox').children('li'),
		_apptabs = $('#apptabs').children('span'),
		appm = new OP_Tools.TabAnimate(_app, _apptabs);
	appm.addMouseover();
	
	/*******************
	 *
	 * tab菜单切换
	 *
	 *******************/
	var btn_menu = $('.c_menu').find('a'),
		tab_menu = $('.tab_menu').find('a');
	btn_menu.on('click', function () {
		btn_menu.removeClass('on');
		$(this).addClass('on');
		return false;
	});
	
	tab_menu.on('click', function () {
		tab_menu.removeClass('on');
		$(this).addClass('on');
	});
	
	
	var contab = new OP_Tools.TabMenu($('.contit_box'));
	contab.doMenu();
	
	var contab1 = new OP_Tools.TabMenu($('.side_menu'));
	contab1.doMenu(false, true);	
	

	/*******************
	 *
	 * 侧边栏tab切换
	 *
	 *******************/
	var mtabs = $('.sid_menu').find('li');
	mtabs.on('click', function(){
		var _li = $(this),
			_b = _li.find('b');
		if(_b[0]){      //一级菜单 
			var _ul = _li.find('ul'),
				_cls = _ul[0] ? 'ondown' : 'on';   //如果有二级菜单则加上相关标识
			_b.addClass(_cls);
			_li.siblings().find('b').removeClass('on ondown').end()   //去掉其他菜单的高亮
						  .find('li').removeClass('on');			
			_li.find('ul').slideToggle();
		}else{       //二级菜单 
			var _pli = _li.parent().parent();
			_li.addClass('on').siblings().removeClass('on');
			_pli.find('b').addClass('ondown').end()     //往自己的父级菜单加高亮         
				  .siblings().find('b').removeClass('on ondown').end()  //去掉其他菜单的高亮
				  .find('li').removeClass('on');  
			return false; 
		}		
	})
	
	
	
	
	/*******************
	 *
	 * 面板折叠
	 *
	 *******************/
	 // var bortab = $('h3>i');
	 $(document).on('click', '.panel_tit', function(){
		$(this).next().toggle();
	 });
	 
	
	
	/*******************
	 *
	 * 表格的编辑
	 *
	 *******************/
	var _theTable_app = $('.appsTable').find('table');
		etable = new OP_Tools.EditOnTable(_theTable_app);
	
	$(document).on('click', '.addTrs_app', function(){
		etable.addTr();
		return false;
	});
	
	//table行高亮显示
	etable.hightNightTr();
	
	
	
	
	/*******************
	 *
	 * from的校验
	 *
	 *******************/
	var inputs = $('.inputBox').find('input'),
		inVey = new OP_Tools.inputVerify();		
	
	//必填项
	$('#sub_form').on('click', function(){		
		inVey.dealWithEmptyDom(inputs);
		return false;
	});
	
	//内容校验
	inVey.checkContent(inputs.eq(0), 'cn');
	inVey.checkContent(inputs.eq(1), 'en');
	inVey.checkContent(inputs.eq(1), 'num');
	inVey.checkContent(inputs.eq(3), 'url');
	inVey.checkPhoneNum(inputs.eq(2));
	
	//长度校验
	inVey.checkLength(inputs.eq(0), 20);
	inVey.checkLength(inputs.eq(1), 20);
	
	
	//取消校验
	$('#offCheckInput').on('click', function(){	
		inVey.checkContent(inputs.eq(0));
		return false;
	});
	
	/*******************
	 *
	 * 拉下列表交互 
	 *
	 *******************/	
	$(document).on('click', '.io_select', function(e){
		var _inp = $(this).prev()[0];	
		showSelectList(_inp);
		e.stopPropagation();
	});		
	function showSelectList(inptDom){
		var _obj = {
				text : '选项内容选项一',
				code : '0'
			},
			_obj1 = {
				text : '选项内容选项二',
				code : '1'
			},
			_obj2 = {
				text : '选项内容选项三',
				code : '2'
			},
			_obj3 = {
				text : '选项内容选项四',
				code : '3'
			};
		var Arr = [_obj,_obj1,_obj2,_obj3,_obj,_obj1,_obj2,_obj3,_obj,_obj1,_obj2,_obj3],			
			_func = function(o){   //点击完成后的回调
				console.log(o);				
			};
		new OP_Tools.SelectList(inptDom, Arr).draw(_func);
	}
	
	
	/*******************
	 *
	 * 邮件地址选择器 
	 *
	 *******************/	
	var staff = new OP_Tools.StaffSelector($('.serve_list'), $('.selected_list'));
	// var staff = new OP_Tools.StaffSelector($('.serve_list'), $('.selected_list'), 'mobile');
	staff.activeOnEmailBox('data_box');  //监听手动输入事件
	// staff.addDropSelect();  
	
	$(document).on('click', '.receiver', function(){		
		OP_Tools.popDom('#staffSelect', '.close'); 		
		$.get("json.txt", function(data){
			arr = eval('(' + data + ')');
			staff.createReadybox(arr);  //生成备选list
		});	
		
		var selectedArr = staff.getEmailOnbox($('.data_box'));
		staff.createSelectbox(selectedArr);  //已经有的就显示出来
	});
	
	$(document).on('click', '#createTheMailList', function(){
		$(this).prev().click();		
		staff.createEmailList($('.dt_box'));  //点确定的时候，将已经选好的写入box
		return false;
	});
	
	
	
	
	/*******************
	 *
	 * 弹出层交互 
	 *
	*******************/	
	//弹出层
	$(document).on('click', '.io_seth', function(){		
		OP_Tools.popDom('#chooseApp', '.close');		
	});
	
	//关闭	
	$(document).on('click', '#submit_app_test', function(){
		$(this).prev().click();
		return false;
	});	
	
	$(document).on('keyup', '#apptable_inp', function(e){
		var cod = e.keyCode;
		if(cod === 13){			
			$('#submit_app_test').prev().click();
			OP_Tools.popDom('#chooseApp', '.close');
		}
		return false;
	});
	
	
	/*******************
	 *
	 * 元素固定在页面上
	 *
	*******************/	
	$(".pos_fix").smartFloat(); 
	
	
	
	/*******************
	 *
	 * 截取文字长度 
	 *
	*******************/	
	var txtb = $('.txt_box'),	
		_arr = txtb.find('span').text().split(';');
		_arr.pop();
	var slic = new OP_Tools.sliceTheText(txtb, _arr);
	slic.cutText(10);
	

	
});