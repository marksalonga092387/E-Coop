define('ECIMS_Manipulator', () =>
{
	class ECIMS_Manipulator
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Manipulator Class')
		}

		static System_Promise(set_Function)
		{
			return new Promise((set_Resolve) =>
			{
				set_Function(set_Resolve)
			})
		}

		static System_Dialog_Promise(set_Resolve)
		{
			System_Dialog.Show()
			System_Dialog.Show_Button()

			System_Dialog.set_Button_Click
			({
				'Identity'	:	'Yes',
				'Function'	:	() =>
				{
					set_Resolve('Yes')
				}
			})

			System_Dialog.set_Button_Click
			({
				'Identity'	:	'No',
				'Function'	:	() =>
				{
					set_Resolve('No')
				}
			})
		}

		static Display_Data(set_Data)
		{
			set_Data.map(set_Data =>
			{
				console.log(set_Data)
			})
		}

		static set_Form_Validation(set_Form)
		{
			set_Form.addClass('was-validated')

			return set_Form[0].checkValidity()
		}

		static get_Form_Data(set_Form, set_Action)
		{
			let get_Data = new FormData()

			if (set_Action == 'JSON')
				get_Data = {}

			for (let get_Counter = 0; get_Counter < set_Form.length; get_Counter ++)
			{
				if(!(set_Form[get_Counter] instanceof FormData))
				{
					get_Data = false
					break
				}

				else
					for (var set_Data of set_Form[get_Counter].entries())
					{
						if (set_Action != 'JSON')
						{
							if (set_Data[2] != undefined)
								get_Data.append(set_Data[0], set_Data[1], set_Data[2])

							else
								get_Data.append(set_Data[0], set_Data[1])
						}

						else
							get_Data[set_Data[0]] = set_Data[1]
					}
			}

			return get_Data
		}

		static set_Card_Size(set_Event, set_Component)
		{
			set_Event.preventDefault()
			
			let get_Card = $(set_Event.target).closest('.card')

			get_Card.toggleClass('card--fullscreen')

			set_Component.setState({ 'Card_State' : get_Card.hasClass('card--fullscreen') ? 'Maximize' : 'Minimize' })
		}

		static set_Input_Multiple(set_Object)
		{
			set_Object['Element'].unbind().removeData()
			set_Object['Element'].siblings('.tokenize').remove()

			set_Object['Array'].map(set_Data =>
			{
				set_Object['Element'].append('<option selected data-type = "custom" value = "' + set_Data + '">' + set_Data + '</option>')
			})

			set_Object['Element'].tokenize2
			({
				'tokensAllowCustom'	:	true,
				'sortable'			:	true
			})

			set_Object['Element'].on('tokenize:tokens:added', (set_Event, set_Value, set_Text) =>
			{
				set_Object['Element'].next().addClass('valid')
				set_Object['Array'].push(set_Value)

			})

			set_Object['Element'].on('tokenize:tokens:remove', (set_Event, set_Value) =>
			{
				for (let set_Counter = 0; set_Counter < set_Object['Array'].length; set_Counter ++)
				{
					if (set_Object['Array'][set_Counter] == set_Value)
					{
						set_Object['Array'].splice(set_Counter, 1)
						break
					}
				}

				if (set_Object['Array'].length <= 0)
					set_Object['Element'].next().removeClass('valid')
			})

			set_Object['Element'].on('tokenize:tokens:reorder', () =>
			{
				let get_Object_Array = []

				set_Object['Element'].children('option').each((set_Index, set_Element) =>
				{
					get_Object_Array.push(set_Element.value)
				})

				set_Object['Array'] = get_Object_Array
			})

			set_Object['Element'].on('tokenize:keyup', (set_Event_1, set_Event_2) =>
			{
				if (set_Event_2.target.value.length)
					set_Object['Element'].next().addClass('valid')

				else
					if (set_Object['Array'].length == 0)
						set_Object['Element'].next().removeClass('valid')

			})

			if (set_Object['Array'].length > 0)
				set_Object['Element'].next().addClass('valid')
		}

		static get_Input_Multiple_Value(set_Object)
		{
			let get_Array = []

			set_Object.children('option').each((set_Index, set_Element) =>
			{
				get_Array.push(set_Element.value)
			})

			return get_Array
		}

		static set_Textarea_Autosize(set_Object)
		{
			autosize(set_Object['Element'])
		}

		static set_Select(set_Object)
		{
			$(set_Object['Element']).select2
			({
				'width'				:	'100%',
				'dropdownParent'	:	set_Object['Element'].parent()
			})
		}

		static get_Select_Data(set_Object)
		{
			let get_Data = []

			set_Object['Element'].select2('data').map(set_Data =>
			{
				get_Data.push(set_Data['id'])
			})

			return get_Data
		}

		static set_Input_DateTime(set_Object)
		{
			set_Object['Element'].flatpickr
			({
				'enableTime'	:	set_Object['enableTime'],
				'nextArrow'		:	'<i class="zwicon-arrow-right" />',
				'prevArrow'		:	'<i class="zwicon-arrow-left" />'
			})
		}

		static set_MaxLength(set_Object)
		{
			set_Object['Element'].attr('maxlength', set_Object['Length'])

			set_Object['Element'].on('change paste keyup', (set_Object) =>
			{
				let get_Value = $(set_Event.target).val()

				if (get_Value.length > set_Object['Length'])
					$(set_Event.target).val(get_Value.substring(0, set_Object['Length']))
			})
		}

		static set_Image_Upload_Preview(set_Input_Identity, set_Image_Identity)
		{
			set_Input_Identity.change(set_Event =>
			{
				var get_Image = set_Image_Identity.get(0)
				var get_Input = set_Input_Identity.get(0).files[0]
				var get_FileReader = new FileReader();

				get_FileReader.onloadend = function()
				{
					get_Image.src = get_FileReader.result
				}

				if(get_Input != undefined)
					get_FileReader.readAsDataURL(get_Input)

				else
					get_Image.src = URL_No_Image

				if (set_Input_Identity.val().length == 0)
					set_Input_Identity.parent().removeClass('valid').addClass('invalid')

				else
					set_Input_Identity.parent().removeClass('invalid').addClass('valid')

			})
		}
	}

	window.ECIMS_Manipulator = ECIMS_Manipulator
})