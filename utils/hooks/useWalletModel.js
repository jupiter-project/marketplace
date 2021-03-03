import Web3 from 'web3';
import Web3Modal from 'web3modal';
import Authereum from 'authereum';
import Fortmatic from 'fortmatic';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useState } from 'react';

const useWalletModel = () => {
  const [loading, setLoading] = useState(false);

  const providerOptions = {
    metamask: {
      id: 'injected',
      name: 'MetaMask',
      type: 'injected',
      check: 'isMetaMask'
    },
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: 'INFURA_ID', // Required
        network: 'rinkeby',
        qrcodeModalOptions: {
          mobileLinks: [
            'rainbow',
            'metamask',
            'argent',
            'trust',
            'imtoken',
            'pillar'
          ]
        }
      }
    },
    authereum: {
      package: Authereum // required
    },
    fortmatic: {
      package: Fortmatic, // required
      options: {
        key: 'FORTMATIC_KEY' // required
      }
    }
  };

  return {
    get web3Loading() {
      return loading
    },

    async getweb3() {
      setLoading(true);
      try {
        const web3Modal = new Web3Modal({
          network: 'rinkeby',
          cacheProvider: true,
          providerOptions
        });
  
        const provider = await web3Modal.connect();
        provider.on('error', e => console.error('WS Error', e));
        provider.on('end', e => console.error('WS End', e));
        provider.on('disconnect', (error) => {
          console.log(error);
        });
        provider.on('connect', (info) => {
          console.log(info);
        });
  
        const web3 = new Web3(provider);
        setLoading(false);
        return web3;
      } catch (err) {
        setLoading(false);
        return null
      }
    },

    async disconnect() {
      const web3Modal = new Web3Modal({
        network: 'rinkeby',
        cacheProvider: true,
        providerOptions
      });
      await web3Modal.clearCachedProvider();
    }
  }
}

export default useWalletModel;