import React, { useState } from "react";

function PaymentModal({ show, onClose, totalPrice, itmesDetail, onConfirm }) {
  const [paymentMethod, setPaymentMethod] = useState("cash");

  if (!show) return null;

  return (
    <>
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title">ชำระเงิน</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              <ul style={{ listStyle: "none", padding: 0 }}>
                {itmesDetail.map((item) => (
                  <li
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 0",
                    }}
                  >
                    <div>{item.name}</div>
                    <div>จำนวน ({item.qty})</div>
                    <div style={{ fontWeight: "bold" }}>
                      {item.price * item.qty} ฿
                    </div>
                  </li>
                ))}
              </ul>
              <h6>Total: {totalPrice} ฿</h6>
              <div className="mt-3">
                <label>
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  เงินสด
                </label>

                <br />

                <label>
                  <input
                    type="radio"
                    value="transfer"
                    checked={paymentMethod === "transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  โอนเงิน
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>
                ยกเลิก
              </button>

              <button
                className="btn btn-success"
                onClick={() => {
                  onConfirm(paymentMethod);
                  onClose();
                }}
              >
                ยืนยันการชำระเงิน
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default PaymentModal;
