<template>
    <div class="claims-box">
        <div>
            <img :src="claimsImg" width="100%">
        </div>
        <ul class="tz-title-ul">
            <li v-for="(item,index) in tobarList" :key="index" :class="item.styleName" @click="selectTab(index)">
                <a href="#">{{item.minTitle}}</a>
            </li>
        </ul>
        <ul class="ask-box">
            <li class="ask-list" v-for="(item,index) in wenDaList" :key="index" v-if="index == indexNum">
                <ul class="ask-list-ul">
                    <li class="ask-list-li" v-for="(itemTwo,indexTwo) in item.listContent" :key="indexTwo">
                        <div class="ask-list-ask">
                            <div class="ask-list-ask-left">
                                <div>
                                    <img :src="askImgSrc" alt="">
                                </div>
                                <p>{{itemTwo.askContent}}</p>
                            </div>
                            <div @click="openAnswerContent(index,indexTwo)" :class="itemTwo.isShowAnswer?'selectList':''" class="ask-list-ask-right">
                                <img :src="toRightImgSrc" alt="">
                            </div>
                        </div>
                        <!-- <transition name="fade"> -->
                            <div class="ask-list-answer" v-show="itemTwo.isShowAnswer">
                                <div>
                                    <img :src="answerImgSrc" alt="">
                                </div>
                                <p v-html="itemTwo.answer"></p>
                            </div>
                        <!-- </transition> -->
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      claimsImg: require("@/assets/claimsImg/wenda_01.jpg"),
      askImgSrc: require("@/assets/claimsImg/wenda_04.png"),
      answerImgSrc: require("@/assets/claimsImg/wenda_07.png"),
      toRightImgSrc: require("@/assets/claimsImg/jfjlcx1.png"),
      tobarList: [
        {
          minTitle: "理赔申请",
          styleName: "thistab"
        },
        {
          minTitle: "理赔资料",
          styleName: ""
        },
        {
          minTitle: "名词解释",
          styleName: ""
        }
      ],
      indexNum: "0",
      wenDaList: [
        {
          listContent: [
            {
              askContent: "发生保险事故后，如何理赔？",
              isShowAnswer: false,
              answer:
                "发生保险事故后，您首先要做的是通知保险公司。您可以拨打我公司的报案电话：95589，或者与您的业务员联系，公司会帮助您进行理赔申请。"
            },
            {
              askContent: "保险事故发生后，何时向保险公司报案？",
              isShowAnswer: false,
              answer:
                "您或受益人知道保险事故后应当在10日内通知我们，可通过拨打我公司的报案电话：95589，或者与您的业务员联系报案。如果您或受益人因故意或者因重大过失未及时通知，致使保险事故的性质、原因、损失程度等难以确定的，我们对无法确定的部分，不承担给付保险金的责任。"
            },
            {
              askContent:
                "因故暂不能提出理赔申请的，保险合同条款对于理赔申请是否有时间要求？",
              isShowAnswer: false,
              answer:
                "人寿保险以外的其他保险（医疗险、意外伤残保险金、重大疾病险）的被保险人或者受益人，申请时效为二年，自其知道或者应当知道保险事故发生之日起计算。人寿保险（身故保险金）的被保险人或者受益人申请时效为五年，自其知道或者应当知道保险事故发生之日起计算。"
            },
            {
              askContent:
                "未成年人因病住院，要申请住院医疗险理赔，谁有资格代为申请？",
              isShowAnswer: false,
              answer:
                "受益人为未成年人的理赔申请应由具有其监护权的监护人（一般为被保险人的父母）代为申请。 "
            },
            {
              askContent:
                "身故受益人为未成年人，其父母离异的，谁有资格代为申请保险金？",
              isShowAnswer: false,
              answer:
                "身故受益人为未成年人的，若父母离异，由父母中有监护权的一方作为监护人代为申请保险金，申请时须提供监护关系证明。"
            },
            {
              askContent:
                "我在国外发生了保险事故，是否可以申请理赔？",
              isShowAnswer: false,
              answer:
                "被保险人在境外发生保险事故，投保人、被保险人或受益人应在保险事故发生之日起十日内通知本公司。受益人凭保险合同、受益人身份证件、（被保险人的护照及入境证明）、事故发生地公共医疗机构或交通警察部门或其他市政府部门出具的相关证明（保险事故证明、重大疾病鉴定证明、伤残鉴定证明或死亡证明）等理赔材料前来申请理赔，以上证明均须由被保人事故发生地的中国使领馆确认。 如被保险人系死亡，死亡证明须事故地中国使领馆确认并提供验葬证明，如骨灰或遗体遣返国内，须一并提供骨灰或遗体运送证明。"
            },
            {
              askContent:
                "投保后因病在异地发生住院的，如何申请理赔？",
              isShowAnswer: false,
              answer:
                "根据就近、方便客户的原则，受益人可自主选择理赔申请地，投保地或就医地凡有我公司业务网点的地区均可以受理客户申请。"
            },
            {
              askContent:
                "宽限期内发生保险事故，应如何理赔？",
              isShowAnswer: false,
              answer:
                "宽限期只是为客户缴费提供一个宽限的时间，但从保险期间来讲已经属于下一年度的保险责任，所以保险公司将从给付的保险金中扣除保户下一年度所应缴的保费，若给付的保险金不足以支付保险费，则应先补交保险费后再给付理赔保险金。但若是投保短期险险种，且险种为停效状态的，我公司原则上不承担保险责任。"
            },
            {
              askContent:
                "小额理赔立等可取是怎么回事？",
              isShowAnswer: false,
              answer:
                "这是为方便客户开通的一项快速理赔服务。对赔付金额≤500元的理赔申请、如事实清楚、资料齐全，我公司可当场向受益人给付保险金。"
            }
          ]
        },
        {
          listContent: [
            {
              askContent: "发生住院医疗时，理赔申请需要准备什么样的材料？",
              isShowAnswer: false,
              answer:
                "• 保险合同；<br>• 被保险人的有效身份证件，转帐银行及帐号；<br>• 医院出具的被保险人医疗诊断书（包括必要的病历记录及检查报告）、出院小结及住院医疗费用的原始凭证和账单明细表；<br>• 所能提供的与确认保险事故的性质、原因、伤害程度等有关的证明和资料；<br>• 如果委托他人代为申请，则应提供授权委托书、受托人有效身份证件等相关证明文件。"
            },
            {
              askContent: "发生意外医疗时，理赔申请需要准备什么样的材料？",
              isShowAnswer: false,
              answer:
                "在申请意外医疗保险金时，受益人须填写理赔申请表，并提供下列证明和资料：<br>• 保险合同；<br>• 被保人的有效身份证件，转帐银行及帐号；<br>• 医院出具的被保险人医疗诊断书（包括必要的病历记录及检查报告）、出院小结及医疗费用的原始凭证和账单明细表（如有住院）；<br>• 所能提供的与确认保险事故的性质、原因、伤害程度等有关的证明和资料；<br>• 如果委托他人代为申请，则应提供授权委托书、受托人有效身份证件等相关证明文件。"
            },
            {
              askContent:
                "发生重大疾病时，理赔申请需要准备什么样的材料？",
              isShowAnswer: false,
              answer:
                "在申请重大疾病保险金时，受益人须填写理赔申请表，并提供下列证明和资料：<br>• 保险合同；<br>• 被保人的有效身份证件，转帐银行及帐号；<br>• 医院出具的附有被保险人病理、血液及其它科学方法检验报告等诊断证明文件，门（急）诊病历，出院小结；<br>• 所能提供的与确认保险事故的性质、原因等有关的其他证明和资料；<br>• 如果委托他人代为申请，则应提供授权委托书、受托人有效身份证件等相关证明文件。"
            },
            {
              askContent:
                "发生身故时，理赔申请需要准备哪些材料？",
              isShowAnswer: false,
              answer:
                "在申请身故保险金时，受益人须填写理赔申请表，并提供下列证明和资料：<br>• 保险合同；<br>• 受益人的有效身份证件，转帐银行及帐号；<br>• 门诊病历、出院小结；如属意外死亡须提供意外事故证明；<br>• 国家卫生行政部门认定的医疗机构、公安部门或其他相关机构出具的被保险人的死亡证明；丧葬证明、户口注销证明；<br>• 所能提供的与确认保险事故的性质、原因等有关的其他证明和资料；<br>• 如果委托他人代为申请，则应提供授权委托书、受托人有效身份证件等相关证明文件。"
            },
            {
              askContent:
                "被保人为未成年人，出生证明是否可以作为其有效身份证件？",
              isShowAnswer: false,
              answer:
                "• 有效身份证件是指身份证、户口簿、护照、军人证等；<br>• 户口簿的使用仅限于十六周岁以下尚未申领身份证的未成年人；<br>• 幼儿尚未落户的出生证明可以作为其有效身份证件。"
            },
            {
              askContent:
                "投保人、被保险人、受益人之间的关系证明都有哪些?",
              isShowAnswer: false,
              answer:
                "投保人、被保险人、受益人之间的关系证明包括：<br>• 户口簿（含首页及\"与户主关系\"非空白）、结婚证、出生证、独生子女证；<br>• 各级政府或公安机关出具的关系证明；<br>• 公证书（亲属关系公证）。"
            },
            {
              askContent:
                "因交通意外住院，是否与其他住院一样提供就诊资料？",
              isShowAnswer: false,
              answer:
                "因交通意外住院申请理赔时，除基本索赔资料外，还需要提供由交管部门出具的《道路交通事故责任认定书》原件，如系本人驾驶机动车发生的事故，请一并提供个人的有效驾驶证和车辆行驶证。"
            },
            {
              askContent:
                "申请身故保险金，需要提供三证，指的是哪三证？",
              isShowAnswer: false,
              answer:
                "受益人申请身故保险金时须提供的\"三证\"，是指：<br>国家卫生行政部门认定的医疗机构、公安部门或其他相关机构出具的被保险人的死亡证明、丧葬证明、户口注销证明。"
            },
            {
              askContent:
                "申请意外伤残保险金，病历是否可以作为确定残疾的依据？",
              isShowAnswer: false,
              answer:
                "对于肢体缺失类的伤残申请，病历已反映出了残疾情况的则可以作为确定残疾的依据；但其他类型的伤残申请，须提供我司认可的或有鉴定资质的鉴定机构出具的残疾鉴定报告。"
            },
            {
              askContent:
                "发票原件遗失，医院出具的证明可作为报销医药费的凭证吗？",
              isShowAnswer: false,
              answer:
                "医院证明不等同于发票原件，发票原件作为医疗费用支出的凭证请务必妥善保存，如果遗失，请仔细寻找。医疗险索赔的诉讼时效是事故发生之日起2年，被保人在2年内找到发票的，都可以来申请理赔。"
            },
            {
              askContent:
                "申请时已提交了理赔资料，为什么公司还需要补充提供资料？",
              isShowAnswer: false,
              answer:
                "《保险法》规定：保险事故发生后，按照保险合同请求保险人赔偿或者给付保险金时，投保人、被保险人或者受益人应当向保险人提供其所能提供的与确认保险事故的性质、原因、损失程度等有关的证明和资料。保险人按照合同的约定，认为有关的证明和资料不完整的，应当及时一次性通知投保人、被保险人或者受益人补充提供。"
            },
            {
              askContent:
                "因单位报销了部分医药费，发票原件在单位留存，还能申请理赔吗？",
              isShowAnswer: false,
              answer:
                "如果您所支出的医疗费尚未足额获得赔付（不包括非医保支付项目），在出具加盖单位财务章的发票复印件及报销金额证明后仍可向我公司提出理赔申请。"
            },
            {
              askContent:
                "医疗费已经社会医疗保险报销了一部分，剩下的费用可以申请理赔吗？",
              isShowAnswer: false,
              answer:
                "如您所支出的医疗费在社会医疗报销尚未足额获得赔付（不包括非医保支付项目），在提供相关发票及报销结算单（其一必须为原件）后，可以向我公司提出理赔申请。"
            },
            {
              askContent:
                "一次理赔申请一般多长时间能获得赔付？",
              isShowAnswer: false,
              answer:
                "理赔时效因具体申请情况不同而异，如您提交的理赔申请资料齐全、事实清楚、责任明确，我们将在收到您的资料后3个工作日内做出理赔决定并及时通知您。"
            }
          ]
        },
        {
          listContent: [
            {
              askContent: "保险期间是如何定义的？",
              isShowAnswer: false,
              answer:
                "保险期间：指保险合同期间，自本合同生效日起至合同约定终止时止，并在保险单上载明。"
            },
            {
              askContent: "什么是保险事故？",
              isShowAnswer: false,
              answer:
                " 保险事故：指本合同约定的保险责任范围内的事故。"
            },
            {
              askContent:
                "什么是意外伤害事故？",
              isShowAnswer: false,
              answer:
                "意外伤害事故：指外来的、突发的、非本意的、非疾病的使身体受到伤害的客观事件。"
            },
            {
              askContent:
                "保险合同中对医院是如何约定的？",
              isShowAnswer: false,
              answer:
                "医院：国家卫生部医院等级分类中的二级或二级以上的医院，但不包括主要为门诊、康复、护理、疗养、戒酒、戒毒或相类似的医疗机构。同时该医院必须具有符合有关医院管理规定设置标准的医疗设备，并且提供24小时有合格医师及护士驻院的医疗和护理等服务。 "
            },
            {
              askContent:
                "保险合同对住院是如何约定的？",
              isShowAnswer: false,
              answer:
                "住院：被保险人因疾病或意外伤害，经医生根据临床诊断，必须留院治疗，办理了正式住院手续且确实留院治疗的行为过程。"
            },
            {
              askContent:
                "保险合同中社会医疗保险是如何定义的？",
              isShowAnswer: false,
              answer:
                "社会医疗保险：各省市城镇职工基本医疗保险办法和各省市城镇职工地方附加医 疗保险办法规定的医疗保险，其中各省市城镇职工基本医疗保险办法是指各省市人民政府令发布的为保障职工基本医疗需求制定的管理办法。"
            },
            {
              askContent:
                "投保人、被保人、受益人的有效身份证件有哪些？",
              isShowAnswer: false,
              answer:
                "有效身份证件：指身份证、户口簿、护照、军人证等。户口簿的使用仅限于十六周岁以下尚未申领身份证的未成年人。"
            },
            {
              askContent:
                "什么是酒后驾驶？",
              isShowAnswer: false,
              answer:
                "酒后驾驶：指经检测或鉴定，发生事故时车辆驾驶人员每百毫升血液中的酒精含量达到或超过一定的标准，公安机关交通管理部门依据《道路交通安全法》的规定认定为饮酒后驾驶或醉酒后驾驶任免除情形。"
            },
            {
              askContent:
                "哪些情况属于无合法有效的驾驶证驾驶？",
              isShowAnswer: false,
              answer:
                "无合法有效驾驶证驾驶：指下列情形之一：<br>（1）没有取得驾驶资格；<br>（2）驾驶与驾驶证准驾车型不相符合的车辆；<br>（3）持审验不合格的驾驶证驾驶；<br>（4）持学习驾驶证学习驾车时，无教练员随车指导，或不按指定时间、路线学习驾车。"
            },
            {
              askContent:
                "机动车无有效行驶证的情形有哪些？",
              isShowAnswer: false,
              answer:
                "无有效行驶证：指下列情形之一：<br>（1）机动车被依法注销登记的；<br>（2）未依法按时进行或通过机动车安全技术检验。"
            }
          ]
        }
      ]
    };
  },
  methods: {
    selectTab(index) {
      this.indexNum = index;
      for (let item of this.tobarList) {
        item.styleName = "";
      }
      this.tobarList[index].styleName = "thistab";
    },

    //
    openAnswerContent(index,indexTwo){
        this.wenDaList[index].listContent[indexTwo].isShowAnswer = !this.wenDaList[index].listContent[indexTwo].isShowAnswer
    }
  }
};
</script>

