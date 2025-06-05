'use client';
import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const DeliveryScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      handleScan(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  const handleScan = async (result) => {
    try {
      setLoading(true);
      setError(null);
      
      // Parse the QR code data
      let orderData;
      try {
        orderData = JSON.parse(result);
      } catch (e) {
        throw new Error('Invalid QR code format');
      }

      // Update order status
      const response = await axios.post('/api/orders/update-status', {
        orderId: orderData.orderId
      });

      if (response.data.success) {
        setSuccess(true);
      } else {
        throw new Error(response.data.message || 'Failed to update order status');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delivery Scanner</h1>
      
      {loading && <p className="text-blue-600">Processing...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}
      {success && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          Order marked as delivered successfully!
        </div>
      )}

      {!scanResult && (
        <div id="reader" className="w-full max-w-md mx-auto"></div>
      )}

      {scanResult && !success && (
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p>Scanned Order: {scanResult}</p>
          <button 
            onClick={() => setScanResult(null)}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Scan Again
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryScanner;