// ------------------------------------------------------------
// How To Make A HTML5 Canvas Game
// (c) 2015 Rembound.com
// http://rembound.com/articles/how-to-make-a-html5-canvas-game
// ------------------------------------------------------------

// The function gets called when the window is fully loaded
window.onload = function() {
    // Get the canvas and context
    var canvas = document.getElementById("viewport"); 
    var context = canvas.getContext("2d");
    
    // Timing and frames per second
    var lastframe = 0;
    var fpstime = 0;
    var framecount = 0;
    var fps = 0;
    
    // Level properties
    var level = {
        x: 1,
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
    };
    
    // Square
    var square = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        xdir: 0,
        ydir: 0,
        speed: 0
    }
    
    // Score
    var score = 0;

    // Initialize the game
    function init() {
        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);
        
        // Initialize the square
        square.width = 100;
        square.height = 100;
        square.x = level.x + (level.width - square.width) / 2;
        square.y = level.y + (level.height - square.height) / 2;
        square.xdir = 1;
        square.ydir = 1;
        square.speed = 200;
        
        // Initialize the score
        score = 0;
    
        // Enter main loop
        main(0);
    }
    
    // Main loop
    function main(tframe) {
        // Request animation frames
        window.requestAnimationFrame(main);
        
        // Update and render the game
        update(tframe);
        render();
    }
    
    // Update the game state
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        
        // Update the fps counter
        updateFps(dt);
        
        // Move the square, time-based
        square.x += dt * square.speed * square.xdir;
        square.y += dt * square.speed * square.ydir;
        
        // Handle left and right collisions with the level
        if (square.x <= level.x) {
            // Left edge
            square.xdir = 1;
            square.x = level.x;
        } else if (square.x + square.width >= level.x + level.width) {
            // Right edge
            square.xdir = -1;
            square.x = level.x + level.width - square.width;
        }
        
        // Handle top and bottom collisions with the level
        if (square.y <= level.y) {
            // Top edge
            square.ydir = 1;
            square.y = level.y;
        } else if (square.y + square.height >= level.y + level.height) {
            // Bottom edge
            square.ydir = -1;
            square.y = level.y + level.height - square.height;
        }
    }
    
    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);
            
            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }
        
        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }
    
    // Render the game
    function render() {
        // Draw the frame
        drawFrame();
        
        // Draw the square
        context.fillStyle = "#ff8080";
        context.fillRect(square.x, square.y, square.width, square.height);
        
        // Draw score inside the square
        context.fillStyle = "#ffffff";
        context.font = "38px Verdana";
        var textdim = context.measureText(score);
        context.fillText(score, square.x+(square.width-textdim.width)/2, square.y+65);
    }
    
    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#d0d0d0";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#e8eaec";
        context.fillRect(1, 1, canvas.width-2, canvas.height-2);
        
        // Draw header
        context.fillStyle = "#303030";
        context.fillRect(0, 0, canvas.width, 65);
        
        // Draw title
        context.fillStyle = "#ffffff";
        context.font = "24px Verdana";
        context.fillText("HTML5 Canvas Bouncing Square - Rembound.com", 10, 30);
        
        // Display fps
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 13, 50);
    }
    
    // Mouse event handlers
    function onMouseMove(e) {}
    
    function onMouseDown(e) {
        // Get the mouse position
        var pos = getMousePos(canvas, e);
        
        // Check if we clicked the square
        if (pos.x >= square.x && pos.x < square.x + square.width &&
            pos.y >= square.y && pos.y < square.y + square.height) {
            
            // Increase the score
            score += 1;
            
            // Increase the speed of the square by 10 percent
            square.speed *= 1.1;
            
            // Give the square a random position
            square.x = Math.floor(Math.random()*(level.x+level.width-square.width));
            square.y = Math.floor(Math.random()*(level.y+level.height-square.height));
            
            // Give the square a random direction
            square.xdir = Math.floor(Math.random() * 2) * 2 - 1;
            square.ydir = Math.floor(Math.random() * 2) * 2 - 1;
        }
    }
    
    function onMouseUp(e) {}
    function onMouseOut(e) {}
    
    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left)/(rect.right - rect.left)*canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top)*canvas.height)
        };
    }
    
    // Call init to start the game
    init();
};