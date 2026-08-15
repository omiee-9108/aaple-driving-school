"use client";

import React, { useState, useEffect } from "react";
import { Student, Payment } from "@/lib/admin-store";
import { X, UserPlus, Save, AlertCircle } from "lucide-react";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (payload: any, isEdit: boolean) => Promise<void>;
  studentToEdit?: Student | null;
}

const COURSES = [
  "3-Wheeler / Auto Rickshaw Training (AR.TR)",
  "4-Wheeler Car Training (LMV)",
  "4-Wheeler Car + 2-Wheeler Combo",
  "2-Wheeler + 3-Wheeler Combo (MCB. AR.TR)",
  "2-Wheeler Training (Activa / Bike)",
  "Heavy / Commercial Vehicle (LMV TR)",
  "Heavy Vehicle Training (HMV / Transport)",
  "Old DL Renewal & Medical Form 1A",
  "New Driving License Assistance (LL & DL)",
  "Instant PUC Certificate (Annual)",
  "RC Ownership Transfer & Passing",
];

const CLASS_CATEGORIES: Student["classCategory"][] = [
  "AR.TR",
  "LMV",
  "LMV (TR)",
  "MCB",
  "MCB. AR.TR",
  "Renewal",
  "Other",
];

const AGENTS = ["MB", "किरण श्रीरास", "उत्तम पवार", "Daryappa", "Direct Admission", "Other"];

const BATCH_TIMINGS = [
  "06:00 AM - 07:00 AM (Early Bird)",
  "07:00 AM - 08:00 AM (Morning)",
  "08:00 AM - 09:00 AM (Morning)",
  "08:30 AM - 09:30 AM (Female Instructor Batch)",
  "09:00 AM - 10:00 AM (General)",
  "04:00 PM - 05:00 PM (Evening)",
  "04:30 PM - 05:30 PM (Evening)",
  "05:00 PM - 06:00 PM (Evening)",
  "06:00 PM - 07:00 PM (Sunset / Night Drive)",
  "Office Documentation Slot",
];

const DEFAULT_COURSE_FEES: Record<string, number> = {
  "3-Wheeler / Auto Rickshaw Training (AR.TR)": 4500,
  "4-Wheeler Car Training (LMV)": 4000,
  "4-Wheeler Car + 2-Wheeler Combo": 4500,
  "2-Wheeler + 3-Wheeler Combo (MCB. AR.TR)": 6000,
  "2-Wheeler Training (Activa / Bike)": 3000,
  "Heavy / Commercial Vehicle (LMV TR)": 6500,
  "Heavy Vehicle Training (HMV / Transport)": 9000,
  "Old DL Renewal & Medical Form 1A": 1500,
  "New Driving License Assistance (LL & DL)": 3000,
  "Instant PUC Certificate (Annual)": 200,
  "RC Ownership Transfer & Passing": 1500,
};

