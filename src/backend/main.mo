import Map "mo:core/Map";
import Text "mo:core/Text";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Char "mo:core/Char";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Types definition
  public type UserRole = AccessControl.UserRole;

  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  public type Product = {
    productId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    quantity : Nat;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Int.compare(product1.productId, product2.productId);
    };
  };

  public type Customer = {
    customerId : Nat;
    name : Text;
    address : Text;
    phone : Text;
  };

  module Customer {
    public func compare(customer1 : Customer, customer2 : Customer) : Order.Order {
      Int.compare(customer1.customerId, customer2.customerId);
    };
  };

  public type OrderStatus = {
    #pending;
    #completed;
    #cancelled;
  };

  public type OrderType = {
    orderId : Nat;
    customer : Customer;
    products : [Product];
    total : Nat;
    status : OrderStatus;
    timestamp : Time.Time;
  };

  module OrderType {
    public func compareByTimestamp(order1 : OrderType, order2 : OrderType) : Order.Order {
      Int.compare(order1.timestamp, order2.timestamp);
    };
  };

  // State variables
  var nextProductId = 1;
  var nextCustomerId = 1;
  var nextOrderId = 1;

  // Authentication and Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Maps for persistent storage
  let products = Map.empty<Nat, Product>();
  let customers = Map.empty<Nat, Customer>();
  let orders = Map.empty<Nat, OrderType>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public shared ({ caller }) func addProduct(name : Text, description : Text, price : Nat, quantity : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    let productId = nextProductId;
    let product : Product = {
      productId;
      name;
      description;
      price;
      quantity;
    };
    products.add(productId, product);
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getProduct(productId : Nat) : async Product {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view products");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public query ({ caller }) func getAllProducts() : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view products");
    };
    let iter = products.values();
    iter.toArray().sort();
  };

  public shared ({ caller }) func updateProduct(productId : Nat, name : Text, description : Text, price : Nat, quantity : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          productId;
          name;
          description;
          price;
          quantity;
        };
        products.add(productId, updatedProduct);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        products.remove(productId);
      };
    };
  };

  // Customer Management
  public shared ({ caller }) func addCustomer(name : Text, address : Text, phone : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add customers");
    };
    let customerId = nextCustomerId;
    let customer : Customer = {
      customerId;
      name;
      address;
      phone;
    };
    customers.add(customerId, customer);
    nextCustomerId += 1;
    customerId;
  };

  public query ({ caller }) func getCustomer(customerId : Nat) : async Customer {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view customers");
    };
    switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) { customer };
    };
  };

  public query ({ caller }) func getAllCustomers() : async [Customer] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view customers");
    };
    customers.values().toArray().sort();
  };

  public shared ({ caller }) func updateCustomer(customerId : Nat, name : Text, address : Text, phone : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update customers");
    };
    switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?_) {
        let updatedCustomer : Customer = {
          customerId;
          name;
          address;
          phone;
        };
        customers.add(customerId, updatedCustomer);
      };
    };
  };

  public shared ({ caller }) func deleteCustomer(customerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete customers");
    };
    switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?_) {
        customers.remove(customerId);
      };
    };
  };

  // Order Management
  public shared ({ caller }) func createOrder(customerId : Nat, productIds : [Nat], quantities : [Nat]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create orders");
    };
    if (productIds.size() != quantities.size()) {
      Runtime.trap("Product and quantity arrays must have the same length");
    };
    let customer = switch (customers.get(customerId)) {
      case (null) { Runtime.trap("Customer not found") };
      case (?customer) { customer };
    };
    let productList = List.empty<(Product, Nat)>();
    var total : Nat = 0;
    for (i in Nat.range(0, productIds.size())) {
      let productId = productIds[i];
      let quantity = quantities[i];
      let product = switch (products.get(productId)) {
        case (null) { Runtime.trap("Product not found") };
        case (?product) {
          if (product.quantity < quantity) {
            Runtime.trap("Not enough stock for product " # product.name);
          };
          let updatedProduct : Product = {
            productId = product.productId;
            name = product.name;
            description = product.description;
            price = product.price;
            quantity = product.quantity - quantity;
          };
          products.add(productId, updatedProduct);
          productList.add((updatedProduct, quantity));
          total += product.price * quantity;
          product;
        };
      };
    };
    let productsArray = productList.toArray().map(func((product, _)) { product });
    let orderId = nextOrderId;
    let order : OrderType = {
      orderId;
      customer;
      products = productsArray;
      total;
      status = #pending;
      timestamp = Time.now();
    };
    orders.add(orderId, order);
    nextOrderId += 1;
    orderId;
  };

  public query ({ caller }) func getOrder(orderId : Nat) : async OrderType {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) { order };
    };
  };

  public query ({ caller }) func getAllOrders() : async [OrderType] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view orders");
    };
    orders.values().toArray().sort(OrderType.compareByTimestamp);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?existingOrder) {
        let updatedOrder : OrderType = {
          orderId = existingOrder.orderId;
          customer = existingOrder.customer;
          products = existingOrder.products;
          total = existingOrder.total;
          status = status;
          timestamp = existingOrder.timestamp;
        };
        orders.add(orderId, updatedOrder);
      };
    };
  };

  public shared ({ caller }) func deleteOrder(orderId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete orders");
    };
    switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?_) {
        orders.remove(orderId);
      };
    };
  };

  // Search Functionality
  public query ({ caller }) func searchProducts(searchTerm : Text) : async [Product] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can search products");
    };
    let results = List.empty<Product>();
    for ((_, product) in products.entries()) {
      if (containsIgnoreCase(product.name, searchTerm)) {
        results.add(product);
      };
    };
    results.toArray();
  };

  func containsIgnoreCase(text : Text, searchTerm : Text) : Bool {
    let lowerText = mapToLower(text);
    let lowerTerm = mapToLower(searchTerm);
    lowerText.contains(#text(lowerTerm));
  };

  func mapToLower(text : Text) : Text {
    text.map(
      func(char) {
        if (char >= 'A' and char <= 'Z') {
          Char.fromNat32(char.toNat32() + 32);
        } else { char };
      }
    );
  };
};
