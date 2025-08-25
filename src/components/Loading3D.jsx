import React from 'react';

const Loading3D = ({ size = 60, color = '#4caf50', text = 'Loading...' }) => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center p-4">
            <div className="position-relative mb-3">
                {/* Main spinning ring */}
                <div 
                    className="border border-3 rounded-circle position-relative"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderColor: `${color}33`,
                        borderTopColor: color,
                        animation: 'spin 1s linear infinite'
                    }}
                >
                    {/* Inner pulsing dot */}
                    <div 
                        className="position-absolute top-50 start-50 translate-middle rounded-circle"
                        style={{
                            width: `${size * 0.3}px`,
                            height: `${size * 0.3}px`,
                            backgroundColor: color,
                            animation: 'pulse 1.5s ease-in-out infinite'
                        }}
                    ></div>
                </div>
                
                {/* Orbiting particles */}
                <div 
                    className="position-absolute top-50 start-50 translate-middle"
                    style={{
                        width: `${size * 1.5}px`,
                        height: `${size * 1.5}px`,
                        animation: 'rotate 2s linear infinite reverse'
                    }}
                >
                    {[0, 1, 2].map((i) => (
                        <div
                            key={i}
                            className="position-absolute rounded-circle"
                            style={{
                                width: '8px',
                                height: '8px',
                                backgroundColor: color,
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 120}deg) translateX(${size * 0.75}px) translateY(-4px)`,
                                opacity: 0.7,
                                animation: `orbit${i} 2s ease-in-out infinite`
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            
            {text && (
                <div 
                    className="text-center fw-medium"
                    style={{ 
                        color: color,
                        animation: 'fadeInOut 2s ease-in-out infinite'
                    }}
                >
                    {text}
                </div>
            )}
            
            <style>
                {`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes pulse {
                    0%, 100% { 
                        transform: scale(1);
                        opacity: 1;
                    }
                    50% { 
                        transform: scale(1.2);
                        opacity: 0.7;
                    }
                }
                
                @keyframes orbit0 {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    33% { opacity: 1; transform: scale(1.3); }
                }
                
                @keyframes orbit1 {
                    0%, 100% { opacity: 0.7; transform: scale(1); }
                    66% { opacity: 1; transform: scale(1.3); }
                }
                
                @keyframes orbit2 {
                    0%, 100% { opacity: 1; transform: scale(1.3); }
                    33% { opacity: 0.7; transform: scale(1); }
                }
                
                @keyframes fadeInOut {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                `}
            </style>
        </div>
    );
};

export default Loading3D;