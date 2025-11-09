import React, { useEffect, useRef, useState } from "react";
import { Upload, Plus, X, FileText, Download, AlertCircle, Import } from "lucide-react";


import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";

import Confetti from 'react-confetti'



import jsPDF from "jspdf";

function CreateInvoice() {
  const pdfRef = useRef();
  const componentRef = useRef(null);
  const [paymentMethod, setPaymentMethod] = useState("Full");
  const [showConfetti, setShowConfetti] = useState(false);

  const [companyName, setCompanyName] = useState("Invoicely Ltd");
  const [companyEmail, setCompanyEmail] = useState("info@invoicely.com");
  const [companyAddress, setCompanyAddress] = useState("123 Main St, Anytown, USA");
  const [companyPhone, setCompanyPhone] = useState("+1 234 567 890");

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  const [invoiceFields, setInvoiceFields] = useState([{ name: "", value: "" }]);
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [items, setItems] = useState([{ item: "", qty: 1, price: 0 }]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [logo, setLogo] = useState(null);
  const [bgImage, setBgImage] = useState(null);

  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [currency, setCurrency] = useState("USD");

  const addInvoiceField = () => setInvoiceFields([...invoiceFields, { name: "", value: "" }]);
  const handleInvoiceChange = (index, field, value) => {
    const updated = [...invoiceFields];
    updated[index][field] = value;
    setInvoiceFields(updated);
  };

  const removeInvoiceField = (index) => {
    if (invoiceFields.length > 1) {
      setInvoiceFields(invoiceFields.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "qty" || field === "price" ? Number(value) : value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { item: "", qty: 1, price: 0 }]);

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const subtotal = items.reduce((acc, i) => acc + i.qty * i.price, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount;

  const currencySymbols = {
    INR: "₹",
  };

  const formatCurrency = (amount) => {
    return `${currencySymbols[currency] || "₹"}${amount.toFixed(2)}`;
  };

  const qrData = `
Invoice Number: ${invoiceNumber}
Client: ${clientName}
Address: ${clientAddress}
Phone: ${clientPhone}
Issue Date: ${issuedDate}
Due Date: ${dueDate}

Items:
${items.map(item => `${item.item} - ${item.qty} x ${formatCurrency(item.price)} = ${formatCurrency(item.qty * item.price)}`).join("\n")}

Subtotal: ${formatCurrency(subtotal)}
Discount: ${formatCurrency(discountAmount)}
Tax: ${formatCurrency(taxAmount)}
Total: ${formatCurrency(total)}
Payment Method: ${paymentMethod}
`;

 const speak = () => {
if (!clientName || !total) {
const msg = new SpeechSynthesisUtterance(
"Hey, fill in the client name and total amount first. Can't read an empty invoice!"
)
window.speechSynthesis.speak(msg)
return
}

const message = `
Alright, here's the invoice.
It's for ${clientName}.
The total comes to ${formatCurrency(total)}.
Payment method: ${paymentMethod || "not mentioned"}.
Issued on ${issuedDate || "no issue date yet"}.
And the due date is ${dueDate || "still empty"}.
All set? Sounds good to me.
`

const ult = new SpeechSynthesisUtterance(message)
ult.lang = "en-IN"
ult.rate = 1
ult.pitch = 1
window.speechSynthesis.speak(ult);

}


  
   const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save("Invoice.pdf");
      setShowConfetti(true);
  setTimeout(() => setShowConfetti(false), 6000);
      
    });
  };


  

  return (
    <div className='flex mx-auto h-screen overflow-hidden bg-black text-white font-stretch-ultra-condensed'>
      <main className="flex-1 flex flex-col p-2 sm:p-4 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 bg-black px-4 sm:px-6 py-4 rounded-lg shadow-lg border border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">Create Invoice</h2>
            <p className="text-sm text-white">Design and generate professional invoices</p>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-2 bg-[#d1cdd64e] px-3 sm:px-4 py-2 rounded-lg hover:bg-[#a3a4a32c] transition-colors flex-1 sm:flex-initial">
              <button onClick={downloadPDF} className="px-2 sm:px-4 py-2 sm:py-3 md:px-8 md:py-4 rounded text-sm sm:text-base">Download</button>
            
            </div>
            {showConfetti && <Confetti />}
             
            <button
              onClick={speak}
              className="px-3 sm:px-4 py-2 sm:py-3 md:px-8 md:py-4 rounded bg-[#d1cdd64e] hover:bg-[#a3a4a32c] transition-colors text-white text-sm sm:text-base flex-1 sm:flex-initial"
            >
              🔊 Voice Preview
            </button>
          </div>
        </div>
        

        <div className="flex flex-col lg:flex-row flex-1 gap-4 sm:gap-6 overflow-hidden">
          <div className="w-full lg:w-1/2 overflow-y-auto bg-black rounded-lg p-4 sm:p-6 space-y-4 sm:space-y-6 border border-gray-700">
            <section className="space-y-4">
              <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white flex items-center gap-2">
                Company Details
              </h3>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-24 sm:h-32 hover:border-gray-700 transition-colors cursor-pointer bg-black">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-2" />
                    <span className="text-xs sm:text-sm text-gray-400">Upload Logo</span>
                  </label>
                </div>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-24 sm:h-32 hover:border-gray-700 transition-colors cursor-pointer bg-black">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBgImage(e.target.files[0])}
                    className="hidden"
                    id="bg-upload"
                  />
                  <label htmlFor="bg-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-2" />
                    <span className="text-xs sm:text-sm text-gray-400">Custom Background</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3 flex-col md:flex-row md:text-left">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Company Email"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
                <textarea
                  placeholder="Company Address"
                  rows="2"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Company Phone"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">Client Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client Name"
                  className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-5 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <textarea
                  placeholder="Client Address"
                  rows="2"
                  className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-5 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Client Phone"
                  className="w-full px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 lg:py-5 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">Invoice Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    placeholder="Invoice Number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Issue Date</label>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-medium text-white">Custom Fields</h4>
                  <button
                    onClick={addInvoiceField}
                    className="flex items-center justify-center gap-1 sm:gap-2 bg-[#d1cdd64e] px-3 sm:px-4 py-2 hover:bg-[#a3a4a32c] rounded-lg focus:border-gray-600 transition-colors text-xs sm:text-sm"
                  >
                    <span>🔥</span>
                    <span className="hidden sm:inline">Add Field</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </div>
                {invoiceFields.map((field, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Field Name"
                      className="w-1/3 px-2 sm:px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-900 focus:outline-none transition-colors text-xs sm:text-sm"
                      value={field.name}
                      onChange={(e) => handleInvoiceChange(idx, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Field Value"
                      className="flex-1 px-2 sm:px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-xs sm:text-sm"
                      value={field.value}
                      onChange={(e) => handleInvoiceChange(idx, "value", e.target.value)}
                    />
                    {invoiceFields.length > 1 && (
                      <button
                        onClick={() => removeInvoiceField(idx)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                >
                  <option value="full">Full Payment</option>
                  <option value="half">Half Payment</option>
                  <option value="upi">UPI</option>
                  <option value="bank transfer">Bank Transfer</option>
                </select>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-semibold text-white">Invoice Items</h3>
                <button
                  onClick={addItem}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-[#d1cdd64e] hover:bg-[#a3a4a32c] transition-colors text-xs sm:text-sm"
                >
                  <span>🔥</span>
                  <span className="hidden sm:inline">Add Item</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center p-2 sm:p-3 bg-black rounded-lg border border-gray-600">
                    <input
                      type="text"
                      placeholder="Item Name"
                      className="w-full sm:flex-1 px-2 sm:px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-xs sm:text-sm"
                      value={item.item}
                      onChange={(e) => handleItemChange(idx, "item", e.target.value)}
                    />
                    <div className="flex gap-2 w-full sm:w-auto">
                      <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        className="w-16 sm:w-20 px-2 sm:px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-center text-xs sm:text-sm"
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        className="w-20 sm:w-28 px-2 sm:px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-right text-xs sm:text-sm"
                        value={item.price}
                        onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                      />
                      <div className="text-xs sm:text-sm text-gray-400 w-16 sm:w-20 text-right flex items-center justify-end">
                        {formatCurrency(item.qty * item.price)}
                      </div>
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(idx)}
                          className="p-1 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-sm sm:text-base"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Additional Information</h3>
              <textarea
                placeholder="Notes, Terms, Payment Instructions, etc."
                rows="4"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors resize-none text-sm sm:text-base"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </section>
          </div>

          <div className="hidden lg:block lg:w-1/2 overflow-y-auto">
            <div
              ref={pdfRef}
              style={{
                transform: "scale(0.73)",
                transformOrigin: "top",
                width: "210mm",
                minHeight: "297mm",
                backgroundColor: "white",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundImage: bgImage ? `url(${URL.createObjectURL(bgImage)})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "Allura",
              }}
            >
              <div className="p-8 min-h-full" style={{ backgroundColor: "rgba(255,255,255,0.95)" }}>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex items-center gap-4">
                    {logo && (
                      <img
                        src={URL.createObjectURL(logo)}
                        alt="Company Logo"
                        style={{ height: "4rem", width: "4rem", objectFit: "contain", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
                      />
                    )}
                    <div>
                      <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#333333", marginBottom: "0.5rem" }}>INVOICE</h1>
                      <div style={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#374151" }}>
                        <p style={{ fontWeight: "600" }}>{invoiceNumber}</p>
                        {issuedDate && <p>Issued: {new Date(issuedDate).toLocaleDateString()}</p>}
                        {dueDate && <p>Due: {new Date(dueDate).toLocaleDateString()}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.75rem", color: "#1F2937" }}>From:</h3>
                    <div style={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#374151" }}>
                      <p style={{ fontWeight: "600", color: "#1F2937" }}>{companyName}</p>
                      <p>{companyEmail}</p>
                      <p>{companyAddress}</p>
                      <p>{companyPhone}</p>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.75rem", color: "#1F2937" }}>Bill To:</h3>
                    <div style={{ fontSize: "0.875rem", lineHeight: "1.25rem", color: "#374151" }}>
                      <p style={{ fontWeight: "600", color: "#1F2937" }}>{clientName || "Client Name"}</p>
                      <p>{clientAddress || "Client Address"}</p>
                      <p>{clientPhone || "Client Phone"}</p>
                    </div>
                  </div>
                </div>

                {invoiceFields.some(field => field.name && field.value) && (
                  <div className="mb-8">
                    <div className="grid grid-cols-2 gap-4">
                      {invoiceFields.map((field, idx) =>
                        field.name && field.value ? (
                          <div key={idx} style={{ fontSize: "0.875rem", lineHeight: "1.25rem" }}>
                            <span style={{ fontWeight: "600", color: "#374151" }}>{field.name}: </span>
                            <span style={{ color: "#374151" }}>{field.value}</span>
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#58427C", color: "#CFE8F3" }}>
                        <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: "600" }}>Description</th>
                        <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: "600" }}>Qty</th>
                        <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: "600" }}>Rate</th>
                        <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: "600" }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, idx) => (
                        <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#F9FAFB" : "#FFFFFF" }}>
                          <td style={{ color: "#1F2937", padding: "0.75rem 1rem" }}>{item.item || "Item description"}</td>
                          <td style={{ color: "#374151", padding: "0.75rem 1rem", textAlign: "center" }}>{item.qty}</td>
                          <td style={{ color: "#374151", padding: "0.75rem 1rem", textAlign: "right" }}>{formatCurrency(item.price)}</td>
                          <td style={{ color: "#1F2937", padding: "0.75rem 1rem", textAlign: "right", fontWeight: "600" }}>{formatCurrency(item.qty * item.price)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
                  <div style={{ width: "16rem", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#374151" }}>
                      <span>Subtotal:</span>
                      <span style={{ fontWeight: "600" }}>{formatCurrency(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#374151" }}>
                        <span>Discount ({discount}%):</span>
                        <span>-{formatCurrency(discountAmount)}</span>
                      </div>
                    )}

                    {taxRate > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#374151" }}>
                        <span>Tax ({taxRate}%):</span>
                        <span style={{ fontWeight: "600" }}>{formatCurrency(taxAmount)}</span>
                      </div>
                    )}

                    <div style={{ borderTop: "1px solid #D1D5DB", paddingTop: "0.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "#374151" }}>Total:</span>
                        <span style={{ fontSize: "1.125rem", fontWeight: "700", color: "#6C63FF" }}>{formatCurrency(total)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {paymentMethod && (
                  <div style={{ marginTop: "2rem" }}>
                    <h3 style={{ fontSize: "1.115rem", fontWeight: "600", marginBottom: "0.5rem", color: "#374151" }}>Payment Method</h3>
                    <p style={{ fontSize: "0.875rem", color: "#374151" }}>{paymentMethod}</p>
                  </div>
                )}
                
                {additionalInfo && (
                  <div style={{ borderTop: "1px solid #D1D5DB", paddingTop: "1.5rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "400", marginBottom: "0.75rem", color: "#374151" }}>Additional Information</h3>
                    <div style={{ fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "#374151" }}>{additionalInfo}</div>
                  </div>
                )}

                <div style={{ marginTop: "2rem", }}>
            <QRCodeCanvas value={qrData} size={128} fgColor="#000000" bgColor="#ffffff" />
            <p style={{ fontSize: "0.8rem", color: "#374151" }}>Scan to see invoice details</p>
          </div>

                <div style={{ marginTop: "3rem", paddingTop: "1.5rem", textAlign: "center" }}>
                  <p style={{ fontSize: "0.875rem", color: "#374151" }}>Thank you for your business!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateInvoice;