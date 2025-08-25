import { useRef, useEffect } from 'react';

const TiltCard = ({ children, className = '', intensity = 10 }) => {
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
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleMouseLeave = () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        };

        const handleMouseEnter = () => {
            card.style.transition = 'none';
        };

        const handleTransitionEnd = () => {
            card.style.transition = 'transform 0.3s ease-out';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('transitionend', handleTransitionEnd);

        // Set initial transition
        card.style.transition = 'transform 0.3s ease-out';
        card.style.transformStyle = 'preserve-3d';

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('transitionend', handleTransitionEnd);
        };
    }, [intensity]);

    return (
        <div ref={cardRef} className={`tilt-card ${className}`}>
            {children}
        </div>
    );
};

export default TiltCard;