import React, { useState } from "react";
import AddItemModal from "../components/addItemModal";

function Items() {
  const [view, setView] = useState("card"); // card | list

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", price: 100, stock: 1, image: null },
    { id: 2, name: "Item 2", price: 200, stock: 1, image: null },
    { id: 3, name: "Item 3", price: 300, stock: 1, image: null },
    { id: 4, name: "Item 4", price: 400, stock: 1, image: null },
    { id: 5, name: "Item 5", price: 500, stock: 1, image: null },
    { id: 6, name: "Item 6", price: 600, stock: 1, image: null },
    { id: 7, name: "Item 7", price: 700, stock: 1, image: null },
    { id: 8, name: "Item 8", price: 800, stock: 1, image: null },
    { id: 9, name: "Item 9", price: 900, stock: 1, image: null },
    { id: 10, name: "Item 10", price: 1000, stock: 1, image: null },
    { id: 11, name: "Item 11", price: 1100, stock: 1, image: null },
    { id: 12, name: "Item 12", price: 1200, stock: 1, image: null },
    { id: 13, name: "Item 13", price: 1300, stock: 1, image: null },
    { id: 14, name: "Item 14", price: 1400, stock: 1, image: null },
    { id: 15, name: "Item 15", price: 1500, stock: 1, image: null },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentItems = items.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const [showModal, setShowModal] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleSaveItem = (itemData) => {
    if (selectedItem) {
      // update
      setItems((prev) =>
        prev.map((it) => (it.id === selectedItem.id ? itemData : it)),
      );
    } else {
      // add
      setItems((prev) => [...prev, itemData]);
    }
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Items</h3>

        <div className="d-flex gap-4">
          {/* Toggle View */}
          <button
            className={`btn btn-sm mr-2  ${
              view === "card" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setView("card")}
          >
            Card
          </button>

          <button
            className={`btn btn-sm mr-2 ${
              view === "list" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setView("list")}
          >
            List
          </button>

          {/* Add Button */}
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            + Add Item
          </button>
        </div>
      </div>
      {/* Content */}
      {view === "card" ? (
        <div className="row">
          {currentItems.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <img
                    src={item.image}
                    alt={item.image}
                    style={{ width: "150px", borderRadius: "8px" }}
                  />
                  <h5 className="card-title">
                    {item.name}{" "}
                    <p className="card-text">Price: {item.price} ฿</p>
                  </h5>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => {
                      setSelectedItem(item);
                      setShowModal(true);
                    }}
                  >
                    View
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
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.image}
                  style={{ width: "50px", borderRadius: "8px" }}
                />
                <strong>{item.name} </strong>
                <span className="text-muted small">{item.price} ฿</span>
              </div>

              <button
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  setSelectedItem(item);
                  setShowModal(true);
                }}
              >
                View
              </button>
            </li>
          ))}
        </ul>
      )}
      <nav className="mt-3">
        <ul className="pagination justify-content-center">
          {/* Prev */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
          </li>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Next */}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Modal */}
      <AddItemModal
        show={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedItem(null);
        }}
        onAdd={handleSaveItem}
        item={selectedItem} // 🔥 ส่งเข้าไป
      />
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
}

export default Items;
