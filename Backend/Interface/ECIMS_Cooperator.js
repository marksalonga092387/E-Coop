define('ECIMS_Cooperator', () =>
{
	class ECIMS_Cooperator extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Cooperator Class')

			super()

			this.state =
			{
				'Action'				:	'',
				'Card_State'			:	'Minimize',
				'Interface'				:	<div></div>,

				'User_Information'		:	{},
				'User_Privilege'		:	[],
				'User_Gender'			:	[],
				'User_Ethereum_Balance'	:	0
			}

			this.Element =
			{
				'User_Name'									:	React.createRef(),
				'User_Password'								:	React.createRef(),
				'User_Type'									:	React.createRef(),
				'User_Privilege'							:	React.createRef(),
				'User_Firstname'							:	React.createRef(),
				'User_Middlename'							:	React.createRef(),
				'User_Lastname'								:	React.createRef(),
				'User_Gender'								:	React.createRef(),
				'User_Citizenship'							:	React.createRef(),
				'User_Birth_Place'							:	React.createRef(),
				'User_Birth_DateTime'						:	React.createRef(),
				'User_Address_Email'						:	React.createRef(),
				'User_Address_Home'							:	React.createRef(),
				'User_Contact_TelephoneNumber_Mobile'		:	React.createRef(),
				'User_Contact_TelephoneNumber_Landline'		:	React.createRef(),
				'User_Image'								:	React.createRef(),
				'User_Image_Path'							:	React.createRef(),
				'Employment_Company_Name'					:	React.createRef(),
				'Employment_Business_Type'					:	React.createRef(),
				'Employment_Business_Form'					:	React.createRef(),
				'Employment_Business_Address'				:	React.createRef(),
				'Employment_Employer_Firstname'				:	React.createRef(),
				'Employment_Employer_Middlename'			:	React.createRef(),
				'Employment_Employer_Lastname'				:	React.createRef(),
				'Employment_Business_Contact_Number'		:	React.createRef(),
				'Employment_Business_Contact_Number_Local'	:	React.createRef(),
				'Employment_Tenure_Year'					:	React.createRef(),
				'Employment_Appointment_Status'				:	React.createRef(),
				'Employment_Position_Title'					:	React.createRef(),
				'Employment_Position_Level'					:	React.createRef(),
				'Employment_Pay_Period'						:	React.createRef(),
				'Employment_Hired_DateTime'					:	React.createRef(),

				'Form_User_Personal'						:	React.createRef(),
				'Form_User_Crendential'						:	React.createRef(),
				'Form_User_Personal_Employment'				:	React.createRef(),

				'CryptoCurrency_Add_Dialog'					:	React.createRef(),
				'Paypal_Checkout_Interface'					:	React.createRef()
			}
		}

		Update_Interface()
		{
			if (location.pathname == '/Cooperator/Account')
				this.setState({ 'Interface' : this.Cooperator_Account_Interface() })
		}

		async componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Cooperator Class')

			this.Mounted = true

			if (location.pathname == '/Cooperator/Account')
			{
				System_Preloader.Show()

				let get_Promise_1 = System_Manipulator.System_Promise((set_Resolve) =>
				{
					let get_FormData = new FormData()
					get_FormData.append('Action', 'Select_User')
					get_FormData.append('Select_Action', 'Select : Specific')
					get_FormData.append('User_Identity', Session_User_Identity())

					ECIMS_Main_HTTP.Select(get_FormData, set_Callback_Data =>
					{
						this.state.User_Information = JSON.parse(set_Callback_Data)[0]
						set_Resolve(true)
					})
				})

				let get_Promise_2 = System_Manipulator.System_Promise((set_Resolve) =>
				{
					let get_FormData = new FormData()
					get_FormData.append('Action', 'Select_User_Personal_Gender')
					get_FormData.append('Select_Action', 'Select : All')

					ECIMS_Main_HTTP.Select(get_FormData, set_Callback_Data =>
					{
						this.state.User_Gender = JSON.parse(set_Callback_Data)
						set_Resolve(true)
					})
				})

				let get_Resolve = await Promise.all([get_Promise_1, get_Promise_2])


				if (get_Resolve[0] && get_Resolve[1])
					if (this.Mounted)
					{
						let get_Balance = await System_Blockchain_User.Balance
	
						this.state['User_Ethereum_Balance'] = get_Balance['ETH']
						this.state['User_PhilippinePeso_Balance'] = get_Balance['PHP']

						System_Preloader.Load(1e2, this, this.Cooperator_Account_Interface(), () =>
						{
							this.Cooperator_Account_Initialization()
							this.set_Cooperator_Account_Data(this.state['User_Information'])
							System_Preloader.Hide()
						})
					}
			}

			else
				System_Preloader.Load(1e2, this, <ECIMS_Sample/>, () => {})
		}

		shouldComponentUpdate()
		{
			return true
		}

		componentWillUnmount()
		{
			this.Mounted = false
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Cooperator Class')

			let Asd = (set_Properties) =>
			{
				return this.Qwe(set_Properties)
			}

			return <div>{ this.state['Interface'] }</div>
		}
	}

	

	window.ECIMS_Cooperator = ECIMS_Cooperator
})