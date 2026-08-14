"use client";

import React from "react";
import { Student, Payment, AdminSettings } from "@/lib/admin-store";
import {
  X,
  User,
  Phone,
  Calendar,
  CreditCard,
  Printer,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Car,
  MessageCircle,
  PlusCircle,
  FileText,
  BadgePercent,
  Compass,
} from "lucide-react";

interface StudentDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  payments: Payment[];
  settings: AdminSettings;
  onEdit: (student: Student) => void;
  onDelete: (studentId: string) => void;
  onAddPayment: (studentId: string) => void;
  onPrintReceipt: (payment: Payment) => void;
  onPrintAdmission: (student: Student) => void;
  onStatusChange: (studentId: string, status: Student["status"]) => void;
}

export function StudentDetailDrawer({
  isOpen,
  onClose,
  student,
  payments,
  settings,
  onEdit,
  onDelete,
  onAddPayment,
  onPrintReceipt,
  onPrintAdmission,
  onStatusChange,
}: StudentDetailDrawerProps) {
  if (!isOpen || !student) return null;

  const studentPayments = payments.filter((p) => p.studentId === student.id);

  // Send WhatsApp Fee Reminder
  const sendWhatsAppReminder = () => {
    const phone = student.phone.replace(/\D/g, "");
    const cleanPhone = phone.startsWith("91") ? phone : `91${phone}`;
    const text = `Namaste ${student.name} ji,\nThis is a friendly reminder from *${settings.schoolName}* (Miraj MH-10).\n\n📌 Course: ${student.course}\n🏷️ Class: ${student.classCategory || "Driving Training"}\n💰 Total Fee: ₹${student.totalFee}\n✅ Amount Paid: ₹${student.paidAmount}\n⚠️ *Pending Balance: ₹${student.balanceAmount}*\n\nPlease clear the remaining balance at the driving school office.\n\nThank you!\n📞 Contact: ${settings.phone}`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "DL Test Passed":
        return "bg-cyan-100 text-cyan-800 border-cyan-300";
      case "Training in Progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "LL Issued":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "On Hold":
        return "bg-slate-100 text-slate-800 border-slate-300";
      default:
        return "bg-purple-100 text-purple-800 border-purple-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col overflow-hidden text-slate-800 text-sm animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 font-bold text-lg">
              {student.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">{student.name}</h3>
                {student.enrolmentNo ? (
                  <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 border border-amber-700/60 px-2 py-0.5 rounded">
                    E.No: {student.enrolmentNo}
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {student.admissionNo}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-emerald-400 font-medium">{student.course}</span>
                {student.classCategory && (
                  <span className="px-1.5 py-0.2 bg-emerald-950 text-emerald-300 font-mono text-[11px] font-bold rounded border border-emerald-800">
                    Class: {student.classCategory}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onAddPayment(student.id)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Collect Payment
            </button>

            <button
              onClick={() => onPrintAdmission(student)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300"
            >
              <Printer className="w-4 h-4" />
              Admission Voucher
            </button>

            {student.balanceAmount > 0 && (
              <button
                onClick={sendWhatsAppReminder}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg transition-colors border border-emerald-300"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                WhatsApp Due Reminder
              </button>
            )}

            <button
              onClick={() => onEdit(student)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-300"
            >
              <Edit2 className="w-4 h-4" />
              Edit
            </button>
          </div>

          {/* Status Changer */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-500 font-semibold uppercase block">Current Status</span>
              <span className={`inline-block mt-1 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadge(student.status)}`}>
                {student.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-600 font-medium whitespace-nowrap">Change to:</label>
              <select
                value={student.status}
                onChange={(e) => onStatusChange(student.id, e.target.value as any)}
                className="px-2.5 py-1.5 border border-slate-300 bg-white rounded-lg text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Enrolled">Enrolled</option>
                <option value="LL Issued">LL Issued</option>
                <option value="Training in Progress">Training in Progress</option>
                <option value="DL Test Passed">DL Test Passed</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Financial Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Fee Overview</span>
              <span className="text-xs text-slate-400 font-mono">Adm: {student.admissionNo}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700">
                <span className="text-[11px] text-slate-400 block">Total Fee</span>
                <span className="font-extrabold text-base text-white">₹{student.totalFee}</span>
              </div>
              <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-800/40">
                <span className="text-[11px] text-emerald-400 block">Paid Amount</span>
                <span className="font-extrabold text-base text-emerald-400">₹{student.paidAmount}</span>
              </div>
              <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
                <span className="text-[11px] text-amber-400 block">Balance Due</span>
                <span className="font-extrabold text-base text-amber-400">₹{student.balanceAmount}</span>
              </div>
            </div>
          </div>

          {/* MDS Register Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              MDS Register & Training Schedule
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block">Mobile Phone:</span>
                <a
                  href={`tel:${student.phone}`}
                  className="font-bold text-slate-900 hover:text-emerald-600 inline-flex items-center gap-1 mt-0.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  +91 {student.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-500 block">Agent / Instructor:</span>
                <span className="font-bold text-blue-900 inline-flex items-center gap-1 mt-0.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  {student.agent || "Direct Admission"}
                </span>
              </div>

              {student.dob && (
                <div>
                  <span className="text-slate-500 block">Date of Birth (D.O.B):</span>
                  <span className="font-medium text-slate-800 mt-0.5 block">{student.dob}</span>
                </div>
              )}

              <div>
                <span className="text-slate-500 block">Batch Slot:</span>
                <span className="font-semibold text-slate-800 inline-flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-slate-600" />
                  {student.batchTime}
                </span>
              </div>

              {student.startDate && (
                <div>
                  <span className="text-slate-500 block">Training Start Date:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{student.startDate}</span>
                </div>
              )}

              {student.endDate && (
                <div>
                  <span className="text-slate-500 block">Training End Date:</span>
                  <span className="font-semibold text-slate-900 mt-0.5 block">{student.endDate}</span>
                </div>
              )}

              {student.llApplicationNo && (
                <div>
                  <span className="text-slate-500 block">LL Application No:</span>
                  <span className="font-mono font-bold text-purple-900 mt-0.5 block">
                    {student.llApplicationNo}
                  </span>
                </div>
              )}

              {student.dlApplicationNo && (
                <div>
                  <span className="text-slate-500 block">DL Application No:</span>
                  <span className="font-mono font-bold text-cyan-900 mt-0.5 block">
                    {student.dlApplicationNo}
                  </span>
                </div>
              )}

              {student.dlNumber && (
                <div className="col-span-2 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-800 block">Permanent Driving License No (DL):</span>
                  <span className="font-mono font-extrabold text-sm text-emerald-950 mt-0.5 block">
                    {student.dlNumber}
                  </span>
                </div>
              )}

              {student.remarks && (
                <div className="col-span-2 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60 text-amber-900">
                  <span className="text-[11px] font-bold block">Register Notes / Remarks:</span>
                  <p className="text-xs mt-0.5">{student.remarks}</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment History / Credit Ledger */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Payment History ({studentPayments.length})
              </h4>
              <button
                onClick={() => onAddPayment(student.id)}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 inline-flex items-center gap-1"
              >
                + Add Installment
              </button>
            </div>

            {studentPayments.length === 0 ? (
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-slate-500 text-xs">
                No payment transactions recorded yet.
              </div>
            ) : (
              <div className="space-y-2">
                {studentPayments.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-300 transition-colors shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-700 text-sm">
                          ₹{p.amount.toLocaleString("en-IN")}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {p.paymentMode}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                        <span>{p.receiptNo}</span>
                        <span>•</span>
                        <span>{p.paymentDate}</span>
                        {p.transactionRef && <span>• Ref: {p.transactionRef}</span>}
                      </div>
                    </div>

                    <button
                      onClick={() => onPrintReceipt(p)}
                      title="Print Official Receipt"
                      className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delete Danger Zone */}
          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
            <span className="text-slate-400">Permanently delete student record?</span>
            <button
              onClick={() => {
                if (
                  confirm(
                    `Are you sure you want to delete ${student.name}'s admission and payment records? This cannot be undone.`
                  )
                ) {
                  onDelete(student.id);
                  onClose();
                }
              }}
              className="text-rose-600 hover:text-rose-700 font-semibold inline-flex items-center gap-1 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Record
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
