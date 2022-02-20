const Leaderboard = () => {
	return (
		<div className="w-full text-black bg-gray-300 p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-sm text-white">
			<div className="overflow-x-auto">
				<table className="table-auto w-full">
					<tbody className="text-sm divide-y divide-gray-100">
						{[1, 2, 3, 4, 5].map(v => (
							<tr key={v}>
								<td className="p-2 whitespace-nowrap">
									<div className="flex items-center">
										<div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
											<img className="rounded-full" src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" width="40" height="40" alt="Alex Shatov" />
										</div>
										<div className="font-medium">Project Name</div>
									</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left">$30,000+</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-left font-medium">Satyam</div>
								</td>
								<td className="p-2 whitespace-nowrap">
									<div className="text-lg text-center">IND</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default Leaderboard