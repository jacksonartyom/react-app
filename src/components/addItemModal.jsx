import React, { useState, useEffect } from "react";
import Input from "./Input";

function AddItemModal({ show, onClose, onAdd, item }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const isEdit = !!item;

  useEffect(() => {
    if (item) {
      setName(item.name || "");
      setPrice(item.price || "");
      setStock(item.stock || "");
      setPreview(item.image || null);
    }
  }, [item]);

  const handleSubmit = () => {
    onAdd({
      id: Date.now(),
      name,
      price: Number(price),
      stock: Number(stock),
      image: preview,
    });

    onClose();
  };

  const resetForm = () => {
    console.log(preview);

    setName("");
    setPrice("");
    setStock("");
    setImage(null);
    setPreview(null);
  };

  if (!show) return null;

  return (
    <div className="modal d-block">
      <div className="modal-content modal-dialog">
        <div className="modal-header">
          <h5 className="modal-title">{isEdit ? "View Item" : "Add Item"}</h5>
          <button
            className="btn-close"
            onClick={() => {
              resetForm();
              onClose();
            }}
          ></button>
        </div>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              <Input
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Price"
                type="number"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
              />
            </div>

            <div className="col-md-6">
              <Input
                label="Stock"
                type="number"
                name="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Enter stock"
              />
            </div>
            <div className="col-md-6">
              <Input
                label="Image"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              {preview && (
                <div className="mt-3 text-center mt-2">
                  <img
                    src={preview}
                    alt="preview"
                    style={{ width: "150px", borderRadius: "8px" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary mr-2"
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddItemModal;
