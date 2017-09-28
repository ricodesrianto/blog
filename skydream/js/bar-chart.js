
	/**
	* Initiates Graph Functions
	**/
	function egraph($graph_id,$lines,$bar_margins,$bar_speed,$animate){
		
		var self = this; // create graph object
		var graphid = $graph_id; // id of graph container, example "graph1" or "myGraph"
		var values = new Array(); // array of values
		var heights = new Array(); // array of bar heights
		var colors = new Array(); // colors for bars
		var lines = $lines; // number of lines - keep this 10 unless you want to write a bunch more code
		var bm = $bar_margins; // margins between the bars
		var mx = 0; // highest number, or rounded up number
		var gw = $('#'+graphid+' .graph').width(); // graph width	
		var gh = $('#'+graphid+' .graph').height(); // graph height
		var speed = $bar_speed; // speed for bar animation in milliseconds
		var animate = ($animate != undefined && $animate == true)?true:false; // determines if animation on bars are run, set to FALSE if multiple charts
		
		
		/**
		* Gets the values & colors from the HTML <labels> and saves them into $v ohject
		**/		
		var getValues = function(){
			var lbls = $('#'+graphid+' .values span');
			// loop through
			for(i=0;i <= lbls.length-1; i++){
				var vals = parseFloat(lbls.eq(i).text());
				colors.push(lbls.eq(i).css('background-color'));
				mx = (vals > mx)?vals:mx;
				values.push(vals);
			}				
		}
		/**
		* A Simple Round Up Function
		**/
		var roundUp = function(num,rr){
			return ((num%rr) > 0)?num-(num%rr) + rr:num;
		}
		/**
		* Makes the HTML for the lines on the chart, and places them into the page.
		**/		
		var graphLines = function(){
			var r = (mx < 100)?10:100; // determine to round up to 10 or 100
			mx = roundUp(mx,r); // round up to get the max number for lines on chart
			var d = mx / lines; // determines the increment for the chart line numbers	
			
			// Loop through and create the html for the divs that will make up the lines & numbers
			var html = ""; var i = mx;			
			if(i>0 && d>0){
				while(i >= 0){
					html += graphLinesHelper(i, mx);
					i = i - d;
				}
			}
			$('#'+graphid+' .graph').html(html); // Put the lines into the html		
			var margin = gh / lines; // Determine the margin size for line spacing
			$('#'+graphid+' .line').css("margin-bottom",margin + "px");	// Add the margins to the lines			
		}
		/**
		* Creates the html for the graph lines and numbers
		**/
		var graphLinesHelper = function(num, maxNum){
			var fix = (i == maxNum || i == 0)? "fix ":""; // adds class .fix, which removes the "border" for top and bottom lines
			return "<div class='"+fix+"line'><span>" +num + "</span></div>";
		}
		
		/**
		* Creates the HTML for the Bars, adds colors, widths, and margins for proper spacing. 
		* Then Puts it on the page.
		**/
		var graphBars = function (){			
			var xbars  = values.length; // number of bars	
			var barW	= (gw-(xbars * (bm))) / xbars; 
			var mL 	= ($('#'+graphid+' .line span').width()) + (bm/2);			
			var html="";
			for(i=1;i<=xbars;i++){
				heights.push((gh / mx) * values[i-1]);
				ht = (animate == true)?0:heights[i-1];
				html += "<div class='bar' id='"+graphid+"_bar_"+(i-1)+"' style='height: "+ht+"px; margin-top: -"+(ht+1)+"px; ";
				html += "background-color: "+colors[i-1]+"; margin-left: "+mL+"px'>&nbsp;</div>";
				mL = mL + barW + bm;
			}
			$(html).insertAfter('#'+graphid+' .graph');
			$('#'+graphid+' .bar').css("width", barW + "px");			
		}
		var animateBars = function(i){
			var i = (i == undefined)?0:i;
			if(i == values.length){ return; }
			$('#'+graphid+'_bar_'+i).animate({
				marginTop: "-" + (heights[i] + 1) + "px",
				height: (heights[i]) + "px"
			},speed,"swing", function(){ 
				animateBars(i+1); 
			});
		}
		this.animateBars = animateBars;
		
		getValues(); // load the values & colors for bars into $v object	
		graphLines(); // makes the lines for the chart
		graphBars(); // make the bars
	}
	
	