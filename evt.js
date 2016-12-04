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
add_event(document.getElementById('settings_toggle'),'click',function(e){
	var ele=document.getElementById('settings');
	if(ele)class_toggle(ele,'closed');
});

/* event for sliding out the settings ------ */
add_event(document.getElementById('settings_color'),'click',function(e){
	preventEvent(e);
	if(class_exists(document.body,'colored')){
		class_remove(document.body,'colored');
		class_remove(e.srcElement,'active');
		e.srcElement.innerHTML='Theme - Black and White';
	}else{
		class_add(document.body,'colored');
		class_add(e.srcElement,'active');
		e.srcElement.innerHTML='Theme - Colors';
	}

});

/* event for closing the settings menu ------ */
add_event(document.getElementById('settings_close'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele){
		class_add(ele,'closed');
	}
});

/* event for toggling the settings menu modal state ----- */
add_event(document.getElementById('settings_modal'),'click',function(e){
	preventEvent(e);
	var ele=document.getElementById('settings');
	if(ele){
		if(class_exists(ele,'modal')){
			class_remove(ele,'modal');
			class_remove(e.srcElement,'active');
		}else{
			class_add(ele,'modal');
			class_add(e.srcElement,'active');
		} 
	}
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