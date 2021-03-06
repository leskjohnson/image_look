function image_look(canvas) {
	this.canvas=document.getElementById(canvas),
	this.ctx = this.canvas.getContext("2d");
	this.pos ={'x':0,'y':0};
	this.bg='red';
	this.line='green';
	this.loop=null;
}
image_look.prototype.setup=function(dim){
	console.log(dim);
	this.ctx.canvas.width=dim.width;
	this.ctx.canvas.height=dim.height;
	this.ctx.moveTo(this.pos.x,this.pos.y);
	this.clear();
};
image_look.prototype.draw=function(x,y){
	this.ctx.beginPath();
	this.ctx.strokeStyle=this.line;
	this.ctx.moveTo(this.pos.x,this.pos.y);
	this.pos.x+=x;
	this.pos.y+=y;
	this.ctx.lineTo(this.pos.x,this.pos.y);
	this.ctx.stroke();
	this.ctx.closePath();
	if(this.pos.x>this.ctx.canvas.width){
		this.pos.x=0;
		if(y<-1)y=y*-1;
		this.pos.y+=y*2;		
	}
	if (this.pos.y>this.ctx.canvas.height){
		this.pos.y=20;
		this.clear();
	}
};
image_look.prototype.clear=function(){
	this.ctx.fillStyle = this.bg;
	this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
}

image_look.prototype.zigzag = function(length,amt){
	for(var i=0;i<amt;i++){
		this.draw(length,length);
		this.draw(length,-length);
	}
}