define('ECIMS_Main_HTTP', function()
{
	class ECIMS_Main_HTTP
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log("Succesfully Loaded : ECIMS_Main_HTTP Class")
		}

		static Select(set_Data, set_Callback)
		{
			if (!set_Data)
			{
				console.log('Invalid Data')

				return
			}

			$.ajax(
			{
				'url'			:	window.URL_Function + 'ECIMS_Main_HTTP.py',
				'type'			:	'POST',
				'data'			:	set_Data,
				'contentType'	:	false,
				'processData'	:	false,

				success	: function(set_Response)
				{
					//alert(set_Response)

					set_Callback(set_Response)
				},

				error: function(set_jQueryXMLHttpRequest, set_TextStatus, set_ErrorThrown)
				{
					set_Callback(false)

					console.log('Ajax Error: ECIMS_Main_HTTP.py/' + set_ErrorThrown)
				}
			})
		}

		static Manage(set_Data, set_Callback)
		{
			if (!(set_Data instanceof FormData))
			{
				console.log('Invalid Data')

				return
			}

			$.ajax(
			{
				'url'			:	window.URL_Function + 'ECIMS_Main_HTTP.py',
				'type'			:	'POST',
				'data'			:	set_Data,
				'contentType'	:	false,
				'processData'	:	false,

				success: function(set_Response)
				{	
					alert(set_Response)

					if (set_Response == 'Insert Succeeded' || set_Response == 'Update Succeeded' || set_Response == 'Delete Succeeded')
						set_Callback(true)

					else
						set_Callback(false)
				},

				error: function(set_jQueryXMLHttpRequest, set_TextStatus, set_ErrorThrown)
				{
					set_Callback(false)

					console.log('Ajax Error: Function/ECIMS_Main_HTTP.py/ ' + set_ErrorThrown)
				}
			})
		}
	}

	window.ECIMS_Main_HTTP = ECIMS_Main_HTTP
})