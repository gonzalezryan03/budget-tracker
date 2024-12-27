import React from 'react';

const Navigation = () => {
    return (
        <nav style={StyleSheet.navbar}>
            <h2 style={{ margin: '0' }}>Budget Tracker</h2>
        </nav>
    );
};

const styles = {
    navbar: {
      backgroundColor: '#4CAF50',
      padding: '1rem',
      color: '#fff'
    }
};

export default Navigation;