import React, { useState } from "react";
import PaymentModal from "../components/paymentModal";

function Sale() {
  const [view, setView] = useState("card");

  const [showPayment, setShowPayment] = useState(false);

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 100, image: null },
    { id: 2, name: "Item 2", price: 200, image: null },
    { id: 3, name: "Item 3", price: 300, image: null },
    { id: 4, name: "Item 4", price: 400, image: null },
    { id: 5, name: "Item 5", price: 500, image: null },
    { id: 6, name: "Item 6", price: 600, image: null },
    { id: 7, name: "Item 7", price: 700, image: null },
    { id: 8, name: "Item 8", price: 800, image: null },
    { id: 9, name: "Item 9", price: 900, image: null },
    { id: 10, name: "Item 10", price: 1000, image: null },
    { id: 11, name: "Item 11", price: 1100, image: null },
    { id: 12, name: "Item 12", price: 1200, image: null },
  ]);

  const [cart, setCart] = useState([]);

  // ---------------- Pagination ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const indexOfLast = currentPage * itemsPerPage;
  const currentItems = items.slice(indexOfLast - itemsPerPage, indexOfLast);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // ---------------- Cart Logic ----------------
  const addToCart = (item) => {
    setCart((prev) => {
      const exist = prev.find((i) => i.id === item.id);

      if (exist) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0),
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handerCheckout = () => {
    console.log(cart);
  };

  // ---------------- UI ----------------
  return (
    <div className="container mt-4">
      <h3>Sale</h3>

      {/* Toggle */}
      <div className="mb-3">
        <button
          className={`btn btn-sm  mr-2 ${
            view === "card" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("card")}
        >
          Card
        </button>

        <button
          className={`btn btn-sm ms-2  mr-2 ${
            view === "list" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setView("list")}
        >
          List
        </button>
      </div>

      <div className="row">
        {/* ----------- PRODUCT LIST ----------- */}
        <div className="col-md-8">
          {view === "card" ? (
            <div className="row">
              {currentItems.map((item) => (
                <div className="col-md-6 mb-3" key={item.id}>
                  <div className="card">
                    <div className="card-body text-center">
                      <h5>{item.name}</h5>
                      <p>{item.price} ฿</p>

                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => addToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="list-group">
              {currentItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>
                    {item.name} - {item.price} ฿
                  </span>

                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => addToCart(item)}
                  >
                    Add
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination */}
          <nav className="mt-3">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Prev
                </button>
              </li>

              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 && "active"}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && "disabled"
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* ----------- CART ----------- */}
        <div className="col-md-4">
          <h5>Cart</h5>

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

          <button
            className="btn btn-success w-100 mt-2"
            disabled={cart.length === 0}
            onClick={() => setShowPayment(true)}
          >
            ชำระเงิน
          </button>

          <PaymentModal
            show={showPayment}
            onClose={() => setShowPayment(false)}
            totalPrice={totalPrice}
            itmesDetail={cart}
            onConfirm={(method) => {
              alert(`ชำระเงินสำเร็จ (${method})`);
              setCart([]);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Sale;
