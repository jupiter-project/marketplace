import { useState, useEffect, createContext } from 'react';
import { isServer } from 'utils/helpers/utility'

const AccountContext = createContext({
  account: '',
  onUpdateAccount: () => { }
});

const AccountContextConsumer = AccountContext.Consumer;

const AccountProvider = ({
  children
}) => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const account = isServer() ? '' : localStorage.account;

    if (!!account) {
      setAccount(account)
    }
  }, []);

  const onUpdateAccount = (value) => {
    setAccount(value)
    localStorage.setItem('account', value)
  }

  const value = {
    account,
    onUpdateAccount
  };

  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  );
};

export { AccountProvider, AccountContext, AccountContextConsumer }