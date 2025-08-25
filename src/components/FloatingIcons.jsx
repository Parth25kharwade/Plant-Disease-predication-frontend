import { useEffect, useState } from 'react';

const FloatingIcons = ({ icons = ['🌱', '🍃', '🌿', '🌾'], count = 8 }) => {
    const [floatingElements, setFloatingElements] = useState([]);

    useEffect(() => {
        const elements = [];
        for (let i = 0; i < count; i++) {
            elements.push({
                id: i,
                icon: icons[Math.floor(Math.random() * icons.length)],
                left: Math.random() * 100,
                animationDelay: Math.random() * 5,
                animationDuration: 15 + Math.random() * 10,
                size: 1 + Math.random() * 1.5,
                opacity: 0.1 + Math.random() * 0.2
            });
        }
        setFloatingElements(elements);
    }, [count, icons]);

    return (
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none' }}>
            {floatingElements.map((element) => (
                <div
                    key={element.id}
                    className="position-absolute"
                    style={{
                        left: `${element.left}%`,
                        fontSize: `${element.size}rem`,
                        opacity: element.opacity,
                        animation: `floatUpDown ${element.animationDuration}s ease-in-out infinite`,
                        animationDelay: `${element.animationDelay}s`,
                        top: '100%'
                    }}
                >
                    {element.icon}
                </div>
            ))}
            <style>
                {`
                @keyframes floatUpDown {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        top: 100%;
                    }
                    50% {
                        transform: translateY(-20px) rotate(180deg);
                    }
                    100% {
                        transform: translateY(0) rotate(360deg);
                        top: -10%;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default FloatingIcons;