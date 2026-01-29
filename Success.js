window.renderSuccess = function(total, orderId) {
const html = `
<div class="h-screen flex flex-col items-center justify-center text-center px-6 fade-in">
<div class="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8">
<i data-lucide="check" class="w-12 h-12"></i>
</div>
<h1 class="text-6xl font-bold mb-4 tracking-tighter">Paid Successfully!</h1>
<p class="text-2xl text-gray-400 mb-12 font-light max-w-lg">We've received ₦${total.toLocaleString()}. You can track fulfillment and see your receipt in your dashboard.</p>
<div class="flex flex-col gap-4">
<button onclick="window.renderDashboard()" class="bg-black text-white px-12 py-6 rounded-full font-bold text-xl hover:scale-105 transition-all">
View Dashboard
</button>
<button onclick="location.reload()" class="text-sm font-bold opacity-30">
Start New Search
</button>
</div>
</div>`;
document.getElementById('app-content').innerHTML = html;
lucide.createIcons();
};
