import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FaRegClock, FaStar, FaUtensils } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useSelector } from "react-redux";
import Nav from "./Nav";
import { serverUrl } from "../App";
import { categories } from "../../category";

const foodTypeLabels = {
  veg: "Veg",
  "non-veg": "Non-Veg",
};

const getShopCategories = (items) => {
  const uniqueCategories = [...new Set(items.map((item) => item.category))];
  return uniqueCategories.slice(0, 3).join(", ") || "Fresh food";
};

const getShopRating = (shop, itemCount) => {
  const code = shop._id?.charCodeAt(shop._id.length - 1) || itemCount;
  return (4 + (code % 8) / 10).toFixed(1);
};

function UserDashboard() {
  const { currentCity } = useSelector((state) => state.user);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState("");

  useEffect(() => {
    const getShops = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${serverUrl}/api/shop/all`, {
          withCredentials: true,
        });
        setShops(result.data || []);
      } catch (error) {
        console.log(error);
        setShops([]);
      } finally {
        setLoading(false);
      }
    };

    getShops();
  }, []);

  const filteredShops = useMemo(() => {
    const cityText = currentCity?.trim().toLowerCase();

    const shopsInCurrentCity = shops.filter(
      (shop) => !cityText || shop.city?.toLowerCase() === cityText,
    );
    const shopsToSearch = shopsInCurrentCity.length > 0 ? shopsInCurrentCity : shops;

    return shopsToSearch.filter((shop) => {
      const shopItems = shop.Items || shop.items || [];
      const hasSelectedCategory =
        !selectedCategory ||
        shopItems.some((item) => item.category === selectedCategory);

      return hasSelectedCategory;
    });
  }, [shops, selectedCategory, currentCity]);

  const getFilteredShopItems = (shop) => {
    const shopItems = shop.Items || shop.items || [];

    return shopItems.filter((item) => {
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;

      return matchesCategory;
    });
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Nav
        searchValue={search}
        onSearchChange={setSearch}
        cartCount={cartCount}
      />
      <div className="w-full min-h-screen bg-[#fff9f6] px-4 sm:px-6 pb-10">
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-7">
          <div className="w-full bg-white shadow-lg rounded-xl border border-orange-100 p-4 sm:p-5">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Order your favorite food
                </h1>
                <p className="text-gray-500 mt-1">
                  Fresh dishes from nearby restaurants
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-gray-900">
                What's on your mind?
              </h2>
              {selectedCategory && (
                <button
                  className="text-[#ff4d2d] font-semibold"
                  onClick={() => setSelectedCategory("")}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className={`min-w-[120px] bg-white border rounded-xl shadow-md overflow-hidden text-left transition-all ${
                    selectedCategory === category.name
                      ? "border-[#ff4d2d] ring-2 ring-[#ff4d2d]/20"
                      : "border-orange-100"
                  }`}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev === category.name ? "" : category.name,
                    )
                  }
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-20 object-cover"
                  />
                  <div className="p-2 text-sm font-semibold text-gray-800 truncate">
                    {category.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="bg-white shadow-lg rounded-xl border border-orange-100 p-6 text-center text-gray-600">
              Loading restaurants...
            </div>
          ) : (
            <>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Restaurants near {currentCity || "you"}
                </h2>
                {filteredShops.length === 0 ? (
                  <div className="bg-white shadow-lg rounded-xl border border-orange-100 p-6 text-center text-gray-600">
                    No restaurants found
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredShops.map((shop) => {
                      const shopItems = getFilteredShopItems(shop);
                      const isSelected = selectedShopId === shop._id;
                      const cuisineText = getShopCategories(shopItems);
                      const rating = getShopRating(shop, shopItems.length);

                      return (
                      <div
                        key={shop._id}
                        className={`bg-white rounded-xl overflow-hidden border cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? "border-[#ff4d2d] ring-2 ring-[#ff4d2d]/15 shadow-2xl -translate-y-1 sm:col-span-2 lg:col-span-3"
                            : "border-orange-100 shadow-md hover:shadow-2xl hover:-translate-y-1"
                        }`}
                        onClick={() =>
                          setSelectedShopId((prev) =>
                            prev === shop._id ? "" : shop._id,
                          )
                        }
                      >
                        <div className="p-3">
                          <div className="relative overflow-hidden rounded-xl bg-gray-100">
                            <img
                              src={shop.image}
                              alt={shop.name}
                              className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/65 to-transparent" />
                            <div className="absolute left-3 bottom-3 rounded-md bg-white px-2 py-1 text-xs font-bold text-[#ff4d2d] shadow-md">
                              {shopItems.length} items
                            </div>
                          </div>

                          <div className="pt-3">
                            <div className="flex items-start justify-between gap-3">
                              <h3 className="text-lg font-bold text-gray-900 truncate">
                                {shop.name}
                              </h3>
                              <div className="flex items-center gap-1 rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-white">
                                <FaStar size={10} />
                                <span>{rating}</span>
                              </div>
                            </div>

                            <div className="mt-1 flex items-center gap-3 text-sm font-semibold text-gray-700">
                              <span className="flex items-center gap-1">
                                <FaRegClock className="text-[#ff4d2d]" />
                                25-35 mins
                              </span>
                              <span className="flex items-center gap-1">
                                <FaUtensils className="text-[#ff4d2d]" />
                                Menu
                              </span>
                            </div>

                            <p className="mt-2 truncate text-sm text-gray-500">
                              {cuisineText}
                            </p>
                            <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                              <FaLocationDot className="text-[#ff4d2d]" />
                              <span className="truncate">
                                {shop.city}, {shop.state}
                              </span>
                            </div>

                            <button className="mt-4 w-full rounded-lg bg-[#ff4d2d]/10 px-4 py-2 font-semibold text-[#ff4d2d] transition-colors hover:bg-[#ff4d2d] hover:text-white">
                              {isSelected ? "Hide Menu" : "View Menu"}
                            </button>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="border-t border-orange-100 p-4 bg-[#fff9f6]">
                            {shopItems.length === 0 ? (
                              <div className="bg-white rounded-lg border border-orange-100 p-4 text-center text-gray-600">
                                No food items found
                              </div>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {shopItems.map((item) => (
                                  <div
                                    key={item._id}
                                    className="flex bg-white rounded-lg shadow-md overflow-hidden border border-orange-100 cursor-default"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="w-32 sm:w-40 flex-shrink-0 bg-gray-50">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex flex-col justify-between p-3 flex-1 min-w-0">
                                      <div>
                                        <h3 className="text-base font-semibold text-[#ff4d2d] truncate">
                                          {item.name}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                          {item.category} -{" "}
                                          {foodTypeLabels[item.foodType] ||
                                            item.foodType}
                                        </p>
                                      </div>
                                      <div className="flex items-center justify-between mt-3">
                                        <div className="text-[#ff4d2d] font-bold">
                                          Rs. {item.price}
                                        </div>
                                        <button
                                          className="px-4 py-2 rounded-lg bg-[#ff4d2d] text-white text-sm font-semibold hover:bg-orange-600 transition-colors"
                                          onClick={() => handleAddToCart(item)}
                                        >
                                          Add
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
