"use client";

import React, { useState } from "react";
import { Expense } from "@/lib/admin-store";
import { X, Receipt, Save, AlertCircle } from "lucide-react";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expensePayload: Omit<Expense, "id" | "voucherNo" | "createdAt">) => Promise<void>;
}

const EXPENSE_CATEGORIES: Expense["category"][] = [
  "Fuel (Petrol/Diesel)",
  "Vehicle Maintenance & Repairs",
  "Instructor & Staff Salaries",
  "RTO Govt Fees & Passing",
  "Office Rent & Utilities",
  "Marketing & Advertising",
  "Office Tea & Miscellaneous",
];

export function ExpenseModal({ isOpen, onClose, onSave }: ExpenseModalProps) {
  const [category, setCategory] = useState<Expense["category"]>(EXPENSE_CATEGORIES[0]);
  const [amount, setAmount] = useState<number>(0);
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split("T")[0]);
  const [vehicleNo, setVehicleNo] = useState("MH-10-BN-4521 (Swift)");
  const [paymentMode, setPaymentMode] = useState<Expense["paymentMode"]>("Cash");
  const [paidTo, setPaidTo] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) {
      setError("Please enter a valid expense amount greater than ₹0.");
      return;
    }
    if (!paidTo.trim()) {
      setError("Please specify who the amount was paid to.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onSave({
        category,
        amount: Number(amount),
        expenseDate,
        vehicleNo:
          category === "Fuel (Petrol/Diesel)" || category === "Vehicle Maintenance & Repairs"
            ? vehicleNo.trim() || undefined
            : undefined,
        paymentMode,
        paidTo: paidTo.trim(),
        notes: notes.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to log expense.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-rose-400" />
            <h3 className="font-semibold text-lg">Add Business Expense (खर्च नोंद)</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-slate-800 text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Category (खर्चाचा प्रकार) *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm font-semibold"
            >
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Amount and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount (खर्च रक्कम ₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                placeholder="₹ Amount"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-rose-300 bg-rose-50/30 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm font-bold text-rose-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date of Expense (तारीख) *
              </label>
              <input
                type="date"
                required
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          </div>

          {/* Vehicle Field (if fuel or maintenance) */}
          {(category === "Fuel (Petrol/Diesel)" || category === "Vehicle Maintenance & Repairs") && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Vehicle No. / Model (गाडी क्रमांक)
              </label>
              <input
                type="text"
                placeholder="e.g. MH-10-BN-4521 (Swift) / MH-10-AB-1234 (Activa)"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>
          )}

          {/* Paid To & Mode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paid To / Vendor (कोणाला दिले) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bharat Petroleum / Staff Name"
                value={paidTo}
                onChange={(e) => setPaidTo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
              >
                <option value="Cash">Cash (रोख)</option>
                <option value="UPI / QR Code">UPI / QR Code (GPay / PhonePe)</option>
                <option value="Bank Transfer">Bank Transfer (NEFT/IMPS)</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notes / Bill Ref (बिल क्रमांक / अधिक तपशील)
            </label>
            <input
              type="text"
              placeholder="e.g. Invoice #9821, Engine oil change + filter"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg font-medium text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {loading ? "Saving..." : "Record Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
