'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import axios from 'axios';

const InstantQRScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [cameraError, setCameraError] = useState('');
  const html5QrcodeRef = useRef(null);

  const startScanner = async () => {
    try {
      setCameraError('');
      setMessage('');
      setScannedData(null);
      setIsScanning(true);

      // Initialize the scanner
      html5QrcodeRef.current = new Html5Qrcode("qr-reader");

      // Get camera devices
      const devices = await Html5Qrcode.getCameras();
      
      if (devices && devices.length) {
        // Use back camera if available, otherwise use first camera
        const cameraId = devices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear')
        )?.id || devices[0].id;

        // Start scanning with optimal settings
        await html5QrcodeRef.current.start(
          cameraId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          onScanSuccess,
          onScanError
        );

      } else {
        throw new Error("No cameras found on this device");
      }
    } catch (error) {
      console.error("Error starting scanner:", error);
      setCameraError(error.message || "Failed to start camera");
      setIsScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        await html5QrcodeRef.current.stop();
      }
    } catch (error) {
      console.error("Error stopping scanner:", error);
    }
    setIsScanning(false);
    html5QrcodeRef.current = null;
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log("QR Code scanned:", decodedText);
    
    // Stop scanner immediately after successful scan
    await stopScanner();
    
    try {
      // Parse the QR code data
      const qrData = JSON.parse(decodedText);
      console.log("Parsed QR Data:", qrData);
      
      setScannedData(qrData);
      
      // Auto-confirm delivery (you can add manual confirmation if needed)
      const autoConfirm = window.confirm(
        `🚚 DELIVERY CONFIRMATION\n\n` +
        `Order: ${qrData.orderCode}\n` +
        `Customer: ${qrData.customerName}\n` +
        `Amount: ₹${qrData.amount}\n\n` +
        `Mark this order as DELIVERED?`
      );
      
      if (autoConfirm) {
        await markAsDelivered(qrData);
      } else {
        setMessage("Delivery cancelled by user");
        setMessageType("info");
      }
      
    } catch (error) {
      console.error("Error parsing QR code:", error);
      setMessage("❌ Invalid QR code format");
      setMessageType("error");
    }
  };

  const onScanError = (errorMessage) => {
    // Handle scan error silently (these happen frequently during scanning)
    // console.log("QR Scan Error:", errorMessage);
  };

  const markAsDelivered = async (qrData) => {
    setLoading(true);
    setMessage('⏳ Updating delivery status...');
    setMessageType('info');

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
          deliveredBy: 'delivery-app',
          verificationHash: qrData.hash
        }
      });

      if (response.data.success) {
        setMessage(`✅ Order ${qrData.orderCode} marked as DELIVERED!`);
        setMessageType("success");
        
        // Show success for 3 seconds then reset
        setTimeout(() => {
          resetScanner();
        }, 3000);
      } else {
        throw new Error(response.data.message || "Failed to update order status");
      }

    } catch (error) {
      console.error("Error updating delivery status:", error);
      setMessage(`❌ ${error.response?.data?.message || error.message || "Failed to mark as delivered"}`);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setMessage('');
    setMessageType('');
    setCameraError('');
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
        html5QrcodeRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🚚 Delivery Scanner</h1>
        <p className="text-gray-600">Scan invoice QR codes to confirm delivery</p>
      </div>

      {/* Status Messages */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 text-center font-semibold ${
          messageType === 'success' 
            ? 'bg-green-100 text-green-800 border-2 border-green-200' 
            : messageType === 'error'
            ? 'bg-red-100 text-red-800 border-2 border-red-200'
            : 'bg-blue-100 text-blue-800 border-2 border-blue-200'
        }`}>
          {message}
        </div>
      )}

      {/* Camera Error */}
      {cameraError && (
        <div className="bg-red-100 border-2 border-red-200 text-red-800 p-4 rounded-lg mb-6 text-center">
          <p className="font-semibold">📷 Camera Error</p>
          <p className="text-sm">{cameraError}</p>
          <button 
            onClick={() => setCameraError('')}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Start Scanner Button */}
      {!isScanning && !scannedData && !cameraError && (
        <div className="text-center">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M4 7h4.01M8 11h4.01" />
              </svg>
            </div>
          </div>
          <button
            onClick={startScanner}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105"
          >
            📱 START SCANNING
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Camera will open immediately for QR code scanning
          </p>
        </div>
      )}

      {/* QR Scanner Container */}
      {isScanning && (
        <div className="text-center">
          <div className="mb-4">
            <p className="text-xl font-bold text-gray-700 mb-2">📷 Scanning Active</p>
            <p className="text-sm text-gray-500">Point camera at the QR code on the invoice</p>
          </div>
          
          <div id="qr-reader" className="rounded-xl overflow-hidden shadow-lg mb-4"></div>
          
          <button
            onClick={stopScanner}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            ❌ Close Scanner
          </button>
        </div>
      )}

      {/* Scanned Data Display */}
      {scannedData && !loading && (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-200">
          <h3 className="font-bold text-xl mb-4 text-center text-gray-800">📦 Order Scanned</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Order Code:</span>
              <span className="font-mono bg-blue-100 px-2 py-1 rounded">{scannedData.orderCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Customer:</span>
              <span>{scannedData.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Amount:</span>
              <span className="font-bold text-green-600">₹{scannedData.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Scanned:</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => markAsDelivered(scannedData)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold transition-colors"
            >
              ✅ MARK DELIVERED
            </button>
            <button
              onClick={resetScanner}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-bold transition-colors"
            >
              🔄 SCAN AGAIN
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-lg font-semibold text-gray-700 mt-4">Processing delivery...</p>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 text-xs text-gray-500 text-center space-y-1">
        <p>💡 <strong>Tips:</strong></p>
        <p>• Ensure good lighting for best scanning results</p>
        <p>• Hold device steady when scanning</p>
        <p>• QR code should fill most of the scanning area</p>
      </div>
    </div>
  );
};

export default InstantQRScanner;