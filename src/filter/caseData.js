export function caseMsg(data) {
    if (data =='已报案待受理'){
        return '已报案待受理'
    } else if (data == '已结案提交付款') {
        return '结案'
    } else if (data == '已报案待立案') {
        return '已报案待受理'
    } else if (data == '报案中') {
        return '报案中'
    } else if (data == '受理中') {
        return '受理中'
    } else if (data == '已呈报待复核') {
        return '已报案待受理'
    } else {
        return '处理中'
    }
    // #if ($rtHtml.caseStatus == "已报案待受理")
    //     已报案待受理
    //         < !-- || $rtHtml.caseStatus == "签批退回"  处理中-- >
    // #elseif($rtHtml.caseStatus == "已结案提交付款")
    // 结案
    // #elseif($rtHtml.caseStatus == "已报案待立案")
    // 已报案待受理
    // #elseif($rtHtml.caseStatus == "报案中")
    // 报案中
    // #elseif($rtHtml.caseStatus == "受理中")
    // 受理中
    // #elseif($rtHtml.caseStatus == "已呈报待复核")
    // 已报案待受理
    // #else
    // 处理中
    // #end
}
export function organNameTest(data) {
    return data = data.substring(10, data.length)
}

export function finishTimeTest(data) {
    return data = data.substring(0, 10)
}

// export function finishTimeTest(data) {
//     return data = data.substring(0, 10)
// }