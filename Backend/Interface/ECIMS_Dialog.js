define('ECIMS_Dialog', function()
{
	class ECIMS_Dialog extends Component
	{
		constructor(props)
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Dialog')

			super(props)

			this.state =
			{
				'Visible'				:	false,
				'Size'					:	'',
				'Title'					:	'',
				'Closable'				:	false,
				'Mode'					:	'',

				'Alert_Interface'		:	'',
				'Alert_Text'			:	'',

				'Form_Control_Array'	:	[],
				'Button_Array'			:	[],

				'Custom_Interface'		:	<div></div>
			}

			this.Element =
			{
				'Dialog'			:	React.createRef(),
				'Dialog_Custom'		:	React.createRef(),
				'Dialog_Loading'	:	React.createRef(),
				'Dialog_Form'		:	React.createRef(),
				'Dialog_Alert'		:	React.createRef(),
				'Dialog_Button'		:	React.createRef()
			}

			if (this.props.Button != undefined)
				this.props.Button.map(set_Button => 
				{
					this.state['Button_Array'].push(set_Button)
				})

			if (this.props.Form_Control != undefined)
				this.props.Form_Control.map(set_Form_Control => 
				{
					this.state['Form_Control_Array'].push(set_Form_Control)
				})
		}

		Show()
		{
			if (!$(this.Element['Dialog'].current).hasClass('show'))
				$(this.Element['Dialog'].current).modal('show')

			this.Visible = true
		}

		Hide()
		{
			if ($(this.Element['Dialog'].current).hasClass('show'))
				$(this.Element['Dialog'].current).modal('hide')

			this.Visible = false
		}

		set Visible(set_Data)
		{
			this.setState({ 'Visible' : false })
		}

		get Visible()
		{
			return this.state['Visible']
		}

		get Title()
		{
			return this.state['Title']
		}

		set Title(set_Title)
		{
			this.setState({ 'Title' : set_Title })
		}

		get Size()
		{
			return this.state['Size']
		}

		set Size(set_Size)
		{
			if (set_Size == 'Small')
				this.setState({ 'Size' : 'modal-dialog modal-sm' })

			else if (set_Size == 'Default')
				this.setState({ 'Size' : 'modal-dialog' })

			else if (set_Size == 'Large')
				this.setState({ 'Size' : 'modal-dialog modal-lg' })

			else if (set_Size == 'Extra Large')
				this.setState({ 'Size' : 'modal-dialog modal-xl' })

			else
				this.setState({ 'Size' : '' })
		}

		Show_Button()
		{
			$(this.Element['Dialog_Button'].current).show()
		}

		Hide_Button(set_Element)
		{
			if (set_Element == undefined)
				$(this.Element['Dialog_Button'].current).hide()

			else
				$(findDOMNode(this.refs[set_Element])).hide()
		}

		set Closable(set_Data)
		{
			if (set_Data)
			{
				$(this.Element['Dialog'].current).data('bs.modal')._config.backdrop = !set_Data
				$(this.Element['Dialog'].current).data('bs.modal')._config.keyboard = set_Data
			}

			else
			{
				$(this.Element['Dialog'].current).data('bs.modal')._config.backdrop = 'static'
				$(this.Element['Dialog'].current).data('bs.modal')._config.keyboard = set_Data
			}

			this.setState({ 'Closable' : set_Data })
		}

		get Closable()
		{
			return this.state['Closable']
		}

		get Mode()
		{
			return this.state['Mode']
		}

		set Mode(set_Mode)
		{
			if(set_Mode == 'Choice' || set_Mode == 'Message')
			{
				$(this.Element['Dialog_Alert'].current).show()
				$(this.Element['Dialog_Form'].current).hide()
				$(this.Element['Dialog_Loading'].current).hide()
				$(this.Element['Dialog_Custom'].current).hide()
			}

			else if (set_Mode == 'Input')
			{
				$(this.Element['Dialog_Alert'].current).hide()
				$(this.Element['Dialog_Form'].current).show()
				$(this.Element['Dialog_Loading'].current).hide()
				$(this.Element['Dialog_Custom'].current).hide()
			}

			else if (set_Mode == 'Wait')
			{
				$(this.Element['Dialog_Alert'].current).hide()
				$(this.Element['Dialog_Form'].current).hide()
				$(this.Element['Dialog_Loading'].current).show()
				$(this.Element['Dialog_Custom'].current).hide()
			}

			else if (set_Mode == 'Custom')
			{
				$(this.Element['Dialog_Alert'].current).hide()
				$(this.Element['Dialog_Form'].current).hide()
				$(this.Element['Dialog_Loading'].current).hide()
				$(this.Element['Dialog_Custom'].current).show()
			}

			this.setState({ 'Mode' : set_Mode })
		}		

		get Alert_Interface()
		{
			return this.state['Alert_Interface']
		}

		set Alert_Interface(set_Interface)
		{
			if (set_Interface == 'Success')
				this.setState({ 'Alert_Interface' : 'alert alert-success' })

			else if (set_Interface == 'Info')
				this.setState({ 'Alert_Interface' : 'alert alert-info' })

			else if (set_Interface == 'Warning')
				this.setState({ 'Alert_Interface' : 'alert alert-warning' })

			else if (set_Interface == 'Danger')
				this.setState({ 'Alert_Interface' : 'alert alert-danger' })

			else
				this.setState({ 'Alert_Interface' : '' })
		}

		get Alert_Text()
		{
			return this.state['Alert_Text']
		}

		set Alert_Text(set_Text)
		{
			this.setState({ 'Alert_Text' : set_Text })
		}

		set_Form_Control(set_Control)
		{
			this.setState(set_State =>
			{
				set_State.Form_Control_Array.push(set_Control)
			})
		}

		set_Button(set_Control)
		{
			this.setState(set_State =>
			{
				set_State.Button_Array.push(set_Control)
			})
		}

		set_Button_Click(set_Control)
		{
			$(findDOMNode(this.refs[set_Control['Identity']])).on('click', set_Control['Function'])
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Dialog Class')


			$(findDOMNode(this.refs.Dialog)).on('hidden.bs.modal', () =>
			{
				this.Closable = false
			})
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Dialog Class')

			return	<div>
						<div id = 'Dialog' ref = { this.Element['Dialog'] } className = 'modal fade' tabIndex = '-1' role = 'dialog' data-backdrop = 'static' data-keyboard = 'false'>
							<div className = { this.state['Size'] != '' ? this.state['Size'] : 'modal-dialog' }>
								<div className = 'modal-content'>

									<h3 style = {{'textAlign' : 'center', 'paddingTop' : '1em' }}>{ this.state['Title'] }</h3>

									<div className = 'modal-body'>

										<center ref = { this.Element['Dialog_Custom'] }>{ this.props.Custom.Available ? this.props.Custom_Interface : '' }</center>

										<center ref = { this.Element['Dialog_Loading'] } className = 'mb-4'>
											<div className = 'Loading'></div>
										</center>

										<center ref = { this.Element['Dialog_Alert'] } className = { this.state['Alert_Interface']  } >{ this.state['Alert_Text'] }</center>

										<form ref = { this.Element['Dialog_Form'] }>
										{
											this.state['Form_Control_Array'].map(set_Form_Control =>
											{
												if(set_Form_Control.Control == 'input')
													return	<div key = { set_Form_Control.Identity }>
																<div className = 'form-group col-md-12'>
																	<div className = 'field'>
																		<input ref = { set_Form_Control.Identity } name = { set_Form_Control.Name } type = { set_Form_Control.Type } className = 'form-control' required/>
																		<label className = 'form-control-placeholder' htmlFor = { set_Form_Control.Name }>{ set_Form_Control.Label }</label>
																	</div>
																</div>
															</div>
												else
													return	<div>
																<div className = 'form-group col-md-12'><div className = 'field'>No Control</div></div>
															</div>
											})
										}
										</form>
									</div>

									<div ref = { this.Element['Dialog_Button'] } className = 'modal-footer'>
									{
										this.state['Button_Array'].map(set_Button =>
										{
											return <button key = { set_Button['Identity'] } ref = { set_Button['Identity'] } onClick = { set_Button['Function'] } type = 'button' className = { set_Button['Class'] }>{ set_Button['Text'] }</button>
										})
									}
									</div>

								</div>
							</div>
						</div>
					</div>
		}
	}

	window.ECIMS_Dialog = ECIMS_Dialog
})