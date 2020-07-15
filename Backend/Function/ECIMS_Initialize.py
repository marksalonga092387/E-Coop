#! "F:/Python_3.8.3/python.exe"

from ECIMS_Cooperative import *
from ECIMS_Philippines import *
from ECIMS_User import *
from ECIMS_Blockchain import *

def set_Initialize():
	#Programming
	#GLOBAL['REQUEST']['Action'] = 'Delete : All'
	#Initialize.Initialize_Cooperative()
	#Initialize.Initialize_Cooperative_Category()
	#Initialize.Initialize_Cooperative_Type()
	#Initialize.Initialize_Philippines()
	Initialize.Initialize_User()
	#Initialize.Initialize_User_Gender()

	print('Success')

class Initialize:

	def Initialize_User_Gender():
		User.Delete_User_Personal_Gender()
		Main.reset_Counter(GLOBAL['User_Gender_Counter_Code'])

		get_Gender_Data = ['Male', 'Female']

		for set_Data in get_Gender_Data:
			GLOBAL['REQUEST']['Gender_Identity'] = 'USR-GNDR-' + str(Main.Select_Counter(GLOBAL['User_Gender_Counter_Code']))
			GLOBAL['REQUEST']['Gender_Name'] = set_Data
			GLOBAL['REQUEST']['Gender_Description'] = set_Data

			if User.Insert_User_Personal_Gender() == True:
				Main.Update_Counter(GLOBAL['User_Gender_Counter_Code'])


	def Initialize_User():
		User.Delete_User()
		Main.reset_Counter(GLOBAL['User_Counter_Code'])
		Main.reset_Counter(GLOBAL['User_Confirmation_Counter_Code'])
		get_Etherium = Blockchain.get_Admin_Account()

		Query_Insert = f"""
							INSERT INTO User_Credential
							(
								User_Identity,
								User_Name,
								User_Password,
								User_Type,
								User_Privilege,
								User_State,
								User_Ethereum_Address,
								User_Ethereum_Key,
								User_Inserted_By,
								User_Inserted_DateTime
							)
							VALUES
							(
								'USR-Admin',
								'admin',
								'admin',
								'Admin',
								'["Admin"]',
								'Confirmed',
								'{ get_Etherium['Address'] }',
								'{ get_Etherium['Private_Key'] }',
								'USR-Admin',
								'{ str(datetime.now()) }'
							);

							INSERT INTO User_Personal
							(
								User_Identity,
								User_Firstname,
								User_Middlename,
								User_Lastname
							)
							VALUES
							(
								'USR-Admin',
								'Rafael',
								'Nobleza',
								'Masallo'
							);

							INSERT INTO User_Personal_Employment (User_Identity) VALUES ('USR-Admin')
						"""

		GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
		GLOBAL['PyMySQL_Connection'].commit()

	def Initialize_Cooperative():
		GLOBAL['REQUEST']['Action'] = 'Delete : All'
		Cooperative.Delete_Cooperative()
		Main.reset_Counter(GLOBAL['Cooperative_Counter_Code'])

	def Initialize_Cooperative_Category():

		Cooperative.Delete_Cooperative_Category()
		Main.reset_Counter(GLOBAL['Cooperative_Category_Counter_Code'])
		get_Cooperative_Category_Name = ['Primary', 'Secondary', 'Tertiary']

		for set_Data in get_Cooperative_Category_Name:
			GLOBAL['REQUEST'] = { 'Category_Name' : set_Data, 'Category_Description' : set_Data }
			Cooperative.Insert_Cooperative_Category()

	def Initialize_Cooperative_Type():

		Cooperative.Delete_Cooperative_Type()
		Main.reset_Counter(GLOBAL['Cooperative_Type_Counter_Code'])
		get_Cooperative_Type_Name	=	[
											'Advocacy', 'Agrarian Reform', 'Agriculture', 'Consumers',
											'Cooperative Bank', 'Credit', 'Credit Surety Fund', 'Dairy',
											'Education', 'Electric', 'Federation', 'Financial Service',
											'Fishermen', 'Health Service', 'Housing', 'Insurance',
											'Labor Service', 'Marketing', 'Producers', 'Professional',
											'Service', 'Small Scale Mining', 'Transport', 'Union',
											'Water Service', 'Workers'
										]
		for set_Data in get_Cooperative_Type_Name:
			GLOBAL['REQUEST'] = { 'Type_Name' : set_Data, 'Type_Description' : set_Data }
			Cooperative.Insert_Cooperative_Type()

	def Initialize_Philippines():

		Philippines.Delete_Philippines_Region()
		Philippines.Delete_Philippines_Region_Province()
		Philippines.Delete_Philippines_Region_Province_Locality()
		Main.reset_Counter(GLOBAL['Philippines_Region_Counter_Code'])
		Main.reset_Counter(GLOBAL['Philippines_Region_Province_Counter_Code'])
		Main.reset_Counter(GLOBAL['Philippines_Region_Province_Locality_Counter_Code'])

		for set_Data in Philippines_Data:
			print('------Region------')
			get_Region_Name = set_Data['Region_Name']
			print(get_Region_Name)
			GLOBAL['REQUEST'] = { 'Region_Name' : get_Region_Name }
			Philippines.Insert_Philippines_Region()

			if 'Region_Province' in set_Data:

				for set_Province in set_Data['Region_Province']:
					print('------Province------')
					get_Province_Name = set_Province['Province_Name']
					print(get_Province_Name)
					print('------Locality------')
					GLOBAL['REQUEST'] = { 'Province_Name' : get_Province_Name, 'Region_Identity' : GLOBAL['REQUEST']['Region_Identity'] }
					Philippines.Insert_Philippines_Region_Province()

					for set_Locality in set_Province['Province_Locality']:
						get_Locality_Name = set_Locality['Locality_Name']
						print(get_Locality_Name)
						GLOBAL['REQUEST'] = { 'Locality_Name' : get_Locality_Name, 'Region_Identity' : GLOBAL['REQUEST']['Region_Identity'], 'Province_Identity' : GLOBAL['REQUEST']['Province_Identity'] }
						Philippines.Insert_Philippines_Region_Province_Locality()

			elif 'Region_Locality' in set_Data:
				print('------Locality------')

				for set_Locality in set_Data['Region_Locality']:
					get_Locality_Name = set_Locality['Locality_Name']
					print(get_Locality_Name)
					GLOBAL['REQUEST'] = { 'Locality_Name' : get_Locality_Name, 'Region_Identity' : GLOBAL['REQUEST']['Region_Identity'], 'Province_Identity' : '' }
					Philippines.Insert_Philippines_Region_Province_Locality()

			else:
				print('------Invalid------')
			
			print('_________________________')
			print('_________________________')
			print('_________________________')
			print('_________________________')


