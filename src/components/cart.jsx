import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import PaymentModal from "../components/paymentModal";

function Cart({ isSidebar = false }) {
  const { cart, increaseQty, decreaseQty, totalPrice, setCart } = useCart();

  // ✅ เพิ่ม state
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div className={isSidebar ? "" : "container mt-4"}>
      <h4>Cart</h4>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                {item.name}
                <br />
                <small>{item.price} ฿</small>
              </div>

              <div>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => decreaseQty(item.id)}
                >
                  -
                </button>

                <span className="mx-2">{item.qty}</span>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h5 className="mt-3">Total: {totalPrice} ฿</h5>

      {/* 🔥 ปุ่มชำระเงิน */}
      <button
        className="btn btn-success w-100 mt-2"
        disabled={cart.length === 0}
        onClick={() => setShowPayment(true)}
      >
        ชำระเงิน
      </button>

      {/* 🔥 Modal */}
      <PaymentModal
        show={showPayment}
        onClose={() => setShowPayment(false)}
        totalPrice={totalPrice}
        itmesDetail={cart}
        onConfirm={(method) => {
          alert(`ชำระเงินสำเร็จ (${method})`);
          setCart([]); // เคลียร์ตะกร้า
          setShowPayment(false);
        }}
      />
    </div>
  );
}

export default Cart;
