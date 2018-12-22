
//判断浏览器的类型及版本
var browser={
    versions:function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {         
                //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
            };
         }(),
         language:(navigator.browserLanguage || navigator.language).toLowerCase()
}


//保单回访
var returnVisit = function () {
var lastAnswerId="";
var lastAnswerText="";
var time_flag = 59;
var tm="";
	//默认隐藏微信工具栏
	hideWXTabbar();
	
    var isFirstQuestion="102";//101：第一题；102:非第一题
    var isLastQuestion="2";//1:最后一题；2：非最后一题
	function init(type) {
		switch (type) {
		  case "PL":
		    showPolicyList();
			break;
		  case "PI":
		    showPolicyInfo();
			break;
	      case "PQ":
		    showQuestion("0");
			break;
		}
		bindEvent(type);
	}
	
	//绑定事件
	function bindEvent(type){
	    switch (type) {
		  case "PL":
		      $(".bdhf_rbtn").each(function(){
		          $(this).bind("click",function(){
		          
		         
		         // $("input[name='idengCode']").style.color='#878787';
		          $("#pcode").val($(this).parent().find("input[name='policyCode']").val());
		          $("#need_elec_invoice").val($(this).parent().find("input[name='need_elec_invoice']").val());
		          $("#elec_invoice_no").val($(this).parent().find("input[name='elec_invoice_no']").val());
		          $("#issue_way").val($(this).parent().find("input[name='issue_way']").val());
		          $("#elec_invoice_code").val($(this).parent().find("input[name='elec_invoice_code']").val());
		          $("#apply_code").val($(this).parent().find("input[name='apply_code']").val());
		          $("#apply_date").val($(this).parent().find("input[name='apply_date']").val());
		          $("#insured_1").val($(this).parent().find("input[name='insured_1']").val());
		          $("#validate_date").val($(this).parent().find("input[name='validate_date']").val());
		          $("#applicant_id").val($(this).parent().find("input[name='applicant_id']").val());
		          $("#celler").val($(this).parent().find("input[name='celler']").val());
		          $("#address").val($(this).parent().find("input[name='address']").val());
		          $("#zip").val($(this).parent().find("input[name='zip']").val());
		          $("#tel").val($(this).parent().find("input[name='tel']").val());
		          //短信验证
		        //  init1();
		          if(($(this).parent().find("input[name='celler']").val())!=null&&""!=($(this).parent().find("input[name='celler']").val())){
			          	$("#p").text($(this).parent().find("input[name='celler']").val().substring(0,3)+"xxxx"+$(this).parent().find("input[name='celler']").val().substring(7,11) );
			         	init1();
			          }else if(($("#tel1").val())!=null&&""!=($("#tel1").val())){
			          	$("#p").text($("#tel1").val().substring(0,3)+"xxxx"+$("#tel1").val().substring(7,11));
			          	init1();
			          }else{
			          		 $("div#dialog").find("div[name='msg']").text("尊敬的用户，您尚未设置手机号，暂时无法进行回访。");
			    			$("#dialog").show();
			          }
		          window.clearTimeout(tm);
		          time_flag = 59;
		          
       			tm = window.setTimeout(timer,1000);
		             // window.location.href = "toRvPolicyInfo.html?policyCode="+$(this).parent().find("input[name='policyCode']").val();
		          })
		      });
			break;
		  case "PI":
		      $(".bdhf_rbtn").bind("click",function(){
		    	  $(".bdhf_rbtn").unbind();
		    	  $(".bdhf_rbtn").css("background-color","grey");
		          checkPolicy();
		      }) 
		      $("#imgurl").bind("click",function(){
				  //alert("a");
				  checkPolicy();
			  })
			break;
	      case "PQ":
	        /*
		      $("div#imgone").find(".radio").each(function(i){
		          if(i==0){
		             $(this).bind("click",function(){
		                $("img[name='xiao1']").show();
		                $("img[name='ku1']").hide();
		             })
		          }else{
		              $(this).bind("click",function(){
		                $("img[name='xiao1']").hide();
		                $("img[name='ku1']").show();
		             })
		          }
		      })
		      
		     */
	          //下一题
		      $("input[name='next']").bind("click",function(){
		      	   $("audio#myMusic").remove();
		          //1：是，2:否
			      if(isLastQuestion=="1"){
			    	 // alert(1)
				      //获得用户选择的答案(用户最后选择的答案)
				      lastAnswerId = $("input[name='radio']:checked").val();
				      lastAnswerText= $("input[name='radio']:checked").attr("content");
				      //答题完毕,跳转提交问卷签名页面
				      ///lastAnswerId=answerId;
				      //alert(lastAnswerId);
		              //window.location.href="toSubmit.html?answerId="+lastAnswerId;
		              //调用微信拍照
				      try{
				    	  var result = $TOOLS.ajaxComm("toLastAnswerId.html?n="+Math.random(),{lastAnswerId:lastAnswerId,lastAnswerText:lastAnswerText},"POST", "JSON");
			              switch (result.responseCode) {
						  case "10":
						  	window.location.href="toPhoto.html";
							break;
						  default:
						  	 $("div#dialog").find("div[name='msg']").text(result.msg);
			    			$("div#dialog").show();
							break;
						}
		              }catch(e){
		            	  alert("系统异常，请重新请求！");
		            	  return;
		              }
		          }else{
		              showQuestion("2");
		          }
		      })
		      //上一题
		      $("input[name='prev']").bind("click",function(){
		      	   $("audio#myMusic").remove();
		      	   //g_audio.push({song_id:"",song_fileUrl:""});
		      	  // 用户如果点击了上一题，那么肯定不会是最后一题
		      	  
		      	  isLastQuestion="2";
		          //1：是，2:否
			      if(isFirstQuestion=="101"){
			          showMessage("该题已为第一题！");
			      }else{
		              showQuestion("1");
		              
		          }
		      })
		      //查看保单信息
		      $("input[name='toPolicyInfo']").bind("click",function(){
		       //   window.location.href="toRvPolicyInfo.html?continueRV=1";
		          window.location.href="toHuifang.html?continueRV=1";
		      })
		      //提示是否终止保单回访
		      $("input[name='end']").bind("click",function(){
		          $("#dialog_endRV").show();
		      })
		      //终止保单回访
		      $("input[name='doEnd']").bind("click",function(){
		          endAnswer();
		      })
		      
				//取消按键关闭事件
				$("input[name='doEnd_cancel']").bind("click", function () {
					$("div#dialog").hide();
					$("div#dialog_endRV").hide();
				});
			break;
			case "PS":
			   //刚进入页面时获得签名图片数据（删除字符串前的提示信息 "data:image/png;base64,"）
				var imgBase64Str_1 =  canvas.toDataURL("image/jpg").substring(22);
			  //完成签名
		      $("input[name='finish']").bind("click",function(){
		      		  //签名提交时获得签名图片数据（删除字符串前的提示信息 "data:image/png;base64,"）
					var imgBase64Str =  canvas.toDataURL("image/jpg").substring(22);
		     if(imgBase64Str_1!=imgBase64Str){
		         submitQuestion();
			 }else{
			      showMessage("对不起，您还没有完成签名。");
			 }
		        //  submitQuestion();
		      })
			break;
			case "MN":
			  //完成签名
		      $("input[name='finish']").bind("click",function(){
		           //window.location.href="toshengming.html";
		           //alert(lastAnswerId)
		         //  window.location.href="toSubmit.html?answerId="+lastAnswerId;
		            var result = $TOOLS.ajaxComm("toSubmit.html",null,"POST", "JSON");
				  switch (result.responseCode) {
					  case "0":
					  	window.location.href="qianming.html";
						break;
					  default:
					  	 $("div#dialog").find("div[name='msg']").text(result.msg);
		    			$("div#dialog").show();
						break;
					}
		      })
			break;
			case "PSS":
			  //完成签名
		      $("#reget_btn").bind("click",function(){
		          window.location.href="toRvPolicyList.html";
		      })
		      
		      $("#call95589").bind("click",function(){
		          window.location.href="tel:95589";
		      	})
				
				$("#callback_btn").bind("click",function(){
				 var sub = document.getElementsByTagName("input")['callback_btn'];
				 		//sub.className ="hui_btns";
						sub.disabled = true;
						sub.value='请稍等...';  
				  var result = $TOOLS.ajaxComm("rv/callBack.html",null,"POST", "JSON");
				  switch (result.responseCode) {
					  case "0":
					  	alert("改回");
						$("div#callback_dialog").find("div[name='msg']").html('申请回电成功<br/>请点击左上角返回按键返回微信界面');
						$("div#callback_dialog").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="fsyzm";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  case "1":
					  	//alert("改回");
						$("div#callback_dialog").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="fsyzm";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  case "9":
					  	//alert("改回");
						$("div#callback_dialog").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="fsyzm";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  default:
					 	//alert("改回");
					  	$("div#callback_dialog").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="fsyzm";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					}
					
		      })
			break;
		      
		       //跳转到回电申请页面
		      $("#choosecallback_btn").bind("click",function(){
		          window.location.href="toChooseCallBack.html";
		      })
			break;
			case "CB":
			  //确认回电
			  /*
		      $("input[name='checkCallBack_btn']").bind("click",function(){
		          checkCallBack();
		      })
		      $("div.yz_close").bind("click", function () {
					$("div#callback_dialog").hide();
					$("div#callback_dialog_success").hide();
				});
				*/
				
				$("#call95589").bind("click",function(){
		          window.location.href="tel:95589";
		      	})
				
				$("#callback_btn").bind("click",function(){
				 var sub = document.getElementsByTagName("input")['callback_btn'];
				 		sub.className ="hui_btns";
						sub.disabled = true;
						sub.value='请稍等...';  
				  var result = $TOOLS.ajaxComm("rv/callBack.html",null,"POST", "JSON");
				  switch (result.responseCode) {
					  case "0":
					  	//alert("改回");
						$("div#callback_dialog_success").find("div[name='msg']").html('申请回电成功<br/>请点击左上角返回按键返回微信界面');
						$("div#callback_dialog_success").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="reget_btn btn_font";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  case "1":
					  	//alert("改回");
						$("div#callback_dialog_success").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog_success").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="reget_btn btn_font";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  case "9":
					  	//alert("改回");
						$("div#callback_dialog_success").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog_success").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="reget_btn btn_font";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					  default:
					 	//alert("改回");
					  	$("div#callback_dialog_success").find("div[name='msg']").html(result.msg);
						$("div#callback_dialog_success").show();
						var sub = document.getElementById("callback_btn");
						sub.className ="reget_btn btn_font";
						sub.disabled = false;
						sub.value='申请回电';
						break;
					}
					
		      })
			break;
		}
	//语音播放
	$("input[name='yybf_btn']").bind("click",function(){
	                 $("audio#myMusic").remove();
	                 var result = $TOOLS.ajaxComm("vc/voicepath.html",null,"POST", "JSON");
					 var src=result.msg;
					// alert(src);
				     var embed =$("<audio id=\"myMusic\"><source src=\""+src+"\"></audio>");
			         $("body").append(embed);
				     $("#yybf_btn1").attr({"disabled":"disabled"});
				     $("#yybf_btn1").removeClass("lbgreen_btn");
				     $("#yybf_btn1").addClass("lbhui_btn");
				     //开始播放语音
				    document.getElementById("myMusic").play();
				    //alert();
				    //监听语音播完后提示用户可以继续重播
				  	document.getElementById("myMusic").addEventListener('ended', function () {
				  	     $("#yybf_btn1").removeAttr("disabled");
				  	     $("#yybf_btn1").removeClass("lbhui_btn");
					     $("#yybf_btn1").addClass("lbgreen_btn");
				  	});
				
	});	
		//弹出框关闭事件
		$("div.yz_close").bind("click", function () {
			$("div#dialog").hide();
			$("div#dialog_endRV").hide();
		});
	}

	
	//短信验证初始化
	
		function init1(){
		    //发送手机验证短信
		    sendSms();
		    //短信验证
		    $("input[name='sure']").bind("click",function(){
		       validatePhonecode();
		    })
		    //弹出框关闭事件 
		    $("div.yz_close").bind("click", function () {
			   $("div#dialog").hide();
		    });
		    $("#close").bind("click", function () {
		    window.clearTimeout(tm);
			   document.getElementById('dialogX').style.display='none';
			   //window.location.reload();
		    });
		}
		//短信验证
		function validatePhonecode(){
		   //数据验证
		    var valConfig ="[{\"name\":\"idengCode\",\"label\":\"短信验证码\",\"tip\":\"请输入短信验证码\",\"required\":true}]";
	        var validateResult= $TOOLS.validate(valConfig);
	        if(""!=validateResult){
	            showMessage(validateResult);
				return false;
	        }
	        //验证手机短信
	        //alert($TOOLS.trimLR($("input[name='idengCode']").val()));
	        //alert($("#celler").val());
	        var result = $TOOLS.ajaxComm("validatePhonecodeDzhf.html", {idengCode:$TOOLS.trimLR($("input[name='idengCode']").val()),phone:$("#celler").val()}, "POST", "JSON");
			switch (result.responseCode) {
			  case "0":
				   //window.location.reload();
				   // window.location.href = "toRvPolicyInfo.html?policyCode="+$("#pcode").val()+"&need_elec_invoice="+$("#need_elec_invoice").val()+"&elec_invoice_no="+$("#elec_invoice_no").val()+"&issue_way="+$("#issue_way").val()+"&elec_invoice_code="+$("#elec_invoice_code").val();
					 var result1 = $TOOLS.ajaxComm("toRvPolicyInfo.html", {policyCode:$TOOLS.trimLR($("#pcode").val()),
					 need_elec_invoice:$("#need_elec_invoice").val(),elec_invoice_no:$("#elec_invoice_no").val(),
					 issue_way:$("#issue_way").val(),elec_invoice_code:$("#elec_invoice_code").val(),apply_code:$("#apply_code").val()
					 ,celler:$("#celler").val(),apply_date:$("#apply_date").val(),insured_1:$("#insured_1").val(),validate_date:$("#validate_date").val(),applicant_id:$("#applicant_id").val(),address:$("#address").val(),zip:$("#zip").val(),tel:$("#tel").val()}, "POST", "JSON");
					if(result1.responseCode=="0"){
						window.location.href="jsp/is_receive_policy.jsp";
					}else{
			       		showMessage(result.msg);
					}	
				break;
			  default:
			       showMessage(result.msg);
				break;
			} 
		}
		//发送手机验证短信
		function sendSms(){
			var pc = $TOOLS.getQueryParameter('policyCode');
			//alert($("#celler").val());
		    var result = $TOOLS.ajaxComm("sendPhonecodeDzhf.html", {idengCode:$TOOLS.trimLR($("input[name='idengCode']").val()),policyCode:pc,phone:$("#celler").val()}, "POST", "JSON");
			switch (result.responseCode) {
			  case "0":
				   //300秒倒计时
				   //60秒内 限制重发操作
				   //window.setTimeout("timer()",1000);
				    $("#dialogX").css("display", "block");
		          $("#resend_btn").val("重新获取验证码(59)");
		          $("input[name='idengCode']").val("请输入短信验证码");
				break;
			  default:
			   $("#dialogX").css("display", "block");
		          $("#resend_btn").val("重新获取验证码(59)");
		          $("input[name='idengCode']").val("请输入短信验证码");
			       showMessage(result.msg);
				break;
			}
		}
		//展示消息
		function showMessage(msg){
		    $("div#dialog").find("div[name='msg']").text(msg);
		    $("div#dialog").show();
		}
		
		function timer() {
		  	resend_btn = $("#resend_btn");
		  	time_flag=time_flag-1;
		  	if(time_flag > 0) {
		  		resend_btn.val("重新获取验证码("+time_flag+")");
		  		tm =window.setTimeout(timer,1000);
		  	} else {
		  		resend_btn.val("重新获取验证码");
		  		window.clearTimeout(tm);
		  		resend_btn.removeAttr("disabled").css("background","#00ac0c url(images/btn_green.png) repeat-x").click(function() {
		  			time_flag = 59;
		  			$(this).attr({"disabled":"disabled"}).unbind().css("background","#00ac0c url(images/btn_gray.png) repeat-x");
		  			//$("#resend_btn").val("重新获取验证码(59)");
		  			$("#dialogX").css("display", "block");
		          $("#resend_btn").val("重新获取验证码(59)");
       				tm = window.setTimeout(timer,1000);
		  			sendSms();
		  		});
		  		return false;
		  	}
		}
		
		
  

	//确认回电
	function checkCallBack(){
		   //数据验证
	    var valConfig ="[{\"name\":\"phone\",\"label\":\"申请号码\",\"required\":true,\"format\":\"mobilephone\"}]";
        var validateResult= $TOOLS.validate(valConfig);
        if(""!=validateResult){
            $("div#callback_dialog").find("div[name='msg']").text(validateResult);
			$("div#callback_dialog").show();
			return false;
        }
		var result = $TOOLS.ajaxComm("rv/callBack.html", {param:JSON.stringify({commName:$TOOLS.trimLR($("input[name='phone']").val())})}, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
			$("div#callback_dialog_success").find("div[name='msg']").html('申请回电成功<br/>请点击左上角返回按键返回微信界面');
			$("div#callback_dialog_success").show();
			//window.location.reload();
			break;
		  case "9":
			$("div#callback_dialog_success").find("div[name='msg']").html('申请失败');
			$("div#callback_dialog_success").show();
			//window.location.reload();
			break;
		}
	}
	
	//展示回访保单列表
	function showPolicyList() {
	     //获得浏览器版本
	     var version = "weixinweb";
	     if(browser.versions.android){
	        version = "weixinandroid";
	     }else if(browser.versions.iPhone){
	        version = "weixinapple";
	     }else if(browser.versions.iPad){
	     	version = "weixiniPad";
	     }
	    //获得回访保单列表
		var result = $TOOLS.ajaxAsyncComm("rv/getReturnVisitPolicyList.html", {version:version}, "POST", "JSON",finishMethod);
		function finishMethod(result) {
			switch (result.responseCode) {
			  case "0":
			      $("div.content").empty();
				  $("div.content").append(result.result);
				  bindEvent("PL");
				break;
			  default:
			    showMessage(result.msg);
				break;
			}
		}
	}
	//展示保单详细信息
	function showPolicyInfo(){
	    //获得回访保单详细信息
		var result = $TOOLS.ajaxComm("rv/getPolicyInfo.html", null, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
			$("div.content03").empty();
			$("div.content03").append(result.result);
			break;
		  case "1":
			showMessage(result.msg);
			$(".yz_close").bind("click",function(){
		    	window.history.go(-1);
		    })
		  	break;
		  default:
		    showMessage(result.msg);
			break;
		}
	}
	//验证保单是否可以回访
	function checkPolicy(){
	    //判断该保单是否可以回访
	    var result = $TOOLS.ajaxComm("rv/checkPolicy.html", null, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
			  //1:成功，2：失败
			  if(result.result=="1"){
			      window.location.href = "toRvQuestion.html";
			  }else{
			      showMessage(result.msg);
			  }
			break;
		  case "noVIP":
			 //1:成功，2：失败
			  if(result.result=="1"){
			      window.location.href = "toAuthenticAtion.html";
			  }else{
			      showMessage(result.msg);
			  }
		  	break;
		  default:
		    showMessage(result.msg);
			break;
		}
	}
	//进度条
	function initBAR(type,isLastQuestion){
		if(type=="1"||type=="0"){
				 var c = $(".ct_shurutt").text().replace(/\s+/g,"").substr(3,1);
				 var x = c/12*100;
				$(".question_vist").width(Math.ceil(x,2)+"%");
			  	 //$(".question_vist_tip").text(Math.ceil(x,2)+"");
			 }
		 if(type=="2"){
			 var a = $("#dateQuestionCount").val();
		  	 var b = $("#isLastSubject").val();
		  	 var p = a/12*100;
		  	 if(b==2&&a<12){
		  	 	 $(".question_vist").width(Math.ceil(p,2)+"%");
		  		 //$(".question_vist_tip").text(Math.ceil(p,2)+"");
		  	 }else if(b==2&&a>=12){
		  	 	 $(".question_vist").width("99%");
		  		 //$(".question_vist_tip").text("99%");
		  	 }else{
		  	 	 $(".question_vist").width("100%");
		  		 //$(".question_vist_tip").text("100");
		  	 }
	  	 }
	  	 if(isLastQuestion=="1"){
				 $(".question_vist").width("100%");
		  		//$(".question_vist_tip").text("100");
		}
	}
	
	//展示题目
	function showQuestion(type){
	    //获得用户选择的答案
	    var answerId = $("input[name='radio']:checked").val();
	    //获取题目答案文字信息
	    var answerText = $("input[name='radio']:checked").attr("content");
	 // alert(answerId)
		//alert(answerText)
	    //获得保单回访题目
	    var result = $TOOLS.ajaxComm("rv/getQuestion.html", {type:type,answerId:answerId,answerText:answerText}, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
		  
			 $("div.content").empty();
			 //alert(result.result);
			 $("div.content").append(result.result);
			 if(type!="0"){
			    Custom.init();
			    bindEvent("PQ");
			 } else {
			 	isLastQuestion = result.operationCode;
			 }
			 if(type=="1"){
			    isFirstQuestion = result.operationCode;
			 }else if(type=="2"){
			 	isLastQuestion = result.operationCode;
			 }
			 //alert(type+" "+isLastQuestion+" "+result.operationCode);
			 // 如果是最后一题，“下一题”按键变成“签名”
			 if(isLastQuestion=='1') {
			 	$("input[name='next']").val("提交");
			 } else {
			 	$("input[name='next']").val("下一题");
			 }
			 initBAR(type,isLastQuestion);	 
		     goTopEx();
			break;
		  default:
		     showMessage(result.msg);
			break;
		}
		
	    
	}
	
	
	//提交答卷
	function submitQuestion(){
	    //获得签名图片数据（删除字符串前的提示信息 "data:image/png;base64,"）
		var imgBase64Str =  canvas.toDataURL("image/jpg").substring(22);
	    //提交用户答卷
	    var result = $TOOLS.ajaxComm("rv/submitQuestion.html", {imgBase64Str:imgBase64Str}, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
		     if(result.result=="1"){
		         /*
				 $("div.canvas_cont").addClass("content");;
				 $("div.content").removeClass("canvas_cont").empty();
				 $("div.content").append($("<div class=\"yzcg\">").text(result.msg),
				 $("<div class=\"reset_div\">").append($("<input type=\"button\" class=\"reget_btn\" value=\"返回\" />").bind("click",function(){
				        
				 })));
				 */
				 window.location.href = "toSubmitSuccess.html";
			 }else{
			      showMessage(result.msg);
			 }
			break;
		  default:
		     showMessage(result.msg);
			break;
		}
	}
	//终止回访
	function endAnswer(){
	    //终止回访
	    var result = $TOOLS.ajaxComm("rv/endAnswer.html", null, "POST", "JSON");
		switch (result.responseCode) {
		  case "0":
			  //1:成功，2：失败
			  if(result.result=="1"){
			      window.location.href = "toRvPolicyList.html";
			  }else{
			      showMessage(result.msg);
			  }
			break;
		  default:
		    showMessage(result.msg);
			break;
		}
	
	}
	
	//展示消息
	function showMessage(messge){
	   $("div#dialog").find("div[name='msg']").text(messge);
	   $("div#dialog").show();
	}
	return {init:function (type) {
		init(type);
	}};
	
	// 隐藏微信tabbar
	function hideWXTabbar()
	{
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideToolbar');
			WeixinJSBridge.call('hideOptionMenu');
		});
	}
	// 滚回顶部
  	function goTopEx(){
  		window.scrollTo(0,0);
    }
    
}();
window.$RV = returnVisit;

