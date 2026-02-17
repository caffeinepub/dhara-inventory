import { Link, useRouterState } from '@tanstack/react-router';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, LogOut, LayoutDashboard, FileText, BarChart3, Settings } from 'lucide-react';

export default function TopNavBar() {
  const { clear } = useInternetIdentity();
  const queryClient = useQueryClient();
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path);

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-foreground">
              DHARA ENTERPRISES
            </Link>
            
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/">
                <Button variant={isActive('/') && pathname === '/' ? 'secondary' : 'ghost'} size="sm">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={isActive('/register') ? 'secondary' : 'ghost'} size="sm">
                    Register <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link to="/register/vendors" className="w-full cursor-pointer">Vendors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register/customers" className="w-full cursor-pointer">Customers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register/users" className="w-full cursor-pointer">Users</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={isActive('/inventory') ? 'secondary' : 'ghost'} size="sm">
                    Inventory <ChevronDown className="w-4 h-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem asChild>
                    <Link to="/inventory/items" className="w-full cursor-pointer">Inventory</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inventory/sales" className="w-full cursor-pointer">Sales</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inventory/purchase" className="w-full cursor-pointer">Purchase</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inventory/order-book" className="w-full cursor-pointer">Order Book</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inventory/ledger" className="w-full cursor-pointer">Ledger</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link to="/invoice">
                <Button variant={isActive('/invoice') ? 'secondary' : 'ghost'} size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Invoice
                </Button>
              </Link>

              <Link to="/reports">
                <Button variant={isActive('/reports') ? 'secondary' : 'ghost'} size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </Link>

              <Link to="/settings">
                <Button variant={isActive('/settings') ? 'secondary' : 'ghost'} size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
