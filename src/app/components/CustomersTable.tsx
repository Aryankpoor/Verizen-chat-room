import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"


interface Customer {
	name: string;
	email: string;
	id: number;
}


export default function CustomersTable({
	customers,
}: {
	customers: Customer[];
	}) {
	
	const deleteCustomer = async (id: number) => { 
		try {
			const request = await fetch(`/api/customers?id=${id}`, {
				method: "DELETE",
			});
			const response = await request.json();
			console.log(response.message);
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<table>
			<thead>
				<tr>
					<th className='text-lg'>Name&emsp;&emsp;</th>
					<th className='text-lg'>Email&emsp;&emsp;</th>
					<th className='text-lg'>Action</th>
				</tr>
			</thead>

			<tbody>
			{customers.length > 0 && customers.map((customer) => (
					<tr key={customer.id}>
						<td className='text-lg'>{customer.name}&emsp;&emsp;</td>
						<td className='text-lg'>{customer.email}&emsp;&emsp;</td>
						<td className='text-lg'>
						<AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className='p-2 bg-red-500 text-red-50  text-lg rounded-sm' onClick={()=> deleteCustomer(customer.id)}>
								Delete
							</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Customer Deleted Successfully</AlertDialogTitle>
          <AlertDialogDescription>
			The change might be visible after refreshing the page.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue</AlertDialogCancel>
          
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}