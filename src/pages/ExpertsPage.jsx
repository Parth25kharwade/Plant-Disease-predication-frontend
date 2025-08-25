import { useEffect, useState } from "react";
import { expertsAPI } from "../utils/api.js";
import Card3D from "../components/Card3D.jsx";
import ScrollReveal from "../components/ScrollReveal.jsx";
import WaveBackground from "../components/WaveBackground.jsx";
import InteractiveButton from "../components/InteractiveButton.jsx";
import FloatingIcons from "../components/FloatingIcons.jsx";

// Mock data for when backend is not available
const mockExperts = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "Plant Pathology",
        contact: "sarah.johnson@agri.edu",
        phone: "+1 (555) 123-4567",
        location: "Agricultural University",
        experience: "15 years",
        rating: 4.8,
        image: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=SJ"
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        specialty: "Crop Disease Management",
        contact: "m.chen@plantcare.org",
        phone: "+1 (555) 234-5678",
        location: "Plant Care Institute",
        experience: "20 years",
        rating: 4.9,
        image: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=MC"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Organic Plant Treatment",
        contact: "emily.r@organicfarm.com",
        phone: "+1 (555) 345-6789",
        location: "Green Valley Farm",
        experience: "12 years",
        rating: 4.7,
        image: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=ER"
    },
    {
        id: 4,
        name: "James Wilson",
        specialty: "Integrated Pest Management",
        contact: "j.wilson@ipm.gov",
        phone: "+1 (555) 456-7890",
        location: "Department of Agriculture",
        experience: "18 years",
        rating: 4.6,
        image: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=JW"
    }
];

const ExpertsPage = () => {
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // In your useEffect where you fetch experts
    useEffect(() => {
        const fetchExperts = async () => {
            try {
                const data = await expertsAPI.getExperts();
                setExperts(data);
            } catch (err) {
                console.error("Failed to fetch experts:", err.message);
                setError(`Failed to load experts from backend: ${err.message}. Showing sample data.`);
                // Fall back to mock data when backend is not available
                setExperts(mockExperts);
            } finally {
                setLoading(false);
            }
        };

        fetchExperts();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="text-center">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading experts...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="position-relative">
            <WaveBackground color="#4caf50" opacity={0.15} speed={0.01} />
            <FloatingIcons icons={['👨‍🔬', '🌱', '📞', '💡', '🎓']} count={6} />
            
            <div className="container mt-5">
                <ScrollReveal direction="up" delay={0}>
                    <div className="row">
                        <div className="col-12">
                            <div className="text-center mb-5">
                                <h1 className="display-4 gradient-text">
                                    <i className="bi bi-people-fill me-3 wobble"></i>
                                    <span className="holographic">Plant Disease Experts</span>
                                </h1>
                                <p className="lead text-muted typewriter">
                                    Connect with certified agricultural experts for professional plant disease consultation
                                </p>
                                {error && (
                                    <div className="alert alert-danger mt-3 glass-morph">
                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                        <strong>Connection Error:</strong> {error}
                                        <div className="mt-2">
                                            <small>Please ensure the backend server is running on port 3000.</small>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            <div className="row">
                {experts.map((expert, index) => (
                    <ScrollReveal key={expert.id} direction="up" delay={index * 100}>
                        <div className="col-lg-6 col-xl-4 mb-4 stagger-fade">
                            <Card3D 
                                className="card h-100 shadow-lg border-0 glass-morph"
                                hoverEffect="tilt"
                                glowColor="#4caf50"
                                intensity={12}
                            >
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="position-relative">
                                            <img 
                                                src={expert.image} 
                                                alt={expert.name}
                                                className="rounded-circle me-3 breathe"
                                                width="60"
                                                height="60"
                                                style={{ objectFit: 'cover' }}
                                            />
                                            <div className="position-absolute top-0 start-0 w-100 h-100 rounded-circle pulse-glow" style={{ opacity: 0.3 }}></div>
                                        </div>
                                        <div>
                                            <h5 className="card-title mb-1 shadow-pulse">{expert.name}</h5>
                                            <div className="text-warning mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <i 
                                                        key={i} 
                                                        className={`bi bi-star${i < Math.floor(expert.rating) ? '-fill' : ''} magnetic`}
                                                        style={{ animationDelay: `${i * 0.1}s` }}
                                                    ></i>
                                                ))}
                                                <span className="text-muted ms-2">({expert.rating})</span>
                                            </div>
                                        </div>
                                    </div>

                                <div className="mb-3">
                                    <h6 className="text-success">
                                        <i className="bi bi-award me-2"></i>
                                        Specialty
                                    </h6>
                                    <p className="text-muted mb-2">{expert.specialty}</p>
                                </div>

                                <div className="mb-3">
                                    <h6 className="text-success">
                                        <i className="bi bi-geo-alt me-2"></i>
                                        Location
                                    </h6>
                                    <p className="text-muted mb-2">{expert.location}</p>
                                </div>

                                <div className="mb-3">
                                    <h6 className="text-success">
                                        <i className="bi bi-clock me-2"></i>
                                        Experience
                                    </h6>
                                    <p className="text-muted mb-2">{expert.experience}</p>
                                </div>

                                <div className="mb-4">
                                    <h6 className="text-success">
                                        <i className="bi bi-envelope me-2"></i>
                                        Contact Information
                                    </h6>
                                    <p className="text-muted mb-1">
                                        <i className="bi bi-envelope-fill me-2"></i>
                                        {expert.contact}
                                    </p>
                                    <p className="text-muted mb-0">
                                        <i className="bi bi-telephone-fill me-2"></i>
                                        {expert.phone}
                                    </p>
                                </div>
                            </div>
                            
                                <div className="card-footer bg-transparent">
                                    <div className="d-grid gap-2">
                                        <InteractiveButton
                                            variant="primary"
                                            effect="morph"
                                            className="ripple"
                                            onClick={() => window.location.href = `mailto:${expert.contact}`}
                                        >
                                            <i className="bi bi-envelope me-2"></i>
                                            Contact Expert
                                        </InteractiveButton>
                                    </div>
                                </div>
                                </Card3D>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExpertsPage;