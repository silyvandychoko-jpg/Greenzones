exports.handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  try {
    const { amount, email } = JSON.parse(event.body);
    const KEY = process.env.NOTCHPAY_API_KEY;
    const res = await fetch("https://api.notchpay.co/payments/initialize", {
      method: "POST",
      headers: {
        "Authorization": KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount,
        email: email || "customer@greenzone.cm",
        currency: "XAF",
        description: "Greenzone Payment"
      })
    });
    const data = await res.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
