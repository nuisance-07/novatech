#!/bin/bash

# Create an order
echo "Creating order..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test_user_123",
    "items": [
      {
        "name": "Test Product",
        "price": 100,
        "quantity": 1,
        "image": "https://via.placeholder.com/150"
      }
    ],
    "total": 100
  }')

echo "Create Response: $RESPONSE"

# Extract Order ID (assuming JSON response)
ORDER_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo "Order ID: $ORDER_ID"

if [ -z "$ORDER_ID" ]; then
  echo "Failed to create order"
  exit 1
fi

# Get Orders
echo "Fetching orders..."
curl -s "http://localhost:3000/api/orders"

# Get Order Details
echo "Fetching order details..."
curl -s "http://localhost:3000/api/orders?id=$ORDER_ID"
