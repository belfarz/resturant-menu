import { useEffect, useState } from 'react';

export default function OrdersPortal() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/getCheckout')
      .then(res => res.json())
      .then(setOrders);
  }, []);

  const calcTotal = (items) =>
    items.reduce((sum, o) => sum + o.price + o.addOns.reduce((a, x) => a + x.price, 0), 0);

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const pending = orders.filter(o => o.status === 'pending').length;
  const revenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((s, o) => s + calcTotal(o.orders), 0);

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[['Total orders', orders.length], ['Pending', pending], ['Revenue', `$${revenue.toFixed(2)}`]]
          .map(([label, value]) => (
            <div key={label} className="bg-gray-100 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-1">{label}</p>
              <p className="text-xl font-medium">{value}</p>
            </div>
          ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {['all', 'pending', 'done', 'cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm border transition-all
              ${filter === f ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-500'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Orders */}
      {filtered.map(order => (
        <div key={order._id} className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                {' · '}#{order._id.slice(-4)}
              </p>
              <p className="font-medium">Room {order.roomId}</p>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-medium
              ${order.status === 'pending' ? 'bg-amber-100 text-amber-700' : ''}
              ${order.status === 'done' ? 'bg-green-100 text-green-700' : ''}
              ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}`}>
              {order.status}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-1">
            {order.orders.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                {item.addOns.length > 0 && (
                  <p className="text-xs text-gray-400 pl-2">
                    + {item.addOns.map(a => a.name).join(', ')}
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-between font-medium text-sm border-t border-gray-100 pt-2 mt-2">
              <span>Total</span>
              <span>${calcTotal(order.orders).toFixed(2)}</span>
            </div>
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <p className="text-center text-gray-400 py-10">No orders found</p>
      )}
    </div>
  );
}