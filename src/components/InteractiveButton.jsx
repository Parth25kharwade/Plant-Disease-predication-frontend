import { useState, useRef } from 'react';

const InteractiveButton = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    size = 'md', 
    effect = 'morph',
    className = '',
    disabled = false,
    ...props 
}) => {
    const [isClicked, setIsClicked] = useState(false);
    const [ripples, setRipples] = useState([]);
    const buttonRef = useRef(null);

    const handleClick = (e) => {
        if (disabled) return;

        // Create ripple effect
        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = {
            x,
            y,
            size,
            id: Date.now()
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);

        // Click animation
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);

        if (onClick) onClick(e);
    };

    const getVariantClasses = () => {
        switch (variant) {
            case 'primary':
                return 'btn-success';
            case 'secondary':
                return 'btn-outline-success';
            case 'light':
                return 'btn-light';
            case 'dark':
                return 'btn-dark';
            default:
                return 'btn-success';
        }
    };

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'btn-sm';
            case 'lg':
                return 'btn-lg';
            default:
                return '';
        }
    };

    const getEffectClasses = () => {
        switch (effect) {
            case 'morph':
                return 'btn-morph';
            case 'liquid':
                return 'btn-liquid';
            case 'magnetic':
                return 'magnetic';
            case 'glow':
                return 'pulse-glow';
            case 'skew':
                return 'skew-hover';
            default:
                return 'btn-morph';
        }
    };

    return (
        <button
            ref={buttonRef}
            className={`btn ${getVariantClasses()} ${getSizeClasses()} ${getEffectClasses()} position-relative overflow-hidden ${className} ${
                isClicked ? 'clicked' : ''
            } ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
            style={{
                transform: isClicked ? 'scale(0.95)' : 'scale(1)',
                transition: 'transform 0.1s ease'
            }}
            {...props}
        >
            {children}
            
            {/* Ripple effects */}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="position-absolute rounded-circle"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: ripple.size,
                        height: ripple.size,
                        background: 'rgba(255, 255, 255, 0.6)',
                        transform: 'scale(0)',
                        animation: 'ripple 0.6s linear',
                        pointerEvents: 'none'
                    }}
                />
            ))}
            
            <style>
                {`
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                .clicked {
                    animation: clickPulse 0.2s ease-out;
                }
                
                @keyframes clickPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
        </button>
    );
};

export default InteractiveButton;