import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();
    
    return (
        <nav style={styles.navbar}>
            <div style={styles.logo}>
                <h2 style={{ margin: '0' }}>Budget Tracker</h2>
            </div>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Dashboard</Link>
                <Link to="/yearly" style={styles.link}>Yearly Overview</Link>
                <Link to="/settings" style={styles.link}>Settings</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#4CAF50',
        padding: '1rem',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: {
        flex: '0 0 auto'
    },
    links: {
        display: 'flex',
        gap: '2rem'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
    }
};

export default Navigation;