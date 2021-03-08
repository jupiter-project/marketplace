import axios from "axios";
import _ from "lodash";

import Config from "react-native-config";

const addressBreakdown = Config.APP_ACCOUNT_ADDRESS
  ? Config.APP_ACCOUNT_ADDRESS.split("-")
  : [];

class Gravity {
  constructor() {
    this.algorithm = Config.ENCRYPT_ALGORITHM;
    this.password = Config.ENCRYPT_PASSWORD;
    this.sender = Config.APP_ACCOUNT;
    (this.version = Config.VERSION),
      (this.jupiter_data = {
        // server: Config.JUPITERSERVER,
        server: "https://jpr7.gojupiter.tech",
        feeNQT: 500,
        deadline: 60,
        minimumTableBalance: 50000,
        minimumAppBalance: 100000,
        moneyDecimals: 8,
      });
    this.appSchema = {
      appData: {
        name: "",
        address: "",
        description: "",
      },
      tables: [],
    };
    this.fundingProperty = `funding-${
      addressBreakdown[addressBreakdown.length - 1]
    }`;
    this.data = {};
    this.tables = [];
  }

  // This method retrieves user info based on the account and the passphrase given
  getUser(account, passphrase, containedDatabase = null) {
    const self = this;
    return new Promise((resolve, reject) => {
      if (account === Config.APP_ACCOUNT_ADDRESS) {
        const userObject = {
          account,
          id: Config.APP_ACCOUNT_ID,
          email: Config.APP_EMAIL,
          firstname: "Admin",
          lastname: "",
          secret_key: null,
          twofa_enabled: false,
          twofa_completed: false,
          public_key: Config.APP_PUBLIC_KEY,
          api_key: Config.APP_API_KEY,
          admin: true,
          secret: Config.APP_ACCOUNT,
        };
        resolve({ user: JSON.stringify(userObject) });
      } else if (containedDatabase) {
        console.log("Retrieving database from the user");
        self
          .retrieveUserFromPassphrase(containedDatabase)
          .then((response) => {
            if (response.databaseFound && !response.userNeedsSave) {
              resolve(response);
            } else if (response.userRecord) {
              const currentDatabase = self.tableBreakdown(response.tables);
              const returnData = {
                recordsFound: 1,
                user: response.userRecord,
                noUserTables: !currentDatabase.includes("users"),
                userNeedsSave: true,
                userRecordFound: true,
                databaseFound: true,
                tables: response.tables,
                tableList: response.tableList,
              };
              resolve(returnData);
            } else {
              console.log(response);
              console.log("Retrieved database from the app now");
              self
                .retrieveUserFromApp(account, passphrase)
                .then((res) => {
                  res.noUserTables = response.noUserTables;
                  res.databaseFound = response.databaseFound;
                  res.database = response.database;
                  res.userNeedsSave = response.userNeedsSave;
                  res.tables = response.tables;
                  console.log(res);
                  resolve(res);
                })
                .catch((error) => {
                  console.log("This is the first stage");
                  reject(error);
                });
            }
          })
          .catch((error) => {
            console.log("This is the second stage");
            console.log(error);
            reject(error);
          });
      } else {
        self
          .retrieveUserFromApp(account, passphrase)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            console.log("This is the third stage");
            reject(error);
          });
      }
    });
  }

  // ! great.dolphin.ls register-api
  createNewAddress(passphrase) {
    console.log("cna start");
    const self = this;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${self.jupiter_data.server}/nxt?requestType=getAccountId&secretPhrase=${passphrase}`
        )
        .then((response) => {
          const address = response.data.accountRS;
          resolve({
            address,
            publicKey: response.data.publicKey,
            success: true,
          });
        })
        .catch((error) => {
          alert(JSON.stringify(error));
          console.log(error);
          console.log("There was an error in address creation");
          reject({
            success: false,
            message: "There was an error creating a new Jupiter address",
          });
        });
    });
  }

  // ! great.dolphin.ls login-api
  getAccountInformation(passphrase) {
    const self = this;
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${self.jupiter_data.server}/nxt?requestType=getAccountId&secretPhrase=${passphrase}`
        )
        .then((response) => {
          const address = response.data.accountRS;
          resolve({
            address,
            accountId: response.data.account,
            publicKey: response.data.publicKey,
            success: true,
          });
        })
        .catch((error) => {
          console.log(error);
          console.log("There was an error getting account information");
          reject({
            success: false,
            message: "There was an error in getting account information",
          });
        });
    });
  }
}

export default Gravity;
