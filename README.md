# No Loss Fundraising for Startup Company📈

***
## 【Introduction of No Loss Fundraising for Startup Company📈】
- This is a dApp for startup company to provide new option of fund-raising.
- This is a dApp that no loss fundraising platform for startup company.
  - Any starup company can publish their company profile for appeal to fund-raise.
  - Only user who deposited can vote for a favorite company profile of startup.
  - Deposited amount from users is pooled and lended into lending-protocol (AAVE). After interests are generated.
  - Generated interests is distributed into startup(company profile) who got the most voting count.
    (Deposited amount will be lend again for next voting round)

&nbsp;

## 【User Flow】
- ① Starup company publish their company profile for appeal to the fundraising.
- ② User deposit DAI.
- ③ User vote for a favorite company profile of startup.
    （Only user who deposited can vote for a favorite company profile of startup）
    （Deposited amount from users is pooled and lended into lending-protocol (AAVE). After interests are generated）
- ④ Generated interests is distributed into startup(company profile) who got the most voting count.

&nbsp;

***

## 【Setup】
### Setup wallet by using Metamask
1. Add MetaMask to browser (Chrome or FireFox or Opera or Brave)    
https://metamask.io/  


2. Adjust appropriate newwork below 
```
Kovan Test Network
```

&nbsp;


### Setup backend
1. Deploy contracts to Kovan Test Network
```
(root directory)

$ npm run migrate:kovan
```

&nbsp;


### Setup frontend（※ In progress）
1. Move to `./client`
```
$ cd client
```

2. Add an `.env` file under the directory of `./client`.
```
$ cp .env.example .env
```

3. Execute command below in root directory.
```
$ npm run client
```

4. Access to browser by using link 
```
http://127.0.0.1:3000/no-loss-fundraising
```

&nbsp;


***

## 【References】
- [AAVE]:
  - Document: https://docs.aave.com/developers/developing-on-aave/the-protocol
  - Deployed addresses: https://docs.aave.com/developers/deployed-contracts/deployed-contract-instances
  - hack idea: https://docs.aave.com/hack/ideas
