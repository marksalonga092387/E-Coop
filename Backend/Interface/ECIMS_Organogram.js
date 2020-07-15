define('ECIMS_Organogram', () =>
{
	class ECIMS_Organogram extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Organogram Class')

			super()

			this.Element =
			{
				'Organogram'			:	React.createRef(),
				'Node_Dialog'			:	React.createRef(),
				'Node_Identity'			:	React.createRef(),
				'Node_Title'			:	React.createRef(),
				'Node_Description'		:	React.createRef(),
				'Node_Dialog_Footer'	:	React.createRef(),
				'Node_button_Save'		:	React.createRef()
			}
		}

		Initialize_DataTable()
		{
			this.DataTable = new google.visualization.DataTable()
			this.DataTable.addColumn('string', 'Identity')
			this.DataTable.addColumn('string', 'Parent Identity')
			this.DataTable.addColumn('string', 'Description')
		}

		Initialize_Chart()
		{
			this.Chart = new google.visualization.OrgChart($(this.Element['Organogram'].current)[0])

			this.Chart.draw(this.DataTable,
			{
				'allowHtml'			:	true,
				'nodeClass'			:	'Node',
				'selectedNodeClass' :	'Node_Selected',
				'size'				:	'small'
			})

			if (this.Event_Select == undefined)
				google.visualization.events.removeListener(this.Event_Select)

			this.Event_Select = google.visualization.events.addListener(this.Chart, 'select', () =>
			{
				if (this.Chart.getSelection().length != 0)
					this.Node_Selected_Index = this.Chart.getSelection()[0]['row']
			})

			this.Node_Content_Popover()
			this.Node_Content_Draggable()
		}

		Node_Content_Popover()
		{
			$('.Node_Action').parent().parent().each((set_Index, set_Element) =>
			{
				$(set_Element).remove()
			})

			this.Node_Content = $('.Node_Content').parent()

			this.Node_Content.popover('dispose')

			this.Node_Content.popover
			({
				'html'		:	true,
				'delay'		:	0,
				'content'	:	() =>
				{
					return	'<div class = "Node_Action">' +
							'<div><a class = "btn btn-theme btn-sm Node_Button Select">Details</a></div>' +
							'<hr class = "Node_Line">' +
							'<div><a class = "btn btn-theme btn-sm Node_Button Insert">Add</a></div>' +
							'<hr class = "Node_Line">' +
							'<div><a class = "btn btn-theme btn-sm Node_Button Update">Edit</a></div>' +
							'<hr class = "Node_Line">' +
							'<div><a class = "btn btn-theme btn-sm Node_Button Delete">Delete</a></div>' +
							'</div>'
				}
			})

			this.Node_Content.on('shown.bs.popover', set_Event =>
			{
				$('.popover.fade').hover(set_Event =>
				{
					if (set_Event.type == 'mouseleave')
					{
						this.Node_Content.popover('hide')
						this.Chart.setSelection([])
					}
				})
			})

			this.Node_Content.on('click', set_Element_1 =>
			{
				this.Node_Content.each((set_Index, set_Element_2) =>
				{
					if (!$(set_Element_2).is(set_Element_1.target) && $(set_Element_2).has(set_Element_1.target).length === 0 && $('.popover').has(set_Element_1.target).length === 0)
					{
						$(set_Element_2).popover('hide')
					}
				})
			})

			$('body').on('click', set_Element =>
			{
				$('.Select').on('click', set_Event =>
				{
					set_Event.stopImmediatePropagation()

					this.Node_Content.popover('hide')
					this.Chart.setSelection([])

					this.Node_Dialog.modal('show')
					this.Node_Identity.val(this.Data[this.Node_Selected_Index]['Identity'])
					this.Node_Title.val(this.Data[this.Node_Selected_Index]['Title']).change()
					this.Node_Description.val(this.Data[this.Node_Selected_Index]['Description'])
					this.Node_Dialog_Footer.addClass('d-none')
					console.log(this.Node_Dialog_Footer)
				})

				$('.Insert').on('click', set_Event =>
				{
					set_Event.stopImmediatePropagation()

					this.Node_Content.popover('hide')
					this.Chart.setSelection([])

					this.Insert
					({
						'Identity'			:	'USR-' + this.Counter,
						'Identity_Parent'	:	this.Data[this.Node_Selected_Index]['Identity'],
						'Title'				:	'Member',
						'Description'		:	'Name ' + this.Counter,
						'Image'				:	URL_Person_Image
					})

					this.Counter ++
					this.Initialize_Chart()
				})

				$('.Update').on('click', set_Event =>
				{
					set_Event.stopImmediatePropagation()

					this.Node_Content.popover('hide')
					this.Chart.setSelection([])

					this.Node_Dialog.modal('show')
					this.Node_Identity.val(this.Data[this.Node_Selected_Index]['Identity'])
					this.Node_Title.val(this.Data[this.Node_Selected_Index]['Title']).change()
					this.Node_Description.val(this.Data[this.Node_Selected_Index]['Description'])
					this.Node_Dialog_Footer.removeClass('d-none')
				})

				$('.Delete').on('click', set_Event =>
				{
					set_Event.stopImmediatePropagation()

					this.Node_Content.popover('hide')
					this.Chart.setSelection([])

					this.Delete()
				})
			})
		}

		Node_Content_Draggable()
		{
			let Identity_From
			let Identity_To

			$('.Node_Content').parent().each((set_Index_1, set_Element_1) =>
			{
				$(set_Element_1).on('drop', set_Event =>
				{
					set_Event.preventDefault()

					if (Identity_From == Identity_To)
						return

					for (let set_Counter = 0; set_Counter < this.Data.length; set_Counter ++)
					{
						if (this.Data[set_Counter]['Identity'] == Identity_From)
						{
							if (this.Chart.getChildrenIndexes(set_Counter).length != 0)
							{
								this.Chart.getChildrenIndexes(set_Counter).forEach((set_Data) =>
								{
									if (this.Data[set_Data]['Identity_Parent'] != Identity_To)
										this.Data[set_Counter]['Identity_Parent'] = Identity_To
								})
							}

							else
								this.Data[set_Counter]['Identity_Parent'] = Identity_To

							break
						}
					}

					this.Initialize_DataTable()

					for (let set_Counter = 0; set_Counter < this.Data.length; set_Counter ++)
						this.DataTable_Add(this.Data[set_Counter])

					this.Initialize_Chart()
				}).on('dragstart', set_Event =>
				{
					Identity_From = $(set_Event.currentTarget).children('.Node_Content').attr('data-identity')
				}).on('dragover', set_Event =>
				{
					set_Event.preventDefault()

					Identity_To = $(set_Event.currentTarget).children('.Node_Content').attr('data-identity')
				})
			})
		}

		DataTable_Add(set_Data)
		{
			this.DataTable.addRows
			([
				[
					{
						'v' : set_Data['Identity'],
						'f' : '<div class = "Node_Content" data-identity = "' + set_Data['Identity'] + '">' +
						'<div class = "Node_Title">' + set_Data['Title'] + '</div>' +
						'<hr class = "Node_Line">' +
						'<img class = "Node_Image" src = "' + set_Data['Image'] + '">' +
						'<div class = "Node_Description">' + set_Data['Description'] + '</div>' +
						'</div>'
					},
					set_Data['Identity_Parent'],
					set_Data['Title']
				],
			])
		}

		Insert(set_Data)
		{
			this.Data.push(set_Data)
			this.DataTable_Add(set_Data)
		}

		Update()
		{
			this.Initialize_DataTable()

			for (let set_Counter = 0; set_Counter < this.Data.length; set_Counter ++)
			{
				if (this.Node_Identity.val() == this.Data[set_Counter]['Identity'])
				{
					this.Data[set_Counter]['Identity'] = this.Node_Identity.val()
					this.Data[set_Counter]['Title'] = this.Node_Title.val()
					this.Data[set_Counter]['Description'] = this.Node_Description.val()

					this.Node_Dialog.modal('hide')
				}

				this.DataTable_Add(this.Data[set_Counter])
			}

			this.Initialize_Chart()
		}

		Delete()
		{
			this.Initialize_DataTable()

			for (let set_Counter = 0; set_Counter < this.Data.length; set_Counter ++)
				if (this.Data[this.Node_Selected_Index]['Identity'] == this.Data[set_Counter]['Identity'])
				{
					this.Data.splice(set_Counter, 1)
					break
				}

			for (let set_Counter = 0; set_Counter < this.Data.length; set_Counter ++)
				this.DataTable_Add(this.Data[set_Counter])

			this.Initialize_Chart()
		}

		Dialog_Content()
		{
			this.Node_Dialog = $(this.Element['Node_Dialog'].current)
			this.Node_Identity = $(this.Element['Node_Identity'].current)
			this.Node_Title = $(this.Element['Node_Title'].current)
			this.Node_Description = $(this.Element['Node_Description'].current)
			this.Node_Dialog_Footer = $(this.Element['Node_Dialog_Footer'].current)

			$(this.Element['Node_button_Save'].current).on('click', () =>
			{
				this.Update()
			})
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Organogram Class')

			google.charts.load('current', { packages : ["orgchart"] })
			google.charts.setOnLoadCallback(() =>
			{
				this.Initialize_DataTable()

				this.Insert
				({
					'Identity'			:	'USR-' + this.Counter,
					'Identity_Parent'	:	'',
					'Title'				:	'Chairman',
					'Description'		:	'Name ' + this.Counter,
					'Image'				:	URL_Person_Image
				})

				this.Counter ++

				this.Insert
				({
					'Identity'			:	'USR-' + this.Counter,
					'Identity_Parent'	:	'USR-0',
					'Title'				:	'BOD Member',
					'Description'		:	'Name ' + this.Counter,
					'Image'				:	URL_Person_Image
				})

				this.Counter ++

				this.Insert
				({
					'Identity'			:	'USR-' + this.Counter,
					'Identity_Parent'	:	'USR-0',
					'Title'				:	'BOD Member',
					'Description'		:	'Name ' + this.Counter,
					'Image'				:	URL_Person_Image
				})

				this.Counter ++

				this.Initialize_Chart()
			})

			this.Data = []
			this.Counter = 0

			this.Dialog_Content()
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Organogram Class')

			return	<div>
						<div ref = { this.Element['Organogram'] }></div>

						<div className = 'modal fade' ref = { this.Element['Node_Dialog'] }>
							<div className = 'modal-dialog'>
								<div className = 'modal-content'>
									<div className = 'modal-header'>
										<h5 className = 'modal-title'>Default modal</h5>
									</div>
									<div className = 'modal-body'>
										<div className = 'row'>
											<div className = 'col-md-12'>
												<input ref = { this.Element['Node_Identity'] }className = 'd-none'/>

												<div className = 'form-group'>
													<label>Position</label>
													<input ref = { this.Element['Node_Title'] } type = 'text' className = 'form-control'/>
												</div>

												<div className = 'form-group'>
													<label>Name</label>
													<input ref = { this.Element['Node_Description'] } type = 'text' className = 'form-control'/>
												</div>
											</div>
										</div>
									</div>
									<div ref = { this.Element['Node_Dialog_Footer'] } className = 'modal-footer'>
										<button ref = { this.Element['Node_button_Save'] } type = 'button' className = 'btn btn-link'>Save changes</button>
										<button type = 'button' className = 'btn btn-link' data-dismiss = 'modal'>Close</button>
									</div>
								</div>
							</div>
						</div>
					</div>
		}
	}

	window.ECIMS_Organogram = ECIMS_Organogram
})