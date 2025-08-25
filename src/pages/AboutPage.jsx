import { useState } from "react";
import TiltCard from "../components/TiltCard.jsx";
import ApiDocumentation from "../components/ApiDocumentation.jsx";

const AboutPage = () => {
    const [activeTab, setActiveTab] = useState('mission');

    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Chief Technology Officer",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            bio: "PhD in Computer Science with 15+ years in AI and machine learning. Leading our AI development team.",
            expertise: ["Machine Learning", "Computer Vision", "Agricultural AI"]
        },
        {
            name: "Prof. Michael Chen",
            role: "Head of Agricultural Research",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            bio: "Professor of Plant Pathology with 20+ years of experience in plant disease research and diagnosis.",
            expertise: ["Plant Pathology", "Disease Diagnosis", "Agricultural Research"]
        },
        {
            name: "Emily Rodriguez",
            role: "Lead Software Engineer",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
            bio: "Full-stack developer specializing in scalable web applications and user experience design.",
            expertise: ["Full-Stack Development", "UI/UX Design", "Cloud Architecture"]
        },
        {
            name: "Dr. James Wilson",
            role: "Data Science Director",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            bio: "Data scientist with expertise in agricultural data analysis and predictive modeling.",
            expertise: ["Data Science", "Statistical Analysis", "Predictive Modeling"]
        }
    ];

    const milestones = [
        {
            year: "2020",
            title: "Company Founded",
            description: "PlantDoc was founded with a vision to revolutionize plant disease detection using AI technology."
        },
        {
            year: "2021",
            title: "First AI Model",
            description: "Launched our first machine learning model capable of detecting 25 common plant diseases."
        },
        {
            year: "2022",
            title: "Expert Network",
            description: "Built a network of certified agricultural experts for consultation services."
        },
        {
            year: "2023",
            title: "Mobile App Launch",
            description: "Released mobile applications for iOS and Android platforms."
        },
        {
            year: "2024",
            title: "Global Expansion",
            description: "Expanded services to over 50 countries with localized disease databases."
        }
    ];

    const values = [
        {
            icon: "🎯",
            title: "Accuracy",
            description: "We strive for the highest accuracy in disease detection through continuous model improvement and validation."
        },
        {
            icon: "🌱",
            title: "Sustainability",
            description: "Promoting sustainable agriculture practices through early disease detection and prevention."
        },
        {
            icon: "🤝",
            title: "Accessibility",
            description: "Making advanced plant disease detection technology accessible to farmers worldwide."
        },
        {
            icon: "🔬",
            title: "Innovation",
            description: "Continuously innovating with cutting-edge AI and machine learning technologies."
        }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div className="bg-success text-white py-5 position-relative overflow-hidden">
                {/* Animated Background Elements */}
                <div className="position-absolute top-0 start-0 w-100 h-100">
                    <div className="floating-3d position-absolute" style={{ top: '15%', left: '8%', fontSize: '2rem', opacity: 0.1 }}>🔬</div>
                    <div className="floating-3d position-absolute" style={{ top: '25%', right: '12%', fontSize: '1.8rem', opacity: 0.1, animationDelay: '1s' }}>🌿</div>
                    <div className="floating-3d position-absolute" style={{ bottom: '20%', left: '15%', fontSize: '2.2rem', opacity: 0.1, animationDelay: '2s' }}>💡</div>
                    <div className="floating-3d position-absolute" style={{ bottom: '15%', right: '8%', fontSize: '1.6rem', opacity: 0.1, animationDelay: '0.5s' }}>🚀</div>
                </div>
                
                <div className="container position-relative">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold mb-4 glow-text">About <span className="holographic">PlantDoc</span></h1>
                            <p className="lead fade-in">
                                We're on a mission to revolutionize agriculture through AI-powered plant disease detection, 
                                helping farmers and gardeners protect their crops and increase yields.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <ul className="nav nav-pills nav-fill mb-4" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'mission' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('mission')}
                                >
                                    <i className="bi bi-bullseye me-2"></i>
                                    Our Mission
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'team' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('team')}
                                >
                                    <i className="bi bi-people me-2"></i>
                                    Our Team
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'story' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('story')}
                                >
                                    <i className="bi bi-clock-history me-2"></i>
                                    Our Story
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'values' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('values')}
                                >
                                    <i className="bi bi-heart me-2"></i>
                                    Our Values
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button 
                                    className={`nav-link ${activeTab === 'api' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('api')}
                                >
                                    <i className="bi bi-code-slash me-2"></i>
                                    API Docs
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div className="container mb-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Mission Tab */}
                        {activeTab === 'mission' && (
                            <div className="fade-in">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h2 className="fw-bold mb-4">Empowering Agriculture with AI</h2>
                                        <p className="lead mb-4">
                                            At PlantDoc, we believe that technology can solve some of agriculture's biggest challenges. 
                                            Our mission is to democratize access to advanced plant disease detection technology.
                                        </p>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-success text-white rounded-circle p-2 me-3">
                                                        <i className="bi bi-check-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0">Early Detection</h6>
                                                        <small className="text-muted">Catch diseases before they spread</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-success text-white rounded-circle p-2 me-3">
                                                        <i className="bi bi-check-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0">Reduce Losses</h6>
                                                        <small className="text-muted">Minimize crop damage and losses</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-success text-white rounded-circle p-2 me-3">
                                                        <i className="bi bi-check-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0">Expert Guidance</h6>
                                                        <small className="text-muted">Connect with agricultural experts</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="bg-success text-white rounded-circle p-2 me-3">
                                                        <i className="bi bi-check-lg"></i>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0">Sustainable Farming</h6>
                                                        <small className="text-muted">Promote eco-friendly practices</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <img 
                                            src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop" 
                                            alt="Agricultural technology" 
                                            className="img-fluid rounded-3 shadow"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Team Tab */}
                        {activeTab === 'team' && (
                            <div className="fade-in">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold mb-3">Meet Our Expert Team</h2>
                                    <p className="lead text-muted">
                                        Our diverse team combines expertise in AI, agriculture, and software development
                                    </p>
                                </div>
                                <div className="row">
                                    {teamMembers.map((member, index) => (
                                        <div key={index} className="col-lg-6 mb-4">
                                            <TiltCard className="h-100" intensity={6}>
                                                <div className="card h-100 shadow-sm border-0 magnetic">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex align-items-center mb-3">
                                                            <img 
                                                                src={member.image} 
                                                                alt={member.name}
                                                                className="rounded-circle me-3 pulse-glow"
                                                                width="80"
                                                                height="80"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                            <div>
                                                                <h5 className="card-title mb-1">{member.name}</h5>
                                                                <p className="text-success mb-0 glow-text">{member.role}</p>
                                                            </div>
                                                        </div>
                                                        <p className="card-text mb-3">{member.bio}</p>
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {member.expertise.map((skill, skillIndex) => (
                                                                <span key={skillIndex} className="badge bg-light text-dark magnetic">
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TiltCard>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Story Tab */}
                        {activeTab === 'story' && (
                            <div className="fade-in">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold mb-3">Our Journey</h2>
                                    <p className="lead text-muted">
                                        From a small startup to a global platform serving thousands of farmers
                                    </p>
                                </div>
                                <div className="timeline">
                                    {milestones.map((milestone, index) => (
                                        <div key={index} className="row mb-4">
                                            <div className="col-md-2 text-center">
                                                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                    <strong>{milestone.year}</strong>
                                                </div>
                                            </div>
                                            <div className="col-md-10">
                                                <div className="card border-0 shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="card-title text-success">{milestone.title}</h5>
                                                        <p className="card-text">{milestone.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Values Tab */}
                        {activeTab === 'values' && (
                            <div className="fade-in">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold mb-3">Our Core Values</h2>
                                    <p className="lead text-muted">
                                        The principles that guide everything we do
                                    </p>
                                </div>
                                <div className="row">
                                    {values.map((value, index) => (
                                        <div key={index} className="col-lg-6 mb-4">
                                            <div className="card h-100 border-0 shadow-sm">
                                                <div className="card-body text-center p-4">
                                                    <div className="mb-3">
                                                        <span style={{ fontSize: '3rem' }}>{value.icon}</span>
                                                    </div>
                                                    <h4 className="card-title text-success mb-3">{value.title}</h4>
                                                    <p className="card-text">{value.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* API Documentation Tab */}
                        {activeTab === 'api' && (
                            <div className="fade-in">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bold mb-3">API Documentation</h2>
                                    <p className="lead text-muted">
                                        Technical documentation for our backend APIs
                                    </p>
                                </div>
                                <ApiDocumentation />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Statistics Section */}
            <div className="bg-light py-5">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-md-3 mb-4">
                            <h3 className="display-4 text-success fw-bold">50+</h3>
                            <p className="text-muted">Countries Served</p>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h3 className="display-4 text-success fw-bold">15K+</h3>
                            <p className="text-muted">Plants Analyzed</p>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h3 className="display-4 text-success fw-bold">89+</h3>
                            <p className="text-muted">Diseases Detected</p>
                        </div>
                        <div className="col-md-3 mb-4">
                            <h3 className="display-4 text-success fw-bold">94.8%</h3>
                            <p className="text-muted">Accuracy Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="fw-bold mb-4">Get in Touch</h2>
                            <p className="lead mb-4">
                                Have questions about PlantDoc? We'd love to hear from you.
                            </p>
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-light h-100">
                                        <div className="card-body text-center">
                                            <i className="bi bi-envelope-fill text-success fs-2 mb-3"></i>
                                            <h5>Email Us</h5>
                                            <p className="text-muted">contact@plantdoc.ai</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-light h-100">
                                        <div className="card-body text-center">
                                            <i className="bi bi-telephone-fill text-success fs-2 mb-3"></i>
                                            <h5>Call Us</h5>
                                            <p className="text-muted">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="card border-0 bg-light h-100">
                                        <div className="card-body text-center">
                                            <i className="bi bi-geo-alt-fill text-success fs-2 mb-3"></i>
                                            <h5>Visit Us</h5>
                                            <p className="text-muted">San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;