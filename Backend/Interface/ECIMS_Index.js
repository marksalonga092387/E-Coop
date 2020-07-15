define('ECIMS_Index', () =>
{
	window.Session_Information = React.createContext
	({
		'User_Identity'			:	'USR-ADMIN',
		'User_Name'				:	'admin',
		'User_Privilege'		:	[],
		'User_Ethereum_Address'	:	'',
		'User_Ethereum_Key'		:	''
	})

	window.Session_User_Identity = set_User_Identity =>
	{
		if (typeof set_User_Identity == 'string')
			Session_Information._currentValue.User_Identity = set_User_Identity

		return Session_Information._currentValue.User_Identity
	}

	window.Session_User_Name = set_User_Name =>
	{
		if (typeof set_User_Name == 'string')
			Session_Information._currentValue.User_Name = set_User_Name

		return Session_Information._currentValue.User_Name
	}

	window.Session_User_Privilege = set_User_Privilege =>
	{
		if (Array.isArray(set_User_Privilege))
			Session_Information._currentValue.User_Privilege = set_User_Privilege

		return Session_Information._currentValue.User_Privilege
	}

	window.Session_User_Ethereum_Address = set_User_Ethereum_Address =>
	{
		if (typeof set_User_Ethereum_Address == 'string')
			Session_Information._currentValue.User_Ethereum_Address = set_User_Ethereum_Address

		return Session_Information._currentValue.User_Ethereum_Address
	}

	window.Session_User_Ethereum_Key = set_User_Ethereum_Key =>
	{
		if (typeof set_User_Ethereum_Key == 'string')
			Session_Information._currentValue.User_Ethereum_Key = set_User_Ethereum_Key

		return Session_Information._currentValue.User_Ethereum_Key
	}

	class ECIMS_Index extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Index Class')

			super()

			this.state =
			{
				'Header_Visible' : false,
				'Sidebar_Visible' : false
			}

			this.Element =
			{
				'System_Preloader'		:	React.createRef(),
				'System_BrowserRouter'	:	React.createRef(),
				'System_Navigator'		:	React.createRef(),
				'System_Dialog'			:	React.createRef(),
				'System_Sidebar'		:	React.createRef()
			}
		}

		System_Time()
		{
			let set_Time = () =>
			{
				let get_Date = new Date()
				$('.time__sec').html((get_Date.getSeconds() < 10 ? '0' : '') + get_Date.getSeconds())
				$('.time__min').html((get_Date.getMinutes() < 10 ? '0' : '') + get_Date.getMinutes())
				$('.time__hours').html((get_Date.getHours() < 10 ? '0' : '') + get_Date.getHours())
			}

			set_Time()

			setInterval(() =>
			{
				set_Time()
			}, 1000)
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Index Class')

			this.System_Time()

			Waves.init()

			window.System_Index				=	this
			window.System_Preloader			=	this.Element['System_Preloader'].current
			window.System_BrowserRouter		=	this.Element['System_BrowserRouter'].current
			window.System_Navigator			=	this.Element['System_Navigator'].current
			window.System_Manipulator		=	ECIMS_Manipulator
			window.System_Dialog			=	this.Element['System_Dialog'].current
			window.System_Organogram		=	ECIMS_Organogram
			window.System_Blockchain_User	=	new ECIMS_Blockchain()
			window.System_Blockchain_Owner	=	new ECIMS_Blockchain()
			System_Blockchain_Owner.Account	=	'2c789b25a023c076d6f3caf0c22f99b020971e709d378db002a0c7c81b0c517b'

			window.Cooperative_Registration	=	new ECIMS_Cooperative_Registration()
			window.Cooperator_Account		=	new ECIMS_Cooperator_Account()
			//System_Navigator.Forward('/Cooperative/Add')

			$('[data-toggle = "popover"]').popover()
			$('[data-toggle = "tooltip"]').tooltip()

			setTimeout(() =>
			{
				$('.page-loader').fadeOut()
			}, 2000)

			//cookies.set('User_Identity', '123123', { path: '/' })

			//cookies.remove('User_Identity', { 'path' : '/'})

			//System_Navigator.Forward('/Cooperative/Create')

			window.System_Session = () =>
			{
				if (cookies.get('User_Identity') != undefined)
				{
					clearInterval(System_Session)

					if (!(this.state['Header_Visible']) && !(this.state['Sidebar_Visible']))
					{
						let get_Data = new FormData()
						get_Data.append('Action', 'Select_User')
						get_Data.append('Select_Action', 'Select : Specific')
						get_Data.append('User_Identity', cookies.get('User_Identity'))

						ECIMS_Main_HTTP.Select(get_Data, set_Callback_Data =>
						{
							let get_Callback_Data = JSON.parse(set_Callback_Data)

							if (get_Callback_Data.length != 0)
							{
								System_Index.setState({ 'Header_Visible' : true, 'Sidebar_Visible' : true }, () =>
								{
									Session_User_Identity(get_Callback_Data[0]['User_Identity'])
									Session_User_Name(get_Callback_Data[0]['User_Name'])
									Session_User_Privilege(JSON.parse(get_Callback_Data[0]['User_Privilege']))
									Session_User_Ethereum_Address(get_Callback_Data[0]['User_Ethereum_Address'])
									Session_User_Ethereum_Key(get_Callback_Data[0]['User_Ethereum_Key'])

									System_Blockchain_User.Account = Session_User_Ethereum_Key()

									this.Element['System_Sidebar'].current.setState
									({
										'User_Name' : Session_User_Name(),
										'User_Address_Email' : get_Callback_Data[0]['User_Address_Email']
									})

									if (location.pathname != '/Cooperator/Account')
										System_Navigator.Forward('/Cooperator/Account')

									//System_Navigator.Forward('/Dashboard')
									setInterval(System_Session, 1000)

									setTimeout(() =>
									{
										System_Dialog.Hide()
									}, 300)
								})
							}

							else
								cookies.remove('User_Identity', { 'path' : '/'})
						})
					}
				}

				else
				{
					if (this.state['Header_Visible'] && this.state['Sidebar_Visible'])
					{
						System_Navigator.Forward('/Authentication/Login')

						System_Index.setState({ 'Header_Visible' : false, 'Sidebar_Visible' : false })

						setTimeout(() =>
						{
							System_Dialog.Hide()
						}, 300)
					}

					else
					{
						if(location.pathname != '/Authentication/Login')
							System_Navigator.Forward('/Authentication/Login')
					}
				}
			}

			setInterval(System_Session, 1000)
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Index Class')
			//<Redirect to = '/Authentication/Login'/>
			return	<div>
						<main className = 'main'>
							<ECIMS_Preloader ref = { this.Element['System_Preloader'] }/>

							<BrowserRouter ref = { this.Element['System_BrowserRouter'] }>
								<ECIMS_Navigator ref = { this.Element['System_Navigator'] }/>
								<ECIMS_Dialog ref = { this.Element['System_Dialog'] }

								Button =
								{[
									{
										'Identity'	:	'No',
										'Text'		:	'No',
										'Class'		:	'btn btn-danger waves-effect'
									},

									{
										'Identity'	:	'Yes',
										'Text' 		:	'Yes',
										'Class'		:	'btn btn-success waves-effect'
									}
								]}

								Form_Control =
								{[
									{
										'Control'	:	'input',
										'Identity'	:	'Input_1',
										'Name'		:	'User_Name',
										'Type'		:	'text',
										'Label'		:	'Username'
									}
								]}

								Custom = {{ 'Available' : false }}
								/>
								{ this.state['Header_Visible'] ? <ECIMS_Header/> : <div></div> }
								{ this.state['Header_Visible'] ? <ECIMS_Sidebar ref = { this.Element['System_Sidebar'] }/> : <div></div> }
								<Switch>
									<Route path = '/Dashboard' component = { () => <ECIMS_Sample/> }/>
									<Route path = '/Authentication/Login' component = { () => <ECIMS_Authenticator method = 'KnowledgeBased'/> }/>
									<Route path = '/Cooperative/Add' component = { () => <ECIMS_Cooperative_Registration/> }/>
									<Route path = '/Cooperative/Create' component = { () => <ECIMS_Cooperative_Registration/> }/>
									<Route path = '/Cooperator/Account' component = { () => <ECIMS_Cooperator_Account/> }/>
									<Route component = { () => <ECIMS_Sample/> }/>
								</Switch>
								<ECIMS_Footer/>
							</BrowserRouter>
						</main>
					</div>
		}
	}

	window.System_Mode				=	'Production' //Development, Production
	window.URL_Base					=	'http://localhost/'
	window.URL_Base_Backend			=	'http://localhost/Backend/'
	window.URL_Function				=	URL_Base + 'backend/Function/'
	window.URL_Person_Image			=	URL_Base + 'Data/System/Image/Person_Image.png'
	window.ECIMS_Index				=	ECIMS_Index

	if (System_Mode == 'Production')
		console.log('System is currently in Production')

	ReactDOM.render(<ECIMS_Index/>, $('#Main')[0])
})