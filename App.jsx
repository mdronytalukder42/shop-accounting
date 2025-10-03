import React, { useState } from 'react';

export default function ShopAccountingApp() {
  const [sales, setSales] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('sale');

  const addEntry = () => {
    if (!product || !amount) return;
    const entry = { id: Date.now(), product, amount: parseFloat(amount) || 0 };
    if (type === 'sale') setSales([entry, ...sales]);
    else setExpenses([entry, ...expenses]);
    setProduct(''); setAmount('');
  };

  const totalSales = sales.reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const exportCSV = () => {
    const rows = [['type','product','amount'], 
      ...sales.map(e=>['sale',e.product,e.amount]),
      ...expenses.map(e=>['expense',e.product,e.amount])];
    const csv = rows.map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'shop_data.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">দোকানের হিসাব</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex gap-2 mb-2">
          <input value={product} onChange={e=>setProduct(e.target.value)} placeholder="পণ্য/বিবরণ" className="border p-2 flex-1 rounded" />
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="টাকা" className="border p-2 w-24 rounded" />
          <select value={type} onChange={e=>setType(e.target.value)} className="border p-2 rounded">
            <option value="sale">বিক্রয়</option>
            <option value="expense">খরচ</option>
          </select>
          <button onClick={addEntry} className="bg-blue-600 text-white px-3 rounded">যোগ</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <h2 className="font-semibold mb-2">মোট রিপোর্ট</h2>
        <p>মোট বিক্রয়: {totalSales} টাকা</p>
        <p>মোট খরচ: {totalExpenses} টাকা</p>
        <p className="font-bold">নেট: {totalSales - totalExpenses} টাকা</p>
        <button onClick={exportCSV} className="mt-2 border px-3 py-1 rounded">Export CSV</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">বিক্রয়</h3>
          <ul className="text-sm">
            {sales.map(e => <li key={e.id} className="border-b py-1">{e.product} - {e.amount} টাকা</li>)}
          </ul>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">খরচ</h3>
          <ul className="text-sm">
            {expenses.map(e => <li key={e.id} className="border-b py-1">{e.product} - {e.amount} টাকা</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
