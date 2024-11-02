export default function InvoiceTable({ itemList }: { itemList: Item[] }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Rate</th>
					<th>Quantity</th>
					<th>Amount</th>
				</tr>
			</thead>

			<tbody>
				{itemList.map((item) => (
					<tr key={item.id} className="">
						<td className='text-sm'>{item.name}</td>
						<td className='text-sm text-right'>{item.cost}</td>
						<td className='text-sm text-right'>{item.quantity}</td>
						<td className='text-sm text-center'>
							{Number(item.cost * item.quantity).toLocaleString()}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}