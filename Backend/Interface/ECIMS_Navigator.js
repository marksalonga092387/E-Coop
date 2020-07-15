define('ECIMS_Navigator', () =>
{
	class ECIMS_Navigator extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Navigator Class')

			super()
		}

		Forward(set_Path)
		{
			System_BrowserRouter.history.push(set_Path)
		}

		Backward()
		{
			System_BrowserRouter.history.goBack()
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Navigator Class')
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Navigator Class')

			return	<div></div>
		}
	}

	window.ECIMS_Navigator = ECIMS_Navigator
})