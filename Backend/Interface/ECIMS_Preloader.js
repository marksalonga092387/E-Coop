define('ECIMS_Preloader', () =>
{
	class ECIMS_Preloader extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Preloader Class')

			super()

			this.Element =
			{
				'Preloader'	:	React.createRef()
			}
		}

		Show()
		{
			$(this.Element.Preloader.current).show()
		}

		Hide()
		{
			$(this.Element.Preloader.current).hide()
		}

		Load(set_Delay, set_Component, set_Interface, set_CallBack)
		{
			setTimeout(() =>
			{
				set_Component.setState({ 'Interface' : set_Interface, 'Action' : location.pathname.split('/').slice(-1) }, () =>
				{
					set_CallBack()
				})
			}, set_Delay)
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Preloader Class')
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Preloader Class')

			return	<div>
						<div ref = { this.Element.Preloader } className = 'page-loader' style = {{ 'backgroundColor': '#00000075' }}>
							<div className = 'page-loader__spinner'>
								<svg viewBox = '25 25 50 50'>
									<circle cx = '50' cy = '50' r = '20' fill = 'none' strokeWidth = '2' strokeMiterlimit = '10' />
								</svg>
							</div>
						</div>
					</div>
		}
	}

	window.ECIMS_Preloader = ECIMS_Preloader
})