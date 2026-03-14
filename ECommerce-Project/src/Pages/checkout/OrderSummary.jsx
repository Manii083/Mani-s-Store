import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
import { DeliveryOptions } from "./DeliverOptions";
import axios from "axios";
import { useState } from "react";

export function OrderSummary({ cart, deliveryOptions, loadCart }) {
  const [editingId, setEditingId] = useState(null);
  const [newQuantity, setNewQuantity] = useState(1);

  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = deliveryOptions.find(
            (deliveryOption) => {
              return deliveryOption.id === cartItem.deliveryOptionId;
            },
          );

          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };

          const updateCartQuantity = async (productId) => {
            await axios.put(`/api/cart-items/${productId}`, {
              quantity: parseInt(newQuantity),
            });

            setEditingId(null);
            await loadCart();
          };

          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                  "dddd, MMMM D",
                )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">
                        {cartItem.quantity}
                      </span>
                    </span>
                    {editingId === cartItem.productId ? (
                      <>
                        <input
                          type="number"
                          min="1"
                          value={newQuantity}
                          onChange={(e) => setNewQuantity(e.target.value)}
                          style={{ width: "40px", marginRight: "6px" }}
                        />

                        <span
                          className="link-primary"
                          onClick={() => updateCartQuantity(cartItem.productId)}
                        >
                          Save
                        </span>
                      </>
                    ) : (
                      <span
                        className="update-quantity-link link-primary"
                        onClick={() => {
                          setEditingId(cartItem.productId);
                          setNewQuantity(cartItem.quantity);
                        }}
                      >
                        Update
                      </span>
                    )}
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions
                  deliveryOptions={deliveryOptions}
                  cartItem={cartItem}
                  loadCart={loadCart}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
