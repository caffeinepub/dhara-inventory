import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllOrders } from '@/hooks/useQueries';
import { useNavigate } from '@tanstack/react-router';
import { Badge } from '@/components/ui/badge';

export default function PendingPaymentsCard() {
  const { data: orders = [], isLoading } = useGetAllOrders();
  const navigate = useNavigate();

  // Filter pending orders (in a real app, this would be based on payment status)
  const pendingOrders = orders.filter(order => order.status === 'pending').slice(0, 5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
          <CardDescription>Payments to be collected</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (pendingOrders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Pending Payments</CardTitle>
          <CardDescription>Payments to be collected</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No pending payments</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Payments</CardTitle>
        <CardDescription>Payments to be collected</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingOrders.map((order) => (
              <TableRow 
                key={Number(order.orderId)}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate({ to: '/invoice/$orderId', params: { orderId: order.orderId.toString() } })}
              >
                <TableCell className="font-medium">{order.customer.name}</TableCell>
                <TableCell>₹{Number(order.total).toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant="destructive" className="bg-red-500">Pending</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
