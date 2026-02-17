import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useGetAllOrders } from '@/hooks/useQueries';
import { Search } from 'lucide-react';
import { format } from 'date-fns';
import { useNavigate } from '@tanstack/react-router';

export default function OrderBookPage() {
  const { data: orders = [], isLoading } = useGetAllOrders();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredOrders = orders.filter(order =>
    order.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="destructive" className="bg-red-500">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-green-500 text-green-600">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Order Book</h1>
        <p className="text-muted-foreground">View all orders and their status</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>Search and filter orders</CardDescription>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : filteredOrders.length === 0 ? (
            <p className="text-muted-foreground">No orders found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow 
                    key={Number(order.orderId)}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate({ to: '/invoice/$orderId', params: { orderId: order.orderId.toString() } })}
                  >
                    <TableCell className="font-medium">#{Number(order.orderId)}</TableCell>
                    <TableCell>{order.customer.name}</TableCell>
                    <TableCell>{order.products.length} items</TableCell>
                    <TableCell>₹{Number(order.total).toLocaleString()}</TableCell>
                    <TableCell>
                      {format(new Date(Number(order.timestamp) / 1000000), 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
