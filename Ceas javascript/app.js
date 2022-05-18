let text = document.querySelector('#txt');

function dateTime() {
    const clock = new Date();
    let h = clock.getHours();
    let m = clock.getMinutes();
    let s = clock.getSeconds();
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    text.innerHTML = h + ":" + m + ":" + s ;
    setTimeout(dateTime, 1000);
}

dateTime();
