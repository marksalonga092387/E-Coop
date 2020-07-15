define('ECIMS_Authenticator', () =>
{
	class ECIMS_Authenticator extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Authenticator Class')

			super()

			this.state =
			{
				'User_Identity' : '',
				'Login_Header_Interface' : <p>Hi there! Please Sign in</p>
			}

			this.Element =
			{
				'User_Name'											:	React.createRef(),
				'User_Password'										:	React.createRef(),
				'User_Address_Email_Confirmation'					:	React.createRef(),
				'User_Contact_TelephoneNumber_Mobile_Confirmation'	:	React.createRef(),
				'User_Name'											:	React.createRef(),
				'User_Password'										:	React.createRef(),
				'User_Firstname'									:	React.createRef(),
				'User_Middlename'									:	React.createRef(),
				'User_Lastname'										:	React.createRef(),
				'User_Address_Email_Registration'					:	React.createRef(),
				'User_Contact_TelephoneNumber_Mobile_Registration'	:	React.createRef(),
				'User_Contact_TelephoneNumber_Landline'				:	React.createRef(),
				'User_Image'										:	React.createRef(),
				'User_Image_Path'									:	React.createRef(),

				'Login'												:	React.createRef(),
				'Login_Header_Interface'							:	React.createRef(),
				'Confirmation_Code'									:	React.createRef(),
				'Registration'										:	React.createRef(),
				'ForgetPassword'									:	React.createRef(),
				'Form_Login'										:	React.createRef(),
				'Form_Confirmation_1'								:	React.createRef(),
				'Form_Confirmation_2'								:	React.createRef(),
				'Form_Registration'									:	React.createRef(),

				'Paypal_Checkout_Interface'									:	React.createRef()
			}
		}

		set_KnowledgeBased_Action(set_Action, set_Data)
		{
			if (!set_Data)
			{
				System_Dialog.Show()
				System_Dialog.Title = 'Invalid Input/s'
				System_Dialog.Size = 'Medium'
				System_Dialog.Closable = true
				System_Dialog.Mode = 'Message'
				System_Dialog.Hide_Button()
				System_Dialog.Alert_Interface = 'Warning'
				System_Dialog.Alert_Text = 'Please Check Your Input/s'

				return
			}

			else
			{
				if (set_Action != 'Send Confirmation Code' && set_Action != 'Logout')
				{
					System_Dialog.Show()
					System_Dialog.Title = 'Loading...'
					System_Dialog.Size = 'Small'
					System_Dialog.Closable = false
					System_Dialog.Mode = 'Wait'
					System_Dialog.Hide_Button()
					System_Dialog.Alert_Interface = 'Warning'
				}
			}


			if (set_Action == 'Registration')
			{
				System_Dialog.Alert_Text = 'Registering.......'

				set_Data.append('Action', 'User : Registration')

				ECIMS_Main_HTTP.Manage(set_Data, set_Callback_Data =>
				{
					if (set_Callback_Data)
					{
						System_Dialog.Title = 'Success'
						System_Dialog.Size = 'Medium'
						System_Dialog.Closable = true
						System_Dialog.Mode = 'Message'
						System_Dialog.Alert_Interface = 'Success'
						System_Dialog.Alert_Text = 'Login now and process Your Account Confirmation'

						$(this.Element['Registration'].current).removeClass('active')
						$('#Carousel_Registration').carousel(0)
						$(this.Element['Login'].current).addClass('active')

						this.Form_Registration.trigger('reset')
						this.Form_Registration.removeClass('was-validated')
						$(this.Element['User_Middlename'].current).prop('required', true)
						$(this.Element['User_Image_Path'].current).parent().removeClass('valid').removeClass('invalid')
						$(this.Element['User_Image'].current).attr('src', URL_Person_Image)
					}

					else
					{
						System_Dialog.Title = 'Can`t process'
						System_Dialog.Size = 'Medium'
						System_Dialog.Closable = true
						System_Dialog.Mode = 'Message'
						System_Dialog.Alert_Interface = 'Danger'
						System_Dialog.Alert_Text = 'Please try again'
					}
				})
			}

			else if (set_Action == 'Login')
			{
				System_Dialog.Alert_Text = 'Logging in.......'

				set_Data.append('Action', 'User : Login')
				set_Data.append('Select_Action', 'Select : Specific : { User_Name, User_Password }')

				ECIMS_Main_HTTP.Select(set_Data, set_Callback_Data =>
				{
					let get_Callback_Data = JSON.parse(set_Callback_Data)

					if (get_Callback_Data.length == 0)
					{
						System_Dialog.Title = 'Credentials doesn\'t exist!'
						System_Dialog.Size = 'Medium'
						System_Dialog.Closable = true
						System_Dialog.Mode = 'Message'
						System_Dialog.Alert_Interface = 'Danger'
						System_Dialog.Alert_Text = 'Please try again'

						this.Form_Login.removeClass('was-validated')
					}

					else
					{
						if (get_Callback_Data[0]['User_State'] == 'Unconfirmed')
						{
							this.setState({ 'Login_Header_Interface' : <div className = 'alert alert-warning'>Please confirm Your Account</div> })

							$(this.Element['Login_Header_Interface'].current).next().css('display', 'none')
							$('#Carousel_Login').carousel(1)
							this.Form_Login.trigger('reset')
							this.Form_Login.removeClass('was-validated')

							this.state['User_Identity'] = get_Callback_Data[0]['User_Identity']
							$(this.Element['User_Address_Email_Confirmation'].current).val(get_Callback_Data[0]['User_Address_Email'])
							$(this.Element['User_Contact_TelephoneNumber_Mobile_Confirmation'].current).val(get_Callback_Data[0]['User_Contact_TelephoneNumber_Mobile'])

							setTimeout(() =>
							{
								System_Dialog.Hide()
							}, 300)
						}

						else
						{
							cookies.set('User_Identity', get_Callback_Data[0]['User_Identity'], { path: '/' })
						}
					}
				})
			}

			else if (set_Action == 'Send Confirmation Code')
			{
				$('#Carousel_Login').carousel(2)

				set_Data.append('Action', 'User : Send Account Confirmation Code')
				set_Data.append('User_Identity', this.state['User_Identity'])

				ECIMS_Main_HTTP.Manage(set_Data, set_Callback_Data => {})
			}

			else if (set_Action == 'Confirm Account')
			{
				System_Dialog.Alert_Text = 'Confirming.......'

				set_Data.append('Action', 'User : Confirm Account')
				set_Data.append('Select_Action', 'Select : Specific : { User_Identity, Confirmation_Code, Confirmation_Status }')
				set_Data.append('User_Identity', this.state['User_Identity'])
				set_Data.append('Confirmation_Status', 'Pending')

				ECIMS_Main_HTTP.Select(set_Data, set_Callback_Data =>
				{
					if (set_Callback_Data == 'Update Succeeded')
					{
						System_Dialog.Title = 'Account Confirmation Success'
						System_Dialog.Size = 'Medium'
						System_Dialog.Closable = true
						System_Dialog.Mode = 'Message'
						System_Dialog.Alert_Interface = 'Success'
						System_Dialog.Alert_Text = 'You can now login'

						this.Form_Confirmation_2.removeClass('was-validated')

						this.setState({ 'Login_Header_Interface' : <p>Hi there! Please Sign in</p> })

						this.set_KnowledgeBased_Action('Logout', true)
					}

					else
					{
						System_Dialog.Title = 'Invalid Confirmation Code'
						System_Dialog.Size = 'Medium'
						System_Dialog.Closable = true
						System_Dialog.Mode = 'Message'
						System_Dialog.Alert_Interface = 'Warning'
						System_Dialog.Alert_Text = 'Please try again'

						this.Form_Confirmation_2.removeClass('was-validated')
					}
				})
			}

			else if (set_Action == 'Logout')
			{
				this.setState({ 'Login_Header_Interface' : <p>Hi there! Please Sign in</p> })

				$(this.Element['Login_Header_Interface'].current).next().css('display', 'block')
				$('#Carousel_Login').carousel(0)
				this.Form_Confirmation_1.trigger('reset')
				this.Form_Confirmation_1.removeClass('was-validated')
				this.Form_Confirmation_2.trigger('reset')
				this.Form_Confirmation_2.removeClass('was-validated')
			}
		}

		get_KnowledgeBased_Data(set_Action)
		{
			if (set_Action == 'Registration')
			{
				$(this.Element['User_Middlename'].current).prop('required', false)

				let get_Form_Registration_Validation	=	ECIMS_Manipulator.set_Form_Validation(this.Form_Registration)
				let get_Form_Registration_Data			=	ECIMS_Manipulator.get_Form_Data([new FormData(this.Form_Registration[0])])

				if ($(this.Element['User_Image_Path'].current).val().length == 0)
					if ($(this.Element['User_Image_Path'].current).prop('required'))
						$(this.Element['User_Image_Path'].current).parent().removeClass('valid').addClass('invalid')

					else
						$(this.Element['User_Image_Path'].current).parent().removeClass('invalid').addClass('valid')

				if (get_Form_Registration_Validation)
					return get_Form_Registration_Data

				else
					return get_Form_Registration_Validation
			}

			else if (set_Action == 'Login')
			{
				let get_Form_Login_Validation	=	ECIMS_Manipulator.set_Form_Validation(this.Form_Login)
				let get_Form_Login_Data			=	ECIMS_Manipulator.get_Form_Data([new FormData(this.Form_Login[0])])

				if (get_Form_Login_Validation)
					return get_Form_Login_Data

				else
					return get_Form_Login_Validation
			}

			else if (set_Action == 'Confirmation_1')
			{
				let get_Form_Confirmation_1_Validation	=	ECIMS_Manipulator.set_Form_Validation(this.Form_Confirmation_1)
				let get_Form_Confirmation_1_Data			=	ECIMS_Manipulator.get_Form_Data([new FormData(this.Form_Confirmation_1[0])])
			
				if (get_Form_Confirmation_1_Validation)
					return get_Form_Confirmation_1_Data

				else
					return get_Form_Confirmation_1_Validation
			}

			else if (set_Action == 'Confirmation_2')
			{
				let get_Form_Confirmation_2_Validation	=	ECIMS_Manipulator.set_Form_Validation(this.Form_Confirmation_2)
				let get_Form_Confirmation_2_Data			=	ECIMS_Manipulator.get_Form_Data([new FormData(this.Form_Confirmation_2[0])])
			
				if (get_Form_Confirmation_2_Validation)
					return get_Form_Confirmation_2_Data

				else
					return get_Form_Confirmation_1_Validation
			}
		}

		KnowledgeBased_Initialization()
		{
			this.Form_Registration		=	$(this.Element['Form_Registration'].current)
			this.Form_Login				=	$(this.Element['Form_Login'].current)
			this.Form_Confirmation_1	=	$(this.Element['Form_Confirmation_1'].current)
			this.Form_Confirmation_2	=	$(this.Element['Form_Confirmation_2'].current)
		}

		KnowledgeBased_Interface()
		{
			return	<div>
						 <div className = 'login'>
							<div className = 'login__block card active' ref = { this.Element['Login'] }>
								<div className = 'login__block__header'>
									<i className = 'zwicon-user-circle'></i>
									<span ref = { this.Element['Login_Header_Interface'] }>{ this.state['Login_Header_Interface'] }</span>

									<div className = 'actions actions--inverse login__block__actions'>
										<div className = 'dropdown'>
											<i data-toggle = 'dropdown' className = 'zwicon-more-h actions__item'></i>

											<div className = 'dropdown-menu dropdown-menu-right'>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'Registration' href = '#'>Create an account</a>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'ForgetPassword' href = '#'>Forgot password?</a>
											</div>
										</div>
									</div>
								</div>

								<div className = 'login__block__body'>
									<div id = 'Carousel_Login' className = 'carousel slide' data-ride = 'carousel' data-interval = 'false'>
										<div className = 'carousel-inner' role = 'listbox' style = {{ 'overflow' : 'unset' }}>
											<div className = 'carousel-item active'>
												<form ref = { this.Element['Form_Login'] }>
													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Name'] } name = 'User_Name' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Name'>Username</label>
														<div className = 'valid-feedback'>Username is valid</div>
														<div className = 'invalid-feedback'>Please provide an Username</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Password'] } name = 'User_Password' className = 'form-control form-control-input-text-center' type = 'password' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Password'>Password</label>
														<div className = 'valid-feedback'>Password is valid</div>
														<div className = 'invalid-feedback'>Please provide a Password</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => this.set_KnowledgeBased_Action('Login', this.get_KnowledgeBased_Data('Login')) } className = 'btn btn-outline-theme waves-effect col-md-6' type = 'button'>Login</button>
													</div>
												</form>
											</div>

											<div className = 'carousel-item'>
												<form ref = { this.Element['Form_Confirmation_1'] }>
													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Address_Email_Confirmation'] } name = 'User_Address_Email' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Address_Email'>Email Address</label>
														<div className = 'valid-feedback'>Email Address is valid</div>
														<div className = 'invalid-feedback'>Please provide an Email Address</div>
													</div>

													<div className = 'form-group form-inline col-md-12 pb-2'>
														<span className = 'input-group-text' style = {{ 'width' : '21%', 'display' : 'unset' }}>+63</span>
														<input ref = { this.Element['User_Contact_TelephoneNumber_Mobile_Confirmation'] } name = 'User_Contact_TelephoneNumber_Mobile' className = 'form-control form-control-input-text-center' style = {{ 'width' : '79%' }} type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Contact_TelephoneNumber_Mobile' style = {{ 'width' : '79%' }}>Mobile Number</label>
														<div className = 'valid-feedback'>Mobile Number is valid</div>
														<div className = 'invalid-feedback'>Please provide a Mobile Number</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => this.set_KnowledgeBased_Action('Send Confirmation Code', this.get_KnowledgeBased_Data('Confirmation_1')) } className = 'btn btn-outline-theme waves-effect col-md-12' type = 'button'>Send Confirmation Code</button>
													</div>

													<div className = 'form-group col-md-12'><hr/></div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => this.set_KnowledgeBased_Action('Logout', true) } className = 'btn btn-outline-theme waves-effect col-md-6' type = 'button'>Logout</button>
													</div>												
												</form>
											</div>

											<div className = 'carousel-item'>
												<form ref = { this.Element['Form_Confirmation_2'] }>
													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['Confirmation_Code'] } name = 'Confirmation_Code' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'Confirmation_Code'>Confirmation Code</label>
														<div className = 'valid-feedback'>Confirmation Code is valid</div>
														<div className = 'invalid-feedback'>Please provide a Confirmation Code</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => this.set_KnowledgeBased_Action('Confirm Account', this.get_KnowledgeBased_Data('Confirmation_2')) } className = 'btn btn-outline-theme waves-effect col-md-6' type = 'button'>Confirm</button>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => $('#Carousel_Login').carousel(1) } className = 'btn btn-outline-theme waves-effect col-md-6' type = 'button'>Back</button>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className = 'login__block card' ref = { this.Element['Registration'] }>
								<div className = 'login__block__header'>
									<i className = 'zwicon-user-circle'></i>
									Create an account

									<div className = 'actions actions--inverse login__block__actions'>
										<div className = 'dropdown'>
											<i data-toggle = 'dropdown' className = 'zwicon-more-h actions__item'></i>

											<div className = 'dropdown-menu dropdown-menu-right'>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'Login' href = '#'>Already have an account?</a>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'ForgetPassword' href = '#'>Forgot password?</a>
											</div>
										</div>
									</div>
								</div>

								<div className = 'login__block__body'>
									<form ref = { this.Element['Form_Registration'] }>
										<div id = 'Carousel_Registration' className = 'carousel slide' data-ride = 'carousel' data-interval = 'false'>
											<ol className = 'carousel-indicators'>
												<li data-target = '#Carousel_Registration' data-slide-to = '0' className = 'active'></li>
												<li data-target = '#Carousel_Registration' data-slide-to = '1'></li>
											</ol>

											<div className = 'carousel-inner' role = 'listbox' style = {{ 'overflow' : 'unset' }}>
												<div className = 'carousel-item active'>
													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Name'] } name = 'User_Name' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Name'>Username</label>
														<div className = 'valid-feedback'>Username is valid</div>
														<div className = 'invalid-feedback'>Please provide an Username</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Password'] } name = 'User_Password' className = 'form-control form-control-input-text-center' type = 'password' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Password'>Password</label>
														<div className = 'valid-feedback'>Password is valid</div>
														<div className = 'invalid-feedback'>Please provide a Password</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Firstname'] } name = 'User_Firstname' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Firstname'>Firstname</label>
														<div className = 'valid-feedback'>Firstname is valid</div>
														<div className = 'invalid-feedback'>Please provide a Firstname</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Middlename'] } name = 'User_Middlename' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Middlename'>Middlename (Optional)</label>
														<div className = 'valid-feedback'>Middlename is valid</div>
														<div className = 'invalid-feedback'>Please provide a Middlename</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Lastname'] } name = 'User_Lastname' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Lastname'>Lastname</label>
														<div className = 'valid-feedback'>Lastname is valid</div>
														<div className = 'invalid-feedback'>Please provide a Lastname</div>
													</div>
												</div>

												<div className = 'carousel-item'>
													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Address_Email_Registration'] } name = 'User_Address_Email' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Address_Email'>Email Address</label>
														<div className = 'valid-feedback'>Email Address is valid</div>
														<div className = 'invalid-feedback'>Please provide an Email Address</div>
													</div>

													<div className = 'form-group form-inline col-md-12 pb-2'>
														<span className = 'input-group-text' style = {{ 'width' : '21%', 'display' : 'unset' }}>+63</span>
														<input ref = { this.Element['User_Contact_TelephoneNumber_Mobile_Registration'] } name = 'User_Contact_TelephoneNumber_Mobile' className = 'form-control form-control-input-text-center' style = {{ 'width' : '79%' }} type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Contact_TelephoneNumber_Mobile' style = {{ 'width' : '79%' }}>Mobile Number</label>
														<div className = 'valid-feedback'>Mobile Number is valid</div>
														<div className = 'invalid-feedback'>Please provide a Mobile Number</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<input ref = { this.Element['User_Contact_TelephoneNumber_Landline'] } name = 'User_Contact_TelephoneNumber_Landline' className = 'form-control form-control-input-text-center' type = 'text' required/>
														<label className = 'form-control-placeholder form-control-label-text-center' htmlFor = 'User_Contact_TelephoneNumber_Landline'>Landline Number</label>
														<div className = 'valid-feedback'>Landline Number is valid</div>
														<div className = 'invalid-feedback'>Please provide a Landline Number</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => {$(this.Element['User_Image_Path'].current).click()} } className = 'btn btn-outline-theme waves-effect col-md-12' type = 'button'>Upload Image<hr/>
															<input ref = { this.Element['User_Image_Path'] } name = 'User_Image_Path' className = 'form-control' style = {{ 'display' : 'none' }} type = 'file'/>
															<img ref = { this.Element['User_Image'] } src = { URL_Person_Image } width = '200' height = '150' />
														</button>
														<div className = 'valid-feedback'>Image is valid</div>
														<div className = 'invalid-feedback'>Please provide an Image</div>
													</div>

													<div className = 'form-group col-md-12 pb-2'>
														<button onClick = { () => this.set_KnowledgeBased_Action('Registration', this.get_KnowledgeBased_Data('Registration')) } className = 'btn btn-outline-theme waves-effect col-md-6' type = 'button'>Register</button>
													</div>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>

							<div className = 'login__block card' ref = { this.Element['ForgetPassword'] }>
								<div className = 'login__block__header'>
									<i className = 'zwicon-user-circle'></i>
									Forgot Password?

									<div className = 'actions actions--inverse login__block__actions'>
										<div className = 'dropdown'>
											<i data-toggle = 'dropdown' className = 'zwicon-more-h actions__item'></i>

											<div className = 'dropdown-menu dropdown-menu-right'>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'Login' href = '#'>Already have an account?</a>
												<a onClick = { set_Event => this.KnowledgeBased_Interface_Switch(set_Event) } className = 'dropdown-item' data-target = 'Registration' href = '#'>Create an account</a>
											</div>
										</div>
									</div>
								</div>

								<div className = 'login__block__body'>
									<p className = 'mb-5'>This Feature is not available for now.</p>

									<div className = 'form-group'>
										<input type = 'text' className = 'form-control text-center' placeholder = 'Email Address'/>
									</div>

									<a href = '#' className = 'btn btn-theme btn--icon'><i className = 'zwicon-checkmark'></i></a>
								</div>
							</div>
						</div>
					</div>
		}

		KnowledgeBased_Interface_Switch(set_Event)
		{
			set_Event.preventDefault()

			let get_Element_1 =	$(set_Event.target)
			let get_Element_2 = $(this.Element[get_Element_1.data('target')].current)

			get_Element_1.closest('.login__block').removeClass('active')
			get_Element_2.addClass('active')
		}

		Paypal_Checkout_Interface()
		{
			return	<div ref = { this.Element['Paypal_Checkout_Interface'] } id = 'Paypal_Checkout_Interface'></div>
		}

		Paypal_Checkout_Initialization(set_Amount, set_Callback_Function_1, set_Callback_Function_2)
		{
			$(this.Element['Paypal_Checkout_Interface'].current).empty()

			paypal.Buttons
			({
				'createOrder'	:	(set_Data, set_Action) =>
				{
					return set_Action.order.create
					({
						'purchase_units'	:
						[{
							'amount'	:
							{
								'currency_code'	:	'PHP',
								'value'			:	set_Amount,
								'breakdown'		:
								{
									'item_total'	:
									{
										currency_code	:	'PHP',
										value			:	set_Amount
									}
								}
							}
						}]
					})
				},

				onClick		:	() =>
				{
					set_Callback_Function_1(true)
				},

				onApprove	:	(set_Data, set_Action) =>
				{
					//console.log('onApprove')
					//console.log('data')
					//console.log(set_Data)
					//console.log('actions')
					//console.log(set_Action)
					return set_Action.order.capture().then(set_Detail =>
					{
						set_Callback_Function_2(set_Detail)
					})
				},

				onCancel	:	set_Data =>
				{
					//console.log('onCancel')
					//console.log(set_Data)
					set_Callback_Function_1(false)
				}
			}).render('#Paypal_Checkout_Interface')
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Authenticator Class')

			if (this.props.method == 'KnowledgeBased')
			{
				System_Manipulator.set_Image_Upload_Preview
				(
					$(this.Element['User_Image_Path'].current),
					$(this.Element['User_Image'].current)
				)

				this.KnowledgeBased_Initialization()
			}
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Authenticator Class')

			if (this.props.method == 'KnowledgeBased')
				return	this.KnowledgeBased_Interface()

			else if (this.props.method == 'Paypal')
				return	this.Paypal_Checkout_Interface()
		}
	}

	window.ECIMS_Authenticator = ECIMS_Authenticator
})