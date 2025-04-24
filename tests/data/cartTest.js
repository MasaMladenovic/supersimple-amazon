import { cart } from "../../data/cart-class.js";

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', () => {
    //mock
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    )
  });

  it('adds a new product to the cart', () => {
    //creating a mock
    cart.cartItems = [];
    
    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }])
  )
  });
});

describe('test suite: removeFromCart', () => {
  it('removes a product from the cart', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
  })
  it('does nothing if product is not in the cart', () => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  })
});

describe('test suite: update delivery option', () => {
  //create a mock
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  });

  it('updates the delivery option of a product in the cart', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '3'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });

  it('does nothing if the product is not in the cart', () => {
    cart.updateDeliveryOption('doesNotExistId', '2');
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {
    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'doesNotExist');
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[1].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.cartItems[1].quantity).toEqual(1);
    expect(cart.cartItems[1].deliveryOptionId).toEqual('2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});