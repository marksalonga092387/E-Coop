define('ECIMS_Sidebar', () =>
{
	class ECIMS_Sidebar extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Sidebar Class')

			super()

			this.state =
			{
				'User_Name'				:	'',
				'User_Address_Email'	:	'',
				'Background'			: 
				[
					{ 'File_Path' : '../Library/Server_Template/img/bg/1.jpg', 'File_Name' : '1'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/2.jpg', 'File_Name' : '2'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/3.jpg', 'File_Name' : '3'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/4.jpg', 'File_Name' : '4'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/5.jpg', 'File_Name' : '5'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/6.jpg', 'File_Name' : '6'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/7.jpg', 'File_Name' : '7'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/8.jpg', 'File_Name' : '8'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/9.jpg', 'File_Name' : '9'},
					{ 'File_Path' : '../Library/Server_Template/img/bg/10.jpg', 'File_Name' : '10'},
					{ 'File_Path' : '../Data/System/Image/Background/251251.jpg', 'File_Name' : '251251'},
					{ 'File_Path' : '../Data/System/Image/Background/251261.jpg', 'File_Name' : '251261'},
					{ 'File_Path' : '../Data/System/Image/Background/251262.jpg', 'File_Name' : '251262'},
					{ 'File_Path' : '../Data/System/Image/Background/251263.jpg', 'File_Name' : '251263'},
					{ 'File_Path' : '../Data/System/Image/Background/251268.jpg', 'File_Name' : '251268'},
					{ 'File_Path' : '../Data/System/Image/Background/251284.jpg', 'File_Name' : '251284'},
					{ 'File_Path' : '../Data/System/Image/Background/251295.jpg', 'File_Name' : '251295'},
					{ 'File_Path' : '../Data/System/Image/Background/251302.jpg', 'File_Name' : '251302'},
					{ 'File_Path' : '../Data/System/Image/Background/251306.jpg', 'File_Name' : '251306'},
					{ 'File_Path' : '../Data/System/Image/Background/251310.jpg', 'File_Name' : '251310'}
				]
			}
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Sidebar Class')

			$('.scrollbar').overlayScrollbars
			({
				scrollbars	:
				{
					'clickScrolling'	:	!0
				},

				'className'				:	'os-theme-light'
			})
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Sidebar Class')

			return	<div>
						<aside className = 'sidebar'>
							<div className = 'scrollbar'>
								<div className = 'user'>
									<div className = 'user__info' data-toggle = 'dropdown'>
										<img className = 'user__img' src = '../Library/Server_Template/demo/img/profile-pics/8.jpg' alt = ''/>
										<div>
											<div className = 'user__name'style = {{ 'wordBreak': 'break-all' }}>{ this.state['User_Name'] }</div>
											<div className = 'user__email' style = {{ 'wordBreak': 'break-all' }}>{ this.state['User_Address_Email'] }</div>
										</div>
									</div>

									<div className = 'dropdown-menu dropdown-menu--invert'>
										<a className = 'dropdown-item' href = '#'>View Profile</a>
										<a className = 'dropdown-item' href = '#'>Settings</a>
										<a className = 'dropdown-item' href = '#'>Logout</a>
									</div>
								</div>

								<ul
									onClick =
									{
										set_Event =>
										{
											set_Event.preventDefault()
											$(set_Event.target).closest('a').next().slideToggle(200)
										}
									}
									className = 'navigation'>
									<li>
										<NavLink to = '/Dashboard' activeClassName = 'navigation__active'>
											<i className = 'zwicon-home'></i>
											Dashboard
										</NavLink>
									</li>

									<li className = 'navigation__sub'>
										<a>
											<i className = 'zwicon-stand-up'></i>
											Cooperative
											<span className = 'zwicon-more-h'></span>
										</a>

										<ul>
											{
												Session_User_Privilege().includes('Admin') ?
												<li>
													<NavLink to = '/Cooperative/List' activeClassName = 'navigation__active'>
														&nbsp;List
														<span className = 'zwicon-list-bullet'></span>
													</NavLink>
												</li>
												:
												<div></div>
											}

											{
												Session_User_Privilege().includes('Admin') ?
												<li>
													<NavLink to = '/Cooperative/Add' activeClassName = 'navigation__active'>
														&nbsp;Add
														<span className = 'zwicon-add-to-list'></span>
													</NavLink>
												</li>
												:
												<div></div>
											}

											{
												Session_User_Privilege().includes('Cooperator') ?
												<li>
													<NavLink to = '/Cooperative/Join' activeClassName = 'navigation__active'>
														&nbsp;Join
														<span className = 'zwicon-sign-in'></span>
													</NavLink>
												</li>
												:
												<div></div>
											}

											{
												Session_User_Privilege().includes('Cooperator') ?
												<li>
													<NavLink to = '/Cooperative/Create' activeClassName = 'navigation__active'>
														&nbsp;Create
														<span className = 'zwicon-marker'></span>
													</NavLink>
												</li>
												:
												<div></div>
											}
										</ul>
									</li>

									<li className = 'navigation__sub'>
										<a>
											<i className = 'zwicon-cog'></i>
											Settings
											<span className = 'zwicon-more-h'></span>
										</a>

										<ul>
											<li>
												<NavLink to = '/Cooperator/Account' activeClassName = 'navigation__active'>
													&nbsp;My Account
													<span className = 'zwicon-persona'></span>
												</NavLink>
											</li>

											<li>
												<a onClick =
												{
													() =>
													{
														System_Dialog.Show()
														System_Dialog.Title = 'Loading...'
														System_Dialog.Size = 'Small'
														System_Dialog.Closable = false
														System_Dialog.Mode = 'Wait'
														System_Dialog.Hide_Button()
														System_Dialog.Alert_Interface = 'Warning'
														System_Dialog.Alert_Text = 'Logging out.......'

														cookies.remove('User_Identity', { 'path' : '/'})
													}
												}>
													&nbsp;Logout
													<span className = 'zwicon-sign-out'></span>
												</a>
											</li>
										</ul>
									</li>

									<li style = {{ 'display' : 'none' }}>
										<NavLink to = '/Sample/Single' activeClassName = 'navigation__active'>
											<i className = 'zwicon-top-bar'></i>Sample Single
										</NavLink>
									</li>

									<li className = 'navigation__sub' style = {{ 'display' : 'none' }}>
										<a>
											<i className = 'zwicon-three-h'></i>
											Sample Parent
											<span className = 'zwicon-more-h'></span>
										</a>

										<ul>
											<li>
												<NavLink to = '/Sample/Child/1' activeClassName = 'navigation__active'>
													&nbsp;Sample Child 1
													<span className = 'zwicon-top-bar'></span>
												</NavLink>
											</li>

											<li>
												<NavLink to = '/Sample/Child/2' activeClassName = 'navigation__active'>
													&nbsp;Sample Child 2
													<span className = 'zwicon-top-bar'></span>
												</NavLink>
											</li>

											<li>
												<NavLink to = '/Sample/Child/3' activeClassName = 'navigation__active'>
													&nbsp;Sample Child 3
													<span className = 'zwicon-top-bar'></span>
												</NavLink>
											</li>
										</ul>
									</li>
								</ul>
							</div>
						</aside>

						<div
							onClick =
							{
								set_Event =>
								{
									set_Event.preventDefault()

									$('.themes__item').removeClass('active')
									$('body').attr('data-sa-theme', $(set_Event.target)
									.closest('a')
									.addClass('active')
									.data('sa-value'))
								}
							}
							className = 'themes'>
							<div className = 'scrollbar'>
							{
								this.state['Background'].map(set_Data =>
								{
									return	<a
												key = { set_Data['File_Name'] }
												className = { $('body').attr('data-sa-theme') == set_Data['File_Name'] ? 'themes__item active' : 'themes__item' }
												data-sa-value = { set_Data['File_Name'] }>
												<img src = { set_Data['File_Path'] }/>
											</a>
								})
							}
							</div>
						</div>
					</div>
		}
	}

	window.ECIMS_Sidebar = ECIMS_Sidebar
})