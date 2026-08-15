"use client";

import React from "react";
import { Student, Payment, AdminSettings } from "@/lib/admin-store";
import { X, Printer, CheckCircle2, ShieldCheck } from "lucide-react";

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "payment" | "admission";
  payment?: Payment;
  student?: Student;
  settings: AdminSettings;
}

export function ReceiptModal({
  isOpen,
  onClose,
  type,
  payment,
  student,
  settings,
}: ReceiptModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:border-none print:shadow-none print:max-w-none">
        
        {/* Header Controls (Hidden during print) */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-lg">
              {type === "payment" ? "Official Fee Payment Receipt" : "Official Admission Slip"}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              Print / Save PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="p-8 text-slate-800 print:p-4 font-sans" id="printable-receipt">
          {/* Header Branding */}
          <div className="border-b-2 border-slate-900 pb-4 text-center">
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider rounded mb-2 border border-amber-300">
              RTO Authorized Driving Training School (MH-10)
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {settings.schoolName || "Aaple Motor Driving School"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-lg mx-auto">
              {settings.address || "Opp. Miraj RTO Office Ground, Gandhi Chowk Road, Miraj, Maharashtra 416410"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-medium">
              <span>📞 Phone: {settings.phone || "+91 88883 34136 / +91 70288 37002"}</span>
              <span>•</span>
              <span>✉️ Email: {settings.email || "contact@aapledrivingschool.in"}</span>
              <span>•</span>
              <span>🏛️ Jurisdiction: {settings.rtoJurisdiction || "MH-10 Miraj / Sangli"}</span>
            </div>
          </div>

          {/* Receipt / Voucher Title */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 pb-2 border-b border-slate-200">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Document Type</span>
              <h2 className="text-lg font-bold text-slate-900">
                {type === "payment" ? "FEE PAYMENT RECEIPT" : "STUDENT ADMISSION CERTIFICATE"}
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xs text-slate-500 font-medium">
                {type === "payment" ? "Receipt No:" : "Admission No:"}{" "}
                <span className="font-bold text-slate-900">
                  {type === "payment" ? payment?.receiptNo : student?.admissionNo}
                </span>
              </div>
              <div className="text-xs text-slate-500">
                Date: <span className="font-semibold text-slate-800">{formattedDate(type === "payment" ? payment?.paymentDate : student?.admissionDate)}</span>
              </div>
            </div>
          </div>

          {/* Student & Course Details */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Student Name</span>
              <p className="font-bold text-slate-900 text-base">{student?.name || payment?.studentName || "N/A"}</p>
              
              <span className="text-xs text-slate-500 uppercase font-semibold mt-2 block">Phone / Mobile</span>
              <p className="font-medium text-slate-800">{student?.phone || "N/A"}</p>

              {student?.address && (
                <>
                  <span className="text-xs text-slate-500 uppercase font-semibold mt-2 block">Address</span>
                  <p className="text-slate-700">{student.address}</p>
                </>
              )}
            </div>

            <div>
              <span className="text-xs text-slate-500 uppercase font-semibold">Course Enrolled</span>
              <p className="font-bold text-emerald-800">{student?.course || payment?.course || "N/A"}</p>

              {student?.batchTime && (
                <>
                  <span className="text-xs text-slate-500 uppercase font-semibold mt-2 block">Batch Timing</span>
                  <p className="font-medium text-slate-800">{student.batchTime}</p>
                </>
              )}

              {student?.llNumber && (
                <>
                  <span className="text-xs text-slate-500 uppercase font-semibold mt-2 block">Learning License No (LL)</span>
                  <p className="font-mono font-medium text-slate-800">{student.llNumber}</p>
                </>
              )}
            </div>
          </div>

          {/* Transaction / Fee Breakdown Table */}
          <div className="mt-6">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {type === "payment" ? (
                  <>
                    <tr>
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-900">Training & RTO Licensing Fee Payment</div>
                        <div className="text-xs text-slate-500">
                          Mode: <span className="font-semibold">{payment?.paymentMode}</span>
                          {payment?.transactionRef ? ` | Ref: ${payment.transactionRef}` : ""}
                        </div>
                        {payment?.notes && <div className="text-xs text-slate-500 italic mt-0.5">{payment.notes}</div>}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-base text-slate-900">
                        ₹{payment?.amount?.toLocaleString("en-IN")}
                      </td>
                    </tr>
                    {student && (
                      <tr className="bg-slate-50/50 text-xs text-slate-600">
                        <td className="py-2 px-4">Total Agreed Course Fee</td>
                        <td className="py-2 px-4 text-right font-medium">₹{student.totalFee?.toLocaleString("en-IN")}</td>
                      </tr>
                    )}
                    {student && (
                      <tr className="bg-slate-50/50 text-xs text-slate-600">
                        <td className="py-2 px-4">Total Paid Till Date</td>
                        <td className="py-2 px-4 text-right font-medium text-emerald-700">₹{student.paidAmount?.toLocaleString("en-IN")}</td>
                      </tr>
                    )}
                    {student && (
                      <tr className="bg-amber-50/60 font-semibold text-slate-900">
                        <td className="py-2.5 px-4 text-amber-900">Remaining Balance Due</td>
                        <td className="py-2.5 px-4 text-right text-amber-900 font-bold">
                          ₹{student.balanceAmount?.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    )}
                  </>
                ) : (
                  <>
                    <tr>
                      <td className="py-2.5 px-4 font-medium text-slate-800">Standard Course Fee</td>
                      <td className="py-2.5 px-4 text-right font-semibold">₹{student?.courseFee?.toLocaleString("en-IN")}</td>
                    </tr>
                    {Number(student?.discount || 0) > 0 && (
                      <tr className="text-emerald-700">
                        <td className="py-2 px-4 font-medium">Special Discount</td>
                        <td className="py-2 px-4 text-right font-semibold">- ₹{student?.discount?.toLocaleString("en-IN")}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-100/70 font-bold text-slate-900 border-t border-slate-300">
                      <td className="py-2.5 px-4">Net Payable Course Fee</td>
                      <td className="py-2.5 px-4 text-right text-base">₹{student?.totalFee?.toLocaleString("en-IN")}</td>
                    </tr>
                    <tr className="text-emerald-800">
                      <td className="py-2 px-4 font-medium">Amount Received at Admission</td>
                      <td className="py-2 px-4 text-right font-semibold">₹{student?.paidAmount?.toLocaleString("en-IN")}</td>
                    </tr>
                    <tr className="bg-amber-50 font-bold text-amber-900">
                      <td className="py-2.5 px-4">Balance Pending</td>
                      <td className="py-2.5 px-4 text-right text-base">₹{student?.balanceAmount?.toLocaleString("en-IN")}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          {/* Terms & Authorization Stamp */}
          <div className="mt-8 pt-4 border-t border-dashed border-slate-300 grid grid-cols-2 gap-6 items-end text-xs text-slate-600">
            <div>
              <div className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Terms & Instructions:
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-500">
                <li>Fees once paid are non-refundable & non-transferable.</li>
                <li>Please carry original Aadhaar card and LL on test day.</li>
                <li>Report at least 10 minutes prior to scheduled batch slot.</li>
              </ul>
            </div>

            <div className="text-right">
              <div className="h-12 flex items-end justify-end">
                <div className="w-36 border-b border-slate-900 text-center pb-1 text-xs font-bold text-slate-900">
                  Aaple Driving School
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Authorized Signatory / Stamp</p>
            </div>
          </div>
        </div>

        {/* Footer info (Hidden in print) */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500 print:hidden">
          <span>Printed from Aaple Driving School Internal Management System</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
