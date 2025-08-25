import { useEffect, useRef } from 'react';

const WaveBackground = ({ 
    color = '#4caf50', 
    opacity = 0.1, 
    speed = 0.02,
    amplitude = 50,
    frequency = 0.01 
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let time = 0;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Create multiple wave layers
            for (let layer = 0; layer < 3; layer++) {
                ctx.beginPath();
                ctx.moveTo(0, canvas.height / 2);
                
                for (let x = 0; x <= canvas.width; x += 5) {
                    const y = canvas.height / 2 + 
                             Math.sin(x * frequency + time + layer * Math.PI / 3) * amplitude * (1 - layer * 0.3) +
                             Math.sin(x * frequency * 2 + time * 1.5 + layer * Math.PI / 2) * amplitude * 0.5 * (1 - layer * 0.3);
                    ctx.lineTo(x, y);
                }
                
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, `${color}00`);
                gradient.addColorStop(0.5, `${color}${Math.floor(opacity * 255 * (1 - layer * 0.3)).toString(16).padStart(2, '0')}`);
                gradient.addColorStop(1, `${color}00`);
                
                ctx.fillStyle = gradient;
                ctx.fill();
            }
            
            time += speed;
            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [color, opacity, speed, amplitude, frequency]);

    return (
        <canvas
            ref={canvasRef}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
                zIndex: -1,
                pointerEvents: 'none'
            }}
        />
    );
};

export default WaveBackground;