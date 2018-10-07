"use strict";

/* Get or create the application global variable */
var App = App || {};

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];

    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data
    var bounds = {};

    var pi = 3.147;

    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        var radius = (bounds.maxX - bounds.minX)/2.0 + 1;
        var height = (bounds.maxY - bounds.minY) + 1;

        // create a cylinder to contain the particle system
        //var geometry = new THREE.CylinderBufferGeometry( radius, radius, height, 32 );
        var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        // var material = new THREE.MeshNormalMaterial( {color: 0xffff00, wireframe: true} );
        // var cylinder = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

        // var geometry = new THREE.BufferGeometry();

        var positions = [];
        var colors = [];

        var color = new THREE.Color();
                var n = 1000, n2 = n / 2;


        for(var i = 0; i< data.length; i++) {
        var x = (data[i].X ) ;//* height + 2 * pi * radius * radius  ;
        var y = (data[i].Y );///radius ;//* height + 2 * pi * radius * radius  ;
        var z = (data[i].Z - height/2 );//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;



        // positions.push( x, y, z );
        //             // colors
        //     var colormax = 357.19;
        //     var colormin = 0;

        //             var cx = ( data[i].concentration / colormax ) ;
        //             var cy = ( data[i].concentration / colormax ) ;
        //             var cz = ( data[i].concentration / colormax );
        //             color.setRGB( cx, cy, cz );
        //             colors.push( color.r, color.g, color.b );

        geometry.vertices.push(new THREE.Vector3(x, z, y));
        // geometry.colors.push(new THREE.Vector3(cx, cy, cz))

    }

    // geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    //             geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    //             geometry.computeBoundingSphere();


        var material = new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
        // var material = new THREE.PointsMaterial({size:1, vertexColors: THREE.VertexColors});//, opacity:0.3});
        var cylinder = new THREE.Points(geometry, material);

        // var pointCloud = new THREE.Points(geometry, material);
        

    // geometry.verticesNeedUpdate = true;
    // geometry.computeVertexNormals();
    // geometry.elementsNeedUpdate = true;

    sceneObject.add(cylinder);
    // sceneObject.add(pointCloud);

        // add the containment to the scene
        //sceneObject.add(cylinder);
    console.log("now",scene.children);
    // sceneObject.remove(geometry);        
    };

    // creates the particle system
    self.createParticleSystem = function() {
        // console.log(data);
        // use self.data to create the particle systemss

        // var tmaterial = new THREE.PointsMaterial({
        //  color: 0xff0000,
        // size: 5,
        // opacity: 1
        // });

        // var tgeometry = new THREE.Geometry();
    // var pointCloud = new THREE.Points(tgeometry, tmaterial);
    
    };

    // data loading function
    self.loadData = function(file){

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {

                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2);

                // add the element to the data collection
                data.push({
                    // concentration density
                    concentration: Number(d.concentration),
                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points1),
                    Z: Number(d.Points2),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity1),
                    W: Number(d.velocity2)
                });
				// console.log(data);
            })
            // when done loading
            .get(function(error, rows, data) {
				//console.log("d is ", rowa.values );
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                // console.log(data);
                self.drawContainment();

                // create the particle system
                self.createParticleSystem();
            });
            // console.log(data);
			
    };
	
    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        initialize: function(file){
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        }
    };
	
	console.log("final",self.data);

    return publiclyAvailable;

};