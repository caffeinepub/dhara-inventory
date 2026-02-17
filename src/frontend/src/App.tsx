import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppLayout from './layouts/AppLayout';
import VendorsPage from './pages/register/VendorsPage';
import CustomersPage from './pages/register/CustomersPage';
import UsersPage from './pages/register/UsersPage';
import InventoryPage from './pages/inventory/InventoryPage';
import SalesPage from './pages/inventory/SalesPage';
import PurchasePage from './pages/inventory/PurchasePage';
import OrderBookPage from './pages/inventory/OrderBookPage';
import LedgerPage from './pages/inventory/LedgerPage';
import InvoicePage from './pages/invoice/InvoicePage';
import ReportsPage from './pages/reports/ReportsPage';
import SettingsPage from './pages/settings/SettingsPage';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  component: AppLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/',
  component: DashboardPage,
});

const vendorsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/register/vendors',
  component: VendorsPage,
});

const customersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/register/customers',
  component: CustomersPage,
});

const usersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/register/users',
  component: UsersPage,
});

const inventoryRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/inventory/items',
  component: InventoryPage,
});

const salesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/inventory/sales',
  component: SalesPage,
});

const purchaseRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/inventory/purchase',
  component: PurchasePage,
});

const orderBookRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/inventory/order-book',
  component: OrderBookPage,
});

const ledgerRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/inventory/ledger',
  component: LedgerPage,
});

const invoiceIndexRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/invoice',
  component: InvoicePage,
});

const invoiceDetailRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/invoice/$orderId',
  component: InvoicePage,
});

const reportsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/reports',
  component: ReportsPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: '/settings',
  component: SettingsPage,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  appLayoutRoute.addChildren([
    indexRoute,
    vendorsRoute,
    customersRoute,
    usersRoute,
    inventoryRoute,
    salesRoute,
    purchaseRoute,
    orderBookRoute,
    ledgerRoute,
    invoiceIndexRoute,
    invoiceDetailRoute,
    reportsRoute,
    settingsRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const { identity, isInitializing } = useInternetIdentity();
  const isAuthenticated = !!identity;

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect logic handled in components
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
