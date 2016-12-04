/* event for when the window loads ------------------------------------- */
add_event(window,'load',function(e){

	/* create the image_look prototype */	
	il=new image_look(settings.canvas) 
	
	/* setup the colors */
	il.bg=settings.colors.bg;
	il.line=settings.colors.line;

	/* setup the canvas width and height */
	il.setup(settings.dimensions);

	/* if zigzag auto start is on start the zigzagloop */
	if(settings.zigzag.autostart){
		zigzagloop();
		document.getElementById('il_zig_zig_auto').className='active';
	}

});		

/* event for when the Zig Zag button is clicked ------------------------- */
add_event(document.getElementById('il_zig_zig'),'click',function(e){
	il.zigzag(
		settings.zigzag.size,
		settings.zigzag.loop
	);
});

/* event for clearing the Canvas and reseting the zig zag position ------ */
add_event(document.getElementById('il_clear'),'click',function(e){
	il.clear();
	il.pos.x=0;
	il.pos.y=0;
});

/* event for when the Zig Zag Auto button is clicked ------------------- */
add_event(document.getElementById('il_zig_zig_auto'),'click',function(e){
	/* if the imagelook loop isn't set */
	if(il.loop==null){
		/* start the zig zag loop */
		zigzagloop();
		/* make the Zig Zag Auto button active */
		this.className='active';
	}else{
		/* stop the zig zag loop */
		zigzagloopclear();
		/* make the Zig Zag Auto button inactive */
		this.className='';
	}
});

/* event for sliding out the settings ------ */
add_event(document.getElementById('il_settings'),'click',function(e){
	var ele=document.getElementById('settings');
	if(ele)class_toggle(ele,'closed');
});

/* event for closing the settings menu with the no button ------ */
add_event(document.getElementById('zigzag_no'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele)class_add(ele,'closed');
});

/* event for closing the settings menu with the yes button ----- */
add_event(document.getElementById('zigzag_yes'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele)class_add(ele,'closed');
});

/* zig zag function for creating a recurring event -------------------------*/
function zigzagloop() {
    il.loop=window.setTimeout(function(){
		il.zigzag(
			settings.zigzag.size,
			settings.zigzag.loop
		);
        zigzagloop(settings.zigzag.delay);
    }, settings.zigzag.delay);
}
/* zig zag function for destroy a recurring event -------------------------*/
function zigzagloopclear(){
	window.clearTimeout(il.loop);
	il.loop=null;
}