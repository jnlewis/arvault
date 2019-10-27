<p align="center">
    <img src="https://raw.githubusercontent.com/sergejmueller/arvault/master/arvault.png" width="128" height="128" alt="ArVault">
    <br>
    <br>
    <b>ArVault</b>
    <br>
    Password Manager on the Arweave Blockchain
</p>

[Arweave](https://www.arweave.org) ÐApp (decentralized application) for secure storing and managing website credentials on the Arweave blockchain. With a focus on privacy and security: All passwords are [client-side encrypted](https://en.wikipedia.org/wiki/Client-side_encryption) by [OAEP algorithm](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding). The Arweave wallet key file is the key to the Arweave Vault.


### ArVault on Permaweb
* [ArVault dApp](https://dicrhdsznczk.arweave.net/pYuAo6giQQOz-0jD78tn7sMvesQoqBhX2NasC6eXrn0/index.html)
* [ArVault User Guide](https://xaqnkqaw274v.arweave.net/pvmiu4SZKQGWAYjrLWzE_mI70u1-v8zIzQ8WaxIYURk#/post/z6Kvrd4tXlpWdeiPg5--EiGouvrd5LC1izCKluhO3ME)


### Features

#### General
* Hand drafted frontend
* Lightweight application
* [Arweave Path Manifest](https://github.com/ArweaveTeam/arweave/wiki/Path-Manifests)
* Optimized app performance

#### Security
* [OAEP algorithm](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding)
* [Client-side encryption](https://en.wikipedia.org/wiki/Client-side_encryption)
* Unlocking with a wallet key file
* Auto lock after 10 minutes of inactivity
* Transactions without sensible public tags

#### Functions
* Instant search
* Filtering by topic
* Random password generator
* Password strength indicator
* Copy credentials to clipboard
* Alphabetical grouping of items
* Items management (add, update, remove)
* `Secret` field for e.g. 2FA recovery code

#### Layout
* Full responsive layout
* Tooltips (Desktop only)
* Minimalistic user interface
* Dark/Light themes (auto switch)

#### Progressive Web App
* Installable as single app
* Caching via Service Worker


### Deploy

##### Local
```
arweave package index.html output.html
```

##### Blockchain
```
arweave deploy index.html --package
```


### Icon
Made by [Vitaly Gorbachev](https://www.flaticon.com/authors/vitaly-gorbachev) from [www.flaticon.com](https://www.flaticon.com)
