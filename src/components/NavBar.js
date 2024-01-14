import React from 'react';

const NavBar = ({connectWallet}) => {
    return (
        <nav>
            <button onClick={connectWallet}>Connect Wallet</button>
        </nav>
    );
}

export default NavBar;