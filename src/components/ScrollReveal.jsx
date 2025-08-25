import { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, className = '', delay = 0, direction = 'up', distance = 50 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [delay]);

    const getInitialTransform = () => {
        switch (direction) {
            case 'up': return `translateY(${distance}px)`;
            case 'down': return `translateY(-${distance}px)`;
            case 'left': return `translateX(${distance}px)`;
            case 'right': return `translateX(-${distance}px)`;
            case 'scale': return 'scale(0.8)';
            case 'rotate': return 'rotateY(90deg)';
            default: return `translateY(${distance}px)`;
        }
    };

    const style = {
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) translateX(0) scale(1) rotateY(0)' : getInitialTransform(),
        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        transitionDelay: `${delay}ms`
    };

    return (
        <div ref={elementRef} className={className} style={style}>
            {children}
        </div>
    );
};

export default ScrollReveal;