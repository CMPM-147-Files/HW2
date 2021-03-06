/**
 * @author Kate Compton
 */
define(["./particles/particle", "common"], function(Particle, common) {'use strict';
    // utility fuctions
    function heightToColor(z) {

        var color = new common.KColor(offset0 + .7 + .4 * Math.sin(3 * z + offset1), .5, .8);
        color.shade(-.3 + .5 * Math.sin(z * 12 + offset0) + .4 * z);
        return color;
    };

    function getHeight(pctX, pctY, v) {

        var dx = 2 * (pctX - .5);
        var dy = 2 * (pctY - .5);
        var d = Math.sqrt(dx * dx + dy * dy);
        d = d * 2 + 1;

        var r = .038;
        var theta = 10 * utilities.noise(pctX * 2.7, pctY * 2.7 + 30);

        return .4 * utilities.noise(pctX * .7, pctY * .7 + 20, offset2) + Math.abs(utilities.noise(pctX * 2 + r * Math.cos(theta), pctY * 2 + r * Math.sin(theta), offset1) / d);
    };

    return {

        drawDots : function(g, count) {
            for (var i = 0; i < count; i++) {
                var pct = i / count;
                g.noStroke();
                var r = Math.random() * 50 + 20;
                g.fill(Math.random(), .3, pct, 10 / r);
                g.ellipse(Math.random() * g.width, Math.random() * g.height, r, r);
            }
        },

        drawGrid : function(g) {
            var w = g.width;
            var h = g.height;

            console.log(w + " " + h);

            var spacing = 5;
            var rows = Math.round(h / spacing) + 1;
            var columns = Math.round(w / spacing) + 1;
			
			var scale = .005;

            // Iterate through all the pixels of a w by h rectangle, starting at (x, y)
            for (var i = 0; i < rows; i++) {
                var y = i * spacing;
                for (var j = 0; j < columns; j++) {
                    var r = spacing * 1;
                    var x = j * spacing;

                    g.noStroke();
					
					var size = 20;
					var theta = 10 * utilities.noise(x * scale * .3, y * scale * .3 + 100);
					
					var x0 = x + size*Math.cos(theta);
					var y0 = y + size*Math.sin(theta);
					
					var h = utilities.noise(x0 * scale, y0 * scale);
					
					var color = new common.KColor(.7, 1, 1);
					
                    // g.fill(Math.random(), .7, 1);
					
					color.fill(g, h, 0);
                    g.rect(x, y, r, r);

                }
            }

        },
		
		drawWithMouse : function(g) {
			var w = g.width;
            var h = g.height;
			var x = g.mouse.x;
			var y = g.mouse.y;
			
			var theta = 10 * utilities.noise(x * .005 * .3, y * .005 * .3 + 100);
			
			
			// var color = new common.KColor(g.newBright, 1, g.newHue);
			var color = new common.KColor(g.newHue, 1, g.newBright);
			
			// Loops are used for circle drawing to that the pixels within the circle will have different colors
			
			// Make hue and color change based on direction of drag
			
			
			var radius = g.drawRad;
			//var numPoints = Math.PI * radius * radius;
			//var angle = Math.PI * 2/numPoints;

			for(var i = 0;i<radius;i++) {
				var numPoints = 2 * Math.PI * radius;
				var angle = Math.PI * 2/numPoints;
				for (var j = 0; j < numPoints; j++) {
					
					var newX = i*Math.sin(angle*j) + x;
					var newY = i*Math.cos(angle*j) + y;
				
					var x0 = newX + 20*Math.cos(theta);
					var y0 = newY + 20*Math.sin(theta);
					
					var h = utilities.noise(x0 * .005, y0 * .005);
			
					color.fill(g, h, 0);
				
					g.rect(newX, newY, 1, 1);
				}
			}
			
			/*
			for(var i= 0;i<numPoints;i++) {
				// g.point(radius*Math.sin(angle*i),radius*Math.cos(angle*i));
				g.rect(radius*Math.sin(angle*i) + x,radius*Math.cos(angle*i) + y, 1, 1);
			}*/
			
			
			/*
			for (var i = 0; i < numPoints; i++) {
				for (var j = 0; j < numPoints; j++) {
					g.rect(radius * Math.sin(angle * i) + x, radius * Math.cos(angle * j) + y, 1, 1);
					// console.log(radius * Math.sin(i) + x);
				}
			}*/

			
			
			// g.point(x, y);
			
			//g.rect(x, y, 1, 1);
		},

        // 3d things
        setTerrainToHeight : function(g) {

            // Set the terrain to some function
            app.threeScene.terrainGeometry.setToFunction(function(pctX, pctY, v) {
                v.x = (pctX - .5) * 90;
                v.y = (pctY - .5) * 90;
                v.z = 50 * getHeight(pctX, pctY);
            });

        },

        // Set the terrain to use the canvas texture from processing
        setTerrainTextureToCanvas : function() {
            app.threeScene.setCanvasTexture();
        },
    };

});
