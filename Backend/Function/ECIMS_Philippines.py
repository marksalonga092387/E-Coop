#! "F:/Python_3.8.3/python.exe"

from ECIMS_Main import *

class Philippines:

	def Insert_Philippines_Region():

		get_Region_Identity = 'PH-RGN-' + str(Main.Select_Counter(GLOBAL['Philippines_Region_Counter_Code']))

		Query_Insert = f"""
							INSERT INTO Philippines_Region
							(
								Region_Identity,
								Region_Name
							)
							VALUES
							(
								'{ get_Region_Identity }',
								'{ GLOBAL['REQUEST']['Region_Name'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			Main.Update_Counter(GLOBAL['Philippines_Region_Counter_Code'])
			GLOBAL['REQUEST'] = { 'Region_Identity' : get_Region_Identity }
			return True

		else:
			return False

	def Delete_Philippines_Region():

		Query_Delete = "DELETE FROM Philippines_Region"

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Insert_Philippines_Region_Province():

		get_Province_Identity = 'PH-RGN-PROV-' + str(Main.Select_Counter(GLOBAL['Philippines_Region_Province_Counter_Code']))

		Query_Insert = f"""
							INSERT INTO Philippines_Region_Province
							(
								Province_Identity,
								Province_Name,
								Province_Region
							)
							VALUES
							(
								'{ get_Province_Identity }',
								'{ GLOBAL['REQUEST']['Province_Name'] }',
								'{ GLOBAL['REQUEST']['Region_Identity'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			Main.Update_Counter(GLOBAL['Philippines_Region_Province_Counter_Code'])
			GLOBAL['REQUEST'] = { 'Region_Identity' : GLOBAL['REQUEST']['Region_Identity'], 'Province_Identity' : get_Province_Identity}
			return True

		else:
			return False

	def Delete_Philippines_Region_Province():

		Query_Delete = "DELETE FROM Philippines_Region_Province"

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False

	def Insert_Philippines_Region_Province_Locality():

		get_Locality_Identity = 'PH-RGN-PROV-LOC-' + str(Main.Select_Counter(GLOBAL['Philippines_Region_Province_Locality_Counter_Code']))

		Query_Insert = f"""
							INSERT INTO Philippines_Region_Province_Locality
							(
								Locality_Identity,
								Locality_Name,
								Locality_Region,
								Locality_Province
							)
							VALUES
							(
								'{ get_Locality_Identity }',
								'{ GLOBAL['REQUEST']['Locality_Name'] }',
								'{ GLOBAL['REQUEST']['Region_Identity'] }',
								'{ GLOBAL['REQUEST']['Province_Identity'] }'
							)
						"""
		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Insert)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			Main.Update_Counter(GLOBAL['Philippines_Region_Province_Locality_Counter_Code'])
			return True

		else:
			return False

	def Delete_Philippines_Region_Province_Locality():

		Query_Delete = "DELETE FROM Philippines_Region_Province_Locality"

		try:
			PyMySQL_Row_Count = GLOBAL['PyMySQL_Cursor'].execute(Query_Delete)
			GLOBAL['PyMySQL_Connection'].commit()

		except Exception as set_Exception:
			return str(set_Exception)

		if PyMySQL_Row_Count > 0:
			return True

		else:
			return False