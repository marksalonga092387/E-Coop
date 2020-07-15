define('ECIMS_Header', () =>
{
	class ECIMS_Header extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Header Class')

			super()
		}

		Header_Action(set_Event)
		{
			let get_Element_1	=	$(set_Event.target).closest('[data-sa-action]')
			let get_Action		=	get_Element_1.data('sa-action')
			let get_Element_2

			switch (get_Action)
			{
				case 'search-open'			:
					$('.search').addClass('search--toggled')
					break

				case 'search-close'			:
					$('.search').removeClass('search--toggled')
					break

				case 'aside-open'			:
					get_Element_2 = get_Element_1.data('sa-target')
					get_Element_1.addClass('toggled')
					$('body').addClass('aside-toggled')
					$(get_Element_2).addClass('toggled')
					$('.header').append('<div class = "sa-backdrop" data-sa-action = "aside-close" data-sa-target = ' + get_Element_2 + ' />')
					break

				case 'aside-close'			:
					get_Element_2 = get_Element_1.data('sa-target')
					$('body').removeClass('aside-toggled')
					$('[data-sa-action = "aside-open"], ' + get_Element_2).removeClass('toggled')
					$('.content, .header').find(".sa-backdrop").remove()
					break

				case 'fullscreen'			:
					if (document.documentElement.requestFullscreen)
						document.documentElement.requestFullscreen()
					else if (ocument.documentElement.mozRequestFullScreen)
						document.documentElement.mozRequestFullScreen()
					else if (ocument.documentElement.webkitRequestFullscreen)
						document.documentElement.webkitRequestFullscreen()
					else if (ocument.documentElement.msRequestFullscreen)
						document.documentElement.msRequestFullscreen()
					break

				case 'print'				:
					window.print()
					break

				case 'notifications-clear'	:
					set_Event.stopPropagation()
					get_Element_1.fadeOut()
					$('.top-nav__notifications .listview__item').each(() =>
					{
						get_Element_1.addClass('animated fadeOutRight')
					})
					$('.top-nav__notifications .listview__item').remove()
					$('.top-nav__notifications').addClass('top-nav__notifications--cleared')
					break

				case 'toolbar-search-open'	:

					$(this).closest('.toolbar').find('.toolbar__search').fadeIn(200)
					$(this).closest('.toolbar').find('.toolbar__search input').focus()
					break

				case 'toolbar-search-close'	:
					$(this).closest('.toolbar').find('.toolbar__search input').val('')
					$(this).closest('.toolbar').find('.toolbar__search').fadeOut(200)
					break
			}
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Header Class')

			$('.search__text').on('.search__text', () =>
			{
				$('.search__text').closest('.search').addClass('search--focus')
			}).on('blur', () =>
			{
				$('.search__text').val('')
				$('.search__text').closest('.search').removeClass('search--focus')
			})
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Header Class')

			return	<div>
						<header onClick = { (set_Event) => this.Header_Action(set_Event) } className = 'header'>
							<div className = 'navigation-trigger d-xl-none' data-sa-action = 'aside-open' data-sa-target = '.sidebar'>
								<i className = 'zwicon-hamburger-menu'></i>
							</div>

							<div className = 'logo d-none d-sm-inline-flex'>
								<a href = 'index-2.html'>UB-ECIMS 2020-06-06</a>
							</div>

							<form className = 'search'>
								<div className = 'search__inner'>
									<input type = 'text' className = 'search__text' placeholder = 'Search for people, files, documents...'/>
									<i className = 'zwicon-search search__helper'></i>
									<i className = 'zwicon-arrow-left search__reset' data-sa-action = 'search-close'></i>
								</div>
							</form>

							<ul className = 'top-nav'>
								 <li className = 'd-xl-none'>
									<a href = '#' data-sa-action = 'search-open'>
										<i className = 'zwicon-search'></i>
									</a>
								 </li>

								 <li className = 'dropdown'>
									<a href = '#' data-toggle = 'dropdown' className = 'top-nav__notify'>
										<i className = 'zwicon-mail'></i>
									</a>
									<div className = 'dropdown-menu dropdown-menu-right dropdown-menu--block'>
										<div className = 'dropdown-header'>
											Messages
											<div className = 'actions'>
												<a href = 'messages.html' className = 'actions__item zwicon-plus'></a>
											</div>
										</div>

										<div className = 'listview listview--hover'>
											<a href = '#' className = 'listview__item'>
												<img src = '../Library/Server_Template/demo/img/profile-pics/1.jpg' className = 'avatar-img' alt = ''/>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>
														David Belle <small>12:01 PM</small>
													</div>
													<p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<img src = '../Library/Server_Template/demo/img/profile-pics/2.jpg' className = 'avatar-img' alt = ''/>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>
														Jonathan Morris
														<small>02:45 PM</small>
													</div>
													<p>Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel</p>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<img src = '../Library/Server_Template/demo/img/profile-pics/3.jpg' className = 'avatar-img' alt = ''/>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>
														Fredric Mitchell Jr.
														<small>08:21 PM</small>
													</div>
													<p>Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies</p>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<img src = '../Library/Server_Template/demo/img/profile-pics/4.jpg' className = 'avatar-img' alt = ''/>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>
														Glenn Jecobs
														<small>08:43 PM</small>
													</div>
													<p>Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque</p>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<img src = '../Library/Server_Template/demo/img/profile-pics/5.jpg' className = 'avatar-img' alt = ''/>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>
														Bill Phillips
														<small>11:32 PM</small>
													</div>
													<p>Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat</p>
												</div>
											</a>

											<a href = '#' className = 'view-more'>View all messages</a>
										</div>
									</div>
								</li>

								<li className = 'dropdown top-nav__notifications'>
									<a href = '#' data-toggle = 'dropdown' className = 'top-nav__notify'>
										<i className = 'zwicon-bell'></i>
									</a>
									<div className = 'dropdown-menu dropdown-menu-right dropdown-menu--block'>
										<div className = 'dropdown-header'>
											Notifications

											<div className = 'actions'>
												<a href = '#' className = 'actions__item zwicon-checkmark-square' data-sa-action = 'notifications-clear'></a>
											</div>
										</div>

										<div className = 'listview listview--hover'>
											<div className = 'listview__scroll scrollbar'>
												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/1.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>David Belle</div>
														<p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/2.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Jonathan Morris</div>
														<p>Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/3.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Fredric Mitchell Jr.</div>
														<p>Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/4.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Glenn Jecobs</div>
														<p>Ut vitae lacus sem ellentesque maximus, nunc sit amet varius dignissim, dui est consectetur neque</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/5.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Bill Phillips</div>
														<p>Proin laoreet commodo eros id faucibus. Donec ligula quam, imperdiet vel ante placerat</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/1.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>David Belle</div>
														<p>Cum sociis natoque penatibus et magnis dis parturient montes</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/2.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Jonathan Morris</div>
														<p>Nunc quis diam diamurabitur at dolor elementum, dictum turpis vel</p>
													</div>
												</a>

												<a href = '#' className = 'listview__item'>
													<img src = '../Library/Server_Template/demo/img/profile-pics/3.jpg' className = 'avatar-img' alt = ''/>
													<div className = 'listview__content'>
														<div className = 'listview__heading'>Fredric Mitchell Jr.</div>
														<p>Phasellus a ante et est ornare accumsan at vel magnauis blandit turpis at augue ultricies</p>
													</div>
												</a>
											</div>

											<div className = 'p-1'></div>
										</div>
									</div>
								</li>

								<li className = 'dropdown d-none d-sm-inline-block'>
									<a href = '#' data-toggle = 'dropdown'><i className = 'zwicon-checkmark-circle'></i></a>

									<div className = 'dropdown-menu dropdown-menu-right dropdown-menu--block' role = 'menu'>
										<div className = 'dropdown-header'>Tasks</div>

										<div className = 'listview listview--hover'>
											<a href = '#' className = 'listview__item'>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>HTML5 Validation Report</div>
													<div className = 'progress mt-1'>
														<div className = 'progress-bar bg-primary' role = 'progressbar' style = {{ 'width' : '25%' }} aria-valuenow = '25' aria-valuemin = '0' aria-valuemax = '100'></div>
											
													</div>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>Google Chrome Extension</div>
													<div className = 'progress mt-1'>
														<div className = 'progress-bar bg-warning' style = {{ 'width' : '43%' }} aria-valuenow = '43' aria-valuemin = '0' aria-valuemax = '100'></div>
													</div>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>Social Intranet Projects</div>
													<div className = 'progress mt-1'>
														<div className = 'progress-bar bg-success' style = {{ 'width' : '20%' }} aria-valuenow = '20' aria-valuemin = '0' aria-valuemax = '100'></div>
													</div>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>Bootstrap Admin Template</div>
													<div className = 'progress mt-1'>
														<div className = 'progress-bar bg-info' style = {{ 'width' : '60%' }} aria-valuenow = '60' aria-valuemin = '0' aria-valuemax = '100'></div>
													</div>
												</div>
											</a>

											<a href = '#' className = 'listview__item'>
												<div className = 'listview__content'>
													<div className = 'listview__heading'>Youtube Client App</div>
													<div className = 'progress mt-1'>
														<div className = 'progress-bar bg-danger' style = {{ 'width' : '80%' }} aria-valuenow = '80' aria-valuemin = '0' aria-valuemax = '100'></div>
													</div>
												</div>
											</a>

											<a href = '#' className = 'view-more'>View all Tasks</a>
										</div>
									</div>
								</li>

								 <li className = 'dropdown d-none d-sm-inline-block'>
									<a href = '#' data-toggle = 'dropdown'><i className = 'zwicon-grid'></i></a>

									<div className = 'dropdown-menu dropdown-menu-right dropdown-menu--block' role = 'menu'>
										<div className = 'row app-shortcuts'>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-calendar-never'></i>
												<small>Calendar</small>
											</a>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-document'></i>
												<small>Files</small>
											</a>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-mail'></i>
												<small>Email</small>
											</a>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-line-chart'></i>
												<small>Reports</small>
											</a>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-broadcast'></i>
												<small>News</small>
											</a>
											<a className = 'col-4 app-shortcuts__item' href = '#'>
												<i className = 'zwicon-image'></i>
												<small>Gallery</small>
											</a>
										</div>
									</div>
								</li>

								<li className = 'dropdown d-none d-sm-inline-block'>
									<a href = '#' data-toggle = 'dropdown'><i className = 'zwicon-more-h'></i></a>

									<div className = 'dropdown-menu dropdown-menu-right'>
										<a href = '#' className = 'dropdown-item' data-sa-action = 'fullscreen'>Fullscreen</a>
										<a href = '#' className = 'dropdown-item'>Clear Local Storage</a>
										<a href = '#' className = 'dropdown-item'>Settings</a>
									</div>
								</li>

								<li className = 'd-none d-sm-inline-block'>
									<a href = '#' className = 'top-nav__themes' data-sa-action = 'aside-open' data-sa-target = '.themes'><i className = 'zwicon-palette'></i></a>
								</li>
							</ul>

							<div className = 'clock d-none d-md-inline-block'>
								<div className = 'time'>
									<span className = 'time__hours'></span>
									<span className = 'time__min'></span>
									<span className = 'time__sec'></span>
								</div>
							</div>
						</header>
					</div>
		}
	}

	window.ECIMS_Header = ECIMS_Header
})