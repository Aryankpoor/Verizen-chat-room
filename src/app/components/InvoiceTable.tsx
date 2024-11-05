import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export default function InvoiceTable({ itemList }: { itemList: Item[] }) {
	return (
		<Table aria-label="Invoice Items">
			<TableHeader>
				
					<TableColumn>Name</TableColumn>
					<TableColumn>Rate</TableColumn>
					<TableColumn>Quantity</TableColumn>
					<TableColumn>Amount</TableColumn>
				
			</TableHeader>

			<TableBody emptyContent={"No rows to display."}>
				{itemList.map((item) => (
					<TableRow key={item.id} className="">
						<TableCell className='text-sm'>{item.name}</TableCell>
						<TableCell className='text-sm text-right'>{item.cost}</TableCell>
						<TableCell className='text-sm text-right'>{item.quantity}</TableCell>
						<TableCell className='text-sm text-center'>
							{Number(item.cost * item.quantity).toLocaleString()}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}