'use client';

import React, { useState } from 'react';
import { 
  DollarSign, 
  Plus, 
  Users, 
  ArrowLeft, 
  Receipt, 
  Calculator, 
  Wallet,
  Car,
  Utensils,
  ShoppingBag,
  Home,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  category: 'fuel' | 'food' | 'stay' | 'other';
  paidBy: string;
  splitWith: string[];
}

export default function ExpensesPage() {
  const members = ['沛妤', '小明', '阿傑', '婷婷'];
  
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    { id: '1', title: '西螺服務區加油', amount: 1200, category: 'fuel', paidBy: '沛妤', splitWith: ['沛妤', '小明', '阿傑', '婷婷'] },
    { id: '2', title: '海鮮熱炒午餐', amount: 1800, category: 'food', paidBy: '小明', splitWith: ['沛妤', '小明', '阿傑', '婷婷'] },
    { id: '3', title: '海景民宿訂金', amount: 4000, category: 'stay', paidBy: '沛妤', splitWith: ['沛妤', '小明', '阿傑', '婷婷'] },
  ]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('沛妤');
  const [category, setCategory] = useState<'fuel' | 'food' | 'stay' | 'other'>('food');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      category,
      paidBy,
      splitWith: members,
    };

    setExpenses([newExpense, ...expenses]);
    setTitle('');
    setAmount('');
  };

  // 計算總花費
  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  // 簡單 Splitwise 演算法：計算個人墊付總額
  const paidTotals = members.reduce((acc, member) => {
    acc[member] = expenses.filter(e => e.paidBy === member).reduce((s, e) => s + e.amount, 0);
    return acc;
  }, {} as Record<string, number>);

  const perPersonAvg = totalAmount / members.length;

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto pb-24 text-slate-700">
      {/* Top Bar */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/" className="p-2.5 bg-white border-2 border-pink-100 rounded-2xl text-pink-500 hover:bg-pink-50 transition shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-amber-500" />
            旅途分帳與記帳
          </h1>
          <p className="text-xs text-slate-400 font-medium">Splitwise 式多人群組動態結算</p>
        </div>
      </div>

      {/* 總覽卡片 */}
      <section className="bg-gradient-to-r from-amber-400 to-pink-400 p-6 rounded-3xl text-white shadow-xl shadow-pink-100 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-xs opacity-90 font-bold mb-1">本次行程總開銷</div>
            <div className="text-3xl font-black">${totalAmount.toLocaleString()}</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {members.length} 人平分
          </div>
        </div>
        <div className="pt-3 border-t border-white/20 flex justify-between items-center text-xs font-bold">
          <span>每人平均應付：</span>
          <span className="text-sm font-extrabold">${Math.round(perPersonAvg).toLocaleString()}</span>
        </div>
      </section>

      {/* 新增記帳 Form */}
      <section className="bg-white p-5 rounded-3xl border-2 border-pink-100 shadow-md mb-6">
        <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-pink-500" />
          新增一筆消費
        </h2>
        <form onSubmit={handleAddExpense} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="品項（如：加油、熱炒）"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-amber-50/50 border-2 border-pink-100 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:border-pink-300"
            />
            <input
              type="number"
              placeholder="金額 ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-amber-50/50 border-2 border-pink-100 rounded-2xl p-3 text-xs font-medium focus:outline-none focus:border-pink-300"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-1/2 bg-amber-50/50 border-2 border-pink-100 rounded-2xl p-3 text-xs font-bold text-slate-600 focus:outline-none"
            >
              {members.map(m => (
                <option key={m} value={m}>{m} 先付的</option>
              ))}
            </select>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-1/2 bg-amber-50/50 border-2 border-pink-100 rounded-2xl p-3 text-xs font-bold text-slate-600 focus:outline-none"
            >
              <option value="fuel">⛽ 油資補給</option>
              <option value="food">🍽️ 美食餐飲</option>
              <option value="stay">🏨 飯店住宿</option>
              <option value="other">🛍️ 雜項/門票</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-pink-400 hover:bg-pink-500 text-white font-bold text-xs rounded-2xl shadow-md shadow-pink-100 transition"
          >
            加入分帳清單 ✨
          </button>
        </form>
      </section>

      {/* 各人結算動態 */}
      <section className="bg-white p-5 rounded-3xl border-2 border-pink-100 shadow-md mb-6">
        <h2 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-500" />
          目前墊付與應找補狀態
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {members.map(m => {
            const paid = paidTotals[m] || 0;
            const diff = paid - perPersonAvg;
            return (
              <div key={m} className="bg-amber-50/40 p-3 rounded-2xl border border-amber-100">
                <div className="text-xs font-bold text-slate-700">{m}</div>
                <div className="text-[11px] text-slate-400">已墊付 ${paid}</div>
                <div className={`text-xs font-black mt-1 ${diff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {diff >= 0 ? `應收回 $${Math.round(diff)}` : `需補給 $${Math.abs(Math.round(diff))}`}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 消費明細 */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-pink-400" />
          消費明細歷史
        </h2>
        {expenses.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-2xl border-2 border-slate-100 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-pink-50 text-pink-500 rounded-2xl border border-pink-100 font-bold text-sm">
                {item.category === 'fuel' && '⛽'}
                {item.category === 'food' && '🍽️'}
                {item.category === 'stay' && '🏨'}
                {item.category === 'other' && '🛍️'}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{item.title}</div>
                <div className="text-[11px] text-slate-400 font-medium">由 {item.paidBy} 率先支付</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-black text-slate-700">${item.amount}</div>
              <div className="text-[10px] text-pink-500 font-bold">4 人平分</div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
