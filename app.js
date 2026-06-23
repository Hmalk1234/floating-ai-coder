/* ==========================================
   FLOATING AI CODER - CORE INTERACTIVE ENGINE
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const container = document.getElementById("floating-ai-container");
    const header = document.getElementById("floating-header");
    const panelMainTitle = document.getElementById("panel-main-title");
    const headerStatus = document.getElementById("header-status");
    const btnMinimize = document.getElementById("btn-minimize");
    const btnExpand = document.getElementById("btn-expand");
    const triggerBubble = document.getElementById("floating-trigger");
    const bubbleNotification = triggerBubble.querySelector(".bubble-notification");
    
    // Auth Nodes
    const authContainer = document.getElementById("auth-container");
    const loginScreen = document.getElementById("login-screen");
    const registerScreen = document.getElementById("register-screen");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const linkToRegister = document.getElementById("link-to-register");
    const linkToLogin = document.getElementById("link-to-login");
    const headerUserProfile = document.getElementById("header-user-profile");
    const headerUserName = document.getElementById("header-user-name");
    const headerUserRole = document.getElementById("header-user-role");
    const btnLogout = document.getElementById("btn-logout");

    // Tab Nodes
    const tabsBar = document.getElementById("category-tabs-bar");
    const tabButtons = document.querySelectorAll(".tab-btn");
    const chatBody = document.getElementById("chat-body");
    const chatInputView = document.getElementById("chat-content-view");
    const creatorView = document.getElementById("creator-content-view");
    const adminView = document.getElementById("admin-content-view");
    const panelFooter = document.getElementById("panel-footer-bar");
    
    const chatMessages = chatBody.querySelector(".chat-messages");
    const suggestionsBox = document.getElementById("suggestions-box");
    const typingIndicator = document.getElementById("typing-indicator");
    
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const btnClearChat = document.getElementById("btn-clear-chat");
    const currentModeText = document.getElementById("current-mode-text");
    const btnGlobalTheme = document.getElementById("btn-global-theme");
    
    // Role Forms Nodes
    const creatorPresetForm = document.getElementById("creator-preset-form");
    const adminUsersList = document.getElementById("admin-users-list");

    const codeModal = document.getElementById("code-modal");
    const modalCodeBlock = document.getElementById("modal-code-block");
    const btnCloseModal = document.getElementById("btn-close-modal");
    const btnModalCopy = document.getElementById("btn-modal-copy");
    const toastContainer = document.getElementById("toast-container");

    // State Variables
    let currentCategory = "roblox";
    let activeTheme = "violet"; // violet, cyan, emerald
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let panelLeft = 0;
    let panelTop = 0;
    let unreadMessagesCount = 0;

    // Database & Sessions State
    let users = [];
    let currentUser = null;

    // Initial base preset coding database
    let codingPresets = {
        roblox: {
            modeName: "Roblox Luau Expert",
            suggestions: [
                { text: "Leaderstats & Save Data", id: "roblox_leaderstats" },
                { text: "Kill Brick Script", id: "roblox_killbrick" },
                { text: "Teleport Pad System", id: "roblox_teleport" },
                { text: "Regen Model Trigger", id: "roblox_regen" }
            ],
            defaultAnswer: "Halo! Saya asisten khusus Roblox Scripting. Saya bisa membantu Anda menulis kode Luau untuk sistem game Anda. Contoh pertanyaan: 'Tolong buatkan skrip leaderboard koin' atau 'bagaimana cara membuat pedang yang memberi damage?'",
            responses: {
                roblox_leaderstats: {
                    title: "Leaderstats & DataStore Saving Script",
                    lang: "lua",
                    text: "Berikut adalah skrip lengkap Roblox Server Script untuk membuat sistem **Leaderstats** yang menyimpan data pemain (Coins dan Level) menggunakan **DataStoreService** secara otomatis ketika pemain masuk atau keluar game. Simpan skrip ini di **ServerScriptService**.",
                    code: `-- Roblox Server Script (ServerScriptService)
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local GameDataStore = DataStoreService:GetDataStore("SaveDataSystem_v1")

local function onPlayerAdded(player)
    -- Membuat folder leaderstats
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    -- Nilai Coins
    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = 0
    coins.Parent = leaderstats

    -- Nilai Level
    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = 1
    level.Parent = leaderstats

    -- Memuat data tersimpan dari DataStore
    local playerKey = "Player_" .. player.UserId
    local success, savedData = pcall(function()
        return GameDataStore:GetAsync(playerKey)
    end)

    if success and savedData then
        coins.Value = savedData.Coins or 0
        level.Value = savedData.Level or 1
        print("Data berhasil dimuat untuk " .. player.Name)
    else
        print("Memulai data baru untuk " .. player.Name)
    end
end

local function onPlayerRemoving(player)
    local playerKey = "Player_" .. player.UserId
    local leaderstats = player:FindFirstChild("leaderstats")
    
    if leaderstats then
        local dataToSave = {
            Coins = leaderstats.Coins.Value,
            Level = leaderstats.Level.Value
        }
        
        local success, err = pcall(function()
            GameDataStore:SetAsync(playerKey, dataToSave)
        end)
        
        if success then
            print("Data berhasil disimpan untuk " .. player.Name)
        else
            warn("Gagal menyimpan data pemain: " .. tostring(err))
        end
    end
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoving)`
                },
                roblox_killbrick: {
                    title: "Script Kill Brick (Obstacle)",
                    lang: "lua",
                    text: "Skrip ini berguna untuk game Obby atau rintangan. Jika avatar pemain menyentuh part yang dipasangi skrip ini, nyawa pemain akan langsung habis (mati). Masukkan skrip ini sebagai **Script** langsung di dalam objek Part Anda.",
                    code: `-- Masukkan skrip ini ke dalam objek Part
local part = script.Parent

local function onTouched(otherPart)
    local character = otherPart.Parent
    -- Memastikan objek yang menyentuh adalah Karakter Pemain
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    
    if humanoid then
        -- Set Health menjadi 0 untuk mengeliminasi pemain
        humanoid.Health = 0
        
        -- Efek glow opsional pada part saat menyentuh
        part.Material = Enum.Material.Neon
        task.wait(0.2)
        part.Material = Enum.Material.SmoothPlastic
    end
end

part.Touched:Connect(onTouched)`
                },
                roblox_teleport: {
                    title: "Teleport Pad System",
                    lang: "lua",
                    text: "Sistem teleportasi sederhana antara dua Part. Pemain yang menyentuh **TelePadA** akan berpindah ke posisi **TelePadB** secara instan.",
                    code: `-- Pasang script ini di TelePadA
local TelePadA = script.Parent
local TelePadB = workspace:WaitForChild("TelePadB") -- Cari tujuan teleport

local cooldown = false

local function onTouched(otherPart)
    if cooldown then return end
    
    local character = otherPart.Parent
    local humanoid = character:FindFirstChildOfClass("Humanoid")
    local rootPart = character:FindFirstChild("HumanoidRootPart")
    
    if humanoid and rootPart then
        cooldown = true
        
        -- Memindahkan posisi pemain sedikit ke atas dari pad tujuan
        rootPart.CFrame = TelePadB.CFrame + Vector3.new(0, 3, 0)
        
        -- Efek suara/visual sederhana dapat ditambahkan di sini
        
        task.wait(1.5) -- Waktu tunggu sebelum dapat berteleportasi kembali
        cooldown = false
    end
end

TelePadA.Touched:Connect(onTouched)`
                },
                roblox_regen: {
                    title: "Regenerasi Model / Script Spawner",
                    lang: "lua",
                    text: "Skrip server ini akan meregenerasi/memunculkan kembali objek model tertentu (misal: mobil atau item yang hancur) ke posisi awalnya jika objek tersebut terhapus atau hancur.",
                    code: `-- Masukkan script ini di ServerScriptService atau di dalam Group Model
local model = workspace:FindFirstChild("MyRegenModel")
local backup = model:Clone() -- Buat kloningan cadangan model saat server jalan

local function monitorModel()
    while true do
        task.wait(5)
        -- Cek apakah model asli sudah terhapus dari Workspace
        if not workspace:FindFirstChild(model.Name) then
            print("Model hancur/hilang! Meregenerasi model baru...")
            
            task.wait(2) -- Jeda sebelum memunculkan kembali
            local newModel = backup:Clone()
            newModel.Parent = workspace
            newModel:MakeJoints() -- Sambungkan joint model jika ada
            
            model = newModel
        end
    end
end

task.spawn(monitorModel)`
                }
            }
        },
        web: {
            modeName: "Frontend Designer Guru",
            suggestions: [
                { text: "CSS Glassmorphism Card", id: "web_glassmorphism" },
                { text: "Sleek Dark Mode Toggle", id: "web_darkmode" },
                { text: "Tailwind CSS Grid Page", id: "web_tailwind" }
            ],
            defaultAnswer: "Halo! Saya adalah Frontend Designer Guru. Saya bisa membantu Anda merancang website yang indah menggunakan HTML5, CSS3 Grid/Flexbox, Javascript interaktif, serta Tailwind CSS. Tanyakan desain apa yang ingin Anda buat!",
            responses: {
                web_glassmorphism: {
                    title: "Modern CSS Glassmorphism Card Layout",
                    lang: "css",
                    text: "Berikut adalah kode HTML dan CSS untuk membuat kartu dengan efek **Glassmorphism (Kaca Transparan)** yang futuristik menggunakan properti `backdrop-filter: blur` dan border semi-transparan.",
                    code: `/* Glass Card Styling */
