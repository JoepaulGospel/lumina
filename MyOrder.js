window.renderMyOrders = function() {
const orders = window.LuminaStorage.getOrders();
const html = `
<div class="max-w-4xl mx-auto px-6 py-20 fade-in">
<div class="flex justify-between items-center mb-16">
<h1 class="text-6xl font-bold tracking-tighter">My Orders.</h1>
<button onclick="location.reload()" class="text-sm font-bold border-b border-black">Search</button>
</div>
<div class="space-y-12">
${orders.length === 0 ? '<p class="text-gray-400 text-center py-20">No orders found.</p>' : ''}
${orders.reverse().map(order => `
<div class="relative pb-12 border-b border-gray-100 last:border-0">
<div class="flex gap-8 items-start">
<img src="${order.productImg}" class="w-24 h-24 bg-gray-50 rounded-[2rem] p-4 object-contain">
<div class="flex-1">
<div class="flex justify-between items-start">
<div>
<h3 class="text-2xl font-bold mb-1">${order.productName}</h3>
<p class="text-sm text-gray-400 font-mono">${order.id}</p>
</div>
<span class="px-5 py-2 rounded-full text-xs font-black uppercase tracking-tighter ${
order.status === 'Shipped' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'
}">
${order.status}
</span>
</div>
<div class="mt-8 grid md:grid-cols-2 gap-8">
${order.proofImage ? `
<div class="bg-gray-50 p-6 rounded-3xl">
<p class="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Receipt Proof</p>
<img src="${order.proofImage}" class="w-full h-40 object-cover rounded-2xl shadow-sm cursor-pointer" onclick="window.open(this.src)">
</div>
` : ''}
${order.trackingNumber ? `
<div class="bg-black text-white p-6 rounded-3xl">
<p class="text-[10px] font-black uppercase text-gray-500 mb-4 tracking-widest">Tracking</p>
<p class="text-lg font-bold">${order.trackingCarrier}</p>
<p class="text-xl font-light text-gray-400 mt-1">${order.trackingNumber}</p>
</div>
` : ''}
</div>
</div>
</div>
</div>
`).join('')}
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
};