<style lang="scss" scoped>
.claims-box {
  min-height: 100vh;
  background: #f1f1f1;
  padding: 0.1rem;
  box-sizing: border-box;
}
.tz-title-ul {
  height: 35px;
  background: #000;
  display: flex;
  li {
    flex: 1;
    height: 40px;
    line-height: 40px;
    float: left;
    overflow: hidden;
    position: relative;
    text-align: center;
    font-size: 0.38rem;
    font-weight: bold;
    a {
      display: block;
      color: #fff;
      background: #22b22c;
      text-align: center;
    }
  }
  .thistab a {
    background: #effff0;
    color: #22b22c;
  }
}
.ask-box {
  .ask-list {
    padding: 15px 0px 5px;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    .ask-list-ul {
      overflow: hidden;
      .ask-list-li {
        color: #666666;
        border-top: solid 1px #bcbcbc;

        .ask-list-ask {
          display: flex;
          justify-content: space-between;
          height: 1.4rem;
          align-items: center;
          .ask-list-ask-left {
            display: flex;
            div {
              width: 0.55rem;
              display: flex;
              align-items: center;
              img {
                width: 100%;
              }
            }
            p {
              max-width: 5.5rem;
              text-align: justify;
              margin-left: 0.2rem;
            }
          }
          .ask-list-ask-right {
            transform: rotateZ(-90deg);
            transition: all 0.2s;
          }
          .selectList{
            transform: rotateZ(0deg);
          }
        }
        .ask-list-answer {
          display: flex;
          border-top: solid 1px #bcbcbc;
          padding: 0.2rem 0;
          overflow: hidden;
          div {
            width: 0.55rem;
            padding-top: 0.1rem;
            img {
              width: 100%;
            }
          }
          p {
            max-width: 6.5rem;
            text-align: justify;
            margin-left: 0.2rem;
            line-height: 0.5rem;
            
          }
        }
      }
    }
  }
}
// .fade-enter-active, .fade-leave-active {
//   transition: all 0.3s;
// }
// .fade-enter, .fade-leave-to {
//   opacity: 0;
// }
</style>