import $ from 'jquery';
import whatInput from 'what-input';

window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

import 'tablesaw/dist/tablesaw.jquery';
import libs from './lib/dependancies';
window.libs = libs;

$(document).foundation();

libs.AOS.init();

// SVG Injector
// Elements to inject
var mySVGsToInject = document.querySelectorAll('img.inject-me');

// Options
var injectorOptions = {
  evalScripts: 'once',
  pngFallback: 'assets/png'
};

var afterAllInjectionsFinishedCallback = function (totalSVGsInjected) {
  // Callback after all SVGs are injected
  console.log('We injected ' + totalSVGsInjected + ' SVG(s)!');
};

var perInjectionCallback = function (svg) {
  // Callback after each SVG is injected
  console.log('SVG injected: ' + svg);
};

// create injector configured by options
var injector = new libs.svgInjector(injectorOptions);

// Trigger the injection
injector.inject(
  mySVGsToInject,
  afterAllInjectionsFinishedCallback,
  perInjectionCallback
);

// slick carousel
$(".content-carousel").slick({
  // normal options...
  speed: 5000,
	autoplay: true,
	autoplaySpeed: 0,
	cssEase: 'linear',
  slidesToShow: 5,
	slidesToScroll: 1,
  infinite: true,
  swipeToSlide: true,
	centerMode: true,
  focusOnSelect: true,
  // the magic
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        infinite: true
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        dots: true
      }
    }, {
      breakpoint: 300,
      settings: "unslick" // destroys slick
    }]
});

// tablesaw table plugin
$(function () {
  $(document)
    .foundation()
    .trigger('enhance.tablesaw');
});

var TablesawConfig = {
  swipeHorizontalThreshold: 15
};

// app dashboard toggle
$('[data-app-dashboard-toggle-shrink]').on('click', function(e) {
  e.preventDefault();
  $(this).parents('.app-dashboard').toggleClass('shrink-medium').toggleClass('shrink-large');
});



// 20180830 MV: Custom JS....

$.shortDate = function(dateObject) {
    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = day + "-" + month + "-" + year;

    return date;
};

$('[data-rating] .star').on('click', function() {
  var selectedCssClass = 'selected';
  var $this = $(this);
  $this.siblings('.' + selectedCssClass).removeClass(selectedCssClass);
  $this
    .addClass(selectedCssClass)
    .parent().addClass('is-voted');
});

$('textarea#ReviewText').on('keyup', function(){
  var $this = $(this);

  if($this.val().length > 5){
    //alert($this.attr('id') +':' + $this.val() + '=' + $this.val().length + "|"+ $('#new.selected').val());
    if($('#new.selected')){
    $('#new').removeClass('disabled')
    //$('#new').addClass('enabled')
  }else{
    $('#new').addClass('disabled')
    //$('#new').RemoveClass('enabled')
  }
  }
});

      
$('#new').on('click', function(e) {
  if($('textarea#ReviewText').val().length < 5){return;}
$('#ratingContainer').foundation('toggle');

$('#outsideHisto').toggleClass('large-12');
$('#outsideHisto').toggleClass('large-6')
var i = 1;
var max_fields = 100;


  if(i < max_fields) {
      i++;
      var txtReview = $('textarea#ReviewText').val();
      var txtShortReview = $('textarea#ReviewText').val().substr(0,25) + '...';
      var selectedStars = $('[data-rating] .star.selected').attr('id').substr(8,1)

      $('.accordion').prepend('<li class="accordion-item  is-active" data-accordion-item> \
        <a href="#" class="accordion-title">\
        <span class="histo-star">\
        <i class=" icon-star"></i>'+selectedStars+'</span>| <i class="icon-user"></i> Anonymous | '+$.shortDate(new Date())+' | '+txtShortReview+'</a> \
        <div class="accordion-content" data-tab-content><p>' +txtReview+ ' </p></div></li>');
      Foundation.reInit('accordion');


  }
});
