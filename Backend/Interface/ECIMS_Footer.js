define('ECIMS_Footer', () =>
{
	class ECIMS_Footer extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Footer Class')

			super()
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Footer Class')
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Footer Class')

			return	<div>
						<footer className = 'footer d-none d-sm-block'>
							<p>© UB-ECIMS 2020-06-06. All rights reserved.</p>

							<ul className = 'footer__nav'>
								<a href = '#'>Homepage</a>
								<a href = '#'>Company</a>
								<a href = '#'>Support</a>
								<a href = '#'>News</a>
								<a href = '#'>Contacts</a>
							</ul>
						</footer>
					</div>
		}
	}

	window.ECIMS_Footer = ECIMS_Footer
})