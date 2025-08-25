import { useState } from 'react';

const FloatingActionButton = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <button 
                className="fab"
                onClick={scrollToTop}
                title="Scroll to top"
            >
                <i className="bi bi-arrow-up"></i>
            </button>
            
            {/* Additional floating actions */}
            <div 
                className="position-fixed"
                style={{ 
                    bottom: '100px', 
                    right: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    transform: isExpanded ? 'translateY(0)' : 'translateY(100px)',
                    opacity: isExpanded ? 1 : 0,
                    transition: 'all 0.3s ease',
                    pointerEvents: isExpanded ? 'auto' : 'none'
                }}
            >
                <button 
                    className="btn btn-success rounded-circle"
                    style={{ width: '50px', height: '50px' }}
                    title="Quick Upload"
                >
                    <i className="bi bi-camera"></i>
                </button>
                <button 
                    className="btn btn-info rounded-circle"
                    style={{ width: '50px', height: '50px' }}
                    title="Find Experts"
                >
                    <i className="bi bi-people"></i>
                </button>
                <button 
                    className="btn btn-warning rounded-circle"
                    style={{ width: '50px', height: '50px' }}
                    title="Help"
                >
                    <i className="bi bi-question-circle"></i>
                </button>
            </div>
            
            {/* Toggle button for additional actions */}
            <button 
                className="position-fixed btn btn-outline-success rounded-circle"
                style={{ 
                    bottom: '100px', 
                    right: '30px',
                    width: '40px',
                    height: '40px',
                    fontSize: '12px'
                }}
                onClick={toggleExpanded}
                title="More actions"
            >
                <i className={`bi bi-${isExpanded ? 'x' : 'plus'}`}></i>
            </button>
        </>
    );
};

export default FloatingActionButton;