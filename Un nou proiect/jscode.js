let moving = document.querySelectorAll('.moving');

for( let i = 0; i < 3; i++){
    moving[i].addEventListener('mouseover', function(){
        moving[i].style.color = '#bee1e6';
    });
    moving[i].addEventListener('mouseout', function(){
        moving[i].style.color = 'black  ';
    });
  };