export function StudentModal({
  isOpen,
  onClose,
  onSave,
  studentToEdit,
}: StudentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    enrolmentNo: "",
    phone: "",
    email: "",
    gender: "Male" as "Male" | "Female" | "Other",
    dob: "",
    address: "Miraj, Sangli (MH-10)",
    course: COURSES[0],
    classCategory: "AR.TR" as Student["classCategory"],
    agent: "MB",
    startDate: new Date().toISOString().split("T")[0],
    endDate: "",
    llApplicationNo: "",
    dlApplicationNo: "",
    dlNumber: "",
    vehicleType: "Training Auto / Dual-Control Car",
    batchTime: BATCH_TIMINGS[1],
    admissionDate: new Date().toISOString().split("T")[0],
    courseFee: DEFAULT_COURSE_FEES[COURSES[0]] || 4500,
    discount: 0,
    llNumber: "",
    status: "Enrolled" as Student["status"],
    remarks: "",
    // Initial payment fields (only for new admissions)
    initialPaymentAmount: 0,
    initialPaymentMode: "Cash" as Payment["paymentMode"],
    initialPaymentRef: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        name: studentToEdit.name,
        enrolmentNo: studentToEdit.enrolmentNo || "",
        phone: studentToEdit.phone,
        email: studentToEdit.email || "",
        gender: studentToEdit.gender || "Male",
        dob: studentToEdit.dob || "",
        address: studentToEdit.address || "Miraj, Sangli (MH-10)",
        course: studentToEdit.course || COURSES[0],
        classCategory: studentToEdit.classCategory || "AR.TR",
        agent: studentToEdit.agent || "MB",
        startDate: studentToEdit.startDate || "",
        endDate: studentToEdit.endDate || "",
        llApplicationNo: studentToEdit.llApplicationNo || "",
        dlApplicationNo: studentToEdit.dlApplicationNo || "",
        dlNumber: studentToEdit.dlNumber || "",
        vehicleType: studentToEdit.vehicleType || "Training Auto / Dual-Control Car",
        batchTime: studentToEdit.batchTime || BATCH_TIMINGS[1],
        admissionDate: studentToEdit.admissionDate || new Date().toISOString().split("T")[0],
        courseFee: studentToEdit.courseFee || 0,
        discount: studentToEdit.discount || 0,
        llNumber: studentToEdit.llNumber || "",
        status: studentToEdit.status || "Enrolled",
        remarks: studentToEdit.remarks || "",
        initialPaymentAmount: 0,
        initialPaymentMode: "Cash",
        initialPaymentRef: "",
      });
    } else {
      setFormData({
        name: "",
        enrolmentNo: "3924/",
        phone: "",
        email: "",
        gender: "Male",
        dob: "",
        address: "Miraj, Sangli (MH-10)",
        course: COURSES[0],
        classCategory: "AR.TR",
        agent: "MB",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        llApplicationNo: "",
        dlApplicationNo: "",
        dlNumber: "",
        vehicleType: "Training Auto / Dual-Control Car",
        batchTime: BATCH_TIMINGS[1],
        admissionDate: new Date().toISOString().split("T")[0],
        courseFee: DEFAULT_COURSE_FEES[COURSES[0]] || 4500,
        discount: 0,
        llNumber: "",
        status: "Enrolled",
        remarks: "",
        initialPaymentAmount: 4500,
        initialPaymentMode: "Cash",
        initialPaymentRef: "",
      });
    }
    setError("");
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const netFee = Math.max(0, Number(formData.courseFee || 0) - Number(formData.discount || 0));
  const estimatedBalance = studentToEdit
    ? Math.max(0, netFee - (studentToEdit.paidAmount || 0))
    : Math.max(0, netFee - Number(formData.initialPaymentAmount || 0));

  const handleCourseChange = (selectedCourse: string) => {
    const fee = DEFAULT_COURSE_FEES[selectedCourse] || 4500;
    let autoClass: Student["classCategory"] = "AR.TR";
    if (selectedCourse.includes("Car")) autoClass = "LMV";
    if (selectedCourse.includes("Heavy") || selectedCourse.includes("Commercial")) autoClass = "LMV (TR)";
    if (selectedCourse.includes("2-Wheeler + 3-Wheeler")) autoClass = "MCB. AR.TR";
    if (selectedCourse.includes("Renewal")) autoClass = "Renewal";

    setFormData((prev) => ({
      ...prev,
      course: selectedCourse,
      classCategory: autoClass,
      courseFee: fee,
      initialPaymentAmount: prev.initialPaymentAmount > fee ? fee : prev.initialPaymentAmount,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError("Please enter the student's full name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      if (studentToEdit) {
        await onSave(
          {
            id: studentToEdit.id,
            name: formData.name,
            enrolmentNo: formData.enrolmentNo,
            phone: formData.phone,
            email: formData.email,
            gender: formData.gender,
            dob: formData.dob,
            address: formData.address,
            course: formData.course,
            classCategory: formData.classCategory,
            agent: formData.agent,
            startDate: formData.startDate,
            endDate: formData.endDate,
            llApplicationNo: formData.llApplicationNo,
            dlApplicationNo: formData.dlApplicationNo,
            dlNumber: formData.dlNumber,
            vehicleType: formData.vehicleType,
            batchTime: formData.batchTime,
            admissionDate: formData.admissionDate,
            courseFee: Number(formData.courseFee),
            discount: Number(formData.discount),
            llNumber: formData.llNumber,
            status: formData.status,
            remarks: formData.remarks,
          },
          true
        );
      } else {
        await onSave(
          {
            ...formData,
            courseFee: Number(formData.courseFee),
            discount: Number(formData.discount),
            initialPaymentAmount: Number(formData.initialPaymentAmount),
          },
          false
        );
      }
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to save student record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-lg">
              {studentToEdit ? `Edit: ${studentToEdit.name}` : "New Student Admission (MDS Enrolment)"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto text-slate-800 text-sm">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl flex items-center gap-2 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {/* 1. Register & Personal Details */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              1. Enrolment & Personal Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name (नाव) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharif K. Mujawar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  MDS Enrolment No (E.NO)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3924/800"
                  value={formData.enrolmentNo}
                  onChange={(e) => setFormData({ ...formData, enrolmentNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono font-bold text-blue-900 bg-blue-50/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (मोबाईल) *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, "") })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Date of Birth (D.O.B)
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gender (लिंग)
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Address (पत्ता)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Miraj RTO Ground / Gandhi Chowk"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* 2. Course, Class & Agent */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              2. Vehicle Class, Agent & RTO Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Course Enrolled (कोर्स) *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => handleCourseChange(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                >
                  {COURSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Class (श्रेणी) *
                </label>
                <select
                  value={formData.classCategory}
                  onChange={(e) => setFormData({ ...formData, classCategory: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-emerald-900 bg-emerald-50/40"
                >
                  {CLASS_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agent / Instructor (एजंट)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MB / किरण श्रीरास / उत्तम पवार / Daryappa"
                  value={formData.agent}
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Training Start Date (Start D)
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Training End Date (End D)
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  LL Application No (Parivahan)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3474726126"
                  value={formData.llApplicationNo}
                  onChange={(e) => setFormData({ ...formData, llApplicationNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  DL Application No
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3476308026"
                  value={formData.dlApplicationNo}
                  onChange={(e) => setFormData({ ...formData, dlApplicationNo: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Permanent DL No. (पक्का परवाना)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH10 20260015851"
                  value={formData.dlNumber}
                  onChange={(e) => setFormData({ ...formData, dlNumber: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-mono font-bold text-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Batch Slot Timing
                </label>
                <select
                  value={formData.batchTime}
                  onChange={(e) => setFormData({ ...formData, batchTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  {BATCH_TIMINGS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status (सद्यस्थिती)
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-semibold"
                >
                  <option value="Enrolled">Enrolled (प्रवेशित)</option>
                  <option value="LL Issued">LL Issued (लर्निंग लायसन्स मंजूर)</option>
                  <option value="Training in Progress">Training in Progress (प्रशिक्षण चालू)</option>
                  <option value="DL Test Passed">DL Test Passed (RTO ग्राउंड टेस्ट उत्तीर्ण)</option>
                  <option value="Completed">Completed (पक्का परवाना वितरित)</option>
                  <option value="On Hold">On Hold (स्थगित)</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Fees & Payment */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              3. Fee Structure & Collection
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Course Fee (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.courseFee}
                  onChange={(e) => setFormData({ ...formData, courseFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Discount Offered (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Net Payable Amount (₹)
                </label>
                <div className="px-3 py-2 bg-white border border-slate-300 rounded-lg font-extrabold text-slate-900 text-base">
                  ₹{netFee.toLocaleString("en-IN")}
                </div>
              </div>

              {!studentToEdit && (
                <>
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Advance Received (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={netFee}
                      value={formData.initialPaymentAmount}
                      onChange={(e) =>
                        setFormData({ ...formData, initialPaymentAmount: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 border border-emerald-400 bg-emerald-50/50 rounded-lg focus:ring-2 focus:ring-emerald-500 font-bold text-emerald-900 text-sm"
                    />
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Payment Mode
                    </label>
                    <select
                      value={formData.initialPaymentMode}
                      onChange={(e) =>
                        setFormData({ ...formData, initialPaymentMode: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                    >
                      <option value="Cash">Cash (रोख)</option>
                      <option value="UPI / QR Code">UPI / QR Code (GPay / PhonePe)</option>
                      <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>

                  <div className="sm:col-span-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Transaction Ref / Note
                    </label>
                    <input
                      type="text"
                      placeholder="Optional Ref"
                      value={formData.initialPaymentRef}
                      onChange={(e) =>
                        setFormData({ ...formData, initialPaymentRef: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-sm"
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-3 pt-2 flex items-center justify-between border-t border-slate-200 text-xs">
                <span className="text-slate-600 font-medium">Remaining Pending Dues:</span>
                <span className="font-bold text-amber-700 text-sm">
                  ₹{estimatedBalance.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="border-t border-slate-200 pt-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Remarks & Register Notes (नोंदवही शेरा)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Training completed from 07/07/26 to 07/08/2026..."
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
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
              {loading ? "Saving..." : studentToEdit ? "Update Student Record" : "Save Admission & Issue Slip"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
