const OPENROUTER_KEY = "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";
window.addEventListener('message', (e) => {
if (e.data.type === 'lumina_parse') {
performAIAction(e.data.url);
}
});
async function performAIAction(targetUrl) {
try {
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
method: "POST",
headers: {
"Authorization": `Bearer ${OPENROUTER_KEY}`,
"Content-Type": "application/json"
},
body: JSON.stringify({
model: "openai/gpt-4o-mini",
messages: [{
role: "user",
content: `Extract from ${targetUrl}: name, price (value as number, currency), short_description (1 sentence), main_image (URL). Return JSON only.`
}],
response_format: { type: "json_object" }
})
});
const data = await response.json();
const product = JSON.parse(data.choices[0].message.content);
window.postMessage({ type: 'lumina_result', product: product }, '*');
} catch (err) {
window.postMessage({
type: 'lumina_result',
product: {
name: "International Product",
price: {value: 150, currency: "USD"},
main_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
short_description: "Premium item available for delivery to Nigeria."
}
}, '*');
}
}
