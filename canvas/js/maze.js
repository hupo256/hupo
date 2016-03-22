var canvas = document.getElementById('canvas'),
	c = canvas.getContext('2d');
	c.fillStyle = '#ccc';
var particles = [];
//var tick = 0;
function loop() {
    createParticles();
    updateParticles();
    killParticles();
    drawParticles();
}

//生成角色
function createParticles() {
    //check on every 10th tick check
	//console.log(tick);
    //if(tick % 10 == 0) {
        if(particles.length < 10) {
            particles.push({
				x: Math.random()*canvas.width,
				y: 0,
				speed: 2+Math.random()*5, //between 2 and 5
				radius: 2+Math.random()*8  //between 5 and 8
            });
        }
   // }
}

//刷新角色的坐标
function updateParticles() {
    for(var i in particles) {
        var part = particles[i];
        part.y += part.speed;
    }
}

//归零角色坐标
function killParticles() {
    for(var i in particles) {
        var part = particles[i];
        if(part.y > canvas.height) {
            part.y = 0;
        }
    }
}

//绘出角色
//将角色的所有属性放到一个对象里面
//每次绘出对象之前，根据对象里的信息来刷新对象
//根据刷新之后的对象值来绘出角色 
function drawParticles() {
    var c = canvas.getContext('2d');
	//每次都刷一次柒，这个跟clearRect()是一样的效果，但后者效率应该更高一些
    //c.fillStyle = "#000";
    //c.fillRect(0,0,canvas.width,canvas.height);
	
	c.clearRect(0, 0, 800, 600);	
    for(var i in particles) {
        var part = particles[i];  
        c.beginPath();
        c.arc(part.x,part.y, part.radius, 0, Math.PI*2);
        c.closePath();     
        c.fill();
    }
}
setInterval(loop,30);

var zb = canvas.getBoundingClientRect();
console.log(zb);

setTimeout(function(){
	console.log(particles);
	console.log(particles.length);
},3000);