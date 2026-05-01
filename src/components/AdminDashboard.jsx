import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "http://localhost:5000/api/v1";

const MOCK_ORDERS = [
  {
    _id: "1", roomId: "5", completed: "new",
    createdAt: new Date(Date.now() - 300000).toISOString(),
    orders: [
      { _id: "1", status: "accepted", name: "NY Cheesecake", price: 8.99, addOns: [{ name: "Strawberry Sauce", price: 1.0 }, { name: "Whipped Cream", price: 0.5 }] },
      { _id: "2", status: "accepted", name: "Margherita Pizza", price: 14.99, addOns: [{ name: "Strawberry Sauce", price: 1.0 }, { name: "Whipped Cream", price: 0.5 }, { name: "Extra Sauce", price: 1.5 }] },
    ],
  },
  {
    _id: "2", roomId: "12", completed: "new",
    createdAt: new Date(Date.now() - 900000).toISOString(),
    orders: [
      { _id: "3", status: "accepted", name: "Grilled Salmon", price: 22.99, addOns: [{ name: "Extra Sauce", price: 1.5 }] },
      { _id: "4", status: "accepted", name: "Caesar Salad", price: 11.99, addOns: [] },
    ],
  },
  {
    _id: "6", roomId: "16", completed: "pending",
    createdAt: new Date(Date.now() - 100000).toISOString(),
    orders: [
      { _id: "5", status: "accepted", name: "Grilled Salmon", price: 22.99, addOns: [{ name: "Extra Sauce", price: 1.5 }] }
    ],
  },
  {
    _id: "3", roomId: "7", completed: "done",
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    orders: [
      { _id: "6", status: "accepted", name: "Caesar Salad", price: 11.99, addOns: [] },
      { _id: "7", status: "accepted", name: "Garlic Bread", price: 4.99, addOns: [{ name: "Strawberry Sauce", price: 1.0 }, { name: "Whipped Cream", price: 0.5 }] },
    ],
  },
];

const MOCK_MENU = [
  { _id: "m1", available: true, name: "NY Cheesecake", description: "Classic New York style cheesecake with graham cracker crust.", type: "Dessert", price: 8.99, image: "https://www.browneyedbaker.com/wp-content/uploads/2024/04/new-york-cheesecake-21-1200A.jpg", addOns: [{ name: "Strawberry Sauce", price: 1 }, { name: "Whipped Cream", price: 0.5 }] },
  { _id: "m2", available: true, name: "Margherita Pizza", description: "Wood-fired pizza with fresh mozzarella and basil.", type: "Main", price: 14.99, image: "", addOns: [] },
  { _id: "m3", available: true, name: "Grilled Salmon", description: "Atlantic salmon fillet with lemon butter sauce.", type: "Main", price: 22.99, image: "", addOns: [{ name: "Extra Sauce", price: 1.5 }] },
  { _id: "m4", available: true, name: "Caesar Salad", description: "Romaine lettuce, parmesan, croutons, caesar dressing.", type: "Starter", price: 11.99, image: "", addOns: [] },
];

function timeAgo(iso) {
  const diff = Math.floor((Date.now() - new Date(iso)) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  return `${Math.floor(diff / 60)}h ago`;
}

function orderTotal(checkout) {
  return checkout.orders.reduce(
    (s, item) => s + item.price + item.addOns.reduce((a, x) => a + x.price, 0),
    0
  );
}

// ── Confirm Modal ────────────────────────────────────────────────────────────────────
function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
   
        <motion.div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
          <motion.div 
            className="bg-gray-900 rounded-xl p-6 w-full max-w-sm border border-gray-800"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            >

            <h2 className="text-white font-semibold text-lg mb-2">
              {title || "Are you sure?"}
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              {message || "This action cannot be undone."}
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>

          </motion.div>
        </motion.div>
     
  );
}

