const dotenv = require('dotenv');
dotenv.config();

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(process.env.MM_SECRET, process.env.INFURA_API_KEY);
const web3 = new Web3(provider);

const deploy = async () => {
	const [account] = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account', account);

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ gas: '1000000', from: account });

	console.log('Contract deployed to', result.options.address);
};
deploy();
