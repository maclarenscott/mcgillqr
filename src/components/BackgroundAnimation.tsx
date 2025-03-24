import React, { useEffect, useRef } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Time tracking for animations
    let startTime = Date.now();

    // Create grid points for the line network
    const gridPoints: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      size: number;
    }[] = [];

    const initGrid = () => {
      gridPoints.length = 0;
      
      // Increase points for more connections
      const maxPoints = Math.min(45, Math.floor((canvas.width * canvas.height) / 25000));
      
      for (let i = 0; i < maxPoints; i++) {
        // Random position anywhere on canvas
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        // Slower movement for better performance
        const speed = 0.1;
        const dx = (Math.random() - 0.5) * speed;
        const dy = (Math.random() - 0.5) * speed;
        const size = Math.random() * 1.2 + 0.5;
        
        gridPoints.push({ x, y, dx, dy, size });
      }
    };

    initGrid();

    // Draw the animation
    const draw = () => {
      // Clear canvas completely each frame with pure black
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Animation timing
      const elapsed = Date.now() - startTime;
      const pulseFactor = Math.sin(elapsed * 0.001) * 0.2 + 0.8; // 0.6 to 1.0
      
      // Move grid points
      for (const point of gridPoints) {
        point.x += point.dx;
        point.y += point.dy;
        
        // Boundary check - bounce off edges
        if (point.x <= 0 || point.x >= canvas.width) {
          point.dx = -point.dx;
        }
        if (point.y <= 0 || point.y >= canvas.height) {
          point.dy = -point.dy;
        }
      }
      
      // Draw connecting lines - increase connection distance
      const maxDistance = canvas.width * 0.35;
      
      // Remove shadow/glow effect
      ctx.shadowBlur = 0;
      
      // Main network
      for (let i = 0; i < gridPoints.length; i++) {
        const pointA = gridPoints[i];
        
        if (!pointA) continue;
        
        // Draw node point with pulsing effect - brighter red dots
        const nodeSize = pointA.size * pulseFactor;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 60, 60, ${0.6 * pulseFactor})`;
        ctx.arc(pointA.x, pointA.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Connect to nearby points
        for (let j = i + 1; j < gridPoints.length; j++) {
          const pointB = gridPoints[j];
          
          if (!pointB) continue;
          
          const dx = pointA.x - pointB.x;
          const dy = pointA.y - pointB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance - higher base opacity
            const opacity = 0.75 * (1 - (distance / maxDistance)) * pulseFactor;
            
            // Brighter red lines with varying opacity
            ctx.strokeStyle = `rgba(255, 40, 40, ${opacity})`;
            ctx.lineWidth = Math.max(0.5, 1.3 * opacity);
            
            ctx.beginPath();
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.stroke();
          }
        }
      }
      
      // Draw extra direct lines between some points for more connections
      const lineCount = Math.min(10, Math.floor(gridPoints.length / 3));
      for (let i = 0; i < lineCount; i++) {
        const startIdx = Math.floor(Math.random() * gridPoints.length);
        const endIdx = Math.floor(Math.random() * gridPoints.length);
        
        if (startIdx === endIdx) continue;
        
        const startPoint = gridPoints[startIdx];
        const endPoint = gridPoints[endIdx];
        
        if (!startPoint || !endPoint) continue;
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 30, 30, ${0.3 * pulseFactor})`;
        ctx.lineWidth = 0.8;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        ctx.stroke();
      }
      
      // Draw accent lines - more and brighter
      if (gridPoints.length > 5) {
        const accentLineCount = 5;
        
        for (let i = 0; i < accentLineCount; i++) {
          const startPoint = gridPoints[i % gridPoints.length];
          const endPoint = gridPoints[(i + Math.floor(gridPoints.length / 2)) % gridPoints.length]; // Connect across the canvas
          
          if (!startPoint || !endPoint) continue;
          
          // Wavy line effect with sine
          const segments = 15;
          const amplitude = 12 * pulseFactor;
          const frequency = elapsed * 0.0005 + i;
          
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 30, 30, ${0.4 * pulseFactor})`;
          ctx.lineWidth = 1.7 * pulseFactor;
          
          // Starting point
          ctx.moveTo(startPoint.x, startPoint.y);
          
          // Draw a wavy path between points
          for (let s = 1; s <= segments; s++) {
            const progress = s / segments;
            
            // Linear interpolation between points
            const x = startPoint.x + (endPoint.x - startPoint.x) * progress;
            const y = startPoint.y + (endPoint.y - startPoint.y) * progress;
            
            // Add sine wave displacement perpendicular to line
            const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x) + Math.PI/2;
            const wave = Math.sin(progress * Math.PI * 4 + frequency) * amplitude;
            
            const waveX = x + Math.cos(angle) * wave;
            const waveY = y + Math.sin(angle) * wave;
            
            ctx.lineTo(waveX, waveY);
          }
          
          ctx.stroke();
        }
      }
    };

    // Animation loop with limiting to 24fps for performance
    let lastTime = 0;
    let animationId: number;
    
    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate);
      
      // Limit to ~24fps for performance
      if (currentTime - lastTime > 42) { // 1000ms / 24fps ≈ 42ms
        draw();
        lastTime = currentTime;
      }
    };
    
    animate(0);

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      initGrid();
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.95,
        background: '#000000' // Pure black background
      }}
    />
  );
};

export default BackgroundAnimation; 