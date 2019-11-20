$(document).ready(function(){
  $('.card__slider').each(function() {
  	const slider = $(this);
  	const gallery = slider.find('.card__fancybox');

  	slider.on('click', '.card__fancybox', function(e) {
	  e.preventDefault();
	  var totalSlides = +$(this).parents('.slider').slick("getSlick").slideCount,
	      dataIndex = +$(this).parents('.slide').data('slick-index'),
	      trueIndex;
	  switch(true){
	    case (dataIndex<0):
	      trueIndex = totalSlides+dataIndex; break;
	    case (dataIndex>=totalSlides):
	      trueIndex = dataIndex%totalSlides; break;
	    default: 
	      trueIndex = dataIndex;
	  }  
	  $.fancybox.open(gallery,{}, trueIndex);
	  return false;
	});
	
  	slider.slick();
  })
});