<template>
<div class="mg-box">
	<div class="wlyl">
			<div class="wlyl_top">
				<div class="wlyl_ssk">
					<div class="wlyl_s">
						<input type="text"
							name="cityName" placeholder="请输入城市名称如：上海" class="wlyl_search" />
					</div>
					
					
				</div>
<!--				<span>请在就诊前致电400-818-1200电话预约齿科服务</span>-->

			</div>
			<div style="width: 90%;height:150px;margin:10 20 0 20" class="remen">
				<h4><a href="" id="ccity"></a><em>GPS定位</em></h4>
				<span>热门国内城市：</span>
				<ul>
					<li>
						<a href=""><button>上海</button></a> 
					</li>
					<li>
						<a href=""><button>北京</button></a> 
					</li>
					<li>
						<a href=""><button>南京</button></a>  
					</li>
					<li>
						<a href="javascript:;"><button>天津</button></a> 
					</li>
					<li>
						<a href="javascript:;"><button>成都</button></a> 
					</li>
					<li>
						<a href="javascript:;"><button>深圳</button></a> 
					</li>
					<li>
						<a href="javascript:;"><button>广州</button></a> 
					</li>
					<li>
						<a href="javascript:;"><button>西安</button></a> 
					</li>
				</ul>
			</div>
			<input type="text" value="A" disabled="disabled" style="margin-left: 25	;border-left:0px;border-top:0px;border-right:0px;border-bottom:1px;" id="zz">
			<div class="wlyl_center1" style="border:0px solid red;">
			
				<div class="wlyl_right">
					<ul>
						   <li>
								<h3 class="wlyl_right_h3">
									<a href="#">小时</a>
								</h3>
								
							</li>
					</ul>
				</div>
			</div>
			<div class="wlyl_center">
				<div class="wlyl_left" style="overflow:auto;">
					<ul>
						<li class="wlyl_li_height">
							<a name="citynameszm" id="a"><p>A</p></a>
						</li>
						<li>
							<a name="citynameszm" id="b"><p>B</p></a>
						</li>
						<li>
							<a name="citynameszm" id="c"><p>C</p></a>
						</li>
						<li>
							<a name="citynameszm" id="d"><p>D</p></a>
						</li>
						<li>
							<a name="citynameszm" id="e"><p>E</p></a>
						</li>
						<li>
							<a name="citynameszm" id="f"><p>F</p></a>
						</li>
						<li>
							<a name="citynameszm" id="g"><p>G</p></a>
						</li>
						<li>
							<a name="citynameszm" id="h"><p>H</p></a>
						</li>
						<li>
							<a name="citynameszm" id="i"><p>I</p></a>
						</li>
						<li>
							<a name="citynameszm" id="j"><p>J</p></a>
						</li>
						<li>
							<a name="citynameszm" id="k"><p>K</p></a>
						</li>
						<li>
							<a name="citynameszm" id="l"><p>L</p></a>
						</li>
						<li>
							<a name="citynameszm" id="m"><p>M</p></a>
						</li>
						<li>
							<a name="citynameszm" id="n"><p>N</p></a>
						</li>
						<li>
							<a name="citynameszm" id="o"><p>O</p></a>
						</li>
						<li>
							<a name="citynameszm" id="p"><p>P</p></a>
						</li>
						<li>
							<a name="citynameszm" id="q"><p>Q</p></a>
						</li>
						<li>
							<a name="citynameszm" id="r"><p>R</p></a>
						</li>
						<li>
							<a name="citynameszm" id="s"><p>S</p></a>
						</li>
						<li>
							<a name="citynameszm" id="t"><p>T</p></a>
						</li>
						<li>
							<a name="citynameszm" id="u"><p>U</p></a>
						</li>
						<li>
							<a name="citynameszm" id="v"><p>V</p></a>
						</li>
						<li>
							<a name="citynameszm" id="w"><p>W</p></a>
						</li>
						<li>
							<a name="citynameszm" id="x"><p>X</p></a>
						</li>
						<li>
							<a name="citynameszm" id="y"><p>Y</p></a>
						</li>
						<li>
							<a name="citynameszm" id="z"><p>Z</p></a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div id="bangd_agent_dialog" class="yz_fail" style="display: none">
			<div class="yz_fail_nr">
				<div class="yz_close"></div>
				<div class="yz_failcont"></div>
				<div class="yz_failfont" style="color: black;" name="msg"></div>
			</div>
		</div>
</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	data(){
		return{
		}
	},
	methods: {
	},
	mounted() {
		document.title = '城市选择'
	},
	components: {
	 },
}
</script>

<style lang="scss" scoped>
@import url('./../../../static/css/index.css');
.mg-box{
    min-height: 100vh;
    background-color: #f2f2f2;
}
wlyl{width:100%;background:#fff;}
/*.wlyl_top{width:100%; background:url(../images/ck_bg.jpg) repeat-x;padding-top:15px;padding-bottom:15px;}*/
.wlyl_ssk{width:90%; margin-left:auto; margin-right:auto; height:30px; background:#fff;
box-shadow: 0px 0px 8px #888888;
border-radius:10px;
-moz-border-radius:10px; /* Old Firefox */}
.wlyl_s{width:80%; float:left;}
.wlyl_b{width:20%; float:right;}
.wlyl_search{border:none;font-size:1em;color:#999; text-indent:10px;line-height:30px;height:30px;width:100%;font-family:"微软雅黑";
border-radius:10px;
-moz-border-radius:10px; /* Old Firefox */}
/*.wlyl_buttom{border:none;background:url(../images/ck_ss.png) no-repeat center center; width:100%;height:30px;}*/
.wlyl_center{width:40px;float:right;}/**overflow-y:scroll;*/
.wlyl_center1{overflow-y:scroll;float:left;}
.wlyl_left{width:40px;position:relative;top:0px; float:left; height:115%;}
.wlyl_left ul{background:#e5e3e3;height:220%;}
.wlyl_left ul li{ width:100%; text-align:center;line-height:35px;font-size:1.2em;}
.wlyl_left ul li a p{font-size:0.8em;}
.wlyl_01_l{width:100%;height:100%;}
.wlyl_01_l ul{background:#e5e3e3;}
.wlyl_01_l ul li{ width:100%; text-align:center;line-height:30px;font-size:1.2em;}


</style>