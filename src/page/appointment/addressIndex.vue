<template>
	<div class="me-box">
		<navTab :navlists="navlist" @myindex="getIndex"></navTab>
        <div class="sxy_list_main" id="tab_con" v-if="index == 0 ">
            <div  class="sxy_list  fdiv" style="margin-bottom:0.2rem;">
                <nav class="sxy_yyxx_dom1" style="display: none;">
                    <span>您所选的城市为：</span>
                        <span class="chooseCity">南京市
                        </span>
                </nav>
                <nav class="sxy_list1">
                    
                    <div @click="pushCity" style="
                        display:  flex;
                        align-items:  center;
                    "><span class="chooseCity" style="
                        padding-right:  0.3rem;
                         font-size: 0.26rem;
                    ">{{currCity}}</span @click="pushCity" ><img src="@/assets/appointment/2_09.png"style="
                        width:  0.36rem;
                    "></div>
                    <div ><img src="@/assets/appointment/icon_13.png" style="
                        width: 0.32rem;
                        padding-left: 0.38rem;
                        padding-right: 0.15rem;
                    "></div>
                    <i id="currAddr" style="
                        width:  2.21rem;
                        margin-right: 0.52rem;
                    ">{{currAddr.substring(0,8)+"..."}}</i>
                    
                    <button id="nearest" style="
                        width:  1.68rem;
                        height:  0.6rem;
                        border-radius: 0.1rem;
                        background:  #30b53e;
                        color: #fff;
                        font-size: 0.24rem;
                    " v-show="lwzj">离我最近</button>
                </nav>
                <nav class="navlist1" style="margin-bottom:0.2rem;" v-for="(item, index) in listres" :key='index'>
                    <div class="top">
                        <div class="top-box"></div>
                        <div class="top-detail">
                            <div class="left-detail">
                                <div class="left-img">
                                </div>
                                <div class="left-font">
                                {{item.sitename}}
                                </div>
                            </div>
                            <div class="left-detail">
                            <div class="right-detail" @click="controlUP(index)"><img :class="{upstyle: item.select}" src="@/assets/appointment/2_09.png"></div>
                            </div>
                        </div>
                    </div>
                    <div v-show="!item.select">
                       
                        <div class="detail">
                            <div class="left-detail">
                            </div>
                            <div class="right-detail">
                            {{item.businesshours}}
                            </div>
                        </div>
                        <div class="detail">
                            <div class="left-detail">
                            </div>
                            <div class="right-detail">
                            {{item.tel}}
                            </div>
                        </div>
                        <div class="detail">
                            <div class="left-detail">
                            </div>
                            <div class="right-detail">
                            {{item.address}}
                            </div>
                        </div>
                        {{item.orderservice}}++
                        <div class="detail" v-show="item.isCurrCity == 'Y'">
                            <div class="left-detail">
                            </div>
                            <div class="right-detail">
                            {{item.distance}}KM
                            </div>
                            <button  style="
                            width:  2rem;
                            height:  0.6rem;
                            border-radius: 0.1rem;
                            background:  #30b53e;
                            color: #fff;
                            font-size: 0.22rem;
                            margin-bottom: 0.1rem;
                        " @click="pushPage(item.siteid)" v-show="item.orderservice == 1">申请预约</button>
                        </div>
                        <div class="detail">
                            <div class="left-detail">
                            </div>
                            <div class="right-detail">
                            </div>
                        </div>
                    </div>
                </nav>
                <br>	
            </div>
        </div>
    
    <div class="sxy_list" style="margin-bottom:0.2rem;"  v-if="index == 1">
			<nav class="sxy_list1">
				<p>预约待临柜信息</p>
			</nav>
			<nav class="navlist2" style="margin-bottom:0.2rem;">
			</nav>
			<br>
		</div>
    </div>
</template>

