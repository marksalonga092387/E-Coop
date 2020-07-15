define('ECIMS_Blockchain', () =>
{
	class ECIMS_Blockchain
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Blockchain Class')

			this.User_Account
			this.User_Balance =
			{
				'ETH'	:	0,
				'PHP'	:	0
			}

			this.Web3 = new Web3('HTTP://127.0.0.1:7545')

			this.Web3.eth.getGasPrice((set_Error, set_Data) =>
			{
				//console.log(set_Error)
				//console.log(set_Data)
			})

			this.Web3.eth.getBlock("latest", false, (set_Error, set_Data) =>
			{
				//console.log(set_Data.gasLimit)
			})

			//2020-07-07
			this.Exchange_Rate =
			{
				'ETH' : { 'ETH' : 1, 'PHP' : 11769.43 },
				'PHP' : { 'PHP' : 1, 'ETH' : 0.000085 }
			}
		}

		get Account_Address()
		{
			return this.User_Account_Address
		}

		set Account_Address(set_ACcount_Address)
		{
			this.User_Account_Address = set_ACcount_Address
		}

		get Account()
		{
			return this.User_Account
		}

		set Account(set_Private_Key)
		{
			this.User_Account = this.Web3.eth.accounts.privateKeyToAccount(set_Private_Key)
			this.Account_Address = this.User_Account['address']
		}

		get Balance()
		{
			return this.Web3.eth.getBalance(this.User_Account['address']).then(set_Balance =>
			{
				let get_Balance = this.Web3.utils.fromWei(set_Balance, 'ether')

				this.User_Balance['ETH'] = this.Convert_Currency('ETH', 'ETH', 2, get_Balance, 'Comma')
				this.User_Balance['PHP'] = this.Convert_Currency('ETH', 'PHP', 2, get_Balance, 'Comma')

				return this.User_Balance
			})
		}

		async Send_Balance(set_Account, set_Value, set_Callback_Function)
		{
			let get_TX = new EthereumJS_TX.Tx
			({
				'nonce'		:	await this.Web3.eth.getTransactionCount(this.Account_Address),
				'gasPrice'	:	this.Web3.utils.toHex(0),
				'gas'		:	this.Web3.utils.toHex(1000000000000000),
				'from'		:	this.Account_Address,
				'to'		:	set_Account.address,
				'value'		:	this.Web3.utils.toHex(this.Web3.utils.toWei(set_Value.toString(), 'ether'))
			})

			get_TX.sign(new EthereumJS_TX.Buffer.Buffer(this.User_Account.privateKey.substring(2), 'hex'))

			let get_Data = get_TX.serialize()

			this.Web3.eth.sendSignedTransaction('0x' + get_Data.toString('hex')).on('receipt', console.log)

			set_Callback_Function()
		}

		Convert_Currency(set_Currency_From, set_Currency_To, set_Decimal_Place, set_Amount, set_Seperator)
		{
			if (set_Amount == '')
				set_Amount = 0

			if (set_Seperator == 'Comma')
				return (this.Exchange_Rate[set_Currency_From][set_Currency_To] * set_Amount).toFixed(set_Decimal_Place).replace(/\d(?=(\d{3})+\.)/g, '$&,')
			
			else
				return (this.Exchange_Rate[set_Currency_From][set_Currency_To] * set_Amount).toFixed(set_Decimal_Place)
		}

		CryptoCurrency_Add_Interface(set_Component)
		{
			return	<div>
						<div ref = { set_Component.Element['CryptoCurrency_Add_Dialog'] } className = 'modal fade' tabIndex = '-1' role = 'dialog'>
							<div className = 'modal-dialog'>
								<div className = 'modal-content'>

									<h3 className = 'text-center pt-4'>Add Etherium</h3>

									<div className = 'modal-body'>
										<div className = 'tab-container'>
											<ul className = 'nav nav-tabs' role = 'tablist' style = {{ 'display' : 'none' }}>
												<li className = 'nav-item'>
													<a className = 'nav-link active' data-toggle = 'tab' href = '#Add_CryptoCurrency_1' role = 'tab'></a>
												</li>

												<li className = 'nav-item'>
													<a className = 'nav-link' data-toggle = 'tab' href = '#Add_CryptoCurrency_2' role = 'tab'></a>
												</li>

												<li className = 'nav-item'>
													<a className = 'nav-link' data-toggle = 'tab' href = '#Add_CryptoCurrency_3' role = 'tab'></a>
												</li>
											</ul>

											<div className = 'tab-content'>
												<div className = 'tab-pane fade active show' id = 'Add_CryptoCurrency_1' role = 'tabpanel'>
													<form>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12 pb-2'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			if ($('input[name = "PHP"]').prop('readonly'))
																			{
																				$('input[name = "PHP"]').prop('readonly', false)
																				$('input[name = "ETH"]').prop('readonly', true)
																			}

																			else
																			{
																				$('input[name = "PHP"]').prop('readonly', true)
																				$('input[name = "ETH"]').prop('readonly', false)
																			}
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect' type = 'button'>
																	<i className = 'zwicon-credit-card'></i>Switch Currency
																</button>
															</div>

															<div className = 'form-group col-md-6 pb-2'>
																<input onChange = { set_Event => $(set_Event.target).parents('.tab-content').find('input[name = "ETH"]').val(this.Convert_Currency('PHP', 'ETH', 10, $(set_Event.target).val())) } name = 'PHP' className = 'form-control' type = 'number' step = '0.01' defaultValue = '0.00' required/>
																<label className = 'form-control-placeholder' htmlFor = 'PHP'>PHP</label>
																<div className = 'valid-feedback'>PHP is valid</div>
																<div className = 'invalid-feedback'>Please provide an PHP</div>
															</div>

															<div className = 'form-group col-md-6 pb-2'>
																<input onChange = { set_Event => $(set_Event.target).parents('.tab-content').find('input[name = "PHP"]').val(this.Convert_Currency('ETH', 'PHP', 2, $(set_Event.target).val())) } name = 'ETH' className = 'form-control' type = 'number' step = '0.0000000001' defaultValue = '0.00' readOnly required/>
																<label className = 'form-control-placeholder' htmlFor = 'ETH'>ETH</label>
																<div className = 'valid-feedback'>ETH is valid</div>
																<div className = 'invalid-feedback'>Please provide an ETH</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<button
																	onClick =
																	{
																		set_Event =>
																		{
																			let get_Element = $(set_Event.target)

																			set_Component.Element['Paypal_Checkout_Interface'].current.Paypal_Checkout_Initialization($('input[name = "PHP"]').val(),
																			
																			set_Callback_Data =>
																			{
																				if (set_Callback_Data)
																				{
																					get_Element.parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_3"]').trigger('click')
																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Loader').show()
																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').hide()
																				}

																				else
																				{
																					get_Element.parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_2"]').trigger('click')
																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Loader').hide()
																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').show()
																				}
																			},

																			set_Callback_Data =>
																			{
																				get_Element.parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_3"]').trigger('click')
																				get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Loader').show()
																				get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').hide()

																				let get_FormData = new FormData()

																				get_FormData.append('Action', 'Insert_User_Log')
																				get_FormData.append('User_Identity', Session_User_Identity())
																				get_FormData.append('Log_Name', 'Purchased Etherium')
																				get_FormData.append('Log_Type', 'Etherium : Add')
																				get_FormData.append('Log_Information', JSON.stringify(set_Callback_Data))

																				ECIMS_Main_HTTP.Manage(get_FormData, set_Callback_Data =>
																				{
																					if (set_Callback_Data)
																					{
																						get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').text('Successfully added Etherium to Your Wallet')
																						System_Blockchain_Owner.Send_Balance(this.User_Account, get_Element.parents('.tab-content').find('input[name = "ETH"]').val(), async () =>
																						{
																							let get_Balance = await System_Blockchain_User.Balance
	
																							set_Component.state['User_Ethereum_Balance'] = get_Balance['ETH']
																							set_Component.state['User_PhilippinePeso_Balance'] = get_Balance['PHP']

																							set_Component.Update_Interface()
																						})
																					}

																					else
																						get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').text('Can`t Add Etherium to Your Wallet. Please try again later')

																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Loader').hide()
																					get_Element.parents('.tab-content').find('#CryptoCurrency_Add_Message').show()

																					setTimeout(()=>
																					{
																						get_Element.parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_1"]').trigger('click')
																					}, 3e3)
																				})
																			})

																			$(set_Event.target).parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_2"]').trigger('click')
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect' type = 'button'>
																	<i className = 'zwicon-credit-card'></i>
																	<div>Process Addition of Etherium</div>
																</button>
															</div>
														</div>
													</form>
												</div>

												<div className = 'tab-pane fade' id = 'Add_CryptoCurrency_2' role = 'tabpanel'>
													<form>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12 pb-2'>
																<ECIMS_Authenticator ref = { set_Component.Element['Paypal_Checkout_Interface'] } method = 'Paypal'/>
															</div>

															<div className = 'form-group col-md-12 pb-2'>
																<button onClick = { set_Event => $(set_Event.target).parents('.tab-content').prev().find('.nav-link[href = "#Add_CryptoCurrency_1"]').trigger('click') } className = 'btn btn-theme btn--icon-text col-md waves-effect' type = 'button'>
																	<i className = 'zwicon-back'></i>Back
																</button>
															</div>
														</div>
													</form>
												</div>

												<div className = 'tab-pane fade' id = 'Add_CryptoCurrency_3' role = 'tabpanel'>
													<form>
														<div className = 'form-row'>
															<div className = 'form-group col-md-12 pb-2'>
																<center className = 'mt-4'>
																	<h2 id = 'CryptoCurrency_Add_Loader' className = 'Loading mb-4' style = {{ 'display' : 'none' }}></h2>
																	<h2 id = 'CryptoCurrency_Add_Message' style = {{ 'display' : 'none' }}></h2>
																</center>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>

									<div className = 'modal-footer'></div>
								</div>
							</div>
						</div>
					</div>
		}
	}

	window.ECIMS_Blockchain = ECIMS_Blockchain
})