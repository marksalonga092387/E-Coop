#! "F:/Python_3.8.3/python.exe"

import web3, json, random
from web3 import Web3
from web3.contract import ConciseContract
#from solcx import install_solc, get_solc_version, set_solc_version, compile_source, compile_files
from decimal import Decimal

#install_solc('0.6.0')
#print(set_solc_version('0.6.0'))
#print(get_solc_version())

class Blockchain():

	def __init__(self, set_Account_Address, set_Account_Private_Key):

		self.Web3 = self.get_Connection()

		if self.Web3.isAddress(set_Account_Address) == False:
			return False

		self.Account_Address = set_Account_Address
		self.Account = self.Web3.eth.account.privateKeyToAccount(set_Account_Private_Key)
		self.Contract = { 'Contract' : None, 'Name' : None, 'Interface' : None, 'Address' : None }

	def get_Connection(self):

		return Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs={'timeout': 120}))

	def Contract_Compile(self, get_File_Path, contractName = None):

		with open(get_File_Path, 'r') as f:
			contract_source_code = f.read()

		get_Compiled_Solidity = compile_source(contract_source_code)

		if not contractName:
			self.Contract['Name'] = list(get_Compiled_Solidity.keys())[0]
			self.Contract['Interface'] = get_Compiled_Solidity[self.Contract['Name']]

		else:
			self.Contract['Interface'] = get_Compiled_Solidity['<stdin>:' + contractName]        

		return self.Contract['Name'], self.Contract['Interface']

	def Contract_Deploy(self, contract_args = None):

		get_Contract = self.Web3.eth.contract(abi = User_Blockchain.Contract['Interface']['abi'], bytecode = User_Blockchain.Contract['Interface']['bin'])

		get_Contract = get_Contract.constructor()#if not contract_args else get_Contract.constructor(*contract_args)

		get_Transaction = get_Contract.buildTransaction(
		{
			'from'		:	self.Account_Address,
			'nonce'		:	self.Web3.eth.getTransactionCount(self.Account_Address)	
		})

		get_Transaction_Receipt = self.Web3.eth.waitForTransactionReceipt(self.Web3.eth.sendTransaction(get_Transaction), timeout=120)

		self.Contract['Address'] = get_Transaction_Receipt['contractAddress']

	def set_Transaction(set_Sender_Address, set_Receiver_Address, set_Value):

		web3.eth.sendTransaction({ 'from' : set_Sender_Address, 'to' : set_Receiver_Address, 'data' : set_Value})

		return True

	def get_Balance(self):

		PHP_per_ETH = Decimal(11136.10)

		if self.Web3.isAddress(self.Account_Address) == True:

			get_Balance = Decimal(self.Web3.fromWei(self.Web3.eth.getBalance(self.Account_Address), 'ether'))

			return format(get_Balance * PHP_per_ETH, '.2f')


	def get_Account_Availability(set_Account_Address):

		get_Web3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs = { 'timeout': 120 }))

		return get_Web3.isAddress(set_Account_Address)

	def Select_Account():

		get_Web3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs = { 'timeout': 120 }))

		return get_Web3.eth.accounts

	def Create_Account():

		get_Web3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs = { 'timeout': 120 }))
		
		get_Account = get_Web3.eth.account.create('UB_ECIMS')
		get_Account = { 'Address' : get_Account.address, 'Private_Key' : get_Web3.toHex(get_Account.privateKey) }

		return get_Account

	def Send_PHP(self, set_Receiver_Address, set_Amount):			

		PHP_per_ETH = Decimal(11136.10)

		get_Value = set_Amount / PHP_per_ETH

		try:
			self.Web3.eth.sendRawTransaction(self.Web3.eth.account.signTransaction(
			{
				'nonce'		:	self.Web3.eth.getTransactionCount(self.Account_Address),
				'gasPrice'	:	0,
				'gas'		:	1000000000000000,
				'from'		:	self.Account_Address,
				'to'		:	set_Receiver_Address,
				'value'		:	self.Web3.toWei(get_Value, 'ether')
			}, self.Account.key).rawTransaction)

			return True

		except Exception as set_Exception:
			return str(set_Exception)

	def Gift_PHP(set_Account_Address, set_Amount):

		PHP_per_ETH = Decimal(11136.10)

		get_Value = set_Amount / PHP_per_ETH

		get_Web3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs = { 'timeout': 120 }))

		get_Private_Key =	[
								'2c789b25a023c076d6f3caf0c22f99b020971e709d378db002a0c7c81b0c517b',
								'c3f160bb6cd8d7d9f1aed52eef841eafd3b5db9023a2da9b3b837db980db970f',
								'd4a08bec3503756a5c9bc3341cf2deecc7f584dd1f2aa76c9c35d7a3797d2794',
								'97bcd47c9ac46bc8ee3f8bd498bd1f828216121f1337b2e6395cc4f5e2001d4d',
								'bc9f92d7f8da47b728be3d0c79317cb1a715a4dafeb98351fc14757e926f7909'
							]

		get_Private_Key = random.choice(get_Private_Key)
		get_Sender_Account = get_Web3.eth.account.privateKeyToAccount(get_Private_Key)

		get_Web3.eth.sendRawTransaction(get_Web3.eth.account.signTransaction(
		{
			'nonce'		:	get_Web3.eth.getTransactionCount(get_Sender_Account.address),
			'gasPrice'	:	0,
			'gas'		:	1000000000000000,
			'from'		:	get_Sender_Account.address,
			'to'		:	set_Account_Address,
			'value'		:	get_Web3.toWei(get_Value, 'ether')
		}, get_Private_Key).rawTransaction)

	def get_Admin_Account():

		get_Web3 = Web3(Web3.HTTPProvider('HTTP://127.0.0.1:7545', request_kwargs = { 'timeout': 120 }))

		get_Private_Key =	[
								'2c789b25a023c076d6f3caf0c22f99b020971e709d378db002a0c7c81b0c517b',
								'c3f160bb6cd8d7d9f1aed52eef841eafd3b5db9023a2da9b3b837db980db970f',
								'd4a08bec3503756a5c9bc3341cf2deecc7f584dd1f2aa76c9c35d7a3797d2794',
								'97bcd47c9ac46bc8ee3f8bd498bd1f828216121f1337b2e6395cc4f5e2001d4d',
								'bc9f92d7f8da47b728be3d0c79317cb1a715a4dafeb98351fc14757e926f7909'
							]

		get_Private_Key = random.choice(get_Private_Key)
		get_Account = get_Web3.eth.account.privateKeyToAccount(get_Private_Key)

		get_Account = { 'Address' : get_Account.address, 'Private_Key' : get_Web3.toHex(get_Account.privateKey) }

		return get_Account

#Blockchain.Gift_PHP('0x9B89395941Bd700bBFCb64ED010Ef8b2d79B9C42', 1000)