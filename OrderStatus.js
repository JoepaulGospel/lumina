window.renderOrderStatus = function() {
const orders = window.LuminaStorage.getOrders();
const FX_RATE = 1650;
const html = `
<div class="max-w-4xl mx-auto px-6 py-20 fade-in">
<div class="flex justify-between items-center mb-12">
<h1 class="text-5xl font-bold tracking-tighter">My Orders.</h1>
<button onclick="location.reload()" class="text-sm font-bold uppercase tracking-widest opacity-40">Search</button>
</div>
<div class="space-y-6">
${orders.length === 0 ? '<p class="text-gray-400">No orders found.</p>' : ''}
${orders.reverse().map(order => `
<div class="p-8 border border-gray-100 rounded-[32px] bg-white shadow-sm">
<div class="flex justify-between items-start mb-6">
<div class="flex gap-4 items-center">
<img src="${order.productImg}" class="w-12 h-12 object-contain bg-gray-50 rounded-lg p-1">
<div>
<h3 class="font-bold text-lg">${order.productName}</h3>
<p class="text-xs text-gray-300 font-black uppercase">${order.id}</p>
</div>
</div>
<div class="text-right">
<p class="font-bold text-xl">₦${order.total.toLocaleString()}</p>
<span class="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-gray-100">
${order.status}
</span>
</div>
</div>
${order.status === 'Price Changed' ? `
<div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 mt-4">
<p class="text-amber-800 font-medium mb-4">
The item price updated to ₦${(order.currentPrice * FX_RATE).toLocaleString()}.
Please approve the change or cancel for a refund.
</p>
<div class="flex gap-3">
<button onclick="window.LuminaStorage.updateOrder('${order.id}', {status: 'Paid', originalPrice: ${order.currentPrice}}); window.renderOrderStatus();"
class="px-8 py-3 bg-amber-600 text-white rounded-full text-sm font-bold">
Approve Change
</button>
<button onclick="window.LuminaStorage.updateOrder('${order.id}', {status: 'Cancelled'}); window.renderOrderStatus();"
class="px-8 py-3 bg-white border border-amber-200 text-red-600 rounded-full text-sm font-bold">
Cancel & Refund
</button>
</div>
</div>
` : ''}
</div>
`).join('')}
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
};
