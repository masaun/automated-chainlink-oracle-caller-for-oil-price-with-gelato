# Automated Chainlink Oracle Caller with Gelato🍦


***
## 【Introduction of Automated Chainlink Oracle Caller with Gelato🍦】


&nbsp;

## 【User Flow】


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
- [Gelato🍦]:
  - Website：  
    https://gelato.network/
  - Blog： 
    https://medium.com/@gelatonetwork/ethereums-automation-protocol-gelato-network-launches-on-mainnet-88647aa10d65
  - Repo：  
    https://github.com/gelatodigital/gelato-network 
    https://github.com/gelatodigital/gelato-kyber
    https://github.com/gelatodigital/gelato-chi
  - Discord：  
    https://discord.com/channels/592041321326182401/745688295891009676  
    https://discord.com/channels/733646962045222912/733646962573836350  

