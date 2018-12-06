export function getDate(data) {
    　　var now = new Date(data),
    　　y = now.getFullYear(),
    　　m = now.getMonth() + 1,
    　　d = now.getDate();
    　　return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }
    