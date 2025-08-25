import { useState, useRef, useEffect } from 'react';

const Card3D = ({ 
    children, 
    className = '', 
    hoverEffect = 'tilt',
    glowColor = '#4caf50',
    intensity = 15 
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * intensity;
            const rotateY = (centerX - x) / centerX * intensity;
            
            setMousePosition({ x: rotateX, y: rotateY });
            
            if (hoverEffect === 'tilt') {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            } else if (hoverEffect === 'float') {
                card.style.transform = `translateY(-10px) scale(1.02)`;
            } else if (hoverEffect === 'glow') {
                card.style.boxShadow = `0 0 30px ${glowColor}66`;
            }
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
            card.style.transition = 'none';
        };

        const handleMouseLeave = () => {
            setIsHovered(false);
            card.style.transition = 'transform 0.5s ease-out, box-shadow 0.3s ease-out';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.boxShadow = '';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [hoverEffect, glowColor, intensity]);

    return (
        <div 
            ref={cardRef}
            className={`card-3d ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s ease-out, box-shadow 0.3s ease-out',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated background gradient */}
            <div 
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: `linear-gradient(45deg, ${glowColor}11, transparent, ${glowColor}11)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1
                }}
            />
            
            {/* Light reflection effect */}
            <div 
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    background: `linear-gradient(${mousePosition.y * 2 + 45}deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />
            
            <div style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </div>
        </div>
    );
};

export default Card3D;