jQuery(document).ready(function(){ 
	
	// --------------------------------------------------------
	//  Sliding Tabs & Menu
	// --------------------------------------------------------
		
	// Needed variables
	var $content 		= $("#content");
	
	// Run easytabs
  	$content.easytabs({
	  animate			: true, //Makes content panels fade out and in when a new tab is clicked.
	  updateHash		: false, //Tells easyTabs whether or not to update the browser window's URL hash
	  transitionIn		:'slideDown', //The jQuery effect used to show the target panel when a tab is selected.
	  transitionOut		:'slideUp', //The jQuery effect used to hide the visible panel when a tab is selected.
	  animationSpeed	:600, //Controls the speed of the fading effect if animate: true.
	  tabs				:".header > .menu > ul > li",
	  tabActiveClass	:'active'
	});
	
	//Hover menu effect
	$content.find('.tabs li a').hover(
		function() {
			$(this).stop().animate({ marginTop: "-5px" }, 200);
		},function(){
			$(this).stop().animate({ marginTop: "0px" }, 300);
		}
	);
	

	//Tooltip effect
	$('section [title], .title').qtip({
		position:{my: 'top center', at: 'bottom center', adjust: {y: 1}},
		style: {classes: 'ui-tooltip-tipsy ui-tooltip-shadow'}		
	});
	
	// --------------------------------------------------------
	//	Google Map
	// --------------------------------------------------------
	
	var $map = $('#map'),
		$tabContactClass = ('tab-contact'),
		$address = 'Jalan Btp, Kota Makassar, Indonesia'; //address for google map
	
	$content.bind('easytabs:after', function(evt,tab,panel) {
		if ( tab.hasClass($tabContactClass) ) {
			$map.gMap({
				address: $address,
				zoom: 16,
				markers: [
					{ 'address' : $address }
				]
			});
		}
  	});
	
	// --------------------------------------------------------
	//	Flexslider - Profile Tab (Photo slider & Carousel Slider) + Resume Tab (Testimonials)
	// --------------------------------------------------------
	
	$('#photo-slider').flexslider({
		animation: "slide",
		controlNav : false//Create navigation for paging control of each slide.
	});

	  $('#carousel-slider').flexslider({
		animation: "slide", //Controls the animation type, "fade" or "slide".
		slideshow : false, //Setup a slideshow for the slider to animate automatically.
		directionNav: false, //Create previous/next arrow navigation.
		animationLoop: false, // Gives the slider a seamless infinite loop.
		itemWidth: 100 //Box-model width of individual carousel items, including horizontal borders and padding.
	});

	$('#testimonials').flexslider({
		animation:"fade",
		slideshow : true,
		controlNav : true,
		directionNav: false,
		slideshowSpeed: 3000, //Set the speed of the slideshow cycling, in milliseconds
		animationSpeed: 600 //Set the speed of animations, in milliseconds
	});
	
	
	// --------------------------------------------------------
	//	Adipoli Plugin for Hover effect
	// -------------------------------------------------------- 
	
	$('.grayscale').adipoli({
		'startEffect' : 'transparent',
		'hoverEffect' : 'boxRandom'
	});


	// --------------------------------------------------------
	//	Graphical skill chart
	// -------------------------------------------------------- 
	
	 $content.bind('easytabs:after', function(evt, tab, panel, data) {
	  if ( tab.hasClass('tab-resume') ) {
			$graph_id    = 'skill-rating'; // id of graph container	
			$lines 		 = 5; // number of lines - keep this 10 unless you want to write a bunch more code
			$bar_margins = 5; // margins between the bars
			$bar_speed 	 = 600; // speed for bar animation in milliseconds
			$animate 	 = true; // set to false if multiple charts on one page
			var graph = new egraph($graph_id,$lines,$bar_margins,$bar_speed, $animate);
			graph.animateBars();
		}
	});
	
	
	// --------------------------------------------------------
	//	Fancy box
	// -------------------------------------------------------- 
	
	$('.fancybox').fancybox({
		'overlayShow'	: true, //Toggle overlay
		'opacity'		: true, //When true, transparency of content is changed for elastic transitions
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'none',
		'overlayOpacity'	:   0.8 //Opacity of the overlay (from 0 to 1; default - 0.3)
	});
	
	
	// --------------------------------------------------------
	//	Portfolio Tab
	// -------------------------------------------------------- 
	
	// Needed variables
	var $container	 	= $('#portfolio-list');
	var $filter 		= $('#portfolio-filter');
		
	// Run Isotope  
	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});	
	
	// Isotope Filter 
	$filter.find('a').click(function(){
	  var selector = $(this).attr('data-filter');
		$container.isotope({ 
		filter				: selector,
		animationOptions	: {
		duration			: 750,
		easing				: 'linear',
		queue				: false
	   }
	  });
	  return false;
	});	
		
	// Copy categories to item classes
	$filter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$filter.find('a').removeClass('current');
		$(this).addClass('current');
	});	
	
	// Hover effect
	$("#portfolio-list li").hover(function(){
		$(this).find(".portfolio-description").stop(true, true).animate({ opacity: 'show' }, 500);
	}, function() {
		$(this).find(".portfolio-description").stop(true, true).animate({ opacity: 'hide' }, 500);		
	});
	
	// --------------------------------------------------------
	//	Conctact Form Validation
	// -------------------------------------------------------- 
	
	$('#contactform').validate({
		rules:{
			name:{required: true},
			message:{required: true},
			email: {required: true, email: true}
		}
	});
	
	// --------------------------------------------------------
	//	Pattern Changer
	// --------------------------------------------------------
	
	imgPathStart = "img/pattern/";
	imgPathEnd = new Array("pattern0.png","pattern1.png","pattern2.png","pattern3.png","pattern4.png","pattern5.png","pattern6.png","pattern7.png","pattern8.png","pattern9.png");

	$(".background-selector li img").click(function() {
		backgroundNumber = $(this).attr("data-nr");
		$("body").css({background:"url('"+imgPathStart+imgPathEnd[backgroundNumber]+"')"});
	});
	
});

