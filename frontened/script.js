/* script.js */
const contractAddress = "0x81d3e4c3962f61aB4906Eb34e63a8e21A7a624F9";
const abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "charityId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "wallet",
                    "type": "address"
                }
            ],
            "name": "CharityRegistered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "charityId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "donor",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "DonationMade",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "charities",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "address payable",
                    "name": "wallet",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "totalDonations",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "charityCounter",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_charityId",
                    "type": "uint256"
                }
            ],
            "name": "donate",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_charityId",
                    "type": "uint256"
                }
            ],
            "name": "getTotalDonations",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "address payable",
                    "name": "_wallet",
                    "type": "address"
                }
            ],
            "name": "registerCharity",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ]
];

let web3;
let contract;

window.onload = async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        contract = new web3.eth.Contract(abi, contractAddress);
    } else {
        alert("Please install MetaMask!");
    }
};

async function registerCharity() {
    const name = document.getElementById("charityName").value;
    const wallet = document.getElementById("charityWallet").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.registerCharity(name, wallet).send({ from: accounts[0] });
    alert("Charity registered!");
}

async function donate() {
    const charityId = document.getElementById("charityId").value;
    const amount = document.getElementById("donationAmount").value;
    const accounts = await web3.eth.getAccounts();
    await contract.methods.donate(charityId).send({ from: accounts[0], value: web3.utils.toWei(amount, "ether") });
    alert("Donation successful!");
}

async function getTotalDonations() {
    const charityId = document.getElementById("checkCharityId").value;
    const donations = await contract.methods.getTotalDonations(charityId).call();
    document.getElementById("donationResult").innerText = `Total Donations: ${web3.utils.fromWei(donations, "ether")} ETH`;
}
