import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE_NAME,
  DEFAULT_PASSWORD,
  verifySessionToken,
} from "@/lib/admin-auth";
import {
  getAdminDatabase,
  saveAdminDatabase,
  recalculateStudentBalance,
  Student,
  Payment,
  Expense,
  AdminSettings,
  AdminDatabase,
} from "@/lib/admin-store";

function checkAuth(req: NextRequest): boolean {
  const sessionCookie = req.cookies.get(SESSION_COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;
  const db = getAdminDatabase();
  const effectivePassword = db.settings.adminPassword || DEFAULT_PASSWORD;
  return verifySessionToken(sessionCookie.value, effectivePassword);
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const db = getAdminDatabase();

    // Calculate aggregated metrics
    const totalStudents = db.students.length;
    const activeStudents = db.students.filter(
      (s) => s.status === "Enrolled" || s.status === "Training in Progress" || s.status === "LL Issued"
    ).length;

    const totalRevenueBilled = db.students.reduce((sum, s) => sum + (s.totalFee || 0), 0);
    const totalCreditsCollected = db.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    const totalOutstandingDues = db.students.reduce((sum, s) => sum + (s.balanceAmount || 0), 0);
    const totalExpenses = db.expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
    const netCashflow = totalCreditsCollected - totalExpenses;

    // Do not leak raw password in settings response
    const safeSettings = { ...db.settings };
    delete safeSettings.adminPassword;

    return NextResponse.json({
      success: true,
      data: {
        settings: safeSettings,
        students: db.students,
        payments: db.payments,
        expenses: db.expenses,
        metrics: {
          totalStudents,
          activeStudents,
          totalRevenueBilled,
          totalCreditsCollected,
          totalOutstandingDues,
          totalExpenses,
          netCashflow,
        },
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch admin data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { action, payload } = body;
    const db = getAdminDatabase();

    switch (action) {
      case "add_student": {
        const studentData = payload as Omit<Student, "id" | "admissionNo" | "paidAmount" | "balanceAmount" | "createdAt"> & {
          initialPaymentAmount?: number;
          initialPaymentMode?: Payment["paymentMode"];
          initialPaymentRef?: string;
        };

        const id = `std-${Date.now().toString(36)}`;
        const admissionIndex = (db.students.length + 1).toString().padStart(3, "0");
        const currentYear = new Date().getFullYear();
        const admissionNo = `ADM-${currentYear}-${admissionIndex}`;
        const totalFee = Math.max(0, (studentData.courseFee || 0) - (studentData.discount || 0));

        const newStudent: Student = {
          id,
          admissionNo,
          name: studentData.name,
          phone: studentData.phone,
          email: studentData.email,
          gender: studentData.gender || "Male",
          dob: studentData.dob,
          address: studentData.address,
          course: studentData.course,
          vehicleType: studentData.vehicleType,
          batchTime: studentData.batchTime || "07:00 AM - 08:00 AM",
          admissionDate: studentData.admissionDate || new Date().toISOString().split("T")[0],
          courseFee: studentData.courseFee || 0,
          discount: studentData.discount || 0,
          totalFee,
          paidAmount: 0,
          balanceAmount: totalFee,
          llNumber: studentData.llNumber,
          dlNumber: studentData.dlNumber,
          status: studentData.status || "Enrolled",
          remarks: studentData.remarks,
          createdAt: new Date().toISOString(),
        };

        db.students.unshift(newStudent);

        // If an advance payment was made at admission time
        if (studentData.initialPaymentAmount && studentData.initialPaymentAmount > 0) {
          const receiptIndex = (db.payments.length + 1).toString().padStart(3, "0");
          const receiptNo = `REC-${currentYear}-${receiptIndex}`;
          const newPayment: Payment = {
            id: `pay-${Date.now().toString(36)}`,
            receiptNo,
            studentId: newStudent.id,
            studentName: newStudent.name,
            course: newStudent.course,
            amount: studentData.initialPaymentAmount,
            paymentDate: newStudent.admissionDate,
            paymentMode: studentData.initialPaymentMode || "Cash",
            transactionRef: studentData.initialPaymentRef,
            receivedBy: "Admin / Proprietor",
            notes: "Initial admission fee collection",
            createdAt: new Date().toISOString(),
          };
          db.payments.unshift(newPayment);
          recalculateStudentBalance(db, newStudent.id);
        }

        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Student enrolled successfully", student: newStudent });
      }

      case "update_student": {
        const { id, ...updatedFields } = payload as Partial<Student> & { id: string };
        const index = db.students.findIndex((s) => s.id === id);
        if (index === -1) {
          return NextResponse.json({ error: "Student not found" }, { status: 404 });
        }

        const current = db.students[index];
        const courseFee = updatedFields.courseFee !== undefined ? updatedFields.courseFee : current.courseFee;
        const discount = updatedFields.discount !== undefined ? updatedFields.discount : current.discount;
        const totalFee = Math.max(0, courseFee - discount);

        db.students[index] = {
          ...current,
          ...updatedFields,
          courseFee,
          discount,
          totalFee,
        };

        recalculateStudentBalance(db, id);
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Student details updated", student: db.students[index] });
      }

      case "delete_student": {
        const { id } = payload;
        db.students = db.students.filter((s) => s.id !== id);
        // Also remove payments for this student or retain them as orphaned
        db.payments = db.payments.filter((p) => p.studentId !== id);
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Student record removed" });
      }

      case "add_payment": {
        const paymentData = payload as Omit<Payment, "id" | "receiptNo" | "createdAt">;
        const currentYear = new Date().getFullYear();
        const receiptIndex = (db.payments.length + 1).toString().padStart(3, "0");
        const receiptNo = `REC-${currentYear}-${receiptIndex}`;

        const newPayment: Payment = {
          id: `pay-${Date.now().toString(36)}`,
          receiptNo,
          studentId: paymentData.studentId,
          studentName: paymentData.studentName,
          course: paymentData.course,
          amount: Number(paymentData.amount) || 0,
          paymentDate: paymentData.paymentDate || new Date().toISOString().split("T")[0],
          paymentMode: paymentData.paymentMode || "Cash",
          transactionRef: paymentData.transactionRef,
          receivedBy: paymentData.receivedBy || "Admin / Proprietor",
          notes: paymentData.notes,
          createdAt: new Date().toISOString(),
        };

        db.payments.unshift(newPayment);
        recalculateStudentBalance(db, paymentData.studentId);
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Payment recorded successfully", payment: newPayment });
      }

      case "delete_payment": {
        const { id } = payload;
        const payment = db.payments.find((p) => p.id === id);
        const studentId = payment?.studentId;
        db.payments = db.payments.filter((p) => p.id !== id);
        if (studentId) {
          recalculateStudentBalance(db, studentId);
        }
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Payment entry removed" });
      }

      case "add_expense": {
        const expenseData = payload as Omit<Expense, "id" | "voucherNo" | "createdAt">;
        const currentYear = new Date().getFullYear();
        const voucherIndex = (db.expenses.length + 1).toString().padStart(3, "0");
        const voucherNo = `EXP-${currentYear}-${voucherIndex}`;

        const newExpense: Expense = {
          id: `exp-${Date.now().toString(36)}`,
          voucherNo,
          category: expenseData.category || "Fuel (Petrol/Diesel)",
          vehicleNo: expenseData.vehicleNo,
          amount: Number(expenseData.amount) || 0,
          expenseDate: expenseData.expenseDate || new Date().toISOString().split("T")[0],
          paymentMode: expenseData.paymentMode || "Cash",
          paidTo: expenseData.paidTo || "Vendor",
          notes: expenseData.notes,
          createdAt: new Date().toISOString(),
        };

        db.expenses.unshift(newExpense);
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Expense logged successfully", expense: newExpense });
      }

      case "delete_expense": {
        const { id } = payload;
        db.expenses = db.expenses.filter((e) => e.id !== id);
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Expense record removed" });
      }

      case "update_settings": {
        const settingsPayload = payload as Partial<AdminSettings>;
        db.settings = {
          ...db.settings,
          ...settingsPayload,
        };
        saveAdminDatabase(db);
        return NextResponse.json({ success: true, message: "Settings saved successfully" });
      }

      case "restore_backup": {
        const restored = payload as AdminDatabase;
        if (!restored || !Array.isArray(restored.students)) {
          return NextResponse.json({ error: "Invalid backup file structure" }, { status: 400 });
        }
        saveAdminDatabase(restored);
        return NextResponse.json({ success: true, message: "Database restored successfully" });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Data operation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
