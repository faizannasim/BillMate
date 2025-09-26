import React ,{useState} from 'react'
import { Upload, Plus, X, FileText, Download, AlertCircle, Import, Users, UserStar } from "lucide-react";
import SideNav from './SideNav';
import { DownloadCloud } from 'lucide';


function CreateInvoice() {
    
    const [paymentMethod,setPaymentMethod] = useState("full")


    const [companyName,setCompanyName] = useState("Invoicely Ltd")
    const [companyEmail,setCompanyEmail] = useState("nfo@invoicely.com")
    const [companyAddress,setcompanyAddress] = useState("xyz")
    const [companyPhone,setcompanyPhone] = useState("+91 123456789")

    const[clientName,setClientName] = useState("")
    const[clientAddress,setClientAddress] = useState("")
    const[clientPhone,setClientPhone] = useState("")

    const[invoiceFields,setInvoiceFields] = useState([{name:"",value:""}])
    const[issueDate,setIssueDate] = useState("")
    const[dueDate,setDueDate] = useState("")

    const[items,setItems]  = useState([{item: "",qty :1, price:0}])
    const[additionalInfo,setAdditionalInfo] = useState("")

    const[logo,setLogo] = useState(null)
    const[bgImage,setBgImage] = useState(null)

    const[invoiceNumber,setInvoiceNumber] = useState("INV-0001");
    const[taxRate,setTaxRate] = useState(0)
    const [discount,setDiscount] = useState(0)
    const[currency,setCurrency] = useState("INR")


    const AddInvoiceFields = ()=>setInvoiceFields([...invoiceFields,{name:"",value:""}])
    const handleInvoiceChange = (index,field,value)=>{
        const updated = [...invoiceFields]
        updated[index][field] = value
        setInvoiceFields(updated)

    };

    const removeInvoiceField = (index)=>{
        if(invoiceFields.length >1){
            setInvoiceFields(invoiceFields.filter((_,i)=>i!==index))
        }

    }
    const handleItemChange = (index,field,value)=>{
        const updated = [...items]
        updated[index][field] = field ==="qty" || field ==="price" ? Number(value) : value
        setItems(updated)
    }
    
    const addItem = ()=>setItems([...items,{item:"",qty:1,price:0}])

    const removeItem = (index)=>{
        if(items.length >1){
            setItems(items.filter((_,i)=>i!==index))
        }
    }

   const subtotal = items.reduce((acc,i)=>acc + i.qty * i.price, 0)

    const discountAmount = (subtotal * discount) /100
    const taxableAmount = (subtotal - discountAmount)
    const taxAmount = (taxableAmount * taxRate) / 100
    const total = taxableAmount + taxAmount


   const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    INR: "₹",
  };

  const formatCurrency = (amount)=>{
    return ` ${currencySymbols[currency] || "₹"} ${amount.toFixed(2)}`

  }
  return (
    <div className='flex h-screen bg-[#1E1E1E] text-gray-200'>
      <SideNav />
        <main className='flex-1 flex flex-col p-4 overflow-hidden'>
            <div className=' flex justify-center items-center mb-4 bg-[#2A2A2A] rounded-lg px-6 py-4 shadow-lg border border-dashed'>
                <div>
                    <h2 className='text-xl font-bold text-white'>Create Invoice</h2>
                    <p className='text-sm text-gray-400'> Design and Generate Professional invoices</p>
                </div>
                <div className='flex gap-3'>
                    <button  className='flex items-center gap-2 bg-[#6C63FF] px-4 py-2 rounded-lg hover:bg-[#5a52d4] transition-colors'>
                    <DownloadCloud className="w-4 h-4" />
                    DownLoad
                    </button>
                </div>
            </div>
            <div className=' flex flex-1 gap-6 overflow-hidden'>
                <div className=' w-1/2 overflow-y-auto bg-[#2A2A2A] rounded-lg p-6 space-y-6 border border-dashed'>
                   <section  className='space-y-4'>
                    <h3 className='text-lg font-semibold text-white flex items-center gap-2'>
                        Company Details
                    </h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className=' flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-32 hover:bg-[#6C63FF] transition-colors cursor-pointer bg-[#1E1E1E]'>
                            <input 
                            type='file'
                            accept='image/*'
                            onChange={(e)=>setLogo(e.target.files[0])}
                            className='hidden'
                            id='logo-upload'
                            />

                            <label htmlFor='logo-upload' className='flex flex-col items-center cursor-pointer'>
                                <Upload className=' w-6 h-6 text-gray-400 mb-2' />
                                <span className='text-sm text-gray-400'>Upload Logo</span>
                            </label>
                        </div>
                        <div className='flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg h-32 hover:bg-[#6C63FF] transition-colors cursor-pointer'>
                            <input
                            type='file'
                            accept='image/*'
                            onChange={(e)=>setBgImage(e.target.value[0])}
                            className='hidden'
                            id='bg-upload'
                            />
                            <label htmlFor='bg-upload' className='flex flex-col items-center cursor-pointer'>
                                <Upload className=' w-6 h-6 text-gray-400 mb-2' />
                                <span className='text-sm text-gray-400'>Custom Background</span>
                            </label>
                        </div>
                    </div>
                    <div className=' space-y-3'>
                        <input 
                        type='text'
                        placeholder='Company Name'
                        className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                        value={companyName}
                        onChange={(e)=>setCompanyName(e.targe.value)}
                        />
                        <input 
                        type='email'
                        placeholder='Company email'
                        className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                        value={companyName}
                        onChange={(e)=>setCompanyEmail(e.targe.value)}
                        />
                        <textarea 
                        placeholder='Company Address'
                        rows="2"
                       className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                       value={companyAddress}
                       onChange={(e)=>setcompanyAddress(e.target.value)}
                       />
                       <input
                       type='tel'
                       placeholder='Company Phone'
                       className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                       value={companyPhone}
                       onChange={(e)=>setcompanyPhone(e.target.value)}
                       />
                    </div>
                   </section>

             
                   <section className='space-y-4'>
                    <h3 className='text-lg font-semibold text-white'>Client Details</h3>
                    <div className='space-y-3'>
                        <input
                        type='text'
                        placeholder='Client Name'
                        className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                       value={clientName}
                       onChange={(e)=>setClientName(e.target.value)}
                       />
                       <textarea 
                       placeholder='Client Address'
                       rows="2"
                       className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                       value={clientAddress}
                       onChange={(e)=>setClientAddress(e.target.value)}
                       />
                          <input
                        type='tel'
                        placeholder='Client Phone'
                        className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                       value={clientPhone}
                       onChange={(e)=>setClientPhone(e.target.value)}
                       />
                    </div>
                   </section>


                   <section className='space-y-4'>
                    <h3 className='text-lg font-semibold text-white'> Invoice Details</h3>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm text-gray-400 mb-1'>Invoice Numver</label>
                            <input
                            type='text'
                            placeholder='Invoice Number'
                            className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
                            value={invoiceNumber}
                            onChange={(e)=>setInvoiceNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='block text-sm text-gray-400 mb-1'></label>
                            <select 
                            value={currency}
                            onChange={(e)=>setCurrency(e.target.value)}
                            className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 border-dashed focus:border-[#6C63FF] focus:outline-none transition-colors'
    
                            > 
                            <option value="INR">INR (₹)</option>
                            <option value="USD">USD ($)</option>
                            </select>
                        </div>
                    </div>
                    <div className='grid grid-col-2 gap4'>
                        <div>
                            <label className='block text-sm text-gray-500 mb-1'> Issue Date</label>
                            <input
                            type='date'
                            className='w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-dashed focus:bg-[#6C63FF] focus:outline-none transition-colors'
                            value={issueDate}
                            onChange={(e)=>setIssueDate(e.target.value)}
                            />
                        </div>
                    </div>


                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <h4 className='text-sm font-medium text-white'>Custom Fields</h4>

                            <button 
                            onClick={AddInvoiceFields}
                            className='flex items-center gap-1 text-xs px-3 py-1 border border-dashed rounded-lg hover:bg-gray-700 transition-colors'
                            >
                                <Plus className='w-3 h-3' />
                                Add Field
                            </button>
                        </div>
                        {invoiceFields.map((field,idx)=>(
                            <div key={idx} className='flex gap-2'>
                                <input 
                                type='text'
                                placeholder='Filed Name'
                                className='w-1/3 px-3 py-2 rounded-lg bg-[#1E1E1E] border border-dashed focus:border-[6C63FF] focus:outline-none transition-colors '
                              value={field.name}
                              onChange={(e)=>handleInvoiceChange(idx,"name",e.target.value)}
                              />
                              <input
                               type="text"
                               placeholder="Field Value"
                               className="flex-1 px-3 py-2 rounded-lg bg-[#1E1E1E] border border-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors"
                                value={field.value}
                               onChange={(e) => handleInvoiceChange(idx, "value", e.target.value)}
                                />
                                {invoiceFields.length>1 && (
                                    <button 
                                    onClick={()=>removeInvoiceField(idx)}
                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <X className=' w-4 h-4' />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    

                    <div>
                        <label className='block text-sm text-gray-400 mb-1'>Payment Method</label>
                        <select
                        value={paymentMethod}
                        onChange={(e)=>setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors" 
                        >
                            <option value="full">Full Payment</option>
                            <option value="half">Half Payment</option>
                            <option value="upi">UPI</option>
                            <option value="bank transfer">Bank Transfer</option>
                        </select>
                    </div>
                   </section>

                   <section className='space-y-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='text-lg font-semibold text-white'>Invoice Items</h3>
                        <button onClick={addItem}className="flex items-center gap-2 bg-[#6C63FF] px-4 py-2 rounded-lg hover:bg-[#5a52d4] focus:outline-none transition-colors">
                          <Plus className='w-4 h-4' />
                          Add item
                        </button>
                    </div>
                    <div className='space-y-3'>
                        {items.map((item,idx)=>(
                            <div id={idx} className='flex gap-3 items-center p-3 bg-[#1E1E1E] rounded-lg border border-dashed'>
                                <input
                                type='number'
                                placeholder='"qty'
                                min="1"
                                className="w-20 px-3 py-2 rounded-lg bg-[#2A2A2A] border border-gray-600 focus:border-[#6C63FF] focus:outline-none text-center transition-colors "
                                value={item.qty}
                                onChange={(e)=>handleItemChange(idx,"qty",e.target.value)}
                                />
                                <input
                                type='number'
                                placeholder='"Price'
                                min="0"
                                step="0.01"
                                className="w-20 px-3 py-2 rounded-lg bg-[#2A2A2A] border border-gray-600 focus:border-[#6C63FF] focus:outline-none text-center transition-colors "
                                value={item.qty}
                                onChange={(e)=>handleItemChange(idx,"price",e.target.value)}
                                />
                                <div className='text-sm text-gray-400 w-20 text-right'>
                                    {formatCurrency(item.qty*item.price)}
                                </div>
                                {items.length>1 && (
                                    <button className="p-1 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    onClick={()=>removeItem(idx)}
                                    >
                                        <X className='w-4 h-4' />

                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <label className='block text-sm text-gray-400 mb-1'>Discount (%)</label>
                            <input
                            type='number'
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors"
                            value={discount}
                            onChange={(e)=>setDiscount(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className='block text-sm text-gray-400 mb-1'>Tax Rate (%)</label>
                              <input
                            type='number'
                            min="0"
                            max="100"
                            step="0.1"
                            className="w-full px-4 py-3 rounded-lg bg-[#1E1E1E] border border-gray-600 focus:border-[#6C63FF] focus:outline-none transition-colors"
                            value={taxRate}
                            onChange={(e)=>setTaxRate(Number(e.target.value))}
                            />
                        </div>
                    </div>
                   </section>


                   
                </div>
                
            </div>

        </main>
        
    </div>
  )
}

export default CreateInvoice