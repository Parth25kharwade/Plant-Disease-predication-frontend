import { useEffect, useRef } from 'react';

const ParticleBackground = ({ particleCount = 50, color = '#4caf50' }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 3 + 1;
                this.opacity = Math.random() * 0.5 + 0.1;
                this.life = Math.random() * 100 + 50;
                this.maxLife = this.life;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life--;

                // Fade out as life decreases
                this.opacity = (this.life / this.maxLife) * 0.5;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Reset particle when life ends
                if (this.life <= 0) {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                    this.life = this.maxLife;
                    this.opacity = Math.random() * 0.5 + 0.1;
                }
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        particlesRef.current = particles;

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (1 - distance / 100) * 0.2;
                        ctx.strokeStyle = color;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [particleCount, color]);

    return (
        <canvas
            ref={canvasRef}
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{
                zIndex: -1,
                pointerEvents: 'none',
                opacity: 0.3
            }}
        />
    );
};

export default ParticleBackground;