import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Snackbar } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
 
const TYPING_TEXTS = [
    "Connect with anyone, anywhere.",
    "HD Video & Crystal Clear Audio.",
    "Secure. Simple. Seamless.",
    "Your meetings, your way."
];

export default function Authentication() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [typedText, setTypedText] = React.useState('');
    const [textIndex, setTextIndex] = React.useState(0);
    const [charIndex, setCharIndex] = React.useState(0);
    const [deleting, setDeleting] = React.useState(false);
    const [particles, setParticles] = React.useState([]);
    const [bgImage, setBgImage] = React.useState('');

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    // Random background image
    React.useEffect(() => {
        setBgImage(`https://picsum.photos/1920/1080?t=${Date.now()}`);
    }, []);

    // Typing animation
    React.useEffect(() => {
        const current = TYPING_TEXTS[textIndex];
        let timeout;
        if (!deleting && charIndex <= current.length) {
            timeout = setTimeout(() => {
                setTypedText(current.slice(0, charIndex));
                setCharIndex(c => c + 1);
            }, 80);
        } else if (!deleting && charIndex > current.length) {
            timeout = setTimeout(() => setDeleting(true), 1500);
        } else if (deleting && charIndex >= 0) {
            timeout = setTimeout(() => {
                setTypedText(current.slice(0, charIndex));
                setCharIndex(c => c - 1);
            }, 40);
        } else {
            setDeleting(false);
            setTextIndex(i => (i + 1) % TYPING_TEXTS.length);
        }
        return () => clearTimeout(timeout);
    }, [charIndex, deleting, textIndex]);

    // Particles
    React.useEffect(() => {
        const p = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 3,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1,
        }));
        setParticles(p);
    }, []);

    let handleAuth = async () => {
        try {
            if (formState === 0) await handleLogin(username, password);
            if (formState === 1) {
                let result = await handleRegister(name, username, password);
                setUsername(''); setPassword('');
                setMessage(result); setOpen(true);
                setError(''); setFormState(0);
            }
        } catch (err) {
            setError(err.response.data.message);
        }
    }

    return (
        <>
        <CssBaseline />
        <style>{`
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            @keyframes fadeSlide {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            @keyframes pulse {
                0%, 100% { box-shadow: 0 0 0 0 #1a73e844; }
                50% { box-shadow: 0 0 0 12px #1a73e800; }
            }
            @keyframes gradientMove {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            .auth-input:focus {
                border-color: #1a73e8 !important;
                background: #fff !important;
                box-shadow: 0 0 0 4px #1a73e822 !important;
            }
            .auth-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px #1a73e866 !important;
            }
            .toggle-btn:hover {
                opacity: 0.85;
            }
        `}</style>

        <div style={{
            display: 'flex', height: '100vh',
            fontFamily: "'Segoe UI', sans-serif",
        }}>

            {/* LEFT — Animated Background */}
            <div style={{
                flex: '0 0 55%',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: bgImage ? `url(${bgImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                {/* Dark overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(135deg, #1a73e8dd, #0d47a1ee)',
                }} />

                {/* Floating Particles */}
                {particles.map(p => (
                    <div key={p.id} style={{
                        position: 'absolute',
                        left: `${p.x}%`, top: `${p.y}%`,
                        width: p.size, height: p.size,
                        borderRadius: '50%',
                        background: '#ffffff',
                        opacity: p.opacity,
                        animation: `float ${p.speed + 2}s ease-in-out infinite`,
                        animationDelay: `${p.speed * 0.5}s`
                    }} />
                ))}

                {/* Content */}
                <div style={{
                    position: 'relative', zIndex: 2,
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center',
                    height: '100%', padding: '60px', color: '#fff'
                }}>
                    {/* Logo */}
                    <div style={{
                        display: 'flex', alignItems: 'center',
                        gap: 14, marginBottom: 40,
                        animation: 'fadeSlide 0.8s ease'
                    }}>
                        <div style={{
                            width: 58, height: 58, background: '#fff',
                            borderRadius: 16, display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            animation: 'pulse 2s infinite'
                        }}>
                            <VideoCallIcon style={{ color: '#1a73e8', fontSize: 34 }} />
                        </div>
                        <span style={{ fontSize: 36, fontWeight: 800 }}>ZoomApp</span>
                    </div>

                    {/* Typing Text */}
                    <h2 style={{
                        fontSize: 32, fontWeight: 700,
                        textAlign: 'center', minHeight: 80,
                        margin: 0
                    }}>
                        {typedText}
                        <span style={{
                            borderRight: '3px solid #fff',
                            marginLeft: 2,
                            animation: 'pulse 0.8s infinite'
                        }} />
                    </h2>

                    {/* Features */}
                    <div style={{
                        marginTop: 48, display: 'flex',
                        flexDirection: 'column', gap: 16,
                        width: '100%', maxWidth: 340
                    }}>
                        {[
                            { icon: <VideoCallIcon />, text: 'HD Video & Audio Calls' },
                            { icon: <PeopleIcon />, text: 'Up to 100 Participants' },
                            { icon: <SecurityIcon />, text: 'End-to-End Encrypted' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center',
                                gap: 14, background: '#ffffff18',
                                backdropFilter: 'blur(10px)',
                                padding: '14px 20px', borderRadius: 14,
                                border: '1px solid #ffffff22',
                                animation: `fadeSlide 0.6s ease ${i * 0.15}s both`
                            }}>
                                {item.icon}
                                <span style={{ fontSize: 15, fontWeight: 500 }}>
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT — Form */}
            <div style={{
                flex: 1, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: '#fff', padding: '40px',
            }}>
                <div style={{
                    width: '100%', maxWidth: 380,
                    animation: 'fadeSlide 0.6s ease'
                }}>
                    <h2 style={{
                        fontSize: 28, fontWeight: 700,
                        color: '#1a1a2e', marginBottom: 6
                    }}>
                        {formState === 0 ? 'Welcome Back! ' : 'Get Started! '}
                    </h2>
                    <p style={{ color: '#999', marginBottom: 28, fontSize: 15 }}>
                        {formState === 0
                            ? 'Login to join your meetings'
                            : 'Create your free account today'}
                    </p>

                    {/* Toggle */}
                    <div style={{
                        display: 'flex', background: '#f0f4ff',
                        borderRadius: 12, padding: 5, marginBottom: 28
                    }}>
                        {['Sign In', 'Sign Up'].map((label, i) => (
                            <button key={i}
                                className="toggle-btn"
                                onClick={() => {
                                    setFormState(i);
                                    setError('');
                                }}
                                style={{
                                    flex: 1, padding: '11px',
                                    border: 'none', borderRadius: 9,
                                    cursor: 'pointer', fontWeight: 600,
                                    fontSize: 14, transition: 'all 0.3s',
                                    background: formState === i ? '#1a73e8' : 'transparent',
                                    color: formState === i ? '#fff' : '#999',
                                    boxShadow: formState === i
                                        ? '0 4px 14px #1a73e855' : 'none'
                                }}>
                                {label}
                            </button>
                        ))}
                    </div>

                    {/* Form Fields */}
                    <div style={{ animation: 'fadeSlide 0.4s ease' }}>
                        {formState === 1 &&
                            <input className="auth-input"
                                placeholder="Full Name" value={name}
                                onChange={(e) => setName(e.target.value)}
                                style={inputStyle} />
                        }
                        <input className="auth-input"
                            placeholder="Username" value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={inputStyle} />
                       <input className="auth-input"
                            placeholder="Password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={inputStyle} />
                    </div>

                    {error &&
                        <p style={{
                            color: '#e53935', fontSize: 13,
                            marginBottom: 12, padding: '8px 12px',
                            background: '#ffebee', borderRadius: 8
                        }}>
                            ⚠️ {error}
                        </p>
                    }

                    <button className="auth-btn" onClick={handleAuth}
                        style={{
                            width: '100%', padding: '14px',
                            background: 'linear-gradient(135deg, #1a73e8, #0d47a1)',
                            backgroundSize: '200% 200%',
                            animation: 'gradientMove 3s ease infinite',
                            border: 'none', borderRadius: 12,
                            color: '#fff', fontWeight: 700,
                            fontSize: 16, cursor: 'pointer',
                            transition: 'all 0.3s', marginTop: 4,
                            boxShadow: '0 4px 20px #1a73e844'
                        }}>
                        {formState === 0 ? '🎥 Join Now' : ' Create Account'}
                    </button>

                    <p style={{
                        textAlign: 'center', color: '#ccc',
                        fontSize: 12, marginTop: 24
                    }}>
                        By continuing you agree to our Terms & Privacy Policy
                    </p>
                </div>
            </div>
        </div>

        <Snackbar open={open} autoHideDuration={4000}
            message={message} onClose={() => setOpen(false)} />
        </>
    );
}

const inputStyle = {
    width: '100%', padding: '13px 16px',
    marginBottom: 16, background: '#f8faff',
    border: '2px solid #e8ecf4', borderRadius: 10,
    color: '#333', fontSize: 15, outline: 'none',
    boxSizing: 'border-box', transition: 'all 0.3s'
};