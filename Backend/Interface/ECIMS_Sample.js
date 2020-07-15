define('ECIMS_Sample', () =>
{
	class ECIMS_Sample extends Component
	{
		constructor()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Loaded : ECIMS_Sample Class')

			super()
		}

		componentDidMount()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed componentDidMount() : ECIMS_Sample Class')
		}

		render()
		{
			if (System_Mode == 'Development')
				console.log('Succesfully Executed render() : ECIMS_Sample Class')

			return	<div>
						<section className = 'content'>
							<div className = 'content__inner'>
								<div className = 'content__title'>
									<h1>Sample</h1>

									<div className = 'actions'>
										<a href = '#' className = 'actions__item zwicon-cog'></a>
										<a href = '#' className = 'actions__item zwicon-refresh-double'></a>

										<div className = 'dropdown actions__item'>
											<i data-toggle = 'dropdown' className = 'zwicon-more-h'></i>
											<div className = 'dropdown-menu dropdown-menu-right'>
												<a href = '#' className = 'dropdown-item'>Refresh</a>
												<a href = '#' className = 'dropdown-item'>Manage Widgets</a>
												<a href = '#' className = 'dropdown-item'>Settings</a>
											</div>
										</div>
									</div>
								</div>

								<div className = 'card'>
									<div className = 'card-body'>
										<h4 className = 'card-title'>Sample</h4>
										<h6 className = 'card-subtitle'>Sample</h6>

										<hr/>

										<form>
											<div className = 'form-row'>
												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Borrower' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Borrower'>Borrower</label>
													<div className = 'valid-feedback'>Borrower is valid</div>
													<div className = 'invalid-feedback'>Please provide a Borrower</div>
												</div>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Branch' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Branch'>Branch</label>
													<div className = 'valid-feedback'>Branch is valid</div>
													<div className = 'invalid-feedback'>Please provide a Branch</div>
												</div>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Address' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Address'>Address</label>
													<div className = 'valid-feedback'>Address is valid</div>
													<div className = 'invalid-feedback'>Please provide a Address</div>
												</div>

												<hr/>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Loan_Amount' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Loan_Amount'>Loan Amount</label>
													<div className = 'valid-feedback'>Loan Amount is valid</div>
													<div className = 'invalid-feedback'>Please provide a Loan Amount</div>
												</div>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Deduction' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Deduction'>Deductions Collected</label>
													<div className = 'valid-feedback'>Deduction is valid</div>
													<div className = 'invalid-feedback'>Please provide a Deduction</div>
												</div>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Net_Loan' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Net_Loan'>Net Proceeds of Loan</label>
													<div className = 'valid-feedback'>Net Loan Amount is valid</div>
													<div className = 'invalid-feedback'>Please provide a Net Loan Amount</div>
												</div>

												<div className = 'form-group col-md-4 pb-2'>
													<input name = 'Rate_Interest' className = 'form-control' type = 'text' required/>
													<label className = 'form-control-placeholder' htmlFor = 'Rate_Interest'>Interest Rate</label>
													<div className = 'valid-feedback'>Interest Rate</div>
													<div className = 'invalid-feedback'>Interest Rate</div>
												</div>

												<div className = 'form-group col-md-12 pb-2'>
													<table className = 'table table-bordered table-hover'>
														<thead>
															<tr>
																<th className = 'text-center' colSpan = '6'>Amortization Schedule</th>
																<th className = 'text-center' colSpan = '5'>Rebates Computation</th>
															</tr>

															<tr>
																<th>Installment</th>
																<th>Loan Release</th>
																<th>Principal</th>
																<th>Service Charge</th>
																<th>Total</th>
																<th>Balance</th>

																<th>Rebates (%)</th>
																<th>Principal</th>
																<th>Service Fee</th>
																<th>Rebates (Amount)</th>
																<th>Net Collection</th>
															</tr>

															<tr>
																<th>A</th>
																<th>B</th>
																<th>C</th>
																<th>D</th>
																<th>E = C+D</th>
																<th>F</th>
																<th>G</th>
																<th>H</th>
																<th>I</th>
																<th>J</th>
																<th>K = H+I+J</th>
															</tr>
														</thead>
														<tbody>
															<tr>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>

																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
																<td>Value</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</section>
					</div>
		}
	}

	window.ECIMS_Sample = ECIMS_Sample
})