import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useGetAllProducts } from '@/hooks/useQueries';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

const LOW_STOCK_THRESHOLD = 10;

export default function LowInventoryCard() {
  const { data: products = [], isLoading } = useGetAllProducts();

  const lowStockProducts = products
    .filter(product => Number(product.quantity) < LOW_STOCK_THRESHOLD)
    .slice(0, 5);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Low Inventory Alert</CardTitle>
          <CardDescription>Products below threshold</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading...</p>
        </CardContent>
      </Card>
    );
  }

  if (lowStockProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Low Inventory Alert</CardTitle>
          <CardDescription>Products below threshold</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">All products are well stocked</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          Low Inventory Alert
        </CardTitle>
        <CardDescription>Products below threshold ({LOW_STOCK_THRESHOLD} units)</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Remaining Qty</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProducts.map((product) => (
              <TableRow key={Number(product.productId)}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{Number(product.quantity)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="border-yellow-500 text-yellow-600">
                    Low Stock
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