<script>
//import {MP} from '@/js/map.js'
import headerT from '@/components/header.vue'
import { mapActions } from "vuex";
import { Toast } from "vant";
import navTab from '@/components/appointment/navTab.vue'
    export default {
        data() {
            return {
                listres: [],
                lwzj: false,
                currCity: '',
                currAddr: '',
                isup: false,
                index: 0,
                navlist: [{
                    name: '我要预约'
                },{
                    name: '预约查询'
                }]
            }
        },
        components:{
            headerT,
            navTab
        },
        mounted(){
            let currCity = sessionStorage.getItem('currCity')
            let currAddr = sessionStorage.getItem('currAddr')
            if(currCity && currAddr){
                this.currCity = currCity
                this.currAddr = currAddr
                this.getList()
            } else {
                let editdata   =  { 
                    "lat":"31.240668925165",
                    "lng":"121.67777632504"
                    }
                this.getaddress({
                    editdata,
                    successCallback: res => {
                        console.log(res);
                        this.currCity = res.data.data.currCity
                        this.currAddr = res.data.data.currAddr
                        sessionStorage.setItem('currCity',this.currCity)
                        sessionStorage.setItem('currAddr',this.currAddr)
                        this.getList()
                        
                    },
                    failCallback: res => {
                        Toast({
                            message: res.data.msg
                        })
                    }
                });
            }
          return
          let _this = this
          this.$nextTick(() => {
                MP().then(BMap => {
                    var latitude = "";
                    var longitude = "";
                    var geoc = new BMap.Geocoder();
                    var geolocation = new BMap.Geolocation();
                    console.log('address1',  this.getaddress)
                    geolocation.getCurrentPosition(function(r){
                        if(this.getStatus() == BMAP_STATUS_SUCCESS){
                            latitude = r.point.lat;
                            longitude = r.point.lng;
                            console.log('latitude', latitude)
                            console.log('longitude', longitude)
                            let editdata   =  { 
                                "lat":"31.240668925165",
                                "lng":"121.67777632504"
                                }
                            _this.getaddress({
                                editdata,
                              successCallback: res => {
                                console.log(res);
                                
                              },
                              failCallback: res => {
                                Toast({
                                    message: res.data.msg
                                })
                              }
                            });
                        }
                        else {
                            alert('无法定位到您的当前位置！' + this.getStatus());
                        }        
                    },{enableHighAccuracy: true})

                })
            })
        },
       methods:{
            controlUP(index){
                console.log('this.listres', this.listres)
                let data = this.listres[index]
                data.select = !this.listres[index].select
                this.$set(this.listres, index, data)
            },
            getList(){
                console.log('this.list', this.list)
                let editdata = { 
                    "city": this.currCity
                }
                this.list({
                    editdata,
                    successCallback: res => {
                        console.log('listres', res)
                        this.lwzj = res.data.lwzj
                        //this.listres = res.data.resultData
                        this.listres = res.data.data
                        this.listres.forEach((item) => {
                            item.select = false
                        })
                        console.log('this.listres', this.listres)
                    
                    },
                    failCallback: res => {
                    console.log('err', res)
                    }
                });
            },
            ...mapActions({
              list: "list",
              getaddress: "getaddress"
            }),
            pushCity(){
               console.log('city')
                this.$router.push({path: '/city'})
            },
            pushPage(siteId){
                console.log('siteId', siteId)
                this.$router.push({path: '/appointmentForm', query:{'siteId': siteId}})
            },
            getIndex(i){
                this.index = i
                console.log('i', i)
            },
	addressBtn(){
                this.$router.push({path: '/addressIndex'})
            }
        }
    }
</script>

<style lang="scss" scoped>

#currAddr{
    font-size: 0.2rem;
}
.me-box {
  background-color: #dcdcdc;
  min-height:100vh;
}
.sxy_list1{
    height: 1rem;
    background: #fff;
    padding: 0 0.17rem;
    /* justify-items: center; */
    display: flex;
    align-items: center;
    padding-right: 0.51rem;
}
 
.navlist1{
    margin: 0.4rem 0.2rem 0 0.4rem;
    background: #fff;
    .top{
        height: 0.81rem;
    } 
    .top-box{
        height: 0.21rem;
        background-image:url(../../assets/appointment/circle_x.png)

    }
}
.top-detail{
        display: flex;
        width: 100%;
        justify-content: space-between;
        .left-detail{
            display: flex;
            align-items: center;
        }
        .left-font{
            font-size: 0.27rem;
            color: #24b23a;
            padding-left: 0.28rem;
        }
        .left-img{
            width:0.47rem;
            height: 0.61rem;
            background-image:url(../../assets/appointment/111_01.png);
            background-size: contain;
             background-position: center;
        }
        .right-detail{
            padding-right: 0.2rem;
            img{
                width: 0.35rem;
            }
        }
    }
    .detail{
        display: flex;
        align-items: center;
        .right-detail{
            font-size: 0.2rem;
            color: #676767;
            width: 90%;
            padding-left: 0.2rem;
            box-sizing: border-box;
        }
    }
    .detail:nth-child(1){
        .left-detail{
            width: 0.56rem;
            height: 0.52rem;
            background-size: 60%;
            background-position: center;
            background-image:url(../../assets/appointment/icon_03.png);
            background-repeat: no-repeat
        }
    }
    .detail:nth-child(2){
        .left-detail{
            width:0.54rem;
            height: 0.54rem;
            background-image:url(../../assets/appointment/icon_06.png);
               background-size: 60%;
            background-position: center;
            background-repeat: no-repeat
        }
    }
    .detail:nth-child(3){
        .left-detail{
            width:0.56rem;
            height: 0.53rem;
            background-image:url(../../assets/appointment/icon_08.png);
              background-size: 60%;
            background-position: center;
            background-repeat: no-repeat
        }
    }
    .detail:nth-child(4){
        .left-detail{
            width:0.56rem;
            height: 0.61rem;
            background-image:url(../../assets/appointment/icon_10.png);
               background-size: 60%;
            background-position: center;
            background-repeat: no-repeat
        }
    }

</style>