#As of June 30, 2019

Philippines_Data	=	[
							{
								'Region_Name' :	'National Capital Region (NCR)',
								'Region_Locality' :
								[
									{ 'Locality_Name' : 'Manila' },
									{ 'Locality_Name' : 'Mandaluyong' },
									{ 'Locality_Name' : 'Marikina' },
									{ 'Locality_Name' : 'Pasig' },
									{ 'Locality_Name' : 'Quezon City' },
									{ 'Locality_Name' : 'San Juan' },
									{ 'Locality_Name' : 'Caloocan' },
									{ 'Locality_Name' : 'Malabon' },
									{ 'Locality_Name' : 'Navotas' },
									{ 'Locality_Name' : 'Valenzuela' },
									{ 'Locality_Name' : 'Las Piñas' },
									{ 'Locality_Name' : 'Makati' },
									{ 'Locality_Name' : 'Muntinlupa' },
									{ 'Locality_Name' : 'Parañaque' },
									{ 'Locality_Name' : 'Pasay' },
									{ 'Locality_Name' : 'Pateros' },
									{ 'Locality_Name' : 'Taguig' }
								]
							},

							{
								'Region_Name' : 'Ilocos Region (Region I)',
								'Region_Province' :
								[
									{ 
										'Province_Name' : 'Ilocos Norte',
										'Province_Locality' :
										[
											{ 'Locality_Name' : 'Adams' },
											{ 'Locality_Name' : 'Bacarra' },
											{ 'Locality_Name' : 'Badoc' },
											{ 'Locality_Name' : 'Bangui' },
											{ 'Locality_Name' : 'Banna' },
											{ 'Locality_Name' : 'Batac' },
											{ 'Locality_Name' : 'Burgos' },
											{ 'Locality_Name' : 'Carasi' },
											{ 'Locality_Name' : 'Currimao' },
											{ 'Locality_Name' : 'Dingras' },
											{ 'Locality_Name' : 'Dumalneg' },
											{ 'Locality_Name' : 'Laoag' },
											{ 'Locality_Name' : 'Marcos' },
											{ 'Locality_Name' : 'Nueva Era' },
											{ 'Locality_Name' : 'Pagudpud' },
											{ 'Locality_Name' : 'Paoay' },
											{ 'Locality_Name' : 'Pasuquin' },
											{ 'Locality_Name' : 'Piddig' },
											{ 'Locality_Name' : 'Pinili' },
											{ 'Locality_Name' : 'San Nicolas' },
											{ 'Locality_Name' : 'Sarrat' },
											{ 'Locality_Name' : 'Solsona' },
											{ 'Locality_Name' : 'Vintar' }
										]
									},

									{ 
										'Province_Name' : 'Ilocos Sur',
										'Province_Locality' :
										[
											{ 'Locality_Name' : 'Alilem' },
											{ 'Locality_Name' : 'Banayoyo' },
											{ 'Locality_Name' : 'Bantay' },
											{ 'Locality_Name' : 'Burgos' },
											{ 'Locality_Name' : 'Cabugao' },
											{ 'Locality_Name' : 'Candon' },
											{ 'Locality_Name' : 'Caoayan' },
											{ 'Locality_Name' : 'Cervantes' },
											{ 'Locality_Name' : 'Galimuyod' },
											{ 'Locality_Name' : 'Gregorio del Pilar' },
											{ 'Locality_Name' : 'Lidlida' },
											{ 'Locality_Name' : 'Magsingal' },
											{ 'Locality_Name' : 'Nagbukel' },
											{ 'Locality_Name' : 'Narvacan' },
											{ 'Locality_Name' : 'Quirino' },
											{ 'Locality_Name' : 'Salcedo' },
											{ 'Locality_Name' : 'San Emilio' },
											{ 'Locality_Name' : 'San Esteban' },
											{ 'Locality_Name' : 'San Ildefonso' },
											{ 'Locality_Name' : 'San Juan' },
											{ 'Locality_Name' : 'San Vicente' },
											{ 'Locality_Name' : 'Santa' },
											{ 'Locality_Name' : 'Santa Catalina' },
											{ 'Locality_Name' : 'Santa Cruz' },
											{ 'Locality_Name' : 'Santa Lucia' },
											{ 'Locality_Name' : 'Santa Maria' },
											{ 'Locality_Name' : 'Santiago' },
											{ 'Locality_Name' : 'Santo Domingo' },
											{ 'Locality_Name' : 'Sicay' },
											{ 'Locality_Name' : 'Sinait' },
											{ 'Locality_Name' : 'Sugpon' },
											{ 'Locality_Name' : 'Suyo' },
											{ 'Locality_Name' : 'Tagudin' },
											{ 'Locality_Name' : 'Vigan' }
										]
									},

									{ 
										'Province_Name' : 'La Union',
										'Province_Locality' :
										[
											{ 'Locality_Name' : 'Agoo' },
											{ 'Locality_Name' : 'Aringay' },
											{ 'Locality_Name' : 'Bacnotan' },
											{ 'Locality_Name' : 'Bagulin' },
											{ 'Locality_Name' : 'Balaoan' },
											{ 'Locality_Name' : 'Bangar' },
											{ 'Locality_Name' : 'Bauang' },
											{ 'Locality_Name' : 'Burgos' },
											{ 'Locality_Name' : 'Caba' },
											{ 'Locality_Name' : 'Damortis' },
											{ 'Locality_Name' : 'Luna' },
											{ 'Locality_Name' : 'Naguilian' },
											{ 'Locality_Name' : 'Pugo' },
											{ 'Locality_Name' : 'Rosario' },
											{ 'Locality_Name' : 'San Fernando' },
											{ 'Locality_Name' : 'San Gabriel' },
											{ 'Locality_Name' : 'San Juan' },
											{ 'Locality_Name' : 'Santol' },
											{ 'Locality_Name' : 'Sto. Tomas' },
											{ 'Locality_Name' : 'Sudipen' },
											{ 'Locality_Name' : 'Tubao' }
										]
									},

									{ 
										'Province_Name' : 'Pangasinan',
										'Province_Locality' :
										[
											{ 'Locality_Name' : 'Agno' },
											{ 'Locality_Name' : 'aguilar' },
											{ 'Locality_Name' : 'Alaminos' },
											{ 'Locality_Name' : 'Alcala' },
											{ 'Locality_Name' : 'Anda' },
											{ 'Locality_Name' : 'Asingan' },
											{ 'Locality_Name' : 'Balungao' },
											{ 'Locality_Name' : 'Bani' },
											{ 'Locality_Name' : 'Basista' },
											{ 'Locality_Name' : 'Bautista' },
											{ 'Locality_Name' : 'Bayambang' },
											{ 'Locality_Name' : 'Binalonan' },
											{ 'Locality_Name' : 'Binmaley' },
											{ 'Locality_Name' : 'Bolinao' },
											{ 'Locality_Name' : 'Bugallon' },
											{ 'Locality_Name' : 'Burgos' },
											{ 'Locality_Name' : 'Calasiao' },
											{ 'Locality_Name' : 'Dagupan City' },
											{ 'Locality_Name' : 'Dasol' },
											{ 'Locality_Name' : 'Infanta' },
											{ 'Locality_Name' : 'Labrador' },
											{ 'Locality_Name' : 'Laoac' },
											{ 'Locality_Name' : 'Lingayen' },
											{ 'Locality_Name' : 'Mabini' },
											{ 'Locality_Name' : 'Malasiqui' },
											{ 'Locality_Name' : 'Manaoag' },
											{ 'Locality_Name' : 'mangaldan' },
											{ 'Locality_Name' : 'Mangatarem' },
											{ 'Locality_Name' : 'Mapandan' },
											{ 'Locality_Name' : 'Natividad' },
											{ 'Locality_Name' : 'Pozorrubio' },
											{ 'Locality_Name' : 'Rosales' },
											{ 'Locality_Name' : 'San Carlos City' },
											{ 'Locality_Name' : 'San Fabian' },
											{ 'Locality_Name' : 'San Jacinto' },
											{ 'Locality_Name' : 'San Manuel' },
											{ 'Locality_Name' : 'San Nicolas' },
											{ 'Locality_Name' : 'San Quintin' },
											{ 'Locality_Name' : 'Sison' },
											{ 'Locality_Name' : 'Sta. Barbara' },
											{ 'Locality_Name' : 'Sta. Maria' },
											{ 'Locality_Name' : 'Sto. Tomas' },
											{ 'Locality_Name' : 'Sual' },
											{ 'Locality_Name' : 'Tayug' },
											{ 'Locality_Name' : 'Umingan' },
											{ 'Locality_Name' : 'Urbiztondo' },
											{ 'Locality_Name' : 'Urdaneta' },
											{ 'Locality_Name' : 'Villasis' }
										]
									}
								]
							},

							{
								'Region_Name' : 'Test',
								'Region_Province' :
								[
									{ 
										'Province_Name' : '',
										'Province_Locality' :
										[
											{
												'Locality_Name' : ''
											}
										]
									}
								]
							}
						]

set_Initialize()