export const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const maxSlide = slides.length;

    let curSlide = 0;
    let intervalId;

    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

    const goToSlide=  function (slide) {
        slides.forEach((s, i) => {
        (s.style.transform = `translateX(${100 * (i - slide)}%)`);
        });
    };


    const nextSlide = function () {
        if(curSlide === (maxSlide - 1)){
          curSlide = 0;
        }else{
          curSlide++;
        }
      
        goToSlide(curSlide);
        resetInterval();
    };
      
    const prevSlide = function () {
        if(curSlide === 0){
          curSlide = maxSlide - 1;
        }else{
          curSlide--;
        }
        
        goToSlide(curSlide);
        resetInterval();
    };

    goToSlide(0);

    const resetInterval = function() {
        clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 5000);
    }

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function(e) {
    if(e.key === 'ArrowLeft') prevSlide();

    if(e.key === 'ArrowRight') nextSlide();
    });

    resetInterval();
}
