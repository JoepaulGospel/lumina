window.renderDashboard = function(tab = 'orders') {
const orders = window.LuminaStorage.getOrders().reverse();
const saved = window.LuminaStorage.getSavedProducts().reverse();
const renderTimeline = (status) => {
const steps = ['Paid', 'Purchased', 'Shipped', 'Delivered'];
const currentIdx = steps.indexOf(status);
return `
<div class="flex justify-between mt-10 relative">
<div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-100 -z-10"></div>
${steps.map((step, i) => `
<div class="text-center">
<div class="w-8 h-8 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${i <= currentIdx ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}">
${i + 1}
</div>
<p class="text-[10px] uppercase font-black tracking-widest mt-2 ${i <= currentIdx ? 'text-black' : 'text-gray-300'}">${step}</p>
</div>
`).join('')}
</div>
`;
};
const html = `
<div class="max-w-6xl mx-auto px-6 py-20 fade-in">
<div class="flex justify-between items-end mb-16">
<h1 class="text-6xl font-bold tracking-tighter">Account.</h1>
<div class="flex gap-8 text-xs font-black uppercase tracking-widest">
<button onclick="window.renderDashboard('orders')" class="${tab === 'orders' ? 'border-b-2 border-black' : 'opacity-30'} pb-2">Orders</button>
<button onclick="window.renderDashboard('saved')" class="${tab === 'saved' ? 'border-b-2 border-black' : 'opacity-30'} pb-2">Wishlist</button>
<button onclick="location.reload()" class="opacity-30 pb-2">Search</button>
</div>
</div>
<div class="grid gap-12">
${tab === 'orders' ? (
orders.length === 0 ? '<p class="text-gray-300 text-center py-20">No active orders.</p>' :
orders.map(order => `
<div class="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
<div class="flex flex-wrap justify-between items-start gap-8">
<div class="flex gap-6">
<img src="${order.productImg}" class="w-20 h-20 bg-white rounded-3xl p-2 object-contain shadow-sm">
<div>
<h3 class="font-bold text-xl mb-1">${order.productName}</h3>
<p class="text-xs text-gray-400 font-mono">${order.id} • ${order.date}</p>
<button onclick='window.renderCheckout(${JSON.stringify(order.productOriginal)})' class="mt-4 text-[10px] font-black uppercase tracking-widest text-indigo-600">Reorder Item</button>
</div>
</div>
<div class="text-right">
<p class="text-3xl font-bold tracking-tighter">₦${order.total.toLocaleString()}</p>
<span class="text-[10px] font-black uppercase px-3 py-1 bg-white rounded-full shadow-sm">${order.status}</span>
</div>
</div>
${renderTimeline(order.status)}
${order.trackingNumber ? `
<div class="mt-10 pt-10 border-t border-gray-200 flex justify-between items-center">
<div>
<p class="text-[10px] font-black uppercase text-gray-400 tracking-widest">Tracking</p>
<p class="font-bold">${order.trackingCarrier} — ${order.trackingNumber}</p>
</div>
${order.proofImage ? `<button onclick="window.open('${order.proofImage}')" class="text-xs font-bold border-b border-black">View Receipt</button>` : ''}
</div>
` : ''}
</div>
`).join('')
) : (
saved.length === 0 ? '<p class="text-gray-300 text-center py-20">Wishlist is empty.</p>' :
`<div class="grid md:grid-cols-3 gap-8">
${saved.map(p => `
<div class="bg-gray-50 p-8 rounded-[40px] border border-gray-100 group">
<img src="${p.main_image}" class="w-full aspect-square object-contain mb-6 mix-blend-multiply group-hover:scale-105 transition-all">
<h3 class="font-bold text-lg mb-4 line-clamp-2">${p.name}</h3>
<div class="flex justify-between items-center">
<button onclick='window.renderCheckout(${JSON.stringify(p)})' class="bg-black text-white px-6 py-3 rounded-full text-xs font-bold">Buy Now</button>
<button onclick="window.LuminaStorage.removeSavedProduct('${p.name}'); window.renderDashboard('saved');" class="text-red-500 text-xs font-bold">Remove</button>
</div>
</div>
`).join('')}
</div>`
)}
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
};
