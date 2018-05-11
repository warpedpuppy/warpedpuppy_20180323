export default function Spiral (THREE) {
	return {
		camera: '',
		scene: '',
		renderer: '',
		geometry: '',
		material: '', 
		spinningWheelMesh: '',
		collidableMeshList: [],
		balls: [],
		ballQ: 5,
		windowHeight: 400,
		animateBoolean: true,
		gravity: 0.03,
		init: function () {

			this.setup();

			this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		    this.renderer.setSize( window.innerWidth, this.windowHeight );
		    document.getElementById("tugtugCanvas").appendChild( this.renderer.domElement );

		    this.animate = this.animate.bind(this);
		    this.animate();
		    this.resize = this.resize.bind(this);
		    window.onresize = this.resize;
		},
		stop: function () {
			this.camera = undefined;
			this.animateBoolean = false;
			this.animate = undefined;
			this.renderer = undefined;
			window.onresize = undefined;
		},
		setup: function () {
			this.camera = null;
			this.scene = null;
			this.mesh = null;
			this.balls = [];
			this.collidableMeshList = [];
			this.pole_geometry = null;
			this.pole_material = null;
			this.geometry = null;
			this.material = null;

			this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / this.windowHeight, 1, 1000);
		    this.camera.position.z = 100;
		    this.camera.position.y = 10;
		 
		    this.scene = new THREE.Scene();
		 
		 	// central pole
		    this.pole_geometry = new THREE.CylinderGeometry( 5, 5, 200, 4, 4  );
			this.pole_material = new THREE.MeshBasicMaterial(  { color: 0xfefefe, wireframe: true, opacity: 0.5 } );
			this.pole_mesh = new THREE.Mesh( this.pole_geometry, this.pole_material );
			this.scene.add( this.pole_mesh );

			// platform
			this.geometry = new THREE.CylinderGeometry( 50, 50, 2, 20, 20  );
			this.material = new THREE.MeshBasicMaterial(  { color: 0xFF0000, wireframe: true} );
			this.spinningWheelMesh = new THREE.Mesh( this.geometry, this.material );
			this.scene.add( this.spinningWheelMesh );
			

			//ball
			for(let i = 0; i < this.ballQ; i++) {
				this.ball_geom = new THREE.SphereBufferGeometry( 4, 12, 12 );
				this.ball_material = new THREE.MeshBasicMaterial(  { color: 0xFFFF00} );
				this.ball_mesh = new THREE.Mesh( this.ball_geom, this.ball_material );
				this.ball_mesh.position.x = this.getXStart();
				this.ball_mesh.position.y = (Math.random())*100+100;
				this.ball_mesh.vy =  Math.random()*0.2;
				this.ball_mesh.vx = 0;
				this.ball_mesh.hit = false;
				this.scene.add( this.ball_mesh );
				this.collidableMeshList.push(this.ball_mesh);
				this.balls.push(this.ball_mesh)
			}
			
		 	this.originPoint = this.spinningWheelMesh.position.clone();
		   
		},
		resize: function () {
			this.camera.aspect = window.innerWidth / this.windowHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( window.innerWidth, this.windowHeight );
		},
		getXStart: function () {
			return Math.random()*30 + 10;
		},	
		animate: function () {


		    this.pole_mesh.rotation.y -= 0.02;
		    this.spinningWheelMesh.rotation.y += 0.02;
	
		   
		    for(let i = 0; i < this.ballQ; i++){
		    	this.balls[i].position.y -= this.balls[i].vy;
			    this.balls[i].position.x -= this.balls[i].vx;
				this.balls[i].vy += this.gravity;

			    if (this.balls[i].position.y < -100) {
			    	this.balls[i].position.y = (Math.random())*100+100;
			    	this.balls[i].position.x = this.getXStart();
			    	this.balls[i].vx = 0;
			    	this.balls[i].vy =  Math.random()*0.2;
			    	this.balls[i].hit = false;
			    	if (this.collidableMeshList.indexOf(this.balls[i]) === -1) {
			    		this.collidableMeshList.push(this.balls[i])
			    	}
			    }
		    }
		   

		   // COLLISION DETECTION
		   
		   for (let vertexIndex = 0; vertexIndex < this.spinningWheelMesh.geometry.vertices.length; vertexIndex++) {		
				let localVertex = this.spinningWheelMesh.geometry.vertices[vertexIndex].clone(),
				    globalVertex = localVertex.applyMatrix4( this.spinningWheelMesh.matrix ),
				    directionVector = globalVertex.sub( this.spinningWheelMesh.position ),
					ray = new THREE.Raycaster( this.originPoint, directionVector.clone().normalize()),
				    collisionResults = ray.intersectObjects( this.collidableMeshList );

				if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
					for(let j = 0; j < collisionResults.length; j++) {
						//console.log("Hit");
						this.collidableMeshList.splice(j, 1);
						collisionResults[j].object.vx = -2;
						collisionResults[j].object.vy = -1.5;
					}
				}
			}

			if(this.animateBoolean){
		    	requestAnimationFrame( this.animate );
		    	this.renderer.render( this.scene, this.camera );
		    }
		}
	}
}