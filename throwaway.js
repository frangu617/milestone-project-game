function createBullet(x, y, clickX, clickY) { // Create a new bullet object with the given x and y coordinates let bullet = { x: x, y: y, speed: 0.05 };

    // Calculate the angle between the bullet and the mouse click using Math.atan2 let angle = Math.atan2(clickY - y, clickX - x);
    
    // Calculate the x and y components of the bullet’s velocity using Math.cos and Math.sin bullet.velocityX = Math.cos(angle) * bullet.speed; bullet.velocityY = Math.sin(angle) * bullet.speed;
    
    // Return the bullet object return bullet; }
    
    function moveBullets(bullet) { // Update the bullet’s position by adding its velocity to its coordinates bullet.x += bullet.velocityX; bullet.y += bullet.velocityY; }