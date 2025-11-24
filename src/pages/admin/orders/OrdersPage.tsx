// src/pages/admin/orders/OrdersPage.tsx
import { ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { adminService } from '@/services/adminService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// ⭐ CRITICAL FIX: The local interface Order definition has been REMOVED.
//    You must ensure the actual Order type is imported correctly here:
import { Order } from '@/types/order.types'; 
// NOTE: Please ensure the path '@/types/order.types' is correct in your project.

export default function OrdersPage() {
    // This state now correctly uses the imported Order type:
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadOrders = async () => {
            console.log('--- COMPONENT_LOG: ORDERS ---');
            console.log('4. [Component] loadOrders function started.');
            try {
                setLoading(true);
                setError(null);
                
                // This calls the service function
                const response = await adminService.getOrders();
                
                // Success: response.data (which is Order[]) now matches the state type.
                setOrders(response.data || []); // Use response.data.data if PaginatedResponse includes 'data' key
                console.log('5. [Component] Successfully set orders state. Count:', response.data ? response.data.length : 0);

            } catch (err: any) {
                // Failure
                const errorMessage = err.response?.data?.message || err.message || 'Network Error or Server Unreachable.';
                console.error('5. [Component] Error caught during order fetch:', errorMessage, err);
                toast.error(`Error loading orders: ${errorMessage}`);
                setError(errorMessage);
                setOrders([]);
            } finally {
                setLoading(false);
                console.log('6. [Component] loadOrders finished. Loading set to false.');
            }
        };

        console.log('3. [Component] useEffect triggered on mount, calling loadOrders.');
        loadOrders();
    }, []);

    // --- RENDER LOGIC ---
    console.log('7. [Component] OrdersPage rendering. Loading:', loading, 'Error:', error, 'Order Count:', orders.length);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (error) {
        // Display the error message if the API failed
        return (
            <div className="p-12 text-center text-red-700 bg-red-50 border border-red-300 rounded-lg">
                <h3 className="text-xl font-bold mb-4">API Error</h3>
                <p>{error}</p>
                <p className="mt-4 text-sm text-gray-600">Please check your backend service status and API configuration (Base URL/Endpoint).</p>
            </div>
        );
    }
    
    const hasOrders = orders.length > 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                {/* <div>
                    <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
                    <p className="text-gray-600 mt-2">View and manage customer orders</p>
                </div> */}
            </div>

            {hasOrders ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Order List ({orders.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3"></th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerEmail}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${order.totalAmount.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${
                                                order.status === 'SHIPPED' ? 'bg-green-100 text-green-800' : 
                                                order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-indigo-600 hover:text-indigo-900">View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                // Fallback for when API succeeds but returns 0 orders
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
                    <div className="text-center">
                        <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Found</h3>
                        <p className="text-gray-600 mb-6">There are currently no orders to display.</p>
                    </div>
                </div>
            )}
        </div>
    );
}