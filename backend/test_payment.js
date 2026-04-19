const { createPayment } = require('./controllers/paymentController');

const req = {
  body: {
    customer_id: 1,
    order_id: 1,
    amount: "500",
    payment_status: "Paid"
  }
};

const res = {
  json: (data) => console.log("SUCCESS:", data),
  status: (code) => {
    console.log("STATUS:", code);
    return {
      json: (data) => console.log("ERROR DATA:", data)
    };
  }
};

async function test() {
  await createPayment(req, res);
  process.exit(0);
}

test();
