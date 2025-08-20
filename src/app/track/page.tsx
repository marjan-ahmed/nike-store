"use client";
import { useState } from "react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);

  const handleTrack = async () => {
    const res = await fetch(`/api/orders/${orderId}`);
    const data = await res.json();
    setOrder(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter your order ID"
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleTrack}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Track
        </button>
      </div>

      {order && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Receipt:</strong> 
            {order.receiptUrl ? (
              <a href={order.receiptUrl} target="_blank" className="text-blue-500 underline">
                View Receipt
              </a>
            ) : "Not available"}
          </p>
        </div>
      )}
    </div>
  );
}
