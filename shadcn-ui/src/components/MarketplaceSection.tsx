import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Search, ShoppingCart, Package, Smartphone, Home, Shirt, Zap, Star, Plus } from 'lucide-react';
import { useState } from 'react';

export default function MarketplaceSection() {
  const [cartItems, setCartItems] = useState(0);

  const categories = [
    { id: 'essentials', name: 'Essentials', icon: Package, color: 'text-blue-600' },
    { id: 'household', name: 'Household', icon: Home, color: 'text-green-600' },
    { id: 'clothing', name: 'Clothing', icon: Shirt, color: 'text-purple-600' },
    { id: 'electronics', name: 'Electronics', icon: Smartphone, color: 'text-red-600' },
    { id: 'airtime', name: 'Airtime/Data', icon: Zap, color: 'text-orange-600' },
  ];

  const products = {
    essentials: [
      { name: 'Rice (5kg)', price: '$12.50', image: '🍚', rating: 4.8, seller: 'FreshMart' },
      { name: 'Cooking Oil (1L)', price: '$4.25', image: '🛢️', rating: 4.6, seller: 'GroceryPlus' },
      { name: 'Sugar (2kg)', price: '$3.80', image: '🧂', rating: 4.7, seller: 'FreshMart' },
      { name: 'Bread', price: '$1.50', image: '🍞', rating: 4.9, seller: 'Local Bakery' },
      { name: 'Cassava Flour (2kg)', price: '$3.20', image: '🌾', rating: 4.6, seller: 'West African Goods' },
      { name: 'Palm Oil (1L)', price: '$5.80', image: '🥥', rating: 4.7, seller: 'Liberian Exports' },
    ],
    household: [
      { name: 'Detergent Powder', price: '$8.90', image: '🧴', rating: 4.5, seller: 'CleanHome' },
      { name: 'Toilet Paper (12 rolls)', price: '$6.75', image: '🧻', rating: 4.7, seller: 'HomeEssentials' },
      { name: 'Dish Soap', price: '$2.30', image: '🧽', rating: 4.6, seller: 'CleanHome' },
      { name: 'Light Bulbs (4pk)', price: '$9.99', image: '💡', rating: 4.8, seller: 'ElectroShop' },
    ],
    clothing: [
      { name: 'T-Shirt', price: '$15.00', image: '👕', rating: 4.4, seller: 'Fashion Hub' },
      { name: 'Jeans', price: '$35.00', image: '👖', rating: 4.6, seller: 'Denim World' },
      { name: 'Sneakers', price: '$45.00', image: '👟', rating: 4.8, seller: 'Shoe Palace' },
      { name: 'Cap', price: '$12.00', image: '🧢', rating: 4.3, seller: 'Fashion Hub' },
    ],
    electronics: [
      { name: 'Phone Charger', price: '$8.50', image: '🔌', rating: 4.7, seller: 'TechZone' },
      { name: 'Earphones', price: '$15.99', image: '🎧', rating: 4.5, seller: 'AudioMax' },
      { name: 'Power Bank', price: '$25.00', image: '🔋', rating: 4.8, seller: 'TechZone' },
      { name: 'Phone Case', price: '$6.99', image: '📱', rating: 4.6, seller: 'AccessoryShop' },
    ],
    airtime: [
      { name: 'MTN Airtime $5', price: '$5.00', image: '📞', rating: 5.0, seller: 'MTN' },
      { name: 'Airtel Data 1GB', price: '$3.50', image: '📶', rating: 4.9, seller: 'Airtel' },
      { name: 'Orange Money $10', price: '$10.00', image: '🟠', rating: 4.8, seller: 'Orange' },
      { name: 'Lonestar Cell $5', price: '$5.00', image: '⭐', rating: 4.6, seller: 'Lonestar Cell' },
      { name: 'Africell Data 1GB', price: '$4.00', image: '🌍', rating: 4.5, seller: 'Africell' },
      { name: 'Universal Airtime $20', price: '$20.00', image: '💳', rating: 4.7, seller: 'NoblePay' },
    ],
  };

  const featuredDeals = [
    { name: 'Rice Bundle', originalPrice: '$25.00', salePrice: '$18.99', discount: '24%', image: '🍚' },
    { name: 'Electronics Pack', originalPrice: '$85.00', salePrice: '$65.00', discount: '24%', image: '📱' },
    { name: 'Household Bundle', originalPrice: '$45.00', salePrice: '$35.99', discount: '20%', image: '🏠' },
  ];

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <section id="marketplace">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-[#dd3333]">
            <Store className="w-4 h-4 mr-1" />
            Retail Marketplace
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Buy Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Shop for everyday essentials, household goods, electronics, clothing, 
            and airtime. All in one convenient marketplace with secure payments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search for products, brands, or categories..."
                className="pl-12 pr-4 py-3 text-lg border-2 w-full"
              />
            </div>
            <Button className="ml-2 px-6 py-3 bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white h-full">
              Search
            </Button>
          </div>
        </div>

        {/* Featured Deals */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6">🔥 Featured Deals</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredDeals.map((deal, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 border-orange-200">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="text-4xl mb-3">{deal.image}</div>
                    <h4 className="font-bold text-lg mb-2">{deal.name}</h4>
                    <div className="mb-3">
                      <span className="text-2xl font-bold text-green-600">{deal.salePrice}</span>
                      <span className="text-lg text-gray-500 line-through ml-2">{deal.originalPrice}</span>
                    </div>
                    <Badge className="mb-3 bg-[#dd3333] text-white">
                      {deal.discount} OFF
                    </Badge>
                    <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white" onClick={addToCart}>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories & Products */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="essentials" className="w-full">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-6 h-auto gap-1">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col items-center gap-1 p-2 sm:p-3 h-auto min-h-[65px] text-center"
                  >
                    <category.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${category.color}`} />
                    <span className="text-xs whitespace-nowrap overflow-hidden text-ellipsis max-w-full leading-tight">{category.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products[category.id as keyof typeof products].map((product, index) => (
                      <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="text-center mb-3">
                            <div className="text-3xl mb-2">{product.image}</div>
                            <h4 className="font-semibold mb-1">{product.name}</h4>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-gray-600">{product.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500 mb-2">by {product.seller}</p>
                            <div className="text-xl font-bold text-green-600 mb-3">
                              {product.price}
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white" 
                            size="sm"
                            onClick={addToCart}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Shopping Cart & Quick Actions */}
          <div className="space-y-6">
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Cart
                  </span>
                  <Badge variant="secondary">{cartItems}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${(cartItems * 15.99).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {cartItems} item{cartItems > 1 ? 's' : ''} in cart
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[#dd3333] to-[#000000] hover:from-red-700 hover:to-gray-900 text-white">
                      Checkout Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Cart
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Buy</CardTitle>
                <CardDescription>
                  Popular items and services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { icon: Zap, label: 'Airtime $5', price: '$5.00', color: 'text-blue-600' },
                  { icon: Smartphone, label: '1GB Data', price: '$3.50', color: 'text-green-600' },
                  { icon: Package, label: 'Rice 5kg', price: '$12.50', color: 'text-orange-600' },
                  { icon: Home, label: 'Cooking Oil', price: '$4.25', color: 'text-purple-600' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{item.price}</span>
                      <Button size="sm" onClick={addToCart}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivery Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Free delivery on orders over:</span>
                  <span className="font-semibold">$25</span>
                </div>
                <div className="flex justify-between">
                  <span>Average delivery time:</span>
                  <span className="font-semibold">2-4 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Service areas:</span>
                  <span className="font-semibold">All major cities</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}