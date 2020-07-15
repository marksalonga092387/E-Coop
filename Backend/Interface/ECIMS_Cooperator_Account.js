define('ECIMS_Cooperator_Account', () =>
{
	class ECIMS_Cooperator_Account extends ECIMS_Cooperator
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Cooperator_Account Class')

			super()
		}

		Update_Cooperator_Account(set_Action, set_Data)
		{
			if (!set_Data)
				return

			let get_Promise = new Promise(ECIMS_Manipulator.System_Dialog_Promise)

			System_Dialog.Title = 'Are You sure?'
			System_Dialog.Size = 'Small'
			System_Dialog.Mode = 'Choice'

			System_Dialog.Alert_Interface = 'Warning'

			System_Dialog.Alert_Text = 'This Cooperator will be saved.'

			set_Data.append('Update_Action', set_Action)
			set_Data.append('User_Identity', Session_User_Identity())
			set_Data.append('User_Updated_By', Session_User_Identity())

			if (set_Data.get('Form_Action') == 'Credential')
			{
				set_Data.append('Action', 'Update_User_Credential')
				set_Data.append('User_State', this.state['User_Information']['User_State'])
			}

			else if (set_Data.get('Form_Action') == 'Personal')
			{
				set_Data.append('Action', 'Update_User_Personal')
				set_Data.append('User_Image_Path', this.state['User_Information']['User_Image_Path'])
			}

			else if (set_Data.get('Form_Action') == 'Personal_Employment')
				set_Data.append('Action', 'Update_User_Personal_Employment')

			else
				return false

			get_Promise.then((set_Resolve_Data) =>
			{
				if (set_Resolve_Data == 'Yes')
				{
					System_Dialog.Title = 'Loading...'
					System_Dialog.Mode = 'Wait'
					System_Dialog.Hide_Button()

					ECIMS_Main_HTTP.Manage(set_Data, set_Callback_Data =>
					{
						setTimeout(() => System_Dialog.Hide(), 1000)
					})

					if (set_Data.get('Form_Action') == 'Personal')
					{
						let get_Data = this.state['User_Information']
						get_Data['User_Firstname'] = $(this.Element['User_Firstname'].current).val()
						get_Data['User_Lastname'] = $(this.Element['User_Lastname'].current).val()

						this.setState({ 'User_Information' : get_Data }, () => this.Update_Interface())
					}
				}

				else if (set_Resolve_Data == 'No')
					System_Dialog.Hide()

				else
					console.log('No Resolve Data')
			})
		}

		get_Cooperator_Account_Data(set_Action)
		{
			if (set_Action == 'Credential')
			{
				let get_Form_User_Crendential_Validation	=	System_Manipulator.set_Form_Validation(this.Form_User_Crendential)
				let get_Form_User_Crendential_Data			=	System_Manipulator.get_Form_Data([new FormData(this.Form_User_Crendential[0])])

				get_Form_User_Crendential_Data.append('Form_Action', set_Action)
				get_Form_User_Crendential_Data.set('User_Privilege', JSON.stringify(this.state['User_Privilege']))

				if (get_Form_User_Crendential_Validation)
					return get_Form_User_Crendential_Data

				else
					return get_Form_User_Crendential_Validation
			}

			else if (set_Action == 'Personal')
			{
				let get_Form_User_Personal_Validation	=	System_Manipulator.set_Form_Validation(this.Form_User_Personal)
				let get_Form_User_Personal_Data			=	System_Manipulator.get_Form_Data([new FormData(this.Form_User_Personal[0])])

				get_Form_User_Personal_Data.append('Form_Action', set_Action)

				if (get_Form_User_Personal_Validation)
					return get_Form_User_Personal_Data

				else
					return get_Form_User_Personal_Validation
			}

			else if (set_Action == 'Personal_Employment')
			{
				let get_Form_User_Personal_Employment_Validation	=	System_Manipulator.set_Form_Validation(this.Form_User_Personal_Employment)
				let get_Form_User_Personal_Employment_Data			=	System_Manipulator.get_Form_Data([new FormData(this.Form_User_Personal_Employment[0])])

				get_Form_User_Personal_Employment_Data.append('Form_Action', set_Action)

				if (get_Form_User_Personal_Employment_Validation)
					return get_Form_User_Personal_Employment_Data

				else
					return get_Form_User_Personal_Employment_Validation
			}
		}

		set_Cooperator_Account_Data(set_Data)
		{
			const set_Form_User_Crendential_Data = (() =>
			{
				$(this.Element['User_Name'].current).val(set_Data['User_Name'])
				$(this.Element['User_Password'].current).val(set_Data['User_Password'])
				$(this.Element['User_Type'].current).val(set_Data['User_Type'])

				this.state['User_Privilege'] = JSON.parse(set_Data['User_Privilege'])

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['User_Privilege'].current),
					'Array'		:	this.state['User_Privilege']
				})
			})()

			const set_Form_User_Personal_Data = (() =>
			{
				$(this.Element['User_Firstname'].current).val(set_Data['User_Firstname'])
				$(this.Element['User_Middlename'].current).val(set_Data['User_Middlename'])
				$(this.Element['User_Lastname'].current).val(set_Data['User_Lastname'])
				$(this.Element['User_Gender'].current).val(set_Data['User_Gender']).change()
				$(this.Element['User_Citizenship'].current).val(set_Data['User_Citizenship'])
				$(this.Element['User_Birth_Place'].current).val(set_Data['User_Birth_Place'])
				$(this.Element['User_Birth_DateTime'].current).val(set_Data['User_Birth_DateTime'])
				$(this.Element['User_Address_Email'].current).val(set_Data['User_Address_Email'])
				$(this.Element['User_Address_Home'].current).val(set_Data['User_Address_Home'])
				$(this.Element['User_Contact_TelephoneNumber_Mobile'].current).val(set_Data['User_Contact_TelephoneNumber_Mobile'])
				$(this.Element['User_Contact_TelephoneNumber_Landline'].current).val(set_Data['User_Contact_TelephoneNumber_Landline'])
				$(this.Element['User_Image'].current).attr('src', URL_Base + set_Data['User_Image_Path'])
			})()

			const set_Form_User_Personal_Employment_Data = (() =>
			{
				$(this.Element['Employment_Company_Name'].current).val(set_Data['Employment_Company_Name'])
				$(this.Element['Employment_Business_Type'].current).val(set_Data['Employment_Business_Type'])
				$(this.Element['Employment_Business_Form'].current).val(set_Data['Employment_Business_Form'])
				$(this.Element['Employment_Business_Address'].current).val(set_Data['Employment_Business_Address'])
				$(this.Element['Employment_Employer_Firstname'].current).val(set_Data['Employment_Employer_Firstname'])
				$(this.Element['Employment_Employer_Middlename'].current).val(set_Data['Employment_Employer_Middlename'])
				$(this.Element['Employment_Employer_Lastname'].current).val(set_Data['Employment_Employer_Lastname'])
				$(this.Element['Employment_Business_Contact_Number'].current).val(set_Data['Employment_Business_Contact_Number'])
				$(this.Element['Employment_Business_Contact_Number_Local'].current).val(set_Data['Employment_Business_Contact_Number_Local'])
				$(this.Element['Employment_Tenure_Year'].current).val(set_Data['Employment_Tenure_Year'])
				$(this.Element['Employment_Appointment_Status'].current).val(set_Data['Employment_Appointment_Status'])
				$(this.Element['Employment_Position_Title'].current).val(set_Data['Employment_Position_Title'])
				$(this.Element['Employment_Position_Level'].current).val(set_Data['Employment_Position_Level'])
				$(this.Element['Employment_Pay_Period'].current).val(set_Data['Employment_Pay_Period'])
				$(this.Element['Employment_Hired_DateTime'].current).val(set_Data['Employment_Hired_DateTime'])
			})()
		}

		Cooperator_Account_Initialization()
		{
			const Initialize_Form_User_Crendential = (() =>
			{
				this.Form_User_Crendential = $(this.Element['Form_User_Crendential'].current)

				System_Manipulator.set_Input_Multiple
				({
					'Element'	:	$(this.Element['User_Privilege'].current),
					'Array'		:	this.state['User_Privilege']
				})
			})()

			const Initialize_Form_User_Personal = (() =>
			{
				this.Form_User_Personal = $(this.Element['Form_User_Personal'].current)

				System_Manipulator.set_Select({ 'Element' : $(this.Element['User_Gender'].current)})
				System_Manipulator.set_Input_DateTime({ 'Element' : $(this.Element['User_Birth_DateTime'].current), 'enableTime' : false })
				System_Manipulator.set_Image_Upload_Preview
				(
					$(this.Element['User_Image_Path'].current),
					$(this.Element['User_Image'].current)
				)
			})()

			const Initialize_Form_User_Personal_Employment = (() =>
			{
				this.Form_User_Personal_Employment = $(this.Element['Form_User_Personal_Employment'].current)

				System_Manipulator.set_Select({ 'Element' : $(this.Element['Employment_Appointment_Status'].current)})
				System_Manipulator.set_Input_DateTime({ 'Element' : $(this.Element['Employment_Hired_DateTime'].current), 'enableTime' : false })
			})()			
		}

		Cooperator_Account_Interface()
		{
			return	<div>
						<section className = 'content'>
							<div className = 'content__inner'>
								<nav aria-label = 'breadcrumb' role = 'navigation'>
									<ol className = 'breadcrumb'>
										<li className = 'breadcrumb-item'><a>Cooperator</a></li>
										<li className = 'breadcrumb-item active' aria-current = 'page'>Account</li>
									</ol>
								</nav>

								<div className = 'content__title'>
									<h1>My Account</h1>
								</div>

								<div className = 'card'>
									<div className = 'card-body'>
										<div className = 'tab-container'>	
											<ul className = 'nav nav-tabs' role = 'tablist'>
												<li className = 'nav-item'>
													<a className = 'nav-link active' data-toggle = 'tab' href = '#Profile' role = 'tab'>Profile</a>
												</li>

												<li className = 'nav-item'>
													<a className = 'nav-link' data-toggle = 'tab' href = '#Credential' role = 'tab'>Credential Info</a>
												</li>

												<li className = 'nav-item'>
													<a className = 'nav-link' data-toggle = 'tab' href = '#Personal' role = 'tab'>Personal Info</a>
												</li>

												<li className = 'nav-item'>
													<a className = 'nav-link' data-toggle = 'tab' href = '#Personal_Employment' role = 'tab'>Personal Employment Info</a>
												</li>
											</ul>

											<div className = 'tab-content'>
												<div className = 'tab-pane fade active show' id = 'Profile' role = 'tabpanel'>
													<div className = 'container'>
														<div className = 'row'>
															<div className = 'col-md-6'>
																<div className = 'd-flex justify-content-center'>
																	<button className = 'btn waves-effect' style = {{ 'borderRadius' : '100%' }} type = 'button'>
																		<img ref = { this.Element['Profile_User_Image'] } onError = { set_Event => $(set_Event.target).attr('src', URL_Person_Image) } src = { URL_Person_Image } style = {{ 'borderRadius' : '100%', 'width' : '20em', 'height' : '20em' }}/>
																	</button>
																</div>

																<div className = 'd-flex justify-content-center'>
																	<p ref = { this.Element['Profile_User_Fullname'] } style = {{ 'fontSize' : '2em' }}>
																	{ this.state['User_Information']['User_Firstname'] }
																	&nbsp;
																	{ this.state['User_Information']['User_Lastname'] }
																	</p>
																</div>
															</div>

															<div className = 'col-md-6 d-flex flex-column justify-content-center row'>
																<div className = 'd-flex justify-content-start text-center pb-4'>
																	<i className = 'zwicon-money-stack' style = {{ 'fontSize' : '3em' }}></i>
																	&nbsp;
																	<span style = {{ 'fontSize' : '2em' }}>Ethereum Wallet</span>
																</div>
																<div className = 'col-md' style = {{ 'border' : '1px solid #fff', 'borderRadius' : '1em' }}>
																	<div className = 'col-md mt-2'>
																		<div className = 'd-flex flex-column justify-content-center text-center pb-4'>
																			<div style = {{ 'fontSize' : '2.5em' }}>&nbsp;₱{ this.state['User_PhilippinePeso_Balance'] }(PHP)</div>
																			<div className = 'Highlight_Text' style = {{ 'fontSize' : '1.5em' }}>&nbsp;Ξ{ this.state['User_Ethereum_Balance'] }(ETH)</div>
																		</div>
																		{ System_Blockchain_User.CryptoCurrency_Add_Interface(this) }
																		<div className = 'btn-toolbar d-flex justify-content-center' style = {{ 'fontSize' : '1.5em' }}>
																			<div className = 'row col-md-12'>
																				<button onClick = { () => $(this.Element['CryptoCurrency_Add_Dialog'].current).modal('show') } className = 'btn btn-theme btn--icon-text col-md waves-effect m-2' type = 'button'>
																					<i className = 'zwicon-money-stack'></i>
																					<div>Add Balance</div>
																				</button>

																				<button className = 'btn btn-theme btn--icon-text col-md waves-effect m-2' type = 'button'>
																					<i className = 'zwicon-package'></i>
																					<div>Gift Code</div>
																				</button>
																			</div>

																			<div className = 'row col-md-12'>
																				<button className = 'btn btn-theme btn--icon-text col-md waves-effect m-2' type = 'button'>
																					<i className = 'zwicon-credit-card'></i>
																					<div>Withdraw</div>
																				</button>

																				<button className = 'btn btn-theme btn--icon-text col-md waves-effect m-2' type = 'button'>
																					<i className = 'zwicon-backlog'></i>
																					<div>Transaction</div>
																				</button>
																			</div>
																		</div>

																		<hr/>

																		<div style = {{ 'fontSize' : '1.5em' }}>
																			<div>
																				<i className = 'zwicon-stand-up' style = {{ 'fontSize' : '1.5em' }}></i>
																				<span>&nbsp;COOP para sa Bayan</span>
																			</div>

																			<div>
																				<i className = 'zwicon-stand-up' style = {{ 'fontSize' : '1.5em' }}></i>
																				<span>&nbsp;COOP ng mga Bata</span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div className = 'tab-pane fade' id = 'Credential' role = 'tabpanel'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state['Card_State'] == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>Credential Information</h4>
													<h6 className = 'card-subtitle'><span className = 'Highlight_Text'>Cooperator Credentials</span></h6>

													<hr className = 'pb-4'/>

													<form ref = { this.Element['Form_User_Crendential'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Name'] } name = 'User_Name' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Name'>Username</label>
																<div className = 'valid-feedback'>Username is valid</div>
																<div className = 'invalid-feedback'>Please provide an Username</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Password'] } name = 'User_Password' className = 'form-control' type = 'password' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Password'>Password</label>
																<div className = 'valid-feedback'>Password is valid</div>
																<div className = 'invalid-feedback'>Please provide a Password</div>
															</div>

															<div className = 'form-group col-md-4 pb-2' style = {{ 'display' : 'block' }}>
																<input ref = { this.Element['User_Type'] } name = 'User_Type' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Type'>Type</label>
																<div className = 'valid-feedback'>Type is valid</div>
																<div className = 'invalid-feedback'>Please provide a Type</div>
															</div>

															<div className = 'form-group col-md-4 pb-2' style = {{ 'display' : 'block' }}>
																<select ref = { this.Element['User_Privilege'] } name = 'User_Privilege' className = 'form-control' multiple required></select>
																<label className = 'form-control-placeholder' htmlFor = 'User_Privilege'>Privilege</label>
																<div className = 'valid-feedback'>Privilege is valid</div>
																<div className = 'invalid-feedback'>Please provide a Privilege</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			this.Update_Cooperator_Account('Update : Specific', this.get_Cooperator_Account_Data('Credential'))
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect'
																	type = 'button'>
																	<i className = 'zwicon-checkmark-circle'></i>Save
																</button>
															</div>
														</div>
													</form>
												</div>

												<div className = 'tab-pane fade' id = 'Personal' role = 'tabpanel'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state['Card_State'] == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>I. Personal Information</h4>
													<h6 className = 'card-subtitle'><span className = 'Highlight_Text'>Cooperator Personal Details</span></h6>

													<hr className = 'pb-4'/>

													<form ref = { this.Element['Form_User_Personal'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Firstname'] } name = 'User_Firstname' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Firstname'>Firstname</label>
																<div className = 'valid-feedback'>Firstname is valid</div>
																<div className = 'invalid-feedback'>Please provide a Firstname</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Middlename'] } name = 'User_Middlename' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Middlename'>Middlename</label>
																<div className = 'valid-feedback'>Middlename is valid</div>
																<div className = 'invalid-feedback'>Please provide a Middlename</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Lastname'] } name = 'User_Lastname' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Lastname'>Lastname</label>
																<div className = 'valid-feedback'>Lastname is valid</div>
																<div className = 'invalid-feedback'>Please provide a Lastname</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['User_Gender'] } name = 'User_Gender' className = 'form-control' data-placeholder = 'Gender' required>
																	<option></option>
																	<optgroup label = 'Select a Gender'>
																	{
																		this.state['User_Gender'].map(set_Data =>
																		{
																			return <option key = { set_Data['Gender_Identity'] } value = { set_Data['Gender_Identity'] }>{ set_Data['Gender_Name'] }</option>
																		})
																	}
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Gender is valid</div>
																<div className = 'invalid-feedback'>Please select a Gender</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Citizenship'] } name = 'User_Citizenship' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Citizenship'>Citizenship</label>
																<div className = 'valid-feedback'>Citizenship is valid</div>
																<div className = 'invalid-feedback'>Please provide a Citizenship</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Birth_Place'] } name = 'User_Birth_Place' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Birth_Place'>Birth Place</label>
																<div className = 'valid-feedback'>Birth Place is valid</div>
																<div className = 'invalid-feedback'>Please provide a Birth Place</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Birth_DateTime'] } name = 'User_Birth_DateTime' className = 'form-control DateTimePicker' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Birth_DateTime'>Birth Date</label>
																<div className = 'valid-feedback'>Birth Date is valid</div>
																<div className = 'invalid-feedback'>Please provide a Birth Date</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Address_Email'] } name = 'User_Address_Email' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Address_Email'>Email Address</label>
																<div className = 'valid-feedback'>Email Address is valid</div>
																<div className = 'invalid-feedback'>Please provide a Email Address</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Address_Home'] } name = 'User_Address_Home' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Address_Home'>Home Address</label>
																<div className = 'valid-feedback'>Home Address is valid</div>
																<div className = 'invalid-feedback'>Please provide a Home Address</div>
															</div>

															<div className = 'form-group form-inline col-md-4 pb-2'>
																<span className = 'input-group-text' style = {{ 'width' : '21%', 'display' : 'unset' }}>+63</span>
																<input ref = { this.Element['User_Contact_TelephoneNumber_Mobile'] } name = 'User_Contact_TelephoneNumber_Mobile' className = 'form-control form-control-input-text-center' style = {{ 'width' : '79%' }} type = 'text' required/>
																<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Contact_TelephoneNumber_Mobile' style = {{ 'width' : '79%' }}>Mobile Number</label>
																<div className = 'valid-feedback'>Mobile Number is valid</div>
																<div className = 'invalid-feedback'>Please provide a Mobile Number</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['User_Contact_TelephoneNumber_Landline'] } name = 'User_Contact_TelephoneNumber_Landline' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'User_Contact_TelephoneNumber_Landline'>Landline Number</label>
																<div className = 'valid-feedback'>Landline Number is valid</div>
																<div className = 'invalid-feedback'>Please provide a Landline Number</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<button onClick = { () => { $(this.Element['User_Image_Path'].current).click() } } className = 'btn btn-outline-theme waves-effect col-md-12' type = 'button'>Upload Image<hr/>
																	<input ref = { this.Element['User_Image_Path'] } name = 'User_Image_Path' className = 'form-control' style = {{ 'display' : 'none' }} type = 'file'/>
																	<img ref = { this.Element['User_Image'] } onError = { set_Event => $(set_Event.target).attr('src', URL_Person_Image) } src = { URL_Person_Image } width = '200' height = '150' />
																</button>
																<div className = 'valid-feedback'>Image is valid</div>
																<div className = 'invalid-feedback'>Please provide an Image</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			this.Update_Cooperator_Account('Update : Specific', this.get_Cooperator_Account_Data('Personal'))
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect'
																	type = 'button'>
																	<i className = 'zwicon-checkmark-circle'></i>Save
																</button>
															</div>
														</div>
													</form>
												</div>

												<div className = 'tab-pane fade' id = 'Personal_Employment' role = 'tabpanel'>

													<a onClick = { set_Event => System_Manipulator.set_Card_Size(set_Event, this) } className = 'page-link Card_Resizer float-right'><i className = { this.state['Card_State'] == 'Minimize' ? 'zwicon-expand-alt' : 'zwicon-collapse-alt' }></i></a>
													<h4 className = 'card-title'>II. Personal Information (<span className = 'Highlight_Text'>Employment</span>)</h4>
													<h6 className = 'card-subtitle'><span className = 'Highlight_Text'>Cooperator Current Job Details</span></h6>

													<hr className = 'pb-4'/>

													<form ref = { this.Element['Form_User_Personal_Employment'] }>
														<div className = 'form-row'>
															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Company_Name'] } name = 'Employment_Company_Name' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Company_Name'>Company Name</label>
																<div className = 'valid-feedback'>Company Name is valid</div>
																<div className = 'invalid-feedback'>Please provide a Company Name</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Business_Type'] } name = 'Employment_Business_Type' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Business_Type'>Business Type</label>
																<div className = 'valid-feedback'>Business Type is valid</div>
																<div className = 'invalid-feedback'>Please provide a Business Type</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Business_Form'] } name = 'Employment_Business_Form' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Business_Form'>Business Form</label>
																<div className = 'valid-feedback'>Business Form is valid</div>
																<div className = 'invalid-feedback'>Please provide a Business Form</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Business_Address'] } name = 'Employment_Business_Address' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Business_Address'>Business Address</label>
																<div className = 'valid-feedback'>Business Address is valid</div>
																<div className = 'invalid-feedback'>Please provide a Business Address</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Employer_Firstname'] } name = 'Employment_Employer_Firstname' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Employer_Firstname'>Employer Firstname</label>
																<div className = 'valid-feedback'>Employer Firstname is valid</div>
																<div className = 'invalid-feedback'>Please provide an Employer Firstname</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Employer_Middlename'] } name = 'Employment_Employer_Middlename' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Employer_Middlename'>Employer Middlename</label>
																<div className = 'valid-feedback'>Employer Middlename is valid</div>
																<div className = 'invalid-feedback'>Please provide an Employer Middlename</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Employer_Lastname'] } name = 'Employment_Employer_Lastname' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Employer_Lastname'>Employer Lastname</label>
																<div className = 'valid-feedback'>Employer Lastname is valid</div>
																<div className = 'invalid-feedback'>Please provide an Employer Lastname</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Business_Contact_Number'] } name = 'Employment_Business_Contact_Number' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Business_Contact_Number'>Contact Number</label>
																<div className = 'valid-feedback'>Contact Number is valid</div>
																<div className = 'invalid-feedback'>Please provide a Contact Number</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Business_Contact_Number_Local'] } name = 'Employment_Business_Contact_Number_Local' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Business_Contact_Number_Local'>Contact Number (Local)</label>
																<div className = 'valid-feedback'>Contact Number is valid</div>
																<div className = 'invalid-feedback'>Please provide a Contact Number</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Tenure_Year'] } name = 'Employment_Tenure_Year' className = 'form-control' type = 'number' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Tenure_Year'>Tenure Year</label>
																<div className = 'valid-feedback'>Tenure Year is valid</div>
																<div className = 'invalid-feedback'>Please provide a Tenure Year</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<select ref = { this.Element['Employment_Appointment_Status'] } name = 'Employment_Appointment_Status' className = 'form-control' data-placeholder = 'Select an Appointment Status' required>
																	<option></option>
																	<optgroup label = 'Select a Status of Appointment'>
																		<option value = 'Continuing (Full-time)'>Continuing (Full-time)</option>
																		<option value = 'Continuing (Part-time)'>Continuing (Part-time)</option>
																		<option value = 'Term (Full-time)'>Term (Full-time)</option>
																		<option value = 'Term (Part-time)'>Term (Part-time)</option>
																		<option value = 'Contract (Full-time)'>Contract (Full-time)</option>
																		<option value = 'Contract (Part-time)'>Contract (Part-time)</option>
																	</optgroup>
																</select>
																<div className = 'valid-feedback'>Appointment Status is valid</div>
																<div className = 'invalid-feedback'>Please select an Appointment Status</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Position_Title'] } name = 'Employment_Position_Title' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Position_Title'>Position Title</label>
																<div className = 'valid-feedback'>Position Title is valid</div>
																<div className = 'invalid-feedback'>Please provide a Position Title</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Position_Level'] } name = 'Employment_Position_Level' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Position_Level'>Position Level</label>
																<div className = 'valid-feedback'>Position Level is valid</div>
																<div className = 'invalid-feedback'>Please provide a Position Level</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Pay_Period'] } name = 'Employment_Pay_Period' className = 'form-control' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Pay_Period'>Monthly Rate</label>
																<div className = 'valid-feedback'>Monthly Rate is valid</div>
																<div className = 'invalid-feedback'>Please provide a Monthly Rate</div>
															</div>

															<div className = 'form-group col-md-4 pb-2'>
																<input ref = { this.Element['Employment_Hired_DateTime'] } name = 'Employment_Hired_DateTime' className = 'form-control DateTimePicker' type = 'text' required/>
																<label className = 'form-control-placeholder' htmlFor = 'Employment_Hired_DateTime'>Date Hired</label>
																<div className = 'valid-feedback'>Date Hired is valid</div>
																<div className = 'invalid-feedback'>Please provide a Date Hired</div>
															</div>

															<div className = 'form-group col-md-12 pb-2'></div>

															<div className = 'form-group col-md-4 pb-2'>
																<button
																	onClick =
																	{
																		() =>
																		{
																			this.Update_Cooperator_Account('Update : Specific', this.get_Cooperator_Account_Data('Personal_Employment'))
																		}
																	}
																	className = 'btn btn-theme btn--icon-text col-md waves-effect'
																	type = 'button'>
																	<i className = 'zwicon-checkmark-circle'></i>Save
																</button>
															</div>
														</div>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
		}
	}

	window.ECIMS_Cooperator_Account = ECIMS_Cooperator_Account
})