window.LuminaStorage = {
saveOrder: function(orderData) {
const orders = JSON.parse(localStorage.getItem('lumina_orders') || '[]');
const newOrder = {
...orderData,
id: 'LUM-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
date: new Date().toLocaleString(),
status: 'Paid',
proofImage: null,
trackingNumber: '',
trackingCarrier: '',
updatedAt: Date.now()
};
orders.push(newOrder);
localStorage.setItem('lumina_orders', JSON.stringify(orders));
return newOrder;
},
getOrders: function() {
return JSON.parse(localStorage.getItem('lumina_orders') || '[]');
},
updateOrder: function(orderId, updates) {
const orders = this.getOrders();
const updated = orders.map(o => o.id === orderId ? { ...o, ...updates, updatedAt: Date.now() } : o);
localStorage.setItem('lumina_orders', JSON.stringify(updated));
},
saveProduct: function(product) {
const saved = JSON.parse(localStorage.getItem('lumina_saved') || '[]');
if (!saved.some(p => p.name === product.name)) {
saved.push(product);
localStorage.setItem('lumina_saved', JSON.stringify(saved));
alert("Product saved to wishlist.");
}
},
getSavedProducts: function() {
return JSON.parse(localStorage.getItem('lumina_saved') || '[]');
},
removeSavedProduct: function(name) {
const saved = this.getSavedProducts().filter(p => p.name !== name);
localStorage.setItem('lumina_saved', JSON.stringify(saved));
}
};
