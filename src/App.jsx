import { useState } from "react";

export default function App() {
  const [btcQty, setBtcQty] = useState("");
  const [bchQty, setBchQty] = useState("");
  const [sl, setSl] = useState(1);
  const [position, setPosition] = useState("NONE");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  const ratio = 170;

  const slUpper = (ratio * (1 + sl / 100)).toFixed(2);
  const slLower = (ratio * (1 - sl / 100)).toFixed(2);

  const isValid = btcQty > 0 && bchQty > 0;

  const openModal = (type) => {
    if (!isValid && type !== "EXIT") return;
    setModal(type);
  };

  const confirmTrade = () => {
    if (modal === "LONG") setPosition("LONG");
    if (modal === "SHORT") setPosition("SHORT");
    if (modal === "EXIT") setPosition("NONE");

    setModal(null);
    setToast("Trade submitted (UI only)");

    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-96 space-y-5">

        {/* TITLE */}
        <h1 className="text-xl font-bold text-center">
          BTC/BCH Ratio Trading
        </h1>

        {/* POSITION STATUS */}
        <div className="text-center">
          <span className="text-sm text-gray-400">Status:</span>
          <div className="font-semibold mt-1">
            {position === "NONE" && "No Position"}
            {position === "LONG" && "Long Ratio Active"}
            {position === "SHORT" && "Short Ratio Active"}
          </div>
        </div>

        {/* INPUTS */}
        <div className="space-y-3">
          <input
            type="number"
            placeholder="BTC Quantity"
            value={btcQty}
            onChange={(e) => setBtcQty(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="number"
            placeholder="BCH Quantity"
            value={bchQty}
            onChange={(e) => setBchQty(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
          <input
            type="number"
            placeholder="Stoploss %"
            value={sl}
            onChange={(e) => setSl(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 outline-none"
          />
        </div>

        {/* STOPLOSS DISPLAY */}
        <div className="bg-gray-700 p-3 rounded text-sm">
          <div>Ratio: {ratio}</div>
          <div>SL Upper: {slUpper}</div>
          <div>SL Lower: {slLower}</div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => openModal("LONG")}
            disabled={!isValid}
            className="flex-1 bg-green-600 p-2 rounded hover:bg-green-700 disabled:bg-gray-600"
          >
            LONG
          </button>

          <button
            onClick={() => openModal("SHORT")}
            disabled={!isValid}
            className="flex-1 bg-red-600 p-2 rounded hover:bg-red-700 disabled:bg-gray-600"
          >
            SHORT
          </button>

          <button
            onClick={() => openModal("EXIT")}
            className="flex-1 bg-gray-600 p-2 rounded hover:bg-gray-700"
          >
            EXIT
          </button>
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-xl w-80 space-y-4">

            <h2 className="text-lg font-semibold">Confirm Trade</h2>

            {modal === "LONG" && (
              <>
                <div>Buy BTC: {btcQty}</div>
                <div>Sell BCH: {bchQty}</div>
              </>
            )}

            {modal === "SHORT" && (
              <>
                <div>Sell BTC: {btcQty}</div>
                <div>Buy BCH: {bchQty}</div>
              </>
            )}

            {modal === "EXIT" && (
              <div>Close all positions?</div>
            )}

            <div className="flex gap-2">
              <button
                onClick={confirmTrade}
                className="flex-1 bg-blue-600 p-2 rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setModal(null)}
                className="flex-1 bg-gray-600 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-600 px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
