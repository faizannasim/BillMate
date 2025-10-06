import React, { useEffect, useRef, useState } from "react";
import { Upload, Plus, X, FileText, Download, AlertCircle, Import } from "lucide-react";
import SideNav from "./SideNav";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";





function CreateInvoice() {
  
  const pdfRef = useRef()
  const componentRef = useRef(null)
  const [paymentMethod, setPaymentMethod] = useState("full");


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

  //  const [theme, setTheme] = useState("light");
  //  const [toggled, setToggled] = useState(false);






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
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };

  const formatCurrency = (amount) => {
    return `${currencySymbols[currency] || "$"}${amount.toFixed(2)}`;


  };

  //   useEffect(()=>{
  //     const StoredTheme = localStorage.getItem("theme") || "dark"
  //     setTheme(StoredTheme)
  //   },[])

  //   useEffect(()=>{
  //     document.body.className = theme
  //     localStorage.setItem("theme",theme)
  //   },[theme])


  // const toggleTheme = ()=>{
  //   setTheme(theme === "light"? "dark" : "light")
  // }
  // const textcolor = theme === "light" ? "text-black" : "text-white"

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
    });
  };



  return (
    <div className='flex   mx-auto h-screen overflow-hidden bg-black text-white  font-stretch-ultra-condensed '>
     
      <SideNav />
      <main className="flex-1 flex flex-col p-4 overflow-hidden">

        <div className="flex justify-between items-center mb-4 bg-black px-6 py-4 rounded-lg shadow-lg border border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-white">Create Invoice</h2>
            <p className="text-sm text-white">Design and generate professional invoices</p>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-[#d1cdd64e] px-4 py-2 rounded-lg hover:bg-[#a3a4a32c] transition-colors">

              <button onClick={downloadPDF}>Download</button>
            </div>





          </div>
        </div>

        <div className="flex flex-1 gap-6 overflow-hidden">

          <div className="w-1/2 overflow-y-auto bg-black rounded-lg p-6 space-y-6 border border-gray-700">

            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                Company Details
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-32 hover:border-gray-700 transition-colors cursor-pointer bg-black">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setLogo(e.target.files[0])}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" ></Upload>
                    <span className="text-xs text-gray-400">Upload Logo </span>
                  </label>
                </div>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-32 hover:border-gray-700 transition-colors cursor-pointer bg-black">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBgImage(e.target.files[0])}
                    className="hidden"
                    id="bg-upload"
                  />
                  <label htmlFor="bg-upload" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-400">Custom Background</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Company Email"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                />
                <textarea
                  placeholder="Company Address"
                  rows="2"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors resize-none"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Company Phone"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                />
              </div>
            </section>


            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Client Details</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Client Name"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600focus:outline-none transition-colors"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
                <textarea
                  placeholder="Client Address"
                  rows="2"
                  className="w-full px-4 py-3 rounded-lg bg-black] border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors resize-none"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Client Phone"
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                />
              </div>
            </section>


            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Invoice Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Invoice Number</label>
                  <input
                    type="text"
                    placeholder="Invoice Number"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                  >

                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Issue Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                    value={issuedDate}
                    onChange={(e) => setIssuedDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
              </div>


              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">Custom Fields</h4>
                  <button
                    onClick={addInvoiceField}
                    className="flex items-center justify-center gap-2 bg-[#d1cdd64e] px-4 py-2 hover:bg-[#a3a4a32c]  rounded-lg focus:border-gray-600 transition-colors"
                  >
                    <span>🔥</span>
                    Add Field

                  </button>
                </div>
                {invoiceFields.map((field, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Field Name"
                      className="w-1/3 px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-900] focus:outline-none transition-colors"
                      value={field.name}
                      onChange={(e) => handleInvoiceChange(idx, "name", e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Field Value"
                      className="flex-1 px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                      value={field.value}
                      onChange={(e) => handleInvoiceChange(idx, "value", e.target.value)}
                    />
                    {invoiceFields.length > 1 && (
                      <button
                        onClick={() => removeInvoiceField(idx)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
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
                <h3 className="text-lg font-semibold text-white">Invoice Items</h3>
                <button
                  onClick={addItem}
                  className="flex items-center gap-2  px-4 py-2 rounded-lg bg-[#d1cdd64e]  hover:bg-[#a3a4a32c] transition-colors"
                >
                  <span>🔥</span>
                  Add Item
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center p-3 bg-black rounded-lg border border-gray-600">
                    <input
                      type="text"
                      placeholder="Item Name"
                      className="flex-1 px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                      value={item.item}
                      onChange={(e) => handleItemChange(idx, "item", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      className="w-20 px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600focus:outline-none transition-colors text-center"
                      value={item.qty}
                      onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      className="w-28 px-3 py-2 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors text-right"
                      value={item.price}
                      onChange={(e) => handleItemChange(idx, "price", e.target.value)}
                    />
                    <div className="text-sm text-gray-400 w-20 text-right">
                      {formatCurrency(item.qty * item.price)}
                    </div>
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(idx)}
                        className="p-1 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Discount (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>


            <section className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Additional Information</h3>
              <textarea
                placeholder="Notes, Terms, Payment Instructions, etc."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-black border border-gray-600 focus:border-gray-600 focus:outline-none transition-colors resize-none"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </section>
          </div>

          {/*right*/}


          <div
            className="w-1/2 rounded-lg overflow-y-auto shadow-2xl border"
            ref={pdfRef}
            style={{
                lineHeight: "2",       
                letterSpacing: "4.4px",   
              width: "210mm",
              borderRadius: "0.5rem",
              minHeight: "297mm",
              fontFamily:"sans-serif",

              backgroundImage: bgImage ? `url(${URL.createObjectURL(bgImage)})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
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
                    <h1 style={{ fontSize: "1.875rem", fontWeight: "700", color: "#6C63FF", marginBottom: "0.5rem" }}>INVOICE</h1>
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
                          <span style={{ fontWeight: "600", color: "#374151" }}>{field.name}:x </span>
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
                    <tr style={{ backgroundColor: "#6C63FF", color: "#FFFFFF" }}>
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

              {additionalInfo && (
                <div style={{ borderTop: "1px solid #D1D5DB", paddingTop: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "0.75rem", color: "#374151" }}>Additional Information</h3>
                  <div style={{ fontSize: "0.875rem", whiteSpace: "pre-wrap", color: "#374151" }}>{additionalInfo}</div>
                </div>
              )}

              <div style={{ marginTop: "3rem", paddingTop: "1.5rem",  textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>Thank you for your business!</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default CreateInvoice;