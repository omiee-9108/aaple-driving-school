"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Student,
  Payment,
  Expense,
  AdminSettings,
  AdminDatabase,
} from "@/lib/admin-store";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Receipt,
  TrendingUp,
  Settings,
  PlusCircle,
  Search,
  Filter,
  Download,
  Upload,
  Printer,
  LogOut,
  Car,
  Clock,
  Phone,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  DollarSign,
  Fuel,
  Wrench,
  Building,
  GraduationCap,
  MessageCircle,
  Eye,
  RefreshCw,
  Edit2,
  Trash2,
  UserCheck,
} from "lucide-react";
import { StudentModal } from "@/components/admin/StudentModal";
import { PaymentModal } from "@/components/admin/PaymentModal";
import { ExpenseModal } from "@/components/admin/ExpenseModal";
import { ReceiptModal } from "@/components/admin/ReceiptModal";
import { StudentDetailDrawer } from "@/components/admin/StudentDetailDrawer";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "overview" | "admissions" | "credits" | "expenses" | "reports" | "settings"
  >("overview");

  // Data state
  const [settings, setSettings] = useState<AdminSettings>({
    schoolName: "Aaple Motor Driving School",
    tagline: "Government Authorized Motor Training School & RTO Consultancy",
    address: "Opp. Miraj RTO Office Ground, Gandhi Chowk Road, Miraj, Maharashtra 416410",
    phone: "+91 70831 27002",
    email: "contact@aapledrivingschool.in",
    rtoJurisdiction: "MH-10 (Miraj / Sangli)",
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Search & Filter state
  const [studentSearch, setStudentSearch] = useState("");
  const [studentStatusFilter, setStudentStatusFilter] = useState("all");
  const [studentClassFilter, setStudentClassFilter] = useState("all");
  const [studentAgentFilter, setStudentAgentFilter] = useState("all");
  const [paymentSearch, setPaymentSearch] = useState("");
  const [paymentModeFilter, setPaymentModeFilter] = useState("all");
  const [expenseSearch, setExpenseSearch] = useState("");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("all");

  // Modal states
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState<Student | null>(null);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [preSelectedStudentId, setPreSelectedStudentId] = useState<string | undefined>(undefined);
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [drawerStudent, setDrawerStudent] = useState<Student | null>(null);

  // Receipt Modal state
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [receiptType, setReceiptType] = useState<"payment" | "admission">("payment");
  const [activePaymentForReceipt, setActivePaymentForReceipt] = useState<Payment | undefined>(undefined);
  const [activeStudentForReceipt, setActiveStudentForReceipt] = useState<Student | undefined>(undefined);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<AdminSettings>({
    schoolName: "",
    tagline: "",
    address: "",
    phone: "",
    email: "",
    rtoJurisdiction: "",
  });
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [settingsMessage, setSettingsMessage] = useState("");

  // Fetch admin database
  const fetchData = async () => {
    try {
      setRefreshing(true);
      const res = await fetch("/api/admin/data");
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const json = await res.json();
      if (json.success && json.data) {
        setSettings(json.data.settings);
        setSettingsForm(json.data.settings);
        setStudents(json.data.students || []);
        setPayments(json.data.payments || []);
        setExpenses(json.data.expenses || []);
        
        // Update selected student in drawer if active
        if (drawerStudent) {
          const updated = json.data.students.find((s: Student) => s.id === drawerStudent.id);
          if (updated) setDrawerStudent(updated);
        }
      }
    } catch (err) {
      console.error("Fetch data error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Post an action helper
  const performAction = async (action: string, payload: any) => {
    const res = await fetch("/api/admin/data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, payload }),
    });
    if (res.status === 401) {
      router.replace("/admin/login");
      throw new Error("Session expired. Please log in again.");
    }
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.error || data.message || "Operation failed.");
    }
    await fetchData();
    return data;
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.replace("/admin/login");
  };

  // Student Save Handler
  const handleSaveStudent = async (payload: any, isEdit: boolean) => {
    if (isEdit) {
      await performAction("update_student", payload);
    } else {
      const res = await performAction("add_student", payload);
      if (res.student) {
        setActiveStudentForReceipt(res.student);
        setReceiptType("admission");
        setReceiptModalOpen(true);
      }
    }
  };

  // Student Delete Handler
  const handleDeleteStudent = async (studentId: string) => {
    await performAction("delete_student", { id: studentId });
    if (drawerStudent?.id === studentId) {
      setDrawerStudent(null);
    }
  };

  // Student Status Change
  const handleStatusChange = async (studentId: string, status: Student["status"]) => {
    await performAction("update_student", { id: studentId, status });
  };

  // Payment Save Handler
  const handleSavePayment = async (payload: Omit<Payment, "id" | "receiptNo" | "createdAt">) => {
    const res = await performAction("add_payment", payload);
    if (res.payment) {
      const st = students.find((s) => s.id === payload.studentId);
      setActivePaymentForReceipt(res.payment);
      setActiveStudentForReceipt(st);
      setReceiptType("payment");
      setReceiptModalOpen(true);
    }
  };

  // Payment Delete Handler
  const handleDeletePayment = async (paymentId: string) => {
    if (confirm("Are you sure you want to delete this payment record? Balance will recalculate.")) {
      await performAction("delete_payment", { id: paymentId });
    }
  };

  // Expense Save Handler
  const handleSaveExpense = async (payload: Omit<Expense, "id" | "voucherNo" | "createdAt">) => {
    await performAction("add_expense", payload);
  };

  // Expense Delete Handler
  const handleDeleteExpense = async (expenseId: string) => {
    if (confirm("Are you sure you want to delete this expense voucher?")) {
      await performAction("delete_expense", { id: expenseId });
    }
  };

  // Settings Save Handler
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = { ...settingsForm };
      if (newAdminPassword.trim()) {
        payload.adminPassword = newAdminPassword.trim();
      }
      await performAction("update_settings", payload);
      setSettingsMessage("Settings saved successfully!");
      setNewAdminPassword("");
      setTimeout(() => setSettingsMessage(""), 4000);
    } catch (err: any) {
      setSettingsMessage(`Error: ${err.message}`);
    }
  };

  // CSV Exporters
  const downloadCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.map((val) => `"${val}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportStudentsCSV = () => {
    const headers = [
      "S.No",
      "E.No (Enrolment)",
      "Student Name",
      "D.O.B",
      "Class",
      "Agent",
      "Mobile No",
      "Start Date",
      "End Date",
      "LL Application",
      "DL Application",
      "DL Number",
      "Total Fee (₹)",
      "Paid Amount (₹)",
      "Balance Due (₹)",
      "Status",
    ];
    const rows = students.map((s, idx) => [
      idx + 1,
      s.enrolmentNo || s.admissionNo,
      s.name,
      s.dob || "",
      s.classCategory || s.course,
      s.agent || "MB",
      s.phone,
      s.startDate || s.admissionDate,
      s.endDate || "",
      s.llApplicationNo || "",
      s.dlApplicationNo || "",
      s.dlNumber || "",
      s.totalFee,
      s.paidAmount,
      s.balanceAmount,
      s.status,
    ]);
    downloadCSV("Aaple_MDS_Enrolment_Register", headers, rows);
  };

  const exportPaymentsCSV = () => {
    const headers = [
      "Receipt No",
      "Student Name",
      "Course",
      "Amount Paid (₹)",
      "Payment Date",
      "Payment Mode",
      "Transaction Ref",
      "Received By",
    ];
    const rows = payments.map((p) => [
      p.receiptNo,
      p.studentName,
      p.course,
      p.amount,
      p.paymentDate,
      p.paymentMode,
      p.transactionRef || "",
      p.receivedBy,
    ]);
    downloadCSV("Aaple_Driving_School_Fee_Credits", headers, rows);
  };

  const exportExpensesCSV = () => {
    const headers = [
      "Voucher No",
      "Category",
      "Amount (₹)",
      "Expense Date",
      "Paid To / Vendor",
      "Payment Mode",
      "Vehicle No",
      "Notes",
    ];
    const rows = expenses.map((e) => [
      e.voucherNo,
      e.category,
      e.amount,
      e.expenseDate,
      e.paidTo,
      e.paymentMode,
      e.vehicleNo || "",
      e.notes || "",
    ]);
    downloadCSV("Aaple_Driving_School_Expenses", headers, rows);
  };

  const exportFullBackupJSON = () => {
    const fullDb: AdminDatabase = {
      settings,
      students,
      payments,
      expenses,
    };
    const jsonStr = JSON.stringify(fullDb, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Aaple_Driving_School_Backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (confirm("Restore database from this backup file? Existing records will be replaced.")) {
          await performAction("restore_backup", parsed);
          alert("Database successfully restored from backup!");
        }
      } catch (err: any) {
        alert(`Failed to restore backup: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  // Metrics Calculations
  const metrics = useMemo(() => {
    const totalStudentsCount = students.length;
    const activeStudentsCount = students.filter(
      (s) => s.status === "Enrolled" || s.status === "Training in Progress" || s.status === "LL Issued"
    ).length;
    const totalBilled = students.reduce((sum, s) => sum + (s.totalFee || 0), 0);
    const totalCredits = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalDues = students.reduce((sum, s) => sum + (s.balanceAmount || 0), 0);
    const totalExpenseAmount = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const netProfit = totalCredits - totalExpenseAmount;

    // Breakdown by Class
    const classCount: Record<string, number> = {};
    students.forEach((s) => {
      const cls = s.classCategory || "Other";
      classCount[cls] = (classCount[cls] || 0) + 1;
    });

    return {
      totalStudentsCount,
      activeStudentsCount,
      totalBilled,
      totalCredits,
      totalDues,
      totalExpenseAmount,
      netProfit,
      classCount,
    };
  }, [students, payments, expenses]);

  // Unique Agents list
  const uniqueAgents = useMemo(() => {
    const set = new Set<string>();
    students.forEach((s) => {
      if (s.agent) set.add(s.agent);
    });
    return Array.from(set);
  }, [students]);

  // Filtered lists
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = studentSearch.toLowerCase();
      const matchSearch =
        s.name.toLowerCase().includes(q) ||
        s.phone.includes(q) ||
        (s.enrolmentNo && s.enrolmentNo.toLowerCase().includes(q)) ||
        s.admissionNo.toLowerCase().includes(q) ||
        (s.agent && s.agent.toLowerCase().includes(q)) ||
        (s.llApplicationNo && s.llApplicationNo.includes(q)) ||
        (s.dlApplicationNo && s.dlApplicationNo.includes(q)) ||
        (s.dlNumber && s.dlNumber.toLowerCase().includes(q));

      const matchStatus =
        studentStatusFilter === "all" ||
        (studentStatusFilter === "dues" ? s.balanceAmount > 0 : s.status === studentStatusFilter);

      const matchClass = studentClassFilter === "all" || s.classCategory === studentClassFilter;
      const matchAgent = studentAgentFilter === "all" || s.agent === studentAgentFilter;

      return matchSearch && matchStatus && matchClass && matchAgent;
    });
  }, [students, studentSearch, studentStatusFilter, studentClassFilter, studentAgentFilter]);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.studentName.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        p.receiptNo.toLowerCase().includes(paymentSearch.toLowerCase()) ||
        (p.transactionRef && p.transactionRef.toLowerCase().includes(paymentSearch.toLowerCase()));
      const matchMode = paymentModeFilter === "all" || p.paymentMode === paymentModeFilter;
      return matchSearch && matchMode;
    });
  }, [payments, paymentSearch, paymentModeFilter]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const matchSearch =
        e.paidTo.toLowerCase().includes(expenseSearch.toLowerCase()) ||
        e.voucherNo.toLowerCase().includes(expenseSearch.toLowerCase()) ||
        (e.notes && e.notes.toLowerCase().includes(expenseSearch.toLowerCase())) ||
        (e.vehicleNo && e.vehicleNo.toLowerCase().includes(expenseSearch.toLowerCase()));
      const matchCategory = expenseCategoryFilter === "all" || e.category === expenseCategoryFilter;
      return matchSearch && matchCategory;
    });
  }, [expenses, expenseSearch, expenseCategoryFilter]);

  // Expenses grouped by Category
  const expenseBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
    });
    return map;
  }, [expenses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-300">Loading MDS Register & Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      
      {/* Top Admin Navigation Bar */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold">
              <Car className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base sm:text-lg text-white leading-tight">
                  {settings.schoolName}
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded uppercase tracking-wider border border-emerald-500/30">
                  MDS Register MH-10
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Enrolment Register • Credits • Expenses
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setStudentToEdit(null);
                setStudentModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">New Enrolment</span>
              <span className="sm:hidden">Admission</span>
            </button>

            <button
              onClick={() => {
                setPreSelectedStudentId(undefined);
                setPaymentModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Collect Fee</span>
              <span className="sm:hidden">Payment</span>
            </button>

            <button
              onClick={() => setExpenseModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm transition-all"
            >
              <Receipt className="w-4 h-4" />
              <span className="hidden sm:inline">Add Expense</span>
              <span className="sm:hidden">Expense</span>
            </button>

            <button
              onClick={fetchData}
              title="Refresh Data"
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 sm:gap-2 overflow-x-auto border-t border-slate-800/80 py-1.5 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "overview"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab("admissions")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "admissions"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            MDS Enrolment Register ({students.length})
          </button>

          <button
            onClick={() => setActiveTab("credits")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "credits"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Fee Credits ({payments.length})
          </button>

          <button
            onClick={() => setActiveTab("expenses")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "expenses"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Receipt className="w-4 h-4" />
            Expenses ({expenses.length})
          </button>

          <button
            onClick={() => setActiveTab("reports")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "reports"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Reports & Backup
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === "settings"
                ? "bg-emerald-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* ================= 1. OVERVIEW TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total MDS Enrolled</span>
                  <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {metrics.totalStudentsCount}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {metrics.activeStudentsCount} currently in training
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Credits (Fees Collected)</span>
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                    <DollarSign className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                    ₹{metrics.totalCredits.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Out of ₹{metrics.totalBilled.toLocaleString("en-IN")} total billed
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Pending Balance Dues</span>
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                    ₹{metrics.totalDues.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {students.filter((s) => s.balanceAmount > 0).length} candidates with dues
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between text-slate-500">
                  <span className="text-xs font-semibold uppercase tracking-wider">Net Retained Cash</span>
                  <div className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <div
                    className={`text-2xl sm:text-3xl font-extrabold ${
                      metrics.netProfit >= 0 ? "text-cyan-700" : "text-rose-700"
                    }`}
                  >
                    ₹{metrics.netProfit.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    After ₹{metrics.totalExpenseAmount.toLocaleString("en-IN")} expenses
                  </div>
                </div>
              </div>
            </div>

            {/* Class Breakdown Chips */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Candidates Breakdown by Vehicle Class (श्रेणीनुसार संख्या)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <span className="text-[11px] text-emerald-800 font-bold block">AR.TR (Auto)</span>
                  <span className="text-xl font-extrabold text-emerald-950">{metrics.classCount["AR.TR"] || 0}</span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-center">
                  <span className="text-[11px] text-blue-800 font-bold block">LMV (Car)</span>
                  <span className="text-xl font-extrabold text-blue-950">{metrics.classCount["LMV"] || 0}</span>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-center">
                  <span className="text-[11px] text-purple-800 font-bold block">LMV (TR)</span>
                  <span className="text-xl font-extrabold text-purple-950">{metrics.classCount["LMV (TR)"] || 0}</span>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                  <span className="text-[11px] text-amber-800 font-bold block">MCB + AR.TR</span>
                  <span className="text-xl font-extrabold text-amber-950">{metrics.classCount["MCB. AR.TR"] || 0}</span>
                </div>
                <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-xl text-center">
                  <span className="text-[11px] text-cyan-800 font-bold block">Renewal</span>
                  <span className="text-xl font-extrabold text-cyan-950">{metrics.classCount["Renewal"] || 0}</span>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <span className="text-[11px] text-slate-600 font-bold block">Total Registered</span>
                  <span className="text-xl font-extrabold text-slate-900">{students.length}</span>
                </div>
              </div>
            </div>

            {/* Income vs Expenses Cashflow Summary Bar */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Cashflow & Profit Summary</h3>
                  <p className="text-xs text-slate-500">Collected Income vs Recorded Business Expenses</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-700">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    Income: ₹{metrics.totalCredits.toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1.5 text-rose-700">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    Expenses: ₹{metrics.totalExpenseAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Progress Bar Visualization */}
              <div className="space-y-1">
                <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{
                      width: `${
                        metrics.totalCredits + metrics.totalExpenseAmount > 0
                          ? Math.round(
                              (metrics.totalCredits / (metrics.totalCredits + metrics.totalExpenseAmount)) * 100
                            )
                          : 50
                      }%`,
                    }}
                    className="bg-emerald-500 h-full transition-all"
                  />
                  <div
                    style={{
                      width: `${
                        metrics.totalCredits + metrics.totalExpenseAmount > 0
                          ? Math.round(
                              (metrics.totalExpenseAmount / (metrics.totalCredits + metrics.totalExpenseAmount)) * 100
                            )
                          : 50
                      }%`,
                    }}
                    className="bg-rose-500 h-full transition-all"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Credits Ratio ({metrics.totalCredits > 0 ? Math.round((metrics.totalCredits / (metrics.totalCredits + metrics.totalExpenseAmount)) * 100) : 0}%)</span>
                  <span>Expense Ratio ({metrics.totalExpenseAmount > 0 ? Math.round((metrics.totalExpenseAmount / (metrics.totalCredits + metrics.totalExpenseAmount)) * 100) : 0}%)</span>
                </div>
              </div>
            </div>

            {/* Two Column Grid: Pending Dues & Recent Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Urgent Outstanding Dues Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-amber-50/50">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h3 className="font-bold text-sm text-slate-900">
                      Candidates with Pending Fee Dues
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      setStudentStatusFilter("dues");
                      setActiveTab("admissions");
                    }}
                    className="text-xs font-bold text-amber-800 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="p-4 flex-1 overflow-x-auto divide-y divide-slate-100">
                  {students.filter((s) => s.balanceAmount > 0).length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      🎉 All candidate fees are completely cleared! No pending dues.
                    </div>
                  ) : (
                    students
                      .filter((s) => s.balanceAmount > 0)
                      .slice(0, 5)
                      .map((s) => (
                        <div key={s.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-slate-900">
                              {s.name}{" "}
                              {s.enrolmentNo && (
                                <span className="font-mono text-[10px] text-blue-700 bg-blue-50 px-1 py-0.5 rounded">
                                  {s.enrolmentNo}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {s.phone} • Class: {s.classCategory || s.course} • Agent: {s.agent || "MB"}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-right">
                            <div>
                              <div className="font-bold text-amber-700 text-sm">
                                ₹{s.balanceAmount}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                Paid: ₹{s.paidAmount} / {s.totalFee}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setDrawerStudent(s);
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
                            >
                              Details
                            </button>
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </div>

              {/* Recent Payment Credits */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-emerald-50/50">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-sm text-slate-900">
                      Recent Fee Payments Received
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab("credits")}
                    className="text-xs font-bold text-emerald-800 hover:underline"
                  >
                    View All →
                  </button>
                </div>

                <div className="p-4 flex-1 overflow-x-auto divide-y divide-slate-100">
                  {payments.length === 0 ? (
                    <div className="py-8 text-center text-slate-400 text-xs">
                      No payments recorded yet.
                    </div>
                  ) : (
                    payments.slice(0, 5).map((p) => (
                      <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{p.studentName}</div>
                          <div className="text-[11px] text-slate-500">
                            {p.receiptNo} • {p.paymentDate} • {p.paymentMode}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="font-bold text-emerald-700 text-sm">
                            + ₹{p.amount.toLocaleString("en-IN")}
                          </div>
                          <button
                            onClick={() => {
                              const st = students.find((s) => s.id === p.studentId);
                              setActivePaymentForReceipt(p);
                              setActiveStudentForReceipt(st);
                              setReceiptType("payment");
                              setReceiptModalOpen(true);
                            }}
                            title="Print Receipt"
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 2. ADMISSIONS / MDS REGISTER TAB ================= */}
        {activeTab === "admissions" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Search & Filters Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col lg:flex-row gap-3 items-center justify-between">
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, E.No (3924/..), LL, DL, phone..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                <select
                  value={studentClassFilter}
                  onChange={(e) => setStudentClassFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Classes</option>
                  <option value="AR.TR">AR.TR (Auto)</option>
                  <option value="LMV">LMV (Car)</option>
                  <option value="LMV (TR)">LMV (TR)</option>
                  <option value="MCB. AR.TR">MCB. AR.TR</option>
                  <option value="Renewal">Renewal</option>
                </select>

                <select
                  value={studentAgentFilter}
                  onChange={(e) => setStudentAgentFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Agents</option>
                  {uniqueAgents.map((ag) => (
                    <option key={ag} value={ag}>
                      Agent: {ag}
                    </option>
                  ))}
                </select>

                <select
                  value={studentStatusFilter}
                  onChange={(e) => setStudentStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Statuses</option>
                  <option value="dues">⚠️ Dues Pending Only</option>
                  <option value="Completed">Completed</option>
                  <option value="Training in Progress">Training in Progress</option>
                  <option value="DL Test Passed">DL Test Passed</option>
                  <option value="LL Issued">LL Issued</option>
                </select>

                <button
                  onClick={exportStudentsCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  MDS Register CSV
                </button>
              </div>
            </div>

            {/* Students View: Desktop Table + Mobile Card Stack */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Desktop Table View (md and up) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-3">E.No / Candidate</th>
                      <th className="py-3 px-3">Class & Agent</th>
                      <th className="py-3 px-3">Mobile No</th>
                      <th className="py-3 px-3">Training Dates</th>
                      <th className="py-3 px-3">LL / DL Application</th>
                      <th className="py-3 px-3 text-right">Fee (₹)</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400">
                          No candidate records matching current search / filters.
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((s) => (
                        <tr
                          key={s.id}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          onClick={() => setDrawerStudent(s)}
                        >
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                            <div className="text-[11px] font-mono font-semibold text-blue-700 mt-0.5">
                              {s.enrolmentNo ? `E.No: ${s.enrolmentNo}` : s.admissionNo}
                              {s.dob && ` • DOB: ${s.dob}`}
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold rounded text-[11px] border border-emerald-300">
                              {s.classCategory || "AR.TR"}
                            </span>
                            <div className="text-[11px] text-slate-600 font-medium mt-0.5">
                              Agent: <span className="font-bold text-slate-800">{s.agent || "MB"}</span>
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <a
                              href={`tel:${s.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="font-medium text-slate-800 hover:text-emerald-600 inline-flex items-center gap-1 font-mono"
                            >
                              <Phone className="w-3 h-3 text-emerald-600" />
                              {s.phone}
                            </a>
                          </td>

                          <td className="py-3 px-3 text-[11px] text-slate-600">
                            {s.startDate ? (
                              <div>
                                <div><span className="font-semibold text-slate-800">Start:</span> {s.startDate}</div>
                                {s.endDate && <div><span className="font-semibold text-slate-800">End:</span> {s.endDate}</div>}
                              </div>
                            ) : (
                              <div>Adm: {s.admissionDate}</div>
                            )}
                          </td>

                          <td className="py-3 px-3 text-[11px] font-mono">
                            {s.llApplicationNo && (
                              <div className="text-purple-900">LL: <span className="font-bold">{s.llApplicationNo}</span></div>
                            )}
                            {s.dlApplicationNo && (
                              <div className="text-cyan-900">DL App: <span className="font-bold">{s.dlApplicationNo}</span></div>
                            )}
                            {s.dlNumber && (
                              <div className="text-emerald-900 font-bold bg-emerald-50 px-1 py-0.2 rounded mt-0.5">
                                {s.dlNumber}
                              </div>
                            )}
                            {!s.llApplicationNo && !s.dlApplicationNo && !s.dlNumber && (
                              <span className="text-slate-400">-</span>
                            )}
                          </td>

                          <td className="py-3 px-3 text-right">
                            <div className="font-bold text-slate-900">₹{s.totalFee}</div>
                            {s.balanceAmount > 0 ? (
                              <span className="inline-block text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                Due: ₹{s.balanceAmount}
                              </span>
                            ) : (
                              <span className="inline-block text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                                Paid
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                s.status === "Completed"
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                  : s.status === "Training in Progress"
                                  ? "bg-blue-100 text-blue-800 border-blue-300"
                                  : s.status === "DL Test Passed"
                                  ? "bg-cyan-100 text-cyan-800 border-cyan-300"
                                  : "bg-slate-100 text-slate-800 border-slate-300"
                              }`}
                            >
                              {s.status}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  setPreSelectedStudentId(s.id);
                                  setPaymentModalOpen(true);
                                }}
                                title="Collect Fee Payment"
                                className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <CreditCard className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  setActiveStudentForReceipt(s);
                                  setReceiptType("admission");
                                  setReceiptModalOpen(true);
                                }}
                                title="Print Admission Certificate"
                                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                              >
                                <Printer className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => {
                                  setStudentToEdit(s);
                                  setStudentModalOpen(true);
                                }}
                                title="Edit Record"
                                className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Candidate Card Feed (Phones < md) */}
              <div className="md:hidden divide-y divide-slate-100 p-2 space-y-2">
                {filteredStudents.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No candidate records matching current search / filters.
                  </div>
                ) : (
                  filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setDrawerStudent(s)}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2.5 active:bg-slate-50 transition-colors"
                    >
                      {/* Top Row: Name, E.No, Class */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-bold text-slate-900 text-sm">{s.name}</div>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            {s.enrolmentNo && (
                              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                                E.No: {s.enrolmentNo}
                              </span>
                            )}
                            <span className="text-slate-500">Agent: <b>{s.agent || "MB"}</b></span>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-bold rounded text-[11px] border border-emerald-300">
                          {s.classCategory || "AR.TR"}
                        </span>
                      </div>

                      {/* Middle Row: Phone & Dates */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Contact</span>
                          <a
                            href={`tel:${s.phone}`}
                            onClick={(e) => e.stopPropagation()}
                            className="font-bold text-slate-800 hover:text-emerald-600 inline-flex items-center gap-1 font-mono text-[11px]"
                          >
                            <Phone className="w-3 h-3 text-emerald-600" />
                            {s.phone}
                          </a>
                        </div>

                        <div>
                          <span className="text-[10px] text-slate-400 block font-semibold">Training Dates</span>
                          <span className="text-[11px] text-slate-700 font-medium">
                            {s.startDate || s.admissionDate} {s.endDate && `→ ${s.endDate}`}
                          </span>
                        </div>
                      </div>

                      {/* Parivahan Numbers if available */}
                      {(s.llApplicationNo || s.dlApplicationNo || s.dlNumber) && (
                        <div className="text-[11px] font-mono flex flex-wrap items-center gap-2 text-slate-700">
                          {s.llApplicationNo && (
                            <span className="bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded border border-purple-200">
                              LL: {s.llApplicationNo}
                            </span>
                          )}
                          {s.dlApplicationNo && (
                            <span className="bg-cyan-50 text-cyan-800 px-1.5 py-0.5 rounded border border-cyan-200">
                              DL App: {s.dlApplicationNo}
                            </span>
                          )}
                          {s.dlNumber && (
                            <span className="bg-emerald-50 text-emerald-900 font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                              DL: {s.dlNumber}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Bottom Row: Fees + Action Buttons */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <div>
                          <span className="font-bold text-slate-900">₹{s.totalFee}</span>
                          <span className="text-slate-400 text-[10px] ml-1.5">
                            (Paid: ₹{s.paidAmount})
                          </span>
                          {s.balanceAmount > 0 && (
                            <span className="block text-[10px] font-bold text-amber-700">
                              Due: ₹{s.balanceAmount}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => {
                              setPreSelectedStudentId(s.id);
                              setPaymentModalOpen(true);
                            }}
                            className="px-2.5 py-1.5 bg-emerald-600 active:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1"
                          >
                            <CreditCard className="w-3.5 h-3.5" />
                            Fee
                          </button>

                          <button
                            onClick={() => {
                              setActiveStudentForReceipt(s);
                              setReceiptType("admission");
                              setReceiptModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                            title="Print Slip"
                          >
                            <Printer className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setStudentToEdit(s);
                              setStudentModalOpen(true);
                            }}
                            className="p-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 3. CREDITS (PAYMENTS) TAB ================= */}
        {activeTab === "credits" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by student, receipt no, txn ref..."
                  value={paymentSearch}
                  onChange={(e) => setPaymentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={paymentModeFilter}
                  onChange={(e) => setPaymentModeFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Payment Modes</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI / QR Code">UPI / QR Code</option>
                  <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>

                <button
                  onClick={exportPaymentsCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV
                </button>
              </div>
            </div>

            {/* Payments View: Desktop Table + Mobile Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Receipt No / Date</th>
                      <th className="py-3 px-4">Student & Course</th>
                      <th className="py-3 px-4">Mode & Transaction Ref</th>
                      <th className="py-3 px-4 text-right">Amount (₹)</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPayments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No payment transactions found.
                        </td>
                      </tr>
                    ) : (
                      filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 font-mono">{p.receiptNo}</div>
                            <div className="text-[11px] text-slate-400">{p.paymentDate}</div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-800">{p.studentName}</div>
                            <div className="text-[11px] text-slate-500">{p.course}</div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[11px]">
                              {p.paymentMode}
                            </span>
                            {p.transactionRef && (
                              <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                                Ref: {p.transactionRef}
                              </div>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <span className="font-extrabold text-emerald-700 text-sm">
                              + ₹{p.amount.toLocaleString("en-IN")}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => {
                                  const st = students.find((s) => s.id === p.studentId);
                                  setActivePaymentForReceipt(p);
                                  setActiveStudentForReceipt(st);
                                  setReceiptType("payment");
                                  setReceiptModalOpen(true);
                                }}
                                title="Print Official Receipt"
                                className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              >
                                <Printer className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeletePayment(p.id)}
                                title="Delete Payment Record"
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Payment Cards */}
              <div className="md:hidden divide-y divide-slate-100 p-2 space-y-2">
                {filteredPayments.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No payment transactions found.
                  </div>
                ) : (
                  filteredPayments.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono font-bold text-slate-900">{p.receiptNo}</span>
                          <span className="text-[11px] text-slate-400 block">{p.paymentDate}</span>
                        </div>
                        <span className="font-extrabold text-emerald-700 text-sm">
                          + ₹{p.amount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div>
                        <div className="font-bold text-slate-800">{p.studentName}</div>
                        <div className="text-[11px] text-slate-500">{p.course}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-semibold rounded text-[10px]">
                          {p.paymentMode} {p.transactionRef && `• ${p.transactionRef}`}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const st = students.find((s) => s.id === p.studentId);
                              setActivePaymentForReceipt(p);
                              setActiveStudentForReceipt(st);
                              setReceiptType("payment");
                              setReceiptModalOpen(true);
                            }}
                            className="px-2 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-md flex items-center gap-1 text-[11px]"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            Receipt
                          </button>

                          <button
                            onClick={() => handleDeletePayment(p.id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================= 4. EXPENSES TAB ================= */}
        {activeTab === "expenses" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Category Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
                  <Fuel className="w-4 h-4" />
                  Fuel (Petrol/Diesel)
                </div>
                <div className="font-extrabold text-lg text-slate-900 mt-2">
                  ₹{(expenseBreakdown["Fuel (Petrol/Diesel)"] || 0).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold">
                  <Wrench className="w-4 h-4" />
                  Vehicle Service & Repairs
                </div>
                <div className="font-extrabold text-lg text-slate-900 mt-2">
                  ₹{(expenseBreakdown["Vehicle Maintenance & Repairs"] || 0).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold">
                  <Building className="w-4 h-4" />
                  RTO Govt Fees & Challans
                </div>
                <div className="font-extrabold text-lg text-slate-900 mt-2">
                  ₹{(expenseBreakdown["RTO Govt Fees & Passing"] || 0).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="flex items-center gap-2 text-purple-600 text-xs font-semibold">
                  <Users className="w-4 h-4" />
                  Salaries & Office Rent
                </div>
                <div className="font-extrabold text-lg text-slate-900 mt-2">
                  ₹{(
                    (expenseBreakdown["Instructor & Staff Salaries"] || 0) +
                    (expenseBreakdown["Office Rent & Utilities"] || 0) +
                    (expenseBreakdown["Office Tea & Miscellaneous"] || 0)
                  ).toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            {/* Expenses Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search expense by vendor, voucher, note..."
                  value={expenseSearch}
                  onChange={(e) => setExpenseSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-rose-500 text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={expenseCategoryFilter}
                  onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 bg-white"
                >
                  <option value="all">All Categories</option>
                  <option value="Fuel (Petrol/Diesel)">Fuel</option>
                  <option value="Vehicle Maintenance & Repairs">Vehicle Maintenance</option>
                  <option value="Instructor & Staff Salaries">Staff Salaries</option>
                  <option value="RTO Govt Fees & Passing">RTO Fees</option>
                  <option value="Office Rent & Utilities">Office Rent</option>
                  <option value="Office Tea & Miscellaneous">Tea & Misc</option>
                </select>

                <button
                  onClick={exportExpensesCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors border border-slate-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV
                </button>
              </div>
            </div>

            {/* Expenses View: Desktop Table + Mobile Cards */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Voucher No / Date</th>
                      <th className="py-3 px-4">Category & Details</th>
                      <th className="py-3 px-4">Paid To / Mode</th>
                      <th className="py-3 px-4 text-right">Amount (₹)</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredExpenses.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          No expense vouchers recorded.
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((e) => (
                        <tr key={e.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 font-mono">{e.voucherNo}</div>
                            <div className="text-[11px] text-slate-400">{e.expenseDate}</div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800">{e.category}</span>
                            {e.vehicleNo && (
                              <span className="ml-2 text-[11px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                                {e.vehicleNo}
                              </span>
                            )}
                            {e.notes && <div className="text-[11px] text-slate-500 mt-0.5">{e.notes}</div>}
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-medium text-slate-800">{e.paidTo}</div>
                            <div className="text-[11px] text-slate-400">{e.paymentMode}</div>
                          </td>

                          <td className="py-3 px-4 text-right">
                            <span className="font-extrabold text-rose-700 text-sm">
                              - ₹{e.amount.toLocaleString("en-IN")}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleDeleteExpense(e.id)}
                              title="Delete Expense Voucher"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Expense Cards */}
              <div className="md:hidden divide-y divide-slate-100 p-2 space-y-2">
                {filteredExpenses.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No expense vouchers recorded.
                  </div>
                ) : (
                  filteredExpenses.map((e) => (
                    <div
                      key={e.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono font-bold text-slate-900">{e.voucherNo}</span>
                          <span className="text-[11px] text-slate-400 block">{e.expenseDate}</span>
                        </div>
                        <span className="font-extrabold text-rose-700 text-sm">
                          - ₹{e.amount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-900">{e.category}</span>
                        {e.vehicleNo && (
                          <span className="ml-2 text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            {e.vehicleNo}
                          </span>
                        )}
                        {e.notes && <div className="text-[11px] text-slate-500 mt-0.5">{e.notes}</div>}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-slate-600">
                        <span>Paid to: <b>{e.paidTo}</b> ({e.paymentMode})</span>
                        <button
                          onClick={() => handleDeleteExpense(e.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}


        {/* ================= 5. REPORTS & BACKUP TAB ================= */}
        {activeTab === "reports" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Financial Summary Statement */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-bold text-base text-slate-900">
                Aaple Motor Driving School — Financial Performance Statement
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs text-slate-500 font-semibold uppercase">Gross Billed Value</span>
                  <div className="text-xl font-extrabold text-slate-900 mt-1">
                    ₹{metrics.totalBilled.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-slate-400">Sum of all enrolled candidate fees</span>
                </div>

                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <span className="text-xs text-emerald-800 font-semibold uppercase">Total Cash Inflow (Credits)</span>
                  <div className="text-xl font-extrabold text-emerald-800 mt-1">
                    ₹{metrics.totalCredits.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-emerald-600">Actual fees received in cash/UPI/Bank</span>
                </div>

                <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                  <span className="text-xs text-rose-800 font-semibold uppercase">Total Operational Outflow</span>
                  <div className="text-xl font-extrabold text-rose-800 mt-1">
                    ₹{metrics.totalExpenseAmount.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[11px] text-rose-600">Fuel, maintenance, staff salaries, RTO challans</span>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">
                    Net Retained Cash Profit
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-0.5">
                    ₹{metrics.netProfit.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Pending Receivable Dues</span>
                  <span className="text-lg font-bold text-amber-400">
                    ₹{metrics.totalDues.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* Export & Backup Center */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* CSV Exports */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Export Records to Excel / CSV
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Download spreadsheets matching the hand-written MDS Register format for tax filing and CA audits.
                </p>
                <div className="space-y-2 pt-2">
                  <button
                    onClick={exportStudentsCSV}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>🎓 Download MDS Enrolment Register</span>
                    <span className="text-slate-400 font-mono text-[11px]">.CSV</span>
                  </button>

                  <button
                    onClick={exportPaymentsCSV}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>💳 Download Fee Payment Receipts (Credits)</span>
                    <span className="text-slate-400 font-mono text-[11px]">.CSV</span>
                  </button>

                  <button
                    onClick={exportExpensesCSV}
                    className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-semibold border border-slate-200 flex items-center justify-between transition-colors"
                  >
                    <span>⛽ Download Business Expenses Ledger</span>
                    <span className="text-slate-400 font-mono text-[11px]">.CSV</span>
                  </button>
                </div>
              </div>

              {/* JSON Full System Backup & Restore */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Complete Database Backup & Restore
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Save a full offline snapshot of all students, transactions, and settings, or restore from a previously saved backup file.
                </p>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={exportFullBackupJSON}
                    className="w-full py-2.5 px-4 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl text-xs font-bold border border-blue-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Complete JSON Backup
                  </button>

                  <label className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold border border-dashed border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-slate-500" />
                    <span>Restore Database from File</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleRestoreBackup}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= 6. SETTINGS TAB ================= */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-bold text-base text-slate-900">
                School Branding & Security Settings
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Customize details displayed on printable receipts, student vouchers, and manage your master password.
              </p>
            </div>

            {settingsMessage && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                  settingsMessage.startsWith("Error")
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                {settingsMessage}
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Driving School Name
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.schoolName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, schoolName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Office / Branch Address (Miraj)
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone / Contact Number
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    RTO Code / Jurisdiction
                  </label>
                  <input
                    type="text"
                    required
                    value={settingsForm.rtoJurisdiction}
                    onChange={(e) =>
                      setSettingsForm({ ...settingsForm, rtoJurisdiction: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <label className="block font-semibold text-slate-700 mb-1">
                  Change Master Password / PIN (Leave blank to keep existing)
                </label>
                <input
                  type="password"
                  placeholder="Enter new master password..."
                  value={newAdminPassword}
                  onChange={(e) => setNewAdminPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 text-xs"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Default initial password: <code className="bg-slate-100 px-1 py-0.5 rounded">aaple@admin123</code>
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-sm transition-colors"
                >
                  Save Settings & Password
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Modals & Slide-out Drawers */}
      <StudentModal
        isOpen={studentModalOpen}
        onClose={() => {
          setStudentModalOpen(false);
          setStudentToEdit(null);
        }}
        onSave={handleSaveStudent}
        studentToEdit={studentToEdit}
      />

      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => {
          setPaymentModalOpen(false);
          setPreSelectedStudentId(undefined);
        }}
        onSave={handleSavePayment}
        students={students}
        preSelectedStudentId={preSelectedStudentId}
      />

      <ExpenseModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        onSave={handleSaveExpense}
      />

      <ReceiptModal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        type={receiptType}
        payment={activePaymentForReceipt}
        student={activeStudentForReceipt}
        settings={settings}
      />

      <StudentDetailDrawer
        isOpen={!!drawerStudent}
        onClose={() => setDrawerStudent(null)}
        student={drawerStudent}
        payments={payments}
        settings={settings}
        onEdit={(student) => {
          setStudentToEdit(student);
          setStudentModalOpen(true);
        }}
        onDelete={handleDeleteStudent}
        onAddPayment={(studentId) => {
          setPreSelectedStudentId(studentId);
          setPaymentModalOpen(true);
        }}
        onPrintReceipt={(payment) => {
          const st = students.find((s) => s.id === payment.studentId);
          setActivePaymentForReceipt(payment);
          setActiveStudentForReceipt(st);
          setReceiptType("payment");
          setReceiptModalOpen(true);
        }}
        onPrintAdmission={(student) => {
          setActiveStudentForReceipt(student);
          setReceiptType("admission");
          setReceiptModalOpen(true);
        }}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
