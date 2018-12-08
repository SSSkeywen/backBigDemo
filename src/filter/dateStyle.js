export function dateStyle(date) {
    var y = new Date(date).getFullYear();
    var m = new Date(date).getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = new Date(date).getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '年' + m + '月' + d + '日';  
}
export function dateStyle2(date) {
    var y = new Date(date).getFullYear();
    var m = new Date(date).getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = new Date(date).getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;  
}