.glass-card {
    position: relative;
    width: 320px;
    padding: 30px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: #ffffff;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}`
                },
                web_darkmode: {
                    title: "Sleek Dark Mode Toggle Utility",
                    lang: "javascript",
                    text: "Sistem toggle tema (Gelap/Terang) otomatis yang ramah pengguna dengan penyimpanan preferensi di **localStorage** dan sinkronisasi dengan pengaturan sistem bawaan OS.",
                    code: `// Theme toggle implementation
const themeToggleBtn = document.querySelector('#theme-toggle');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}`
                },
                web_tailwind: {
                    title: "Responsive Tailwind CSS Landing Hero Section",
                    lang: "html",
                    text: "Berikut adalah potongan kode UI HTML yang sudah dihiasi class utility dari **Tailwind CSS** untuk membuat bagian Hero (Header halaman utama) yang modern dan responsif.",
                    code: `<!-- Tailwind Hero -->
<section class="relative bg-slate-950 text-white overflow-hidden py-24 px-6 md:px-12">
  <div class="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    <div class="space-y-6 text-center lg:text-left">
      <h1 class="text-4xl sm:text-5xl font-extrabold">Build layouts faster!</h1>
    </div>
  </div>
</section>`
                }
            }
        },
        game: {
            modeName: "Game Engine Sensei",
            suggestions: [
                { text: "Unity 3D Player Movement", id: "game_unity" },
                { text: "Godot 2D Platformer Character", id: "game_godot" },
                { text: "Enemy AI Simple Patrol", id: "game_enemyai" }
            ],
            defaultAnswer: "Halo! Saya adalah Game Engine Sensei. Saya siap membantu Anda membuat game keren di platform Unity (C#) maupun Godot Engine (GDScript). Ajukan pertanyaan coding logic game Anda di sini!",
            responses: {
                game_unity: {
                    title: "Unity 3D Character Controller Movement Script",
                    lang: "csharp",
                    text: "Gunakan skrip C# ini untuk menggerakkan karakter pemain 3D di Unity menggunakan modul **Character Controller** bawaan.",
                    code: `using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    private CharacterController controller;
    public float playerSpeed = 6.0f;

    void Start() {
        controller = GetComponent<CharacterController>();
    }
}`
                },
                game_godot: {
                    title: "Godot 4 2D Platformer Character Physics (GDScript)",
                    lang: "gdscript",
                    text: "Berikut skrip template bawaan terbaru dari **Godot Engine 4** untuk node `CharacterBody2D`.",
                    code: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")`
                },
                game_enemyai: {
                    title: "Unity C# Enemy AI Patrol & Follow System",
                    lang: "csharp",
                    text: "Skrip AI musuh sederhana di Unity. Musuh akan berpatroli di antara waypoints.",
                    code: `using UnityEngine;

public class EnemyAI : MonoBehaviour
{
    public Transform[] waypoints;
    public float speed = 3.0f;
}`
                }
            }
        },
        app: {
            modeName: "General Application Architect",
            suggestions: [
                { text: "Python API Fetcher Script", id: "app_python_api" },
                { text: "NodeJS Express Router", id: "app_node_server" },
                { text: "JSON Local Storage Handler", id: "app_js_local" }
            ],
            defaultAnswer: "Halo! Saya adalah General Application Architect. Saya dapat membantu Anda mendesain skrip Python untuk analisis data, merancang REST API dengan Express.js, maupun menulis utilitas Javascript backend/frontend. Beri tahu saya kebutuhan fungsional Anda!",
            responses: {
                app_python_api: {
                    title: "Python Request Fetcher & JSON Parser",
                    lang: "python",
                    text: "Skrip Python menggunakan library `requests` untuk melakukan pemanggilan HTTP GET API eksternal secara aman.",
                    code: `import requests

def get_data(url):
    response = requests.get(url, timeout=5)
    return response.json()`
                },
                app_node_server: {
                    title: "NodeJS Express REST Server & Routing",
                    lang: "javascript",
                    text: "Template web server menggunakan framework **Express.js** di Node.js.",
                    code: `const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => console.log('Server running!'));`
                },
                app_js_local: {
                    title: "Robust LocalStorage Handler Utility",
                    lang: "javascript",
                    text: "Kelas utilitas Javascript modular untuk menyimpan, memuat, dan menghapus data kompleks secara aman dari LocalStorage.",
                    code: `class Storage {
    static save(key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    }
}`
                }
            }
        },
        tanya: {
            modeName: "General Q&A Assistant",
            suggestions: [
                { text: "Apa itu Pemrograman?", id: "tanya_programming" },
                { text: "Cara Belajar Coding", id: "tanya_learn" },
                { text: "Apa itu Database?", id: "tanya_db" }
            ],
            defaultAnswer: "Halo! Saya adalah General Q&A Assistant. Di sini Anda bisa menanyakan apa saja tentang konsep pemrograman, tips belajar coding, cara kerja database, atau teori dasar web dan game. Silakan ajukan pertanyaan Anda!",
            responses: {
                tanya_programming: {
                    title: "Apa itu Pemrograman?",
                    lang: "text",
                    text: "Pemrograman adalah proses menulis, menguji, memperbaiki (debug), dan memelihara kode instruksi yang dijalankan oleh komputer. Kode ini ditulis menggunakan bahasa pemrograman (seperti Python, Lua, Javascript, C++) untuk memecahkan masalah atau membuat aplikasi.",
                    code: null
                },
                tanya_learn: {
                    title: "Cara Belajar Coding untuk Pemula",
                    lang: "text",
                    text: "1. **Pilih Satu Bahasa Pertama**: Pelajari bahasa yang ramah pemula seperti Python (aplikasi) atau Javascript (web) atau Lua (Roblox).\n2. **Pahami Dasar-dasar**: Kuasai konsep Variabel, Tipe Data, Percabangan (If-Else), dan Perulangan (Loops).\n3. **Mulai Proyek Kecil**: Buat game tebak angka, kalkulator sederhana, atau website portofolio sendiri.\n4. **Belajar Konsisten**: Luangkan waktu 30-60 menit setiap hari untuk menulis kode.",
                    code: null
                },
                tanya_db: {
                    title: "Apa itu Database (Basis Data)?",
                    lang: "text",
                    text: "Database adalah wadah penyimpanan data digital terstruktur di dalam komputer. Contohnya, saat Anda bermain game Roblox, koin dan level Anda disimpan di database server agar tidak hilang saat Anda keluar game. Jenis database populer adalah SQL (MySQL, PostgreSQL) dan NoSQL (MongoDB, Firebase).",
                    code: null
                }
            }
        }
    };

    // Load presets and dynamic creator entries from localStorage if exists
    if (localStorage.getItem("custom_presets")) {
        try {
            const customs = JSON.parse(localStorage.getItem("custom_presets"));
            customs.forEach(c => {
                // Ensure dynamic entries map correctly
                if (codingPresets[c.category]) {
                    codingPresets[c.category].suggestions.push({ text: c.title, id: c.id });
                    codingPresets[c.category].responses[c.id] = {
                        title: c.title,
                        lang: c.lang,
                        text: c.desc,
                        code: c.code
                    };
                }
            });
        } catch (e) {
            console.error("Gagal memuat preset khusus dari localStorage:", e);
        }
    }

    /* ==========================================
       USER REPOSITORY & SESSION CONTROLLERS
       ========================================== */

    function initUserDatabase() {
        const storedUsers = localStorage.getItem("app_users");
        // Wipe old trial accounts database (checks if 'admin' user is present) or initialize if null
        if (!storedUsers || storedUsers.includes('"username":"admin"')) {
            users = [
                { username: "kpljk", password: "AdminX888", role: "admin" }
            ];
            localStorage.setItem("app_users", JSON.stringify(users));
            localStorage.removeItem("app_current_user"); // Clear active old sessions
            currentUser = null;
        } else {
            users = JSON.parse(storedUsers);
        }

        const storedSession = localStorage.getItem("app_current_user");
        if (storedSession) {
            currentUser = JSON.parse(storedSession);
        }
    }

    function checkSession() {
        if (!currentUser) {
            // Not Logged In State: Hide elements, show login screen
            tabsBar.classList.add("hidden");
            panelFooter.classList.add("hidden");
            
            chatInputView.classList.add("hidden");
            creatorView.classList.add("hidden");
            adminView.classList.add("hidden");
            
            authContainer.classList.remove("hidden");
            headerUserProfile.classList.add("hidden");
            headerStatus.classList.remove("hidden");
            panelMainTitle.textContent = "Antigravity AI (Sign In)";
        } else {
            // Logged In State: Show navigation, show active view
            authContainer.classList.add("hidden");
            headerUserProfile.classList.remove("hidden");
            headerStatus.classList.add("hidden");
            tabsBar.classList.remove("hidden");
            
            panelMainTitle.textContent = "Antigravity AI Coder";
            headerUserName.textContent = currentUser.username;
            
            // Format role tag badge
            headerUserRole.className = `user-role-tag ${currentUser.role}`;
            headerUserRole.textContent = currentUser.role === "biasa" ? "Biasa" : currentUser.role;

            // Render Role-specific tabs
            const cTab = tabsBar.querySelector(".creator-tab");
            const aTab = tabsBar.querySelector(".admin-tab");
            
            if (currentUser.role === "creator") {
                cTab.classList.remove("hidden");
                aTab.classList.add("hidden");
            } else if (currentUser.role === "admin") {
                cTab.classList.remove("hidden");
                aTab.classList.remove("hidden");
            } else {
                cTab.classList.add("hidden");
                aTab.classList.add("hidden");
            }

            // Fallback back to standard chat categories if user has role studio active but logged out or demoted
            if ((currentCategory === "creator" && currentUser.role === "biasa") || 
                (currentCategory === "admin" && currentUser.role !== "admin")) {
                switchCategory("roblox");
            } else {
                switchCategory(currentCategory);
            }
        }
    }

    // Switch screens (categories tabs / role studio)
    function switchCategory(cat) {
        currentCategory = cat;
        tabButtons.forEach(btn => {
            if (btn.getAttribute("data-category") === cat) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });

        // Hide all views first
        chatInputView.classList.add("hidden");
        creatorView.classList.add("hidden");
        adminView.classList.add("hidden");
        panelFooter.classList.add("hidden");

        if (cat === "creator") {
            // Show Creator Form
            creatorView.classList.remove("hidden");
            currentModeText.textContent = "Creator Studio";
            showToast("🎨 Membuka Creator Studio", "mode");
        } else if (cat === "admin") {
            // Show Admin Panel Control
            adminView.classList.remove("hidden");
            currentModeText.textContent = "Admin Control";
            renderAdminUsersTable();
            showToast("🛠️ Membuka Panel Admin", "mode");
        } else {
            // Show standard Chat log
            chatInputView.classList.remove("hidden");
            panelFooter.classList.remove("hidden");
            
            const db = codingPresets[currentCategory];
            currentModeText.textContent = db.modeName;
            updateSuggestions();
        }
    }

    /* ==========================================
       LOGIN & REGISTRATION EVENT HANDLERS
       ========================================== */

    linkToRegister.addEventListener("click", (e) => {
        e.preventDefault();
        loginScreen.classList.add("hidden");
        registerScreen.classList.remove("hidden");
    });

    linkToLogin.addEventListener("click", (e) => {
        e.preventDefault();
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");
    });

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("login-username").value.trim();
        const password = document.getElementById("login-password").value;

        const matched = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
        
        if (matched) {
            currentUser = matched;
            localStorage.setItem("app_current_user", JSON.stringify(currentUser));
            
            // Reset input values
            loginForm.reset();
            
            checkSession();
            showToast(`👋 Selamat datang kembali, ${currentUser.username}!`, "success");
        } else {
            showToast("❌ Username atau Password salah!", "info");
        }
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("register-username").value.trim();
        const password = document.getElementById("register-password").value;
        const role = "biasa"; // Default role for registrations

        // Check if user already exists
        const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
        
        if (exists) {
            showToast("❌ Username ini sudah terdaftar!", "info");
            return;
        }

        const newUser = { username, password, role };
        users.push(newUser);
        localStorage.setItem("app_users", JSON.stringify(users));

        // Auto-login registered user
        currentUser = newUser;
        localStorage.setItem("app_current_user", JSON.stringify(currentUser));

        registerForm.reset();
        registerScreen.classList.add("hidden");
        loginScreen.classList.remove("hidden");

        checkSession();
        showToast(`🎉 Akun ${username} berhasil dibuat!`, "success");
    });

    btnLogout.addEventListener("click", () => {
        currentUser = null;
        localStorage.removeItem("app_current_user");
        checkSession();
        showToast("🚪 Anda telah keluar (signed out)", "system");
    });

    /* ==========================================
       CREATOR STUDIO: CUSTOM PRESET ADDER
       ========================================== */

    creatorPresetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const category = document.getElementById("preset-category").value;
        const lang = document.getElementById("preset-lang").value.trim().toLowerCase();
        const title = document.getElementById("preset-title").value.trim();
        const desc = document.getElementById("preset-desc").value.trim();
        const code = document.getElementById("preset-code").value.trim();

        const presetId = `custom_${category}_${Date.now()}`;

        // Save local preset in-memory structure
        if (codingPresets[category]) {
            codingPresets[category].suggestions.push({ text: title, id: presetId });
            codingPresets[category].responses[presetId] = {
                title: title,
                lang: lang,
                text: desc,
                code: code
            };

            // Write custom preset list to localStorage
            const customPresets = JSON.parse(localStorage.getItem("custom_presets") || "[]");
            customPresets.push({ category, lang, title, desc, code, id: presetId });
            localStorage.setItem("custom_presets", JSON.stringify(customPresets));

            creatorPresetForm.reset();
            
            showToast("🚀 Preset kode dipublikasikan ke AI!", "success");
            
            // Auto redirect back to code view
            switchCategory(category);
        } else {
            showToast("❌ Terjadi kesalahan kategori!", "info");
        }
    });

    /* ==========================================
       ADMIN PANEL: USER LIST RENDER
       ========================================== */

    function renderAdminUsersTable() {
        adminUsersList.innerHTML = "";

        users.forEach(user => {
            const tr = document.createElement("tr");
            
            // Build columns
            const nameTd = document.createElement("td");
            nameTd.innerHTML = `<strong>${escapeHTML(user.username)}</strong>`;
            
            const roleTd = document.createElement("td");
            roleTd.innerHTML = `<span class="user-role-tag ${user.role}">${user.role}</span>`;
            
            const editTd = document.createElement("td");
            // Disable role modifying on oneself or the default administrator
            if (user.username === currentUser.username || user.username === "kpljk") {
                editTd.innerHTML = `<span style="color: var(--text-dark); font-size: 0.7rem;">Tidak dapat diubah</span>`;
            } else {
                const select = document.createElement("select");
                const roles = ["biasa", "creator", "admin"];
                roles.forEach(r => {
                    const opt = document.createElement("option");
                    opt.value = r;
                    opt.textContent = r === "biasa" ? "Biasa" : r;
                    if (user.role === r) opt.selected = true;
                    select.appendChild(opt);
                });
                
                select.addEventListener("change", (e) => {
                    updateUserRole(user.username, e.target.value);
                });
                editTd.appendChild(select);
            }
            
            const delTd = document.createElement("td");
            if (user.username === currentUser.username || user.username === "kpljk") {
                delTd.innerHTML = `&mdash;`;
            } else {
                const delBtn = document.createElement("button");
                delBtn.className = "btn-delete-user";
                delBtn.title = "Hapus Pengguna";
                delBtn.innerHTML = `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`;
                
                delBtn.addEventListener("click", () => {
                    if (confirm(`Apakah Anda yakin ingin menghapus pengguna ${user.username}?`)) {
                        deleteUser(user.username);
                    }
                });
                delTd.appendChild(delBtn);
            }

            tr.appendChild(nameTd);
            tr.appendChild(roleTd);
            tr.appendChild(editTd);
            tr.appendChild(delTd);
            adminUsersList.appendChild(tr);
        });
    }

    function updateUserRole(username, newRole) {
        users = users.map(u => {
            if (u.username.toLowerCase() === username.toLowerCase()) {
                u.role = newRole;
            }
            return u;
        });
        localStorage.setItem("app_users", JSON.stringify(users));
        showToast(`⚙️ Role ${username} diubah ke ${newRole}`, "success");
        renderAdminUsersTable();
    }

    function deleteUser(username) {
        users = users.filter(u => u.username.toLowerCase() !== username.toLowerCase());
        localStorage.setItem("app_users", JSON.stringify(users));
        showToast(`🧹 Pengguna ${username} berhasil dihapus`, "system");
        renderAdminUsersTable();
    }

    /* ==========================================
       THEME / GLOW SWITCHER
       ========================================== */

    btnGlobalTheme.addEventListener("click", () => {
        if (activeTheme === "violet") {
            activeTheme = "cyan";
            container.className = "floating-panel active-theme-cyan";
            triggerBubble.className = "minimized-bubble hidden active-theme-cyan";
            showToast("🎨 Tema diubah ke Cyan Mode", "theme");
        } else if (activeTheme === "cyan") {
            activeTheme = "emerald";
            container.className = "floating-panel active-theme-emerald";
            triggerBubble.className = "minimized-bubble hidden active-theme-emerald";
            showToast("🎨 Tema diubah ke Emerald Mode", "theme");
        } else {
            activeTheme = "violet";
            container.className = "floating-panel active-theme-violet";
            triggerBubble.className = "minimized-bubble hidden active-theme-violet";
            showToast("🎨 Tema diubah ke Violet Mode", "theme");
        }
        
        document.querySelector(".orb-1").style.background = `radial-gradient(circle, var(--theme-primary) 0%, transparent 70%)`;
        document.querySelector(".orb-2").style.background = `radial-gradient(circle, var(--theme-secondary) 0%, transparent 70%)`;
    });

    /* ==========================================
       DRAG-AND-DROP MECHANICS
       ========================================== */

    header.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", dragEnd);

    header.addEventListener("touchstart", dragStart, { passive: true });
    document.addEventListener("touchmove", dragMove, { passive: false });
    document.addEventListener("touchend", dragEnd);

    function dragStart(e) {
        if (e.target.closest(".header-window-actions") || e.target.closest(".btn-theme-toggle") || e.target.closest(".header-user-area")) {
            return; // Skip drag on interactables
        }
        
        isDragging = true;
        container.classList.add("dragging");
        
        const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
        
        const rect = container.getBoundingClientRect();
        dragStartX = clientX - rect.left;
        dragStartY = clientY - rect.top;
    }

    function dragMove(e) {
        if (!isDragging) return;
        
        if (e.type.startsWith("touch")) {
            e.preventDefault();
        }

        const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

        panelLeft = clientX - dragStartX;
        panelTop = clientY - dragStartY;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const panelWidth = container.offsetWidth;
        const panelHeight = container.offsetHeight;

        if (panelLeft < 0) panelLeft = 0;
        if (panelTop < 0) panelTop = 0;
        if (panelLeft + panelWidth > viewportWidth) panelLeft = viewportWidth - panelWidth;
        if (panelTop + panelHeight > viewportHeight) panelTop = viewportHeight - panelHeight;

        container.style.left = `${panelLeft}px`;
        container.style.top = `${panelTop}px`;
        container.style.right = 'auto';
    }

    function dragEnd() {
        if (!isDragging) return;
        isDragging = false;
        container.classList.remove("dragging");
    }

    /* ==========================================
       MINIMIZE / EXPAND TRIGGERS
       ========================================== */

    btnMinimize.addEventListener("click", () => {
        container.classList.add("minimized");
        triggerBubble.classList.remove("hidden");
        
        unreadMessagesCount = 0;
        updateBubbleNotification();
        
        setTimeout(() => {
            unreadMessagesCount = 1;
            updateBubbleNotification();
            showToast("💬 Antigravity AI Coder diminimalkan", "system");
        }, 1200);
    });

    triggerBubble.addEventListener("click", () => {
        container.classList.remove("minimized");
        triggerBubble.classList.add("hidden");
        unreadMessagesCount = 0;
        updateBubbleNotification();
        
        const rect = container.getBoundingClientRect();
        if (rect.top < 0 || rect.left < 0 || rect.right > window.innerWidth || rect.bottom > window.innerHeight) {
            container.style.top = "80px";
            container.style.right = "40px";
            container.style.left = "auto";
        }
    });

    function updateBubbleNotification() {
        if (unreadMessagesCount > 0) {
            bubbleNotification.textContent = unreadMessagesCount;
            bubbleNotification.style.display = "block";
        } else {
            bubbleNotification.style.display = "none";
        }
    }

    /* ==========================================
       CATEGORY TABS MANAGEMENT
       ========================================== */

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const cat = btn.getAttribute("data-category");
            switchCategory(cat);
        });
    });

    function updateSuggestions() {
        suggestionsBox.innerHTML = "";
        const prompts = codingPresets[currentCategory].suggestions;
        
        prompts.forEach(p => {
            const chip = document.createElement("button");
            chip.className = "suggestion-chip";
            chip.innerHTML = `<span>⚡</span> ${p.text}`;
            chip.addEventListener("click", () => {
                triggerPresetResponse(p.id);
            });
            suggestionsBox.appendChild(chip);
        });
    }

    /* ==========================================
       AI DIALOGUE SIMULATION ENGINE
       ========================================== */

    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        appendUserMessage(query);
        chatInput.value = "";

        showTyping(true);

        setTimeout(() => {
            showTyping(false);
            processQuery(query);
        }, 1000 + Math.random() * 800);
    });

    btnClearChat.addEventListener("click", () => {
        chatMessages.innerHTML = "";
        const db = codingPresets[currentCategory];
        appendSystemMessage(db.defaultAnswer);
        showToast("🧹 Chat dibersihkan", "system");
    });

    function appendUserMessage(text) {
        const msg = document.createElement("div");
        msg.className = "message user-msg";
        msg.innerHTML = `
            <div class="msg-avatar">👤</div>
            <div class="msg-bubble">
                <p>${escapeHTML(text)}</p>
            </div>
        `;
        chatMessages.appendChild(msg);
        scrollToBottom();
    }

    function appendSystemMessage(text) {
        const msg = document.createElement("div");
        msg.className = "message system-msg";
        msg.innerHTML = `
            <div class="msg-avatar">🤖</div>
            <div class="msg-bubble">
                <p>${text}</p>
            </div>
        `;
        chatMessages.appendChild(msg);
        scrollToBottom();
    }

    function showTyping(show) {
        if (show) {
            typingIndicator.classList.remove("hidden");
            scrollToBottom();
        } else {
            typingIndicator.classList.add("hidden");
        }
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    function triggerPresetResponse(presetId) {
        const data = codingPresets[currentCategory].responses[presetId];
        if (!data) return;

        appendUserMessage(`Berikan template kode: ${data.title}`);
        showTyping(true);

        setTimeout(() => {
            showTyping(false);
            appendAIResponse(data.title, data.text, data.code, data.lang);
        }, 800);
    }

    function processQuery(query) {
        const lower = query.toLowerCase();
        let matchedResponse = null;

        const keys = Object.keys(codingPresets[currentCategory].responses);
        for (let key of keys) {
            const shortName = key.split("_")[1] || "";
            if (shortName && (lower.includes(shortName) || (currentCategory === "roblox" && lower.includes("leaderboard") && key.includes("leaderstats")))) {
                matchedResponse = codingPresets[currentCategory].responses[key];
                break;
            }
        }

        if (matchedResponse) {
            appendAIResponse(matchedResponse.title, matchedResponse.text, matchedResponse.code, matchedResponse.lang);
            return;
        }

        // Q&A Category general answers
        if (currentCategory === "tanya") {
            const responseText = `Pertanyaan yang bagus tentang **"${escapeHTML(query)}"**!\n\nDi dalam pemrograman dan rekayasa perangkat lunak:\n\n1. **Teori Dasar**: Memahami konsep dasar dan bagaimana komponen ini bekerja.\n2. **Implementasi**: Menghubungkannya dengan alur kerja pembuatan web, game (Roblox/Unity), atau aplikasi Python.\n3. **Praktik Terbaik**: Menerapkannya secara konsisten untuk membuat program yang efisien.\n\nApakah ada aspek tertentu tentang konsep tersebut yang ingin saya jelaskan lebih jauh?`;
            appendAIResponse("Asisten Tanya AI", responseText, null, null);
            return;
        }

        // Conversational/Explanation checks
        const isQuestion = lower.includes("apa") || lower.includes("bagaimana") || lower.includes("jelaskan") || 
                           lower.includes("kenapa") || lower.includes("mengapa") || lower.includes("gimana") || 
                           lower.includes("arti") || lower.includes("maksud") || lower.includes("tanya") || 
                           lower.includes("cara kerja") || lower.includes("tutorial");
                           
        const asksForCode = lower.includes("buatkan") || lower.includes("tuliskan") || lower.includes("bikin") || 
                            lower.includes("code") || lower.includes("script") || lower.includes("skrip") || 
                            lower.includes("coding") || lower.includes("program") || lower.includes("contoh") ||
                            lower.includes("kode");

        // If it's a general question and NOT explicitly asking for a code block, we give a rich text explanation
        if (isQuestion && !asksForCode) {
            let answerText = "";
            let title = "Penjelasan AI";
            
            if (currentCategory === "roblox") {
                if (lower.includes("leaderstats") || lower.includes("leaderboard")) {
                    answerText = "**Leaderstats** adalah sistem bawaan di Roblox untuk menampilkan data statistik pemain di pojok kanan atas layar (seperti Koin, Level, atau Nilai). Untuk membuatnya, Anda perlu menggunakan folder khusus bernama `leaderstats` yang dipasang di dalam objek Player di server.";
                } else if (lower.includes("kill brick") || lower.includes("menyentuh") || lower.includes("part")) {
                    answerText = "**Kill Brick** bekerja dengan mendeteksi event `.Touched` pada objek Part. Ketika objek lain menyentuhnya, skrip akan memeriksa apakah penyentuh tersebut memiliki component `Humanoid` (yang menandakan karakter pemain). Jika ada, nyawa (`Health`) humanoid tersebut diubah menjadi 0.";
                } else {
                    answerText = "Dalam Roblox Game Development, Luau Scripting digunakan untuk mengendalikan logika permainan. Objek dihubungkan lewat Events (seperti `.Touched`, `.Changed`) dan Services (seperti `Players`, `ReplicatedStorage`, `DataStoreService`).";
                }
                title = "Penjelasan Konsep Roblox";
            } else if (currentCategory === "web") {
                if (lower.includes("glassmorphism") || lower.includes("kaca")) {
                    answerText = "**Glassmorphism** adalah gaya visual semi-transparan mirip kaca buram. Efek ini dicapai menggunakan CSS dengan mengatur warna latar belakang transparan (misal `rgba(255,255,255,0.1)`) dan menerapkan filter blur latar belakang lewat properti `backdrop-filter: blur(10px)`. Jangan lupa tambahkan border tipis semi-transparan untuk efek kedalaman.";
                } else if (lower.includes("dark mode") || lower.includes("tema")) {
                    answerText = "Penerapan **Dark Mode** di website biasanya dilakukan dengan menambahkan class (seperti `.dark`) pada tag `html` atau `body` lewat Javascript. Setelah class ditambahkan, CSS Selector khusus (atau selector Tailwind `dark:`) akan aktif dan mengganti variabel warna ke skema gelap.";
                } else {
                    answerText = "Pengembangan **Web Frontend** berpusat pada tiga pilar: **HTML** untuk struktur, **CSS** untuk keindahan tata letak (Flexbox, Grid, Glassmorphic), dan **Javascript** untuk logika interaktif halaman.";
                }
                title = "Penjelasan Konsep Web Dev";
            } else if (currentCategory === "game") {
                if (lower.includes("unity") || lower.includes("c#")) {
                    answerText = "Di **Unity**, logika game ditulis menggunakan C# dengan mewarisi kelas `MonoBehaviour`. Fungsi penting seperti `Start()` berjalan sekali saat game dimulai, dan `Update()` berjalan di setiap frame game untuk mendeteksi input gerakan WASD atau klik mouse secara berkala.";
                } else if (lower.includes("godot") || lower.includes("gdscript")) {
                    answerText = "Di **Godot Engine**, kita menggunakan **GDScript** yang mirip Python. Objek diorganisasikan dalam bentuk Nodes dan Scene. Fungsi utama gerakan fisik biasanya ditangani di dalam fungsi `_physics_process(delta)` untuk hasil gerakan yang konsisten di semua FPS.";
                } else {
                    answerText = "Pengembangan game memerlukan pemahaman tentang **Game Loop** (input, update, render) serta sistem fisika untuk mendeteksi tabrakan (Collision), gaya gravitasi, dan kecerdasan buatan musuh (Enemy AI).";
                }
                title = "Penjelasan Konsep Game Dev";
            } else {
                answerText = `Sebagai asisten AI, saya dapat menjelaskan konsep pemrograman secara teori maupun praktis. Silakan tanyakan konsep spesifik tentang variabel, fungsi, database, atau integrasi API untuk kategori ${codingPresets[currentCategory].modeName}!`;
            }

            appendAIResponse(title, answerText, null, null);
            return;
        }

        if (lower.includes("roblox") || lower.includes("luau")) {
            appendAIResponse("Sistem Roblox", "Berikut adalah petunjuk membuat Script Roblox Luau. Saya juga memiliki beberapa preset siap pakai di mode tab Roblox.", `local Part = script.Parent
Part.Touched:Connect(function(other)
    local player = game.Players:GetPlayerFromCharacter(other.Parent)
    if player then
        print(player.Name .. " menyentuh Part!")
    end
end)`, "lua");
        } else if (lower.includes("css") || lower.includes("html") || lower.includes("glass") || lower.includes("web")) {
            appendAIResponse("Desain Web Modern", "Tentu! Ini adalah template UI web basic dengan card moderen.", `<div class="card">
  <h2>Antigravity AI</h2>
  <p>Website styling template</p>
</div>
<style>
.card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
}
</style>`, "html");
        } else if (lower.includes("unity") || lower.includes("game") || lower.includes("c#")) {
            appendAIResponse("Unity Game Scripting", "Berikut contoh scripting Unity C# untuk memutar objek secara berkala:", `using UnityEngine;

public class Rotator : MonoBehaviour {
    public float speed = 50.0f;
    void Update() {
        transform.Rotate(Vector3.up * speed * Time.deltaTime);
    }
}`, "csharp");
        } else {
            const categoryName = codingPresets[currentCategory].modeName;
            const fallbackText = `Saya memahami pertanyaan Anda tentang "${escapeHTML(query)}". Sebagai <strong>${categoryName}</strong>, saya merekomendasikan struktur logika berikut:`;
            const codeSample = currentCategory === "roblox" ? 
`-- Logika Roblox Luau
local Players = game:GetService("Players")
local player = Players.LocalPlayer
print("Selamat datang, " .. player.Name)` :
`// Logika Kode Aplikasi / Web
function initializeSystem() {
  console.log("System Initialized in ${categoryName}!");
}
initializeSystem();`;

            appendAIResponse("Rekomendasi Kode Antigravity", fallbackText, codeSample, currentCategory === "roblox" ? "lua" : "javascript");
        }
    }

    function appendAIResponse(title, text, code, lang) {
        const msg = document.createElement("div");
        msg.className = "message ai-msg";
        
        const safeText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        let codeHtml = "";
        if (code) {
            codeHtml = `
                <div class="code-block-wrapper">
                    <div class="code-header">
                        <span class="code-lang">${lang}</span>
                        <div class="code-actions">
                            <button class="btn-code-action btn-copy-inline" title="Salin">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                                <span>Copy</span>
                            </button>
                            <button class="btn-code-action btn-expand-code" title="Perbesar">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="15 3 21 3 21 9"></polygon><polygon points="9 21 3 21 3 15"></polygon><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                                <span>Expand</span>
                            </button>
                        </div>
                    </div>
                    <pre class="code-content-pre"><code>${escapeHTML(code)}</code></pre>
                </div>
            `;
        }

        msg.innerHTML = `
            <div class="msg-avatar">🤖</div>
            <div class="msg-bubble">
                <p><strong>${escapeHTML(title)}</strong></p>
                <p>${safeText}</p>
                ${codeHtml}
            </div>
        `;

        if (code) {
            const btnCopy = msg.querySelector(".btn-copy-inline");
            btnCopy.addEventListener("click", () => {
                copyTextToClipboard(code);
                showToast("📋 Kode berhasil disalin ke clipboard!", "success");
                
                const spanText = btnCopy.querySelector("span");
                spanText.textContent = "Copied!";
                btnCopy.style.color = "#10b981";
                setTimeout(() => {
                    spanText.textContent = "Copy";
                    btnCopy.style.color = "";
                }, 2000);
            });

            const btnExpandCode = msg.querySelector(".btn-expand-code");
            btnExpandCode.addEventListener("click", () => {
                openCodeModal(code, lang);
            });
        }

        chatMessages.appendChild(msg);
        scrollToBottom();
    }

    /* ==========================================
       CODE DETAIL MODAL MANAGER
       ========================================== */

    function openCodeModal(code, lang) {
        modalCodeBlock.textContent = code;
        modalCodeBlock.className = `language-${lang}`;
        codeModal.classList.remove("hidden");
        
        btnModalCopy.onclick = () => {
            copyTextToClipboard(code);
            showToast("📋 Kode lengkap berhasil disalin!", "success");
            
            btnModalCopy.textContent = "Berhasil Disalin! ✔";
            btnModalCopy.style.background = "#10b981";
            setTimeout(() => {
                btnModalCopy.textContent = "Salin Kode";
                btnModalCopy.style.background = "";
            }, 2000);
        };
    }

    btnCloseModal.addEventListener("click", () => {
        codeModal.classList.add("hidden");
    });

    codeModal.addEventListener("click", (e) => {
        if (e.target === codeModal) {
            codeModal.classList.add("hidden");
        }
    });

    /* ==========================================
       UTILITIES (TOASTS, CLIPBOARD)
       ========================================== */

    function copyTextToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand("copy");
            } catch (err) {
                console.error("Gagal menyalin text: ", err);
            }
            document.body.removeChild(textarea);
        }
    }

    function showToast(text, type = "info") {
        const toast = document.createElement("div");
        toast.className = "toast";
        
        let icon = "💡";
        if (type === "success") {
            icon = "✔";
            toast.style.borderLeftColor = "#10b981";
        } else if (type === "theme") {
            icon = "🎨";
        } else if (type === "mode") {
            icon = "⚙️";
        } else if (type === "system") {
            icon = "🤖";
        }
        
        toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${text}</span>`;
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = "toast-out 0.25s ease forwards";
            setTimeout(() => {
                toast.remove();
            }, 250);
        }, 3000);
    }

    // Startup Session & Database Initialization
    initUserDatabase();
    checkSession();
});

// Extra css keyframe for toast-out injected dynamically
const style = document.createElement("style");
style.innerHTML = `
@keyframes toast-out {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(-30px); opacity: 0; }
}
`;
document.head.appendChild(style);
