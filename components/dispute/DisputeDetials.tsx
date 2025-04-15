const DisputeDetials = () => {
  return (
    <div className=" bg-white p-9">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Dispute Details */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Dispute Details</h2>

          <div className="bg-white border p-6 rounded shadow">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Services/Item Details</p>
              <p className="font-medium">Handcrafted Solid Wood</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-medium text-blue-600 underline cursor-pointer">
                Order Tracking Info
              </p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Buyer</p>
              <p className="font-medium">Sadit Ahsa</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Dispute Reason</p>
              <p className="font-medium">Item not as described</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Type of Dispute</p>
              <p className="font-medium">Chargeback</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Request Details</p>
              <p className="text-sm text-gray-700 mt-1">
                You notice a transaction on your account that you did not
                authorize or recognize. This could be a case of fraudulent
                activity, such as a purchase made without your consent or a
                subscription you didn’t sign up for...
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button className="text-sm px-4 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
                📄 document.doc
              </button>
              <button className="text-sm px-4 py-1 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200">
                🖼 image.png
              </button>
            </div>
          </div>
        </div>

        {/* Resolution */}
        <div className="">
          <h2 className="text-lg font-semibold mb-4">Resolution</h2>

          <div className="bg-white p-6 border rounded shadow">
            <div className="mb-4">
              <p className="text-sm text-gray-500">Disputes</p>
              <p className="font-medium">WGYkjdsh-231</p>
            </div>

            <div className="mb-4 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Expired on</p>
                <p className="font-medium">October, 23, 2025</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Resolution Status</p>
                <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full mt-1">
                  Resolved
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Resolution Reached</p>
              <p className="font-medium">Awarded to Customer</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500">Amount Refunded</p>
              <p className="font-medium text-green-600">$ 125.216</p>
            </div>

            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-md font-medium">Resolution History</h3>
              <button className="text-sm px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100">
                Archive
              </button>
            </div>

            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <img
                    src="https://i.pravatar.cc/32?img=3"
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Ralph Edwards
                    </p>
                    {i === 0 ? (
                      <p className="text-sm text-gray-700 mt-1">
                        <strong>Amount Refunded</strong> — You notice a
                        transaction on your account that you did not authorize
                        or recognize.
                      </p>
                    ) : (
                      <>
                        <p className="text-xs text-gray-400">
                          October, 23, 2025
                        </p>
                        <p className="text-sm text-gray-700 mt-1">
                          You notice a transaction on your account that you did
                          not authorize or recognize.
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeDetials;
