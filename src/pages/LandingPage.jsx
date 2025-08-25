import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TiltCard from "../components/TiltCard.jsx";
import ParticleBackground from "../components/ParticleBackground.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import AnimatedCounter from "../components/AnimatedCounter.jsx";
import FloatingIcons from "../components/FloatingIcons.jsx";

const LandingPage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [stats, setStats] = useState({
        plantsAnalyzed: 0,
        diseasesDetected: 0,
        expertsAvailable: 0,
        accuracy: 0
    });

    // Animated statistics
    useEffect(() => {
        const targetStats = {
            plantsAnalyzed: 15420,
            diseasesDetected: 89,
            expertsAvailable: 24,
            accuracy: 94.8
        };

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepDuration = duration / steps;

        let currentStep = 0;
        const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            
            setStats({
                plantsAnalyzed: Math.floor(targetStats.plantsAnalyzed * progress),
                diseasesDetected: Math.floor(targetStats.diseasesDetected * progress),
                expertsAvailable: Math.floor(targetStats.expertsAvailable * progress),
                accuracy: Math.floor(targetStats.accuracy * progress * 10) / 10
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setStats(targetStats);
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, []);

    // Carousel for features
    const features = [
        {
            icon: "🔬",
            title: "AI-Powered Detection",
            description: "Advanced machine learning algorithms analyze plant images to identify diseases with high accuracy"
        },
        {
            icon: "⚡",
            title: "Instant Results",
            description: "Get disease diagnosis and treatment recommendations within seconds of uploading your image"
        },
        {
            icon: "👨‍🌾",
            title: "Expert Consultation",
            description: "Connect with certified agricultural experts for personalized advice and treatment plans"
        },
        {
            icon: "📱",
            title: "Mobile Friendly",
            description: "Access PlantDoc from anywhere - desktop, tablet, or mobile device for on-the-go plant care"
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [features.length]);

    const commonDiseases = [
        { name: "Leaf Spot", severity: "Medium", color: "warning" },
        { name: "Powdery Mildew", severity: "High", color: "danger" },
        { name: "Root Rot", severity: "High", color: "danger" },
        { name: "Aphid Infestation", severity: "Low", color: "success" },
        { name: "Bacterial Blight", severity: "Medium", color: "warning" },
        { name: "Fungal Infection", severity: "High", color: "danger" }
    ];

    return (
        <div>
            <ParticleBackground particleCount={30} color="#4caf50" />
            {/* Hero Section */}
            <div className="bg-success text-white py-5 parallax-container position-relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100">
                    <div className="floating-3d position-absolute" style={{ top: '10%', left: '10%', fontSize: '2rem', opacity: 0.1 }}>🌿</div>
                    <div className="floating-3d position-absolute" style={{ top: '20%', right: '15%', fontSize: '1.5rem', opacity: 0.1, animationDelay: '1s' }}>🍃</div>
                    <div className="floating-3d position-absolute" style={{ bottom: '30%', left: '20%', fontSize: '1.8rem', opacity: 0.1, animationDelay: '2s' }}>🌱</div>
                    <div className="floating-3d position-absolute" style={{ bottom: '10%', right: '10%', fontSize: '2.2rem', opacity: 0.1, animationDelay: '0.5s' }}>🌾</div>
                </div>
                
                <div className="container position-relative">
                    <div className="row align-items-center">
                        <div className="col-lg-6 parallax-layer">
                            <h1 className="display-3 fw-bold mb-4 glow-text">
                                🌱 <span className="holographic">PlantDoc</span>
                            </h1>
                            <p className="lead mb-4 fade-in">
                                Revolutionary AI-powered plant disease detection platform that helps farmers, 
                                gardeners, and agricultural professionals identify and treat plant diseases instantly.
                            </p>
                            <div className="d-grid gap-2 d-md-flex fade-in">
                                <Link to="/upload" className="btn btn-light btn-lg me-md-2 btn-morph magnetic">
                                    <i className="bi bi-camera me-2"></i>
                                    Start Diagnosis
                                </Link>
                                <Link to="/experts" className="btn btn-outline-light btn-lg btn-liquid magnetic">
                                    <i className="bi bi-people me-2"></i>
                                    Find Experts
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center parallax-layer">
                            <div className="position-relative">
                                <FloatingIcons icons={['🌱', '🍃', '🌿', '🌾', '🔬', '💡']} count={6} />
                                <div className="morph-blob position-absolute" style={{ 
                                    width: '300px', 
                                    height: '300px', 
                                    top: '50%', 
                                    left: '50%', 
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: -1,
                                    opacity: 0.3
                                }}></div>
                                <TiltCard intensity={15}>
                                    <div className="rotating-border">
                                        <img 
                                            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=400&fit=crop&crop=center" 
                                            alt="Healthy plants" 
                                            className="img-fluid rounded-3 shadow-lg breathe"
                                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </TiltCard>
                                <div className="position-absolute top-0 start-0 glass-morph text-dark px-3 py-2 rounded-end pulse-glow elastic-bounce">
                                    <i className="bi bi-shield-check me-1"></i>
                                    <span className="shadow-pulse">AI Powered</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="py-5 bg-light position-relative">
                <div className="container">
                    <div className="row text-center">
                        <ScrollReveal direction="up" delay={100}>
                            <div className="col-md-3 mb-4 stagger-fade">
                                <TiltCard className="h-100" intensity={8}>
                                    <div className="card border-0 bg-transparent magnetic flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front card-body">
                                                <h2 className="display-4 text-success fw-bold">
                                                    <AnimatedCounter end={stats.plantsAnalyzed} suffix="" />
                                                </h2>
                                                <p className="text-muted mb-0">Plants Analyzed</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <div>
                                                    <i className="bi bi-graph-up fs-1 mb-2"></i>
                                                    <p>Growing daily!</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={200}>
                            <div className="col-md-3 mb-4 stagger-fade">
                                <TiltCard className="h-100" intensity={8}>
                                    <div className="card border-0 bg-transparent magnetic flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front card-body">
                                                <h2 className="display-4 text-success fw-bold">
                                                    <AnimatedCounter end={stats.diseasesDetected} suffix="+" />
                                                </h2>
                                                <p className="text-muted mb-0">Diseases Detected</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <div>
                                                    <i className="bi bi-bug fs-1 mb-2"></i>
                                                    <p>Comprehensive database</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={300}>
                            <div className="col-md-3 mb-4 stagger-fade">
                                <TiltCard className="h-100" intensity={8}>
                                    <div className="card border-0 bg-transparent magnetic flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front card-body">
                                                <h2 className="display-4 text-success fw-bold">
                                                    <AnimatedCounter end={stats.expertsAvailable} />
                                                </h2>
                                                <p className="text-muted mb-0">Expert Consultants</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <div>
                                                    <i className="bi bi-people fs-1 mb-2"></i>
                                                    <p>Ready to help</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal direction="up" delay={400}>
                            <div className="col-md-3 mb-4 stagger-fade">
                                <TiltCard className="h-100" intensity={8}>
                                    <div className="card border-0 bg-transparent magnetic flip-card">
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front card-body">
                                                <h2 className="display-4 text-success fw-bold">
                                                    <AnimatedCounter end={stats.accuracy} suffix="%" />
                                                </h2>
                                                <p className="text-muted mb-0">Accuracy Rate</p>
                                            </div>
                                            <div className="flip-card-back">
                                                <div>
                                                    <i className="bi bi-bullseye fs-1 mb-2"></i>
                                                    <p>Highly accurate</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>

            {/* Features Carousel */}
            <div className="py-5 position-relative">
                <FloatingIcons icons={['⚡', '🎯', '🔬', '💡']} count={4} />
                <div className="container">
                    <ScrollReveal direction="up" delay={0}>
                        <div className="row justify-content-center mb-5">
                            <div className="col-lg-8 text-center">
                                <h2 className="display-5 fw-bold mb-3 slide-reveal">
                                    <i className="bi bi-stars me-2 text-warning wobble"></i>
                                    <span className="gradient-text">Why Choose PlantDoc?</span>
                                </h2>
                                <p className="lead text-muted">
                                    Advanced technology meets agricultural expertise to provide comprehensive plant health solutions
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="scale" delay={200}>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <TiltCard intensity={12}>
                                    <div className="card shadow-lg border-0 glass-morph animated-border">
                                        <div className="card-body text-center p-5">
                                            <div className="mb-4">
                                                <div className="morph-blob d-inline-block p-4" style={{ width: '120px', height: '120px' }}>
                                                    <span style={{ fontSize: '4rem' }} className="shadow-pulse">{features[currentSlide].icon}</span>
                                                </div>
                                            </div>
                                            <h3 className="card-title mb-3 holographic">{features[currentSlide].title}</h3>
                                            <p className="card-text lead">{features[currentSlide].description}</p>
                                            
                                            {/* Carousel indicators */}
                                            <div className="mt-4">
                                                {features.map((_, index) => (
                                                    <button
                                                        key={index}
                                                        className={`btn btn-sm rounded-circle me-2 magnetic skew-hover ${
                                                            index === currentSlide ? 'btn-success breathe' : 'btn-outline-secondary'
                                                        }`}
                                                        style={{ width: '12px', height: '12px' }}
                                                        onClick={() => setCurrentSlide(index)}
                                                    ></button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>

            {/* Common Diseases Section */}
            <div className="py-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <h3 className="fw-bold mb-4">
                                <i className="bi bi-bug me-2 text-danger"></i>
                                Common Plant Diseases We Detect
                            </h3>
                            <div className="row">
                                {commonDiseases.map((disease, index) => (
                                    <div key={index} className="col-md-6 mb-3">
                                        <TiltCard className="h-100" intensity={8}>
                                            <div className="card h-100 border-0 shadow-sm magnetic">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h6 className="card-title mb-0">{disease.name}</h6>
                                                        <span className={`badge bg-${disease.color} pulse-glow`}>
                                                            {disease.severity}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </TiltCard>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="fw-bold mb-4">
                                <i className="bi bi-lightbulb me-2 text-warning"></i>
                                How It Works
                            </h3>
                            <div className="timeline">
                                <div className="d-flex mb-4 fade-in">
                                    <div className="flex-shrink-0">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center pulse-glow magnetic" style={{ width: '40px', height: '40px' }}>
                                            1
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <h5>Upload Image</h5>
                                        <p className="text-muted mb-0">Take a clear photo of the affected plant leaf or area</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-4 fade-in" style={{ animationDelay: '0.2s' }}>
                                    <div className="flex-shrink-0">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center pulse-glow magnetic" style={{ width: '40px', height: '40px', animationDelay: '0.2s' }}>
                                            2
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <h5>AI Analysis</h5>
                                        <p className="text-muted mb-0">Our advanced AI analyzes the image for disease patterns</p>
                                    </div>
                                </div>
                                <div className="d-flex mb-4 fade-in" style={{ animationDelay: '0.4s' }}>
                                    <div className="flex-shrink-0">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center pulse-glow magnetic" style={{ width: '40px', height: '40px', animationDelay: '0.4s' }}>
                                            3
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <h5>Get Results</h5>
                                        <p className="text-muted mb-0">Receive instant diagnosis with treatment recommendations</p>
                                    </div>
                                </div>
                                <div className="d-flex fade-in" style={{ animationDelay: '0.6s' }}>
                                    <div className="flex-shrink-0">
                                        <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center pulse-glow magnetic" style={{ width: '40px', height: '40px', animationDelay: '0.6s' }}>
                                            4
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        <h5>Expert Support</h5>
                                        <p className="text-muted mb-0">Connect with agricultural experts for detailed consultation</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="py-5 bg-success text-white position-relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100">
                    <div className="floating-3d position-absolute" style={{ top: '20%', left: '5%', fontSize: '3rem', opacity: 0.1 }}>⚡</div>
                    <div className="floating-3d position-absolute" style={{ top: '60%', right: '10%', fontSize: '2.5rem', opacity: 0.1, animationDelay: '1s' }}>🚀</div>
                    <div className="floating-3d position-absolute" style={{ bottom: '20%', left: '15%', fontSize: '2rem', opacity: 0.1, animationDelay: '2s' }}>💡</div>
                </div>
                
                <div className="container text-center position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h2 className="display-5 fw-bold mb-3 glow-text">Ready to Protect Your Plants?</h2>
                            <p className="lead mb-4 fade-in">
                                Join thousands of farmers and gardeners who trust PlantDoc for their plant health needs
                            </p>
                            <div className="d-grid gap-2 d-md-flex justify-content-md-center fade-in">
                                <Link to="/upload" className="btn btn-light btn-lg me-md-2 btn-morph magnetic">
                                    <i className="bi bi-camera me-2"></i>
                                    Start Free Diagnosis
                                </Link>
                                <Link to="/about" className="btn btn-outline-light btn-lg btn-liquid magnetic">
                                    <i className="bi bi-info-circle me-2"></i>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;