// ── Add Item Modal ────────────────────────────────────────────────────────────────────
function ItemModal({ item, onClose, onSave, openConfirm }) {
  const [form, setForm] = useState({
    name: item?.name || "",
    description: item?.description || "",
    type: item?.type || "",
    price: item?.price || "",
    image: item?.image || "",
  });

  const [addOns, setAddOns] = useState(item?.addOns || []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const updateAddOn = (i, field, value) => {
    setAddOns((prev) =>
      prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a))
    );
  };

  const removeAddOn = (i) => setAddOns((prev) => prev.filter((_, idx) => idx !== i));

  const addAddOn = () => {
    setAddOns(prev => {
      const last = prev[prev.length - 1];
      if (last && last.name === "" && last.price === "") return prev;
      return [...prev, { name: "", price: "" }];
    });
  };

  const handleSave = () => {

    onSave({
      ...form,
      price: parseFloat(form.price) || 0,
      addOns: addOns
        .filter(a => a.name.trim() !== "" && a.price !== "")
        .map(a => ({
          ...a,
          price: parseFloat(a.price) || 0
        })),
    })

  

  };

  const fields = [
    { label: "Name", key: "name", placeholder: "Item name" },
    { label: "Description", key: "description", placeholder: "Short description" },
    { label: "Type", key: "type", placeholder: "Main, Dessert, Starter..." },
    { label: "Image URL", key: "image", placeholder: "https://..." },
  ];

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}   
     >
      <motion.div 
        className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-[440px] shadow-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }} // 👈 EXIT animation
        transition={{ duration: 0.2, ease: "easeOut" }}
        >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-semibold text-base">{item ? "Edit item" : "Add menu item"}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300 text-2xl leading-none bg-transparent border-none cursor-pointer">×</button>
        </div>

        {fields.map(({ label, key, placeholder }) => (
          <div key={key} className="mb-4">
            <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</label>
            <input
              value={form[key]} onChange={set(key)} placeholder={placeholder}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
            />
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Price</label>
          <input
            type="number" step="0.01" value={form.price} onChange={set("price")} placeholder="0.00"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 text-sm outline-none focus:border-purple-500 transition-colors placeholder-gray-600"
          />
        </div>

        {/* Add-ons section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs text-gray-500 uppercase tracking-widest">Add-ons</label>
            <button
              onClick={addAddOn}
              className="text-xs text-purple-400 hover:text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-lg cursor-pointer transition-colors"
            >
              + Add
            </button>
          </div>

          {addOns.length === 0 && (
            <div className="text-xs text-gray-600 py-3 text-center border border-dashed border-gray-700 rounded-lg">
              No add-ons yet
            </div>
          )}

          <div className="flex flex-col gap-2">
            {addOns.map((addon, i) => (
              <div key={i} className="flex gap-2 items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
                <input
                  value={addon.name}
                  onChange={(e) => updateAddOn(i, "name", e.target.value)}
                  placeholder="Add-on name"
                  className="flex-1 bg-transparent text-gray-200 text-sm outline-none placeholder-gray-600"
                />
                <span className="text-gray-600 text-sm">$</span>
                <input
                  type="number" step="0.01"
                  value={addon.price}
                  onChange={(e) => updateAddOn(i, "price", e.target.value)}
                  placeholder="0.00"
                  className="w-16 bg-transparent text-gray-200 text-sm outline-none placeholder-gray-600 text-right"
                />
                <button
                  onClick={() => removeAddOn(i)}
                  className="text-gray-600 hover:text-red-400 bg-transparent border-none cursor-pointer text-base leading-none ml-1 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-transparent border border-gray-700 rounded-lg text-gray-400 text-sm cursor-pointer hover:bg-gray-800 transition-colors">
            Cancel
          </button>
          <button
            onClick={() =>
              openConfirm(
                () => handleSave(),
                `${item ? "save changes?" : "add item"}`,
                `${item ? "This wil save all changes?" : "This will add new item"}`
              )
            }
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm font-semibold cursor-pointer transition-colors border-none">
            {item ? "Save changes" : "Add item"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Orders Page ───────────────────────────────────────────────────────────────
function OrdersPage({ orders, onMarkDone, onMarkPending, onMarkDecline, onDelete, onDeclineOrder, openConfirm }) {
  const [filter, setFilter] = useState("new");

  const filtered = orders.filter((o) => (filter === o.completed));

  const counts = ["new", "pending", "done", "decline"].reduce((acc, s) => {
    acc[s] = orders.filter((o) => o.completed === s).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex gap-2 mb-6">
        {["new", "pending", "done", "decline"].map((f) => (
          <button
            key={f} onClick={() => setFilter(f)}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold border cursor-pointer transition-all flex items-center gap-1.5 ${filter === f
              ? "bg-purple-600 border-purple-600 text-white"
              : "bg-transparent border-gray-700 text-gray-500 hover:text-gray-300"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {counts[f] > 0 && (
              <span className={`text-xs rounded-full px-1.5 py-0 font-bold ${filter === f ? "bg-white/20 text-white" : "bg-gray-700 text-gray-400"
                }`}>
                {counts[f]}
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">No orders found</div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((checkout) => (
            <div
              key={checkout._id}
              className={`bg-gray-900 border border-gray-800 rounded-xl p-5 border-l-4 ${checkout.completed === "new" ? "border-l-blue-500" : checkout.completed === "done" ? "border-l-green-500" : checkout.completed === "pending" ? "border-l-amber-400" : "border-l-red-500"
                }`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-white font-semibold text-base">Room {checkout.roomId}</div>
                  <div className="text-gray-600 text-xs mt-0.5">{timeAgo(checkout.createdAt)}</div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${checkout.completed === "new" ? "bg-blue-500/15 text-blue-400" : checkout.completed === "done" ? "bg-green-500/15 text-green-400" : checkout.completed === "pending" ? "bg-amber-400/15 text-amber-400" : "bg-red-400/15 text-red-400"
                  }`}>
                  {checkout.completed}
                </span>
              </div>

              {/* Items */}
              <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
                {checkout.orders.map((item, i) => {
                  const itemTotal = item.price + item.addOns.reduce((a, x) => a + x.price, 0);
                  return (

                    <div
                      key={i}
                      className={`bg-gray-800/60 rounded-lg p-3 flex flex-col flex-1 transition-all
                              ${item.status === "decline" || checkout.completed === "decline" ? " opacity-30 pointer-events-none" : ""}
                            `}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-200 text-sm font-medium">{item.name}</span>
                        <span className="text-gray-400 text-sm">${item.price.toFixed(2)}</span>
                      </div>
                      {item.addOns.length > 0 ? (
                        <div className="mt-2 flex flex-col flex-1 gap-1">
                          {item.addOns.map((addon, j) => (
                            <div key={j} className="flex justify-between items-center pl-3 border-l-2 border-purple-700">
                              <span className="text-gray-500 text-xs">+ {addon.name}</span>
                              <span className="text-gray-500 text-xs">+${addon.price.toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="flex justify-between items-center mt-auto pt-1 border-t border-gray-700">
                            <span className="text-gray-500 text-xs">Item total</span>
                            <span className="text-purple-400 text-xs font-semibold">${itemTotal.toFixed(2)}</span>
                          </div>
                        </div>
                      ) :
                        <div className="flex justify-between items-center mt-auto pt-1 border-t border-gray-700">
                          <span className="text-gray-500 text-xs">Item total</span>
                          <span className="text-purple-400 text-xs font-semibold">${itemTotal.toFixed(2)}</span>
                        </div>
                      }
                      {checkout.completed === "new" &&
                        <button
                          onClick={() =>
                            openConfirm(
                              () => onDeclineOrder(checkout._id, item._id),
                              "Decline item?",
                              "This will mark the item as declined."
                            )
                          }
                          className="mt-2 w-full py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold cursor-pointer hover:bg-red-500/20 transition-colors"
                        >
                          Decline
                        </button>}
                    </div>

                  );
                })}
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-3 border-t border-gray-800">
                <div className="text-white font-bold text-sm">
                  Total: <span className="text-purple-400">${orderTotal(checkout).toFixed(2)}</span>
                </div>
                <div className="flex gap-2">
                  {checkout.completed === "new" ? (
                    <>
                      <button
                        onClick={() =>
                          openConfirm(
                            () => onMarkPending(checkout._id),
                            "Accept All Orders?",
                            "This will mark all orders as accepted."
                          )
                        }
                        className="px-4 py-1.5 bg-blue-500/15 border border-blue-500/30 rounded-lg text-blue-400 text-xs font-semibold cursor-pointer hover:bg-blue-500/25 transition-colors"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          openConfirm(
                            () => onMarkDecline(checkout._id),
                            "Decline All Orders?",
                            "This will mark all orders as Declined."
                          )
                        }
                        className="px-4 py-1.5 bg-red-500/15 border border-red-500/30 rounded-lg text-red-400 text-xs font-semibold cursor-pointer hover:bg-red-500/25 transition-colors"
                      >
                        Decline
                      </button>
                    </>

                  ) : checkout.completed === "pending" && (
                    <button
                      onClick={() =>
                        openConfirm(
                          () => onMarkDone(checkout._id),
                          "Mark All Orders Done?",
                          "This will mark all orders as Done."
                        )
                      }
                      className="px-4 py-1.5 bg-green-500/15 border border-green-500/30 rounded-lg text-green-400 text-xs font-semibold cursor-pointer hover:bg-green-500/25 transition-colors"
                    >
                      Mark done
                    </button>
                  )

                  }

                  {
                    // checkout.completed === "new" ? "" :
                    //   (<button
                    //     onClick={() => onDelete(checkout._id)}
                    //     className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold cursor-pointer hover:bg-red-500/20 transition-colors"
                    //   >
                    //     Delete
                    //   </button>)
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MenuPage({ menuItems, onEdit, onDelete, onToggleAvailable, openConfirm }) {
  const [search, setSearch] = useState("");

  const filtered = search
    ? menuItems.filter(
      (i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.type.toLowerCase().includes(search.toLowerCase())
    )
    : menuItems;

  return (
    <div>
      <input
        value={search} onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or type..."
        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-gray-200 text-sm outline-none focus:border-purple-500 transition-colors placeholder-gray-600 mb-6"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-600">No items found</div>
      ) : (
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>

          {filtered.map((item) => {
            const itemTotal = item.price + item.addOns.reduce((a, x) => a + x.price, 0);
            return (
              <div key={item._id} className={`bg-gray-900 border rounded-xl overflow-hidden flex flex-col h-full transition-all ${item.available === false ? "border-red-500/30 opacity-60" : "border-gray-800"
                }`}>
                {item.image ? (
                  <div className="w-full h-32 bg-gray-800 relative">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover"
                      onError={(e) => (e.currentTarget.style.display = "none")} />
                    {item.available === false && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Unavailable</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-32 bg-gray-800 flex items-center justify-center text-gray-600 text-xs">No image</div>
                )}

                <div className="p-4 flex flex-col flex-1">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-white font-semibold text-sm flex-1 truncate">{item.name}</div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold shrink-0">{item.type}</span>
                    </div>

                    <p className="text-gray-500 text-xs leading-relaxed mb-2 line-clamp-2">{item.description}</p>

                    {item.addOns.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {item.addOns.map((a, i) => (
                          <span key={i} className="text-xs text-gray-600 bg-gray-800 rounded px-2 py-0.5">
                            {a.name} +${a.price.toFixed(2)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex justify-between items-center">
                      <div className="text-purple-400 font-bold text-base">${itemTotal.toFixed(2)}</div>
                      <div className="flex gap-2">
                        <button onClick={() => onEdit(item)}
                          className="px-3 py-1 bg-purple-500/15 border border-purple-500/30 rounded-lg text-purple-400 text-xs font-semibold cursor-pointer hover:bg-purple-500/25 transition-colors">
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            openConfirm(
                              () => onDelete(item._id),
                              "Delete item?",
                              "This will permanently Delete item"
                            )
                          }
                          className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs font-semibold cursor-pointer hover:bg-red-500/20 transition-colors">
                          Del
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        openConfirm(
                          () => onToggleAvailable(item._id, item.available),
                          `${item.available === false ? "Mark Item available" : "Mark Item unavailable"}`,
                          `${item.available === false ? "Tis will Mark Item available" : "This will Mark Item unavailable"}`
                        )
                      }
                      className={`w-full py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors border ${item.available === false
                        ? "bg-green-500/15 border-green-500/30 text-green-400 hover:bg-green-500/25"
                        : "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20"
                        }`}
                    >
                      {item.available === false ? "Mark available" : "Mark unavailable"}
                    </button>
                  </div>
                </div>
              </div>
            )
          }

          )}
        </div>
      )}
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [page, setPage] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [modal, setModal] = useState(null);
  const [confirmState, setConfirmState] = useState({
    open: false,
    action: null,
    title: "",
    message: ""
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [oRes, mRes] = await Promise.all([fetch(`${BASE}/getCheckout`), fetch(`${BASE}/getMenu`)]);
        setOrders(await oRes.json());
        setMenuItems(await mRes.json());
      } catch {
        setOrders(MOCK_ORDERS);
        setMenuItems(MOCK_MENU);
      }
    };
    load();
  }, []);

  const markDone = async (id) => {
    try { await fetch(`${BASE}/checkout/done/${id}`, { method: "PUT" }); } catch { }
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, completed: "done" } : o)));
  };

  const markPending = async (id) => {
    try { await fetch(`${BASE}/checkout/pending/${id}`, { method: "PUT" }); } catch { }
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, completed: "pending" } : o)));
  };

  const markDecline = async (id) => {
    try { await fetch(`${BASE}/checkout/decline/${id}`, { method: "PUT" }); } catch { }
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, completed: "decline" } : o)));
  };

  const toggleAvailable = async (id, current) => {
    const available = current === false ? true : false;
    try {
      await fetch(`${BASE}/updatemenuitem/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ available }),
      });
    } catch { }
    setMenuItems((prev) => prev.map((i) => (i._id === id ? { ...i, available } : i)));
  };

  const declineOrder = async (roomid, orderid) => {
    try { await fetch(`${BASE}/room/${roomid}/order/${orderid}`, { method: "PUT" }); } catch { }
    setOrders((prev) =>
      prev.map((checkout) =>
        checkout._id === roomid
          ? {
            ...checkout,
            orders: checkout.orders.map((item) =>
              item._id === orderid
                ? { ...item, status: "decline" }
                : item
            ),
          }
          : checkout
      )
    );
  };

  const deleteMenuItem = async (id) => {
    try { await fetch(`${BASE}/deletemenuitem/${id}`, { method: "DELETE" }); } catch { }
    setMenuItems((prev) => prev.filter((i) => i._id !== id));
  };

  const saveItem = async (payload) => {
    const editing = modal?.item;
    try {
      if (editing) {
        await fetch(`${BASE}/updatemenuitem/${editing._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        setMenuItems((prev) => prev.map((i) => (i._id === editing._id ? { ...i, ...payload } : i)));
      } else {
        const res = await fetch(`${BASE}/addmenu`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        const saved = await res.json().catch(() => ({ ...payload, _id: "local" + Date.now() }));
        setMenuItems((prev) => [...prev, saved]);
      }
    } catch {
      if (editing) {
        setMenuItems((prev) => prev.map((i) => (i._id === editing._id ? { ...i, ...payload } : i)));
      } else {
        setMenuItems((prev) => [...prev, { ...payload, _id: "local" + Date.now() }]);
      }
    }
    setModal(null);
  };

  const openConfirm = (action, title, message) => {
    setConfirmState({
      open: true,
      action,
      title,
      message
    });
  };

  const neworders = orders.reduce((acc, checkout) => {
    if (checkout.completed !== "new") return acc;

    return acc + checkout.orders.filter(
      item => item.status === "accepted"
    ).length;

  }, 0);
  const pending = orders.reduce((acc, checkout) => {
    if (checkout.completed !== "pending") return acc;

    return acc + checkout.orders.filter(
      item => item.status === "accepted"
    ).length;

  }, 0);
  const completed = orders.reduce((acc, checkout) => {
    if (checkout.completed !== "done") return acc;

    return acc + checkout.orders.filter(
      item => item.status === "accepted"
    ).length;

  }, 0);

  const metrics = [
    { label: "New orders", value: neworders, highlight: "text-blue-500" },
    { label: "Pending", value: pending, highlight: pending > 0 ? "text-amber-400" : "text-white" },
    { label: "Completed", value: completed, highlight: "text-green-500" },
    { label: "Menu items", value: menuItems.length },
  ];

  const navItems = [
    { key: "orders", label: "Orders", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="2" rx="1" fill="currentColor" /><rect x="2" y="7" width="9" height="2" rx="1" fill="currentColor" /><rect x="2" y="12" width="11" height="2" rx="1" fill="currentColor" /></svg> },
    { key: "menu", label: "Menu", icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><path d="M5 8h6M8 5v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* Sidebar */}
      <div className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col py-6 shrink-0">
        <div className="px-5 pb-5 border-b border-gray-800 mb-4">
          <div className="text-white font-bold text-sm">Admin Portal</div>
          <div className="text-gray-600 text-xs mt-0.5">Restaurant Manager</div>
        </div>
        {navItems.map(({ key, label, icon }) => (
          <button
            key={key} onClick={() => setPage(key)}
            className={`flex items-center gap-2.5 px-5 py-2.5 text-sm cursor-pointer w-full text-left transition-all border-l-2 bg-transparent border-t-0 border-r-0 border-b-0 ${page === key
              ? "border-l-purple-500 text-white font-semibold"
              : "border-l-transparent text-gray-500 hover:text-gray-300"
              }`}
            style={{ backgroundColor: page === key ? "rgba(168,85,247,0.08)" : "transparent" }}
          >
            {icon}
            {label}
            {key === "orders" && pending > 0 && (
              <span className="ml-auto text-xs bg-amber-400 text-black rounded-full px-2 py-0.5 font-bold">{pending}</span>
            )}
          </button>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <div className="bg-gray-900 border-b border-gray-800 px-7 py-4 flex items-center justify-between">
          <div>
            <div className="text-white font-bold text-base">{page === "orders" ? "Orders" : "Menu"}</div>
            <div className="text-gray-600 text-xs mt-0.5">{page === "orders" ? "Kitchen & order management" : "Manage your menu items"}</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs px-3 py-1 rounded-full bg-green-500/15 text-green-400 font-semibold">● Live</span>
            {page === "menu" && (
              <button onClick={() => setModal({ item: null })}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-white text-sm font-semibold cursor-pointer transition-colors border-none">
                + Add item
              </button>
            )}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-4 gap-3 px-7 pt-5">
          {metrics.map(({ label, value, highlight }) => (
            <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4">
              <div className="text-xs text-gray-600 uppercase tracking-widest mb-1.5">{label}</div>
              <div className={`text-2xl font-bold ${highlight}`}>{value}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 px-7 py-5 overflow-y-auto">
          {page === "orders" && <OrdersPage orders={orders} onMarkDone={markDone} onMarkPending={markPending} onMarkDecline={markDecline} onDeclineOrder={declineOrder} openConfirm={openConfirm} />}
          {page === "menu" && <MenuPage menuItems={menuItems} onEdit={(item) => setModal({ item })} onToggleAvailable={toggleAvailable} onDelete={deleteMenuItem} openConfirm={openConfirm} />}
        </div>
      </div>

      <AnimatePresence>
        {modal && <ItemModal item={modal.item} onClose={() => setModal(null)} onSave={saveItem} openConfirm={openConfirm} />}8
      </AnimatePresence>

      <AnimatePresence>
        {confirmState.open && <ConfirmModal
        isOpen={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        onClose={() => setConfirmState(prev => ({ ...prev, open: false }))}
        onConfirm={confirmState.action}
      />}
      </AnimatePresence>
    </div>
  );
}