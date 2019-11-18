const bars = document.querySelector('.header .img-bars');
const sidebar = document.querySelector('html body .sidebar');
const exit_img = sidebar.querySelector('.exit img');
const exit = sidebar.querySelector('.exit');
bars.addEventListener('click',function(){
    sidebar.style.width = '250px';
    exit.style.display = 'block';
});

exit_img.addEventListener('click', function(){
    sidebar.style.width = '0px';
    exit.style.display = 'none';
})


// carousel

const carousel_list = document.querySelector('.testimonials .carousell-list'); 
const carousel_btn = document.querySelectorAll('.testimonials .carousel-list li');
var index_carousel=0;
for (let index = 0; index < carousel_btn.length; index++) {
    carousel_btn[index].addEventListener('click', function(){
        carousel_btn[index].classList.add('carousel-active');
        removeCarouselActive(index);
        carousel_list.style.marginLeft = (index*(-100)) +'%';
        index_carousel = index;
    });
};

function removeCarouselActive(indexs){
    for (let index = 0; index < carousel_btn.length; index++) {
        if(indexs != index)
            carousel_btn[index].classList.remove('carousel-active');
    }
}

setInterval(function(){
    if (index_carousel == 3){
        index_carousel= 0;
    }
    else{
        index_carousel ++;
    }
    carousel_btn[index_carousel].classList.add('carousel-active');
    removeCarouselActive(index_carousel);
    carousel_list.style.marginLeft = (index_carousel*(-100)) +'%';
}, 3000);


// summer Sell

const list_cal = document.querySelectorAll('.summer-sale .cal .cal-white .number');
var date = new Date();
var date1 = new Date(2020, 0, 1, 0, 0, 0, 0);


function calDay(date, date1){
    var date2 = date1-date;

    var w = Math.floor((date2/(1000*60*60*24*7)));
    date2 = date2 - (w*1000*60*60*24*7);

    var d = Math.floor((date2/(1000*60*60*24)));
    date2 = date2 - (d*1000*60*60*24);

    var h = Math.floor((date2/(1000*60*60)));
    date2 = date2 - (h*1000*60*60);

    var m = Math.floor((date2/(1000*60)));
    date2 = date2 - (m*1000*60);

    var s = Math.floor((date2/(1000)));

    list_cal[0].innerText = w; 
    list_cal[1].innerText = d;
    list_cal[2].innerText = h;
    list_cal[3].innerText = m;
    list_cal[4].innerText = s;
}

setInterval(function(){
    var date = new Date();
    calDay(date, date1);
},1000);

//header
var index_nav = 0;
html = document.querySelector('html');
const list_nav = document.querySelectorAll('.header .nav .navigation li a')
const list_sidebar = document.querySelectorAll('.sidebar .list-nav li a');


function check_Screen() {
    if (html.scrollTop <document.querySelector('.banner').offsetTop) {
        index_nav=0;
    } else if (html.scrollTop <document.querySelector('.about-us').offsetTop - window.innerHeight + 200) {
        index_nav=1;
    } else if (html.scrollTop <document.querySelector('.summer-sale').offsetTop - window.innerHeight + 200) {
        index_nav=2;
    } else if (html.scrollTop <document.querySelector('.testimonials').offsetTop - window.innerHeight + 200) {
        index_nav=3;
    } else if (html.scrollTop <document.querySelector('.blog').offsetTop - window.innerHeight + 200) {
        index_nav=4;
    } else if (html.scrollTop <document.querySelector('.get-in-touch').offsetTop - window.innerHeight + 200) {
        index_nav=5;
    } else {
        index_nav = 6
    }
}

check_Screen();
addClassActiveNav(index_nav);
addClassSidebar(index_nav);
window.addEventListener('scroll', function(){
    check_Screen();
    addClassActiveNav(index_nav);    
    addClassSidebar(index_nav);
});

function addClassActiveNav(i){
    for (let index = 0; index < list_nav.length; index++) {
        if(i != index){
            list_nav[index].classList.remove('nav-active');
        }
        else 
            list_nav[index].classList.add('nav-active');
    }
}

function addClassSidebar(i){
    for (let index = 0; index < list_sidebar.length; index++) {
        if(i != index){
            list_sidebar[index].classList.remove('nav-active');
        }
        else 
            list_sidebar[index].classList.add('nav-active');
    }
}




document.addEventListener("DOMContentLoaded", function() {  
    var lazyloadImages = document.querySelectorAll("img.lazy");    
    var lazyloadThrottleTimeout;
    
    function lazyload () {
      if(lazyloadThrottleTimeout) {
        clearTimeout(lazyloadThrottleTimeout);
      }    
      
      lazyloadThrottleTimeout = setTimeout(function() {
          var scrollTop = window.pageYOffset;
          lazyloadImages.forEach(function(img) {
              if(img.offsetTop < (window.innerHeight + scrollTop)) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
              }
          });
          if(lazyloadImages.length == 0) { 
            document.removeEventListener("scroll", lazyload);
            window.removeEventListener("resize", lazyload);
            window.removeEventListener("orientationChange", lazyload);
          }
      }, 20);
    }
    
    document.addEventListener("scroll", lazyload);
    window.addEventListener("resize", lazyload);
    window.addEventListener("orientationChange", lazyload);
  });