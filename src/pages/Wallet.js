import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    // return <div>TrybeWallet</div>;
    return (
      <>
        <Header />
        <WalletForm />
      </>
    );
  }
}

export default Wallet;
