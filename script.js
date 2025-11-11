// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZpGDkGPaSq5bpZcI0BE2jfw3X1n4aAmU",
  authDomain: "spuuu-c8e22.firebaseapp.com",
  databaseURL: "https://spuuu-c8e22-default-rtdb.firebaseio.com",
  projectId: "spuuu-c8e22",
  storageBucket: "spuuu-c8e22.firebasestorage.app",
  messagingSenderId: "851866596843",
  appId: "1:851866596843:web:0a08e71ec6dd853b52d5ae",
  measurementId: "G-4QJER3KMCJ",
};

// Initialize Firebase
if (typeof firebase === "undefined") {
  console.error("Firebase is not loaded");
} else {
  firebase.initializeApp(firebaseConfig);
}

// Get a reference to the database service
const database = firebase.database();

// Utility Functions
function showToast(message, type = "info", duration = 3000) {
  // Create toast element if it doesn't exist
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "fixed bottom-4 right-4 z-50";
    document.body.appendChild(toast);
  }

  // Set toast content
  toast.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl p-4 flex items-center space-x-3 min-w-[300px] toast-enter">
            <div id="toastIcon"></div>
            <div>
                <p id="toastMessage" class="font-medium text-gray-800"></p>
            </div>
        </div>
    `;

  const toastMessage = toast.querySelector("#toastMessage");
  const toastIcon = toast.querySelector("#toastIcon");

  toastMessage.textContent = message;

  // Set icon based on type
  if (type === "success") {
    toastIcon.innerHTML =
      '<svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  } else if (type === "error") {
    toastIcon.innerHTML =
      '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  } else if (type === "warning") {
    toastIcon.innerHTML =
      '<svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';
  } else {
    toastIcon.innerHTML =
      '<svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
  }

  // Show toast
  setTimeout(() => {
    toast.querySelector("div").classList.remove("toast-enter");
    toast.querySelector("div").classList.add("toast-exit");
  }, duration - 300);

  // Hide toast after duration
  setTimeout(() => {
    toast.innerHTML = "";
  }, duration);
}

// Format timestamp
function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// Calculate reaction time
function calculateReactionTime(startTime, endTime) {
  return endTime - startTime;
}

// Check internet connection
function checkConnection() {
  if (!navigator.onLine) {
    showToast("Tidak ada koneksi internet!", "error");
    return false;
  }
  return true;
}

// Validate input
function validateInput(input, minLength = 1, maxLength = 50) {
  const trimmedInput = input.trim();
  if (trimmedInput.length < minLength) {
    return { valid: false, message: `Minimal ${minLength} karakter` };
  }
  if (trimmedInput.length > maxLength) {
    return { valid: false, message: `Maksimal ${maxLength} karakter` };
  }
  if (!/^[a-zA-Z0-9\s]+$/.test(trimmedInput)) {
    return {
      valid: false,
      message: "Hanya huruf, angka, dan spasi yang diperbolehkan",
    };
  }
  return { valid: true, value: trimmedInput };
}

// Prevent multiple submissions
function preventMultipleSubmission(button, originalText = "Submit") {
  button.disabled = true;
  const originalContent = button.innerHTML;
  button.innerHTML = `
        <svg class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
    `;

  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = originalContent;
  }, 2000);
}

// Export data to CSV
function exportToCSV(data, filename = "data.csv") {
  const csvContent =
    "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Generate random ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

// Sound effects (optional)
const sounds = {
  click: new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
  ),
  success: new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
  ),
  error: new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmFgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
  ),
};

// Play sound effect
function playSound(type) {
  if (sounds[type]) {
    sounds[type].play().catch((e) => console.log("Sound play failed:", e));
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Check for online/offline status
  window.addEventListener("online", () => {
    showToast("Koneksi tersambung kembali", "success");
  });

  window.addEventListener("offline", () => {
    showToast("Koneksi terputus", "error");
  });

  // Prevent context menu on long press (mobile)
  document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "BUTTON") {
      e.preventDefault();
    }
  });
});

// Global error handler
window.addEventListener("error", function (e) {
  console.error("Global error:", e.error);
  showToast("Terjadi kesalahan. Silakan coba lagi.", "error");
});

// Firebase error handling
function handleFirebaseError(error) {
  console.error("Firebase error:", error);
  switch (error.code) {
    case "PERMISSION_DENIED":
      showToast("Anda tidak memiliki izin untuk melakukan aksi ini", "error");
      break;
    case "NETWORK_ERROR":
      showToast("Koneksi internet bermasalah", "error");
      break;
    default:
      showToast("Terjadi kesalahan pada server", "error");
  }
}

// Check if user is logged in (for protected pages)
function checkAuth() {
  const studentName = localStorage.getItem("studentName");
  if (
    !studentName &&
    !window.location.pathname.includes("index.html") &&
    !window.location.pathname.includes("admin.html")
  ) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}
