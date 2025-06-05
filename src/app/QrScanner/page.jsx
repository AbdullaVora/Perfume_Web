'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const QRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);

  const startScanner = () => {
    setIsScanning(true);
    setMessage('');
    setScannedData(null);

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
    };

    html5QrcodeScannerRef.current = new Html5QrcodeScanner(
      "qr-scanner-container",
      config,
      false
    );

    html5QrcodeScannerRef.current.render(onScanSuccess, onScanError);
  };

  const stopScanner = () => {
    if (html5QrcodeScannerRef.current) {
      html5QrcodeScannerRef.current.clear();
      html5QrcodeScannerRef.current = null;
    }
    setIsScanning(false);
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log("QR Code scanned:", decodedText);
    
    try {
      // Parse the QR code data
      const qrData = JSON.parse(decodedText);
      console.log("Parsed QR Data:", qrData);
      
      setScannedData(qrData);
      stopScanner();
      
      // Show confirmation dialog
      const confirmed = window.confirm(
        `Mark order ${qrData.orderCode} as delivered?\n\nCustomer: ${qrData.customerName}\nAmount: ₹${qrData.amount}`
      );
      
      if (confirmed) {
        await markAsDelivered(qrData);
      }
      
    } catch (error) {
      console.error("Error parsing QR code:", error);
      setMessage("Invalid QR code format");
      setMessageType("error");
    }
  };

  const onScanError = (errorMessage) => {
    // Handle scan error silently (camera errors are common)
    console.log("QR Scan Error:", errorMessage);
  };

  const markAsDelivered = async (qrData) => {
    setLoading(true);
    setMessage('');

    try {
      // Verify the hash for security
      const expectedHash = btoa(`${qrData.orderId}-${qrData.orderCode}-${qrData.amount}`);
      if (qrData.hash !== expectedHash) {
        throw new Error("Invalid QR code - security verification failed");
      }

      // Make API call to update order status
      const response = await axios.patch(`/api/orders/${qrData.orderId}/delivery-status`, {
        orderCode: qrData.orderCode,
        deliveryConfirmation: {
          deliveredAt: new Date().toISOString(),
          deliveredBy: 'delivery-app', // You can add delivery boy ID here
          verificationHash: qrData.hash
        }
      });

      if (response.data.success) {
        setMessage(`Order ${qrData.orderCode} marked as delivered successfully!`);
        setMessageType("success");
        
        // Reset after 3 seconds
        setTimeout(() => {
          setScannedData(null);
          setMessage('');
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to update order status");
      }

    } catch (error) {
      console.error("Error updating delivery status:", error);
      setMessage(error.response?.data?.message || error.message || "Failed to mark as delivered");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const retryDelivery = () => {
    if (scannedData) {
      markAsDelivered(scannedData);
    }
  };

  useEffect(() => {
    // Cleanup on component unmount
    return () => {
      if (html5QrcodeScannerRef.current) {
        html5QrcodeScannerRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Delivery QR Scanner
      </h2>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-lg mb-4 text-center ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Scanner Container */}
      {!isScanning && !scannedData && (
        <div className="text-center">
          <button
            onClick={startScanner}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Start QR Scanner
          </button>
          <p className="text-gray-600 text-sm mt-3">
            Click to start scanning delivery QR codes
          </p>
        </div>
      )}

      {/* QR Scanner */}
      {isScanning && (
        <div>
          <div id="qr-scanner-container"></div>
          <div className="text-center mt-4">
            <button
              onClick={stopScanner}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold"
            >
              Stop Scanner
            </button>
          </div>
        </div>
      )}

      {/* Scanned Data Display */}
      {scannedData && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div><strong>Order Code:</strong> {scannedData.orderCode}</div>
            <div><strong>Customer:</strong> {scannedData.customerName}</div>
            <div><strong>Amount:</strong> ₹{scannedData.amount}</div>
            <div><strong>Scanned At:</strong> {new Date().toLocaleString()}</div>
          </div>
          
          {loading ? (
            <div className="text-center mt-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <p className="text-sm text-gray-600 mt-2">Updating delivery status...</p>
            </div>
          ) : (
            <div className="flex gap-2 mt-4">
              <button
                onClick={retryDelivery}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => {
                  setScannedData(null);
                  setMessage('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-semibold"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>• Scan the QR code on customer invoices</p>
        <p>• Confirm delivery details before marking as delivered</p>
        <p>• Make sure you have good lighting for scanning</p>
      </div>
    </div>
  );
};

export default QRScanner;