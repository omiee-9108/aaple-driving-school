"use client";

import React, { useState, useEffect } from "react";
import { Student, Payment } from "@/lib/admin-store";
import { X, CreditCard, Save, AlertCircle } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (paymentPayload: Omit<Payment, "id" | "receiptNo" | "createdAt">) => Promise<void>;
  students: Student[];
  preSelectedStudentId?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  onSave,
  students,
  preSelectedStudentId,
}: PaymentModalProps) {
  const [selectedStudentId, setSelectedStudentId] = useState(preSelectedStudentId || "");
  const [amount, setAmount] = useState<number>(0);
  const [paymentMode, setPaymentMode] = useState<Payment["paymentMode"]>("Cash");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [transactionRef, setTransactionRef] = useState("");
  const [receivedBy, setReceivedBy] = useState("Admin / Proprietor");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  useEffect(() => {
    if (preSelectedStudentId) {
      setSelectedStudentId(preSelectedStudentId);
      const st = students.find((s) => s.id === preSelectedStudentId);
      if (st) {
        setAmount(st.balanceAmount > 0 ? st.balanceAmount : 1000);
      }
    } else if (students.length > 0 && !selectedStudentId) {
      setSelectedStudentId(students[0].id);
      setAmount(students[0].balanceAmount > 0 ? students[0].balanceAmount : 1000);
    }
  }, [preSelectedStudentId, isOpen, students]);

  if (!isOpen) return null;

  const handleStudentChange = (id: string) => {
    setSelectedStudentId(id);
    const st = students.find((s) => s.id === id);
    if (st) {
      setAmount(st.balanceAmount > 0 ? st.balanceAmount : 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) {
      setError("Please select a student.");
      return;
    }
    if (!amount || amount <= 0) {
      setError("Please enter a valid payment amount greater than ₹0.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await onSave({
        studentId: selectedStudent.id,
        studentName: selectedStudent.name,
        course: selectedStudent.course,
        amount: Number(amount),
        paymentDate,
        paymentMode,
        transactionRef: transactionRef.trim() || undefined,
        receivedBy: receivedBy.trim() || "Admin / Proprietor",
        notes: notes.trim() || undefined,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to record payment.");
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
            <CreditCard className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-lg">Record Fee Payment (जमा पावती)</h3>
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

          {/* Select Student */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Student (विद्यार्थी निवडा) *
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => handleStudentChange(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.admissionNo}) — {s.course} [Due: ₹{s.balanceAmount}]
                </option>
              ))}
            </select>
          </div>

          {/* Student Quick Status summary */}
          {selectedStudent && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500">Total Agreed Fee:</span>
                <span className="font-bold text-slate-800 ml-1">₹{selectedStudent.totalFee}</span>
                <div className="text-emerald-700 font-medium mt-0.5">
                  Paid Till Date: ₹{selectedStudent.paidAmount}
                </div>
              </div>
              <div className="text-right">
                <span className="text-slate-500">Pending Balance:</span>
                <div className="font-extrabold text-amber-700 text-sm">
                  ₹{selectedStudent.balanceAmount}
                </div>
              </div>
            </div>
          )}

          {/* Amount and Payment Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount Received (रक्कम ₹) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-emerald-400 bg-emerald-50/40 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-emerald-950"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Date (तारीख) *
              </label>
              <input
                type="date"
                required
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
          </div>

          {/* Payment Mode & Reference */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Payment Mode (माध्यम)
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
              >
                <option value="Cash">Cash (रोख)</option>
                <option value="UPI / QR Code">UPI / QR Code (GPay/PhonePe)</option>
                <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
                <option value="Cheque">Cheque</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                UPI / Txn Ref ID (पर्यायी)
              </label>
              <input
                type="text"
                placeholder="e.g. 421899120412"
                value={transactionRef}
                onChange={(e) => setTransactionRef(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Received By
            </label>
            <input
              type="text"
              value={receivedBy}
              onChange={(e) => setReceivedBy(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Notes (टिप्पणी / तपशील)
            </label>
            <input
              type="text"
              placeholder="e.g. 2nd Installment received before track test"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
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
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm"
            >
              <Save className="w-4 h-4" />
              {loading ? "Recording..." : "Save Payment & Generate Receipt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
