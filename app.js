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
    const bughunterView = document.getElementById("bughunter-content-view");
    const panelFooter = document.getElementById("panel-footer-bar");
    
    // Workspace Explorer Selectors
    const workspaceFiles = document.getElementById("workspace-files");
    const activeFilename = document.getElementById("active-filename");
    const editorLineNumbers = document.getElementById("editor-line-numbers");
    const editorInput = document.getElementById("workspace-editor-input");
    const editorHighlight = document.getElementById("workspace-editor-highlight");
    const btnRunPreview = document.getElementById("btn-run-preview");
    const btnGenFlowchart = document.getElementById("btn-gen-flowchart");
    
    // Live Preview Selectors
    const previewIframe = document.getElementById("live-preview-iframe");
    const previewConsole = document.getElementById("live-preview-console");
    const consoleLogOutput = document.getElementById("console-log-output");
    const previewFlowchart = document.getElementById("live-preview-flowchart");
    
    // Voice Coding & Context Selectors
    const btnVoiceInput = document.getElementById("btn-voice-input");
    const chatFileContext = document.getElementById("chat-file-context");
    
    // Bug Hunter Selectors
    const terminalErrorInput = document.getElementById("terminal-error-input");
    const btnHuntBugs = document.getElementById("btn-hunt-bugs");
    const bugAnalysisResult = document.getElementById("bug-analysis-result");
    const errorDetectedType = document.getElementById("error-detected-type");
    const errorDetectedDesc = document.getElementById("error-detected-desc");
    const errorDetectedSol = document.getElementById("error-detected-sol");
    const diffCodeBefore = document.getElementById("diff-code-before");
    const diffCodeAfter = document.getElementById("diff-code-after");
    const btnApplyBugfix = document.getElementById("btn-apply-bugfix");
    
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
        bughunterView.classList.add("hidden");
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
            showToast("🛠️ Panel Admin", "mode");
        } else if (cat === "bughunter") {
            // Show Bug Hunter View
            bughunterView.classList.remove("hidden");
            currentModeText.textContent = "Bug Hunter & Kamus Error";
            showToast("🪲 Membuka Bug Hunter", "mode");
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
        const contextFile = chatFileContext.value;

        // Custom Context-based response handler
        if (contextFile !== "none" && (lower.includes("optimalkan") || lower.includes("optimasi") || lower.includes("cepat") || lower.includes("jelaskan") || lower.includes("cara kerja") || lower.includes("maksud"))) {
            let contextContent = filesData[contextFile].content;
            let responseText = "";
            let responseTitle = `Optimasi File ${contextFile}`;
            let codeOutput = "";
            let lang = filesData[contextFile].lang;
            
            if (lower.includes("optimalkan") || lower.includes("optimasi") || lower.includes("cepat")) {
                if (contextFile === "main.py") {
                    responseText = "Optimasi dilakukan dengan mengimplementasikan Caching (Memoization) untuk pemanggilan user_id berulang agar menghemat eksekusi database.";
                    codeOutput = `# main.py (Dioptimalkan)
import json
import time

cache = {}

def process_data(user_id):
    if user_id in cache:
        return cache[user_id]
        
    print(f"Mengambil data untuk user: {user_id}")
    time.sleep(0.01) # database lookup optimized
    
    result = {
        "status": "success",
        "timestamp": int(time.time()),
        "data": {
            "coins": 2500,
            "level": 4
        }
    }
    cache[user_id] = json.dumps(result)
    return cache[user_id]

print(process_data("user_101"))`;
                } else if (contextFile === "index.html") {
                    responseText = "Optimasi performa rendering halaman dengan menambahkan dynamic viewport sizing dan fallback font stack.";
                    codeOutput = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #090d16; font-family: system-ui, sans-serif; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Render Optimized</h1>
    </div>
</body>
</html>`;
                } else if (contextFile === "style.css") {
                    responseText = "Optimasi CSS dengan merapikan custom properties, menyingkirkan transisi redundant, dan menambahkan hardware acceleration.";
                    codeOutput = `/* style.css (Dioptimalkan) */
.container {
    background: rgba(139, 92, 246, 0.15);
    border: 1px solid var(--theme-primary);
    box-shadow: 0 0 25px var(--theme-glow);
    transform: translateZ(0); /* Hardware acceleration */
}`;
                } else if (contextFile === "Index.java") {
                    responseText = "Optimasi dilakukan dengan menghindari Exception crash null dan menambahkan validation logic.";
                    codeOutput = `// Index.java (Dioptimalkan)
public class UserController {
    private String username;
    private String role;

    public UserController(String username, String role) {
        this.username = username != null ? username : "Guest";
        this.role = role != null ? role : "Biasa";
    }

    public void displayUserInfo() {
        System.out.println("User: " + this.username + " (" + this.role + ")");
    }
}`;
                } else {
                    responseText = `File ${contextFile} dioptimalkan dengan memperpendek memory flow.`;
                    codeOutput = contextContent;
                }
                appendAIResponse(responseTitle, responseText, codeOutput, lang);
                return;
            } else if (lower.includes("jelaskan") || lower.includes("cara kerja") || lower.includes("maksud")) {
                let expl = "";
                if (contextFile === "Index.java") {
                    expl = "File `Index.java` mendefinisikan class `UserController` untuk otentikasi user. Jika parameter username instansiasi bernilai null, memicu Java NullPointerException runtime crash.";
                } else if (contextFile === "main.py") {
                    expl = "File `main.py` adalah penanganan database simulation di Python. Terdapat method `process_data` dengan penundaan pemrosesan 1 detik menggunakan `time.sleep(1)`.";
                } else if (contextFile === "index.html") {
                    expl = "File `index.html` menyusun struktur UI visual preview utama dengan class `.container` bergaya glassmorphism.";
                } else {
                    expl = `File \`${contextFile}\` menyimpan konfigurasi workspace active.`;
                }
                appendAIResponse(`Penjelasan File ${contextFile}`, expl, null, null);
                return;
            }
        }

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
            const queryTopic = query.replace(/(bagaimana|apa itu|jelaskan tentang|cara kerja|maksud dari|apa sih|apa|bagaimana cara|cara)/gi, "").trim();
            const titleTopic = queryTopic.charAt(0).toUpperCase() + queryTopic.slice(1);
            
            let explanationText = "";
            let matchedTopic = false;

            if (lower.includes("database") || lower.includes("basis data") || lower.includes("db")) {
                matchedTopic = true;
                explanationText = `### Arsitektur & Manajemen Database (Basis Data)

1. **Definisi Teknis**:
   Database adalah sistem penyimpanan data digital yang terstruktur, dikelola, dan diakses secara terkomputerisasi. Berbeda dengan file teks biasa, database dioptimalkan untuk penanganan volume data besar dengan performa tinggi.

2. **Prinsip Kerja & Tipe**:
   * **Relational (SQL)**: Menyimpan data dalam tabel baris-kolom dengan skema kaku. Menggunakan relasi primary-foreign key. Contoh: *PostgreSQL, MySQL, SQLite*.
   * **Non-Relational (NoSQL)**: Menyimpan data dalam dokumen JSON, pasangan key-value, atau grafik tanpa skema tetap. Contoh: *MongoDB, Redis, Firebase Firestore*.

3. **Penerapan dalam Pemrograman**:
   Logika kode terhubung ke database menggunakan **ORM (Object-Relational Mapping)** seperti Prisma atau Sequelize, atau driver native query. Koneksi dibuka menggunakan string URL (misal: \`postgresql://user:pass@localhost:5432/db\`).

4. **Metode Optimasi (Best Practice)**:
   * **Indexing**: Buat indeks pada kolom yang paling sering digunakan dalam query pencarian (\`WHERE\`) untuk mempercepat retrieval data.
   * **Connection Pooling**: Batasi pembukaan koneksi baru secara terus-menerus dengan mendaur ulang koneksi aktif untuk menghemat memori server.
   * **Sanitization (SQL Injection Prevention)**: Selalu gunakan parameterized queries atau ORM untuk mencegah eksekusi kode berbahaya dari input pengguna.`;
            } else if (lower.includes("api") || lower.includes("rest") || lower.includes("http")) {
                matchedTopic = true;
                explanationText = `### Arsitektur API (Application Programming Interface) & REST

1. **Definisi Teknis**:
   API adalah antarmuka perangkat lunak yang memungkinkan dua atau lebih aplikasi terpisah untuk saling berkomunikasi, bertukar data, dan berinteraksi secara aman melalui protokol standar.

2. **Prinsip RESTful API**:
   REST (Representational State Transfer) menggunakan protokol HTTP dengan metode standar:
   * \`GET\`: Mengambil data dari server.
   * \`POST\`: Mengirimkan data baru untuk disimpan di server.
   * \`PUT\` / \`PATCH\`: Memperbarui data yang sudah ada.
   * \`DELETE\`: Menghapus data dari server.

3. **Format Data & Struktur**:
   REST API berkomunikasi menggunakan payload berbentuk **JSON** (JavaScript Object Notation). Struktur request terdiri dari Endpoint URL, Headers (autentikasi/konten), dan Body payload data.

4. **Best Practices Pengembangan**:
   * **Autentikasi Aman**: Amankan API menggunakan **JWT (JSON Web Token)** atau API Key di dalam Authorization Header.
   * **Handling Status Code**: Selalu return status code HTTP yang sesuai (misal: \`200 OK\`, \`201 Created\`, \`400 Bad Request\`, \`401 Unauthorized\`, \`500 Internal Server Error\`).
   * **Rate Limiting**: Batasi jumlah request per IP untuk mencegah serangan DDoS dan overload server.`;
            } else if (lower.includes("oop") || lower.includes("object oriented") || lower.includes("objek")) {
                matchedTopic = true;
                explanationText = `### Konsep Pemrograman Berorientasi Objek (OOP)

1. **Definisi Teknis**:
   OOP adalah paradigma pemrograman yang menyusun struktur kode berdasarkan "Objek" yang menggabungkan Data (State/Property) dan Perilaku (Behavior/Method) ke dalam satu kesatuan modular.

2. **Empat Pilar Utama OOP**:
   * **Encapsulation (Enkapsulasi)**: Membatasi akses langsung ke data objek dengan menyembunyikannya (menggunakan akses modifier \`private\` atau \`protected\`) dan mengeksposnya hanya lewat method getter/setter.
   * **Inheritance (Pewarisan)**: Mewariskan property dan method dari kelas induk (Parent Class) ke kelas anak (Child Class) untuk mencegah redundansi kode.
   * **Polymorphism (Polimorfisme)**: Kemampuan objek untuk mengambil banyak bentuk, biasanya lewat override method induk di kelas anak agar perilakunya spesifik.
   * **Abstraction (Abstraksi)**: Menyembunyikan detail implementasi internal yang kompleks dan hanya menampilkan interface luar yang sederhana kepada pengguna kode.

3. **Best Practices Pengembangan**:
   * **Prinsip SOLID**: Ikuti kaidah perancangan kelas yang modular (Single Responsibility, Open/Closed, dll.).
   * **Favor Composition over Inheritance**: Pilih menggabungkan objek kecil yang fungsional daripada membuat rantai pewarisan kelas yang terlalu dalam.`;
            } else if (lower.includes("git") || lower.includes("github") || lower.includes("version control")) {
                matchedTopic = true;
                explanationText = `### Git Version Control System (VCS)

1. **Definisi Teknis**:
   Git adalah sistem pengontrol versi terdistribusi yang mencatat riwayat perubahan kode sumber secara historis, memungkinkan kolaborasi tim pengembang tanpa menimpa pekerjaan satu sama lain.

2. **Prinsip Kerja & Alur Git**:
   * **Working Directory**: Tempat Anda mengedit file kode lokal secara fisik.
   * **Staging Area**: Buffer penyimpanan sementara (\`git add\`) untuk memilih perubahan mana yang akan dimasukkan ke commit berikutnya.
   * **Local Repository**: Riwayat commit permanen (\`git commit\`) yang disimpan secara lokal di mesin Anda.
   * **Remote Repository**: Server pusat di cloud (seperti *GitHub, GitLab*) tempat repositori diunggah (\`git push\`) untuk kolaborasi.

3. **Metode Kolaborasi (Branching)**:
   Gunakan fitur Branch untuk membuat ruang kerja terisolasi. Fitur baru dibuat di branch sekunder (misal: \`feature/login\`), lalu digabungkan kembali ke branch utama (\`main\`) menggunakan **Pull Request** setelah melalui peninjauan kode.

4. **Best Practices**:
   * **Commit Sering & Deskriptif**: Buat commit kecil untuk satu fungsionalitas spesifik dengan pesan commit yang jelas.
   * **Gunakan .gitignore**: Selalu abaikan folder dependensi (\`node_modules/\`), file konfigurasi lokal (\`.env\`), dan file sistem operasi (\`.DS_Store\`).`;
            } else if (lower.includes("variabel") || lower.includes("variable") || lower.includes("fungsi") || lower.includes("function")) {
                matchedTopic = true;
                explanationText = `### Variabel & Fungsi dalam Algoritma Pemrograman

1. **Analisis Variabel**:
   * **Definisi**: Wadah memori berlabel untuk menyimpan nilai sementara selama eksekusi program.
   * **Scope**: Cakupan akses variabel terbagi menjadi **Global** (dapat diakses di mana saja) dan **Local** (hanya dapat diakses di dalam blok fungsi tempat ia dideklarasikan).
   * **Manajemen Memori**: Bahasa tingkat tinggi menggunakan *Garbage Collection* otomatis untuk menghapus variabel yang sudah tidak digunakan dari RAM.

2. **Analisis Fungsi (Function)**:
   * **Definisi**: Blok kode modular yang dirancang untuk melakukan tugas tertentu dan dapat dijalankan berulang kali.
   * **Parameters vs Arguments**: *Parameters* adalah variabel yang dideklarasikan saat mendefinisikan fungsi, sedangkan *Arguments* adalah nilai nyata yang dikirimkan saat fungsi dipanggil.
   * **Pure Functions**: Fungsi yang selalu menghasilkan output yang sama untuk input yang sama tanpa memicu efek samping (side effects) di luar skop fungsi tersebut.

3. **Best Practices**:
   * **Descriptive Naming**: Gunakan konvensi penamaan yang jelas (camelCase, snake_case) yang menjelaskan fungsi variabel/fungsi tersebut secara langsung.
   * **Keep Functions Small**: Terapkan prinsip satu fungsi hanya melakukan satu tugas spesifik.`;
            } else if (lower.includes("hosting") || lower.includes("deploy") || lower.includes("server")) {
                matchedTopic = true;
                explanationText = `### Hosting & Deployment Aplikasi

1. **Definisi Teknis**:
   Deployment adalah proses memindahkan aplikasi yang sudah selesai dikembangkan dari lingkungan lokal (localhost) ke lingkungan server produksi agar dapat diakses oleh publik via internet.

2. **Perbedaan Tipe Hosting**:
   * **Static Hosting**: Hanya menyajikan file statis (HTML, CSS, JS) tanpa server backend dinamis. Contoh: *Vercel, Netlify, GitHub Pages*. Sangat cepat dan murah.
   * **Dynamic Hosting (PaaS/IaaS)**: Menjalankan server aplikasi aktif (seperti Node.js, Python, Java) dan database. Contoh: *Render, AWS EC2, Heroku*.
   * **Serverless**: Eksekusi fungsi kode individual berdasarkan event tanpa menyewa server 24/7. Contoh: *AWS Lambda, Vercel Serverless Functions*.

3. **Alur Deployment (CI/CD)**:
   Gunakan alur otomatisasi di mana setiap kali kode dikirim (\`git push\`) ke GitHub, server CI/CD (seperti GitHub Actions) akan memicu pengujian otomatis, membangun bundel aplikasi (*build*), dan merilis versi terbaru ke server hosting secara instan.`;
            }

            // Fallback general topic compiler if no matches found
            if (!matchedTopic) {
                explanationText = `### Analisis Teknis: ${titleTopic}

1. **Definisi & Konsep Utama**:
   Dalam rekayasa perangkat lunak, **${titleTopic}** merujuk pada integrasi logis komponen sistem pemrograman yang mengendalikan eksekusi kode, pengolahan data, atau penyusunan struktur instruksi aplikasi.

2. **Prinsip Kerja**:
   Sistem memproses entri parameter atau variabel masukan, memvalidasi aturan logika bahasa pemrograman yang mendasarinya, lalu mengubah status penyimpanan memori atau menghasilkan output tampilan antarmuka (UI).

3. **Penerapan Praktis**:
   Diimplementasikan secara langsung di dalam kerangka kerja (framework) atau game engine (seperti Roblox Studio, Unity, Web DOM, atau modul skrip Python) untuk memecahkan problem fungsional spesifik.

4. **Metode Optimasi (Best Practice)**:
   * Jaga agar struktur logika tetap modular dan mudah dibaca (clean code).
   * Hindari redundansi kode dengan menerapkan fungsi pembantu (helper functions).
   * Selalu lakukan exception handling (penanganan error) untuk menjaga stabilitas program.`;
            }

            appendAIResponse(`Analisis ${titleTopic}`, explanationText, null, null);
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
                            lower.includes("kode") || lower.includes("cara") || lower.includes("caranya") || 
                            lower.includes("bagaimana") || lower.includes("gimana") || lower.includes("jawaban") || 
                            lower.includes("jawabannya") || lower.includes("solusi") || lower.includes("solusinya") || 
                            lower.includes("tutorial");

        // If it's a general question and NOT explicitly asking for a code block, we give a rich text explanation
        if (isQuestion && !asksForCode) {
            let answerText = "";
            let title = "Penjelasan AI";
            
            if (currentCategory === "roblox") {
                if (lower.includes("leaderstats") || lower.includes("leaderboard")) {
                    answerText = "**Leaderstats** adalah sistem bawaan di Roblox untuk menampilkan data statistik pemain di pojok kanan atas layar (seperti Koin, Level, atau Nilai). Sistem ini dibuat menggunakan folder khusus bernama `leaderstats` yang dipasang di dalam objek Player di server.";
                } else if (lower.includes("kill brick") || lower.includes("menyentuh") || lower.includes("part")) {
                    answerText = "**Kill Brick** mendeteksi event `.Touched` pada objek Part. Ketika objek lain menyentuhnya, skrip akan memeriksa apakah penyentuh tersebut memiliki component `Humanoid` (yang menandakan karakter pemain). Jika ada, nyawa (`Health`) humanoid tersebut diubah menjadi 0.";
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

    /* ==========================================
       WORKSPACE FILES STATE & CORE EDITOR ENGINE
       ========================================== */

    let activeFile = "index.html";
    const filesData = {
        "index.html": {
            lang: "html",
            content: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            background: #090d16;
            color: #f8fafc;
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            padding: 30px;
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        h1 {
            background: linear-gradient(45deg, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-top: 0;
        }
        p { color: #94a3b8; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Antigravity Live Visual</h1>
        <p>Live preview rendered in sandbox iframe.</p>
    </div>
</body>
</html>`
        },
        "style.css": {
            lang: "css",
            content: `/* Cyberpunk UI Theme */
.container {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1));
    border: 1px solid #8b5cf6;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.2);
    transition: all 0.3s ease;
}
.container:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
}`
        },
        "main.py": {
            lang: "python",
            content: `# Quick API Fetcher & Analyzer
import json
import time

def process_data(user_id):
    print(f"Mengambil data untuk user: {user_id}")
    time.sleep(1)
    
    result = {
        "status": "success",
        "timestamp": int(time.time()),
        "data": {
            "coins": 2500,
            "level": 4
        }
    }
    return json.dumps(result)

# Run process
print(process_data("user_101"))`
        },
        "Index.java": {
            lang: "java",
            content: `// Java User Authentication Controller
public class UserController {
    private String username;
    private String role;

    public UserController(String username, String role) {
        this.username = username;
        this.role = role;
    }

    public void displayUserInfo() {
        if (this.username == null) {
            throw new NullPointerException("Username tidak diinisialisasi!");
        }
        System.out.println("User: " + this.username + " (" + this.role + ")");
    }

    public static void main(String[] args) {
        // PERINGATAN: Null username memicu NullPointerException
        UserController user = new UserController(null, "Biasa");
        user.displayUserInfo();
    }
}`
        }
    };

    function initWorkspaceEditor() {
        // Load initial file (index.html)
        loadWorkspaceFile("index.html");

        // Input change listener
        editorInput.addEventListener("input", () => {
            filesData[activeFile].content = editorInput.value;
            updateHighlighting();
            updateLineNumbers();
        });

        // Scroll listener to sync editor highlight pre and line numbers
        editorInput.addEventListener("scroll", () => {
            editorHighlight.parentElement.scrollTop = editorInput.scrollTop;
            editorHighlight.parentElement.scrollLeft = editorInput.scrollLeft;
            editorLineNumbers.scrollTop = editorInput.scrollTop;
        });

        // Double tab support or tabs
        editorInput.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();
                const start = editorInput.selectionStart;
                const end = editorInput.selectionEnd;
                editorInput.value = editorInput.value.substring(0, start) + "    " + editorInput.value.substring(end);
                editorInput.selectionStart = editorInput.selectionEnd = start + 4;
                filesData[activeFile].content = editorInput.value;
                updateHighlighting();
            }
        });

        // Switch files click listeners
        const fileItems = workspaceFiles.querySelectorAll(".file-item");
        fileItems.forEach(item => {
            item.addEventListener("click", () => {
                fileItems.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                
                const file = item.getAttribute("data-file");
                loadWorkspaceFile(file);
            });
        });

        // Button action click listeners
        btnRunPreview.addEventListener("click", () => {
            runActiveFilePreview();
        });

        btnGenFlowchart.addEventListener("click", () => {
            generateFlowchartForActiveFile();
        });
    }

    function loadWorkspaceFile(filename) {
        activeFile = filename;
        activeFilename.textContent = filename;
        
        const data = filesData[filename];
        editorInput.value = data.content;
        editorHighlight.className = `language-${data.lang}`;

        // Reset scroll position
        editorInput.scrollTop = 0;
        editorInput.scrollLeft = 0;
        editorHighlight.parentElement.scrollTop = 0;
        editorHighlight.parentElement.scrollLeft = 0;
        editorLineNumbers.scrollTop = 0;

        updateHighlighting();
        updateLineNumbers();
        
        // Auto-run preview upon switching
        runActiveFilePreview();
    }

    function updateLineNumbers() {
        const text = editorInput.value;
        const lineCount = text.split("\n").length || 1;
        
        let numbersHtml = "";
        for (let i = 1; i <= lineCount; i++) {
            numbersHtml += `<span>${i}</span>`;
        }
        editorLineNumbers.innerHTML = numbersHtml;
    }

    function updateHighlighting() {
        const text = editorInput.value;
        const lang = filesData[activeFile].lang;
        editorHighlight.innerHTML = highlightCodeText(text, lang);
    }

    function highlightCodeText(text, lang) {
        // Escape HTML
        let escaped = escapeHTML(text);

        if (lang === "html") {
            // Highlighting comments, tags, attributes
            escaped = escaped.replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="hl-comment">$1</span>');
            escaped = escaped.replace(/(&lt;\/?[a-zA-Z0-9\-]+)(.*?)(&gt;)/g, (m, p1, p2, p3) => {
                const attrs = p2.replace(/([a-zA-Z0-9\-]+)=(&quot;.*?&quot;)/g, '<span class="hl-attr">$1</span>=<span class="hl-string">$2</span>');
                return `<span class="hl-tag">${p1}</span>${attrs}<span class="hl-tag">${p3}</span>`;
            });
            return escaped;
        } else if (lang === "css") {
            // CSS Highlighting
            escaped = escaped.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');
            escaped = escaped.replace(/([a-zA-Z0-9\-\.\#\:\s]+)\s*\{/g, '<span class="hl-tag">$1</span> {');
            escaped = escaped.replace(/([a-zA-Z0-9\-]+)\s*:\s*(.*?)\s*;/g, '<span class="hl-attr">$1</span>: <span class="hl-string">$2</span>;');
            return escaped;
        } else if (lang === "python") {
            // Python keywords, comments, strings, functions
            escaped = escaped.replace(/(#[^\n]*)/g, '<span class="hl-comment">$1</span>');
            escaped = escaped.replace(/\b(def|class|if|else|elif|for|while|import|from|return|in|as|time|json)\b/g, '<span class="hl-keyword">$1</span>');
            escaped = escaped.replace(/(&quot;.*?&quot;|&#39;.*?&#39;)/g, '<span class="hl-string">$1</span>');
            escaped = escaped.replace(/\b([a-zA-Z0-9_]+)\(/g, '<span class="hl-function">$1</span>(');
            return escaped;
        } else if (lang === "java") {
            // Java keywords, comments, strings, functions
            escaped = escaped.replace(/(\/\/.*?$)/gm, '<span class="hl-comment">$1</span>');
            escaped = escaped.replace(/\b(public|class|private|protected|void|static|new|throw|if|else|return|null|System|out|println|String)\b/g, '<span class="hl-keyword">$1</span>');
            escaped = escaped.replace(/(&quot;.*?&quot;)/g, '<span class="hl-string">$1</span>');
            escaped = escaped.replace(/\b([a-zA-Z0-9_]+)\(/g, '<span class="hl-function">$1</span>(');
            return escaped;
        }
        
        return escaped;
    }

    /* ==========================================
       VISUAL PREVIEW ENGINE
       ========================================== */

    function runActiveFilePreview() {
        // Hide all previews first
        previewIframe.classList.add("hidden");
        previewConsole.classList.add("hidden");
        previewFlowchart.classList.add("hidden");
        
        const data = filesData[activeFile];
        
        if (data.lang === "html") {
            const cssContent = filesData["style.css"].content;
            let htmlContent = data.content;
            
            // Inject css into html head
            if (htmlContent.includes("</head>")) {
                htmlContent = htmlContent.replace("</head>", `<style>${cssContent}</style></head>`);
            } else {
                htmlContent = `<style>${cssContent}</style>` + htmlContent;
            }
            
            previewIframe.srcdoc = htmlContent;
            previewIframe.classList.remove("hidden");
            showToast("⚡ Preview HTML berhasil diperbarui!", "success");
        } else if (data.lang === "css") {
            showToast("ℹ️ CSS aktif - Mengalihkan preview ke index.html", "info");
            const cssContent = data.content;
            let htmlContent = filesData["index.html"].content;
            
            if (htmlContent.includes("</head>")) {
                htmlContent = htmlContent.replace("</head>", `<style>${cssContent}</style></head>`);
            } else {
                htmlContent = `<style>${cssContent}</style>` + htmlContent;
            }
            
            previewIframe.srcdoc = htmlContent;
            previewIframe.classList.remove("hidden");
        } else if (data.lang === "python") {
            previewConsole.classList.remove("hidden");
            consoleLogOutput.style.color = "#38bdf8";
            consoleLogOutput.innerHTML = "Initializing python runtime...\n";
            
            setTimeout(() => {
                consoleLogOutput.innerHTML += "$ python main.py\n";
            }, 300);
            
            setTimeout(() => {
                consoleLogOutput.innerHTML += "Mengambil data untuk user: user_101\n";
            }, 800);
            
            setTimeout(() => {
                consoleLogOutput.innerHTML += 'Output: {"status": "success", "timestamp": ' + Math.floor(Date.now()/1000) + ', "data": {"coins": 2500, "level": 4}}\n';
                showToast("🐍 Python script executed successfully!", "success");
            }, 1800);
        } else if (data.lang === "java") {
            previewConsole.classList.remove("hidden");
            consoleLogOutput.style.color = "#38bdf8";
            consoleLogOutput.innerHTML = "Compiling java controller...\n";
            
            setTimeout(() => {
                consoleLogOutput.innerHTML += "$ javac UserController.java\n";
            }, 400);
            
            setTimeout(() => {
                consoleLogOutput.innerHTML += "$ java UserController\n";
            }, 800);
            
            setTimeout(() => {
                const code = data.content;
                if (code.includes('UserController user = new UserController(null, "Biasa")') || code.includes('new UserController(null')) {
                    consoleLogOutput.innerHTML += `Exception in thread "main" java.lang.NullPointerException: Username tidak diinisialisasi!\n\tat UserController.displayUserInfo(UserController.java:12)\n\tat UserController.main(UserController.java:18)\n`;
                    consoleLogOutput.style.color = "#f87171";
                    showToast("❌ Java Runtime Error: NullPointerException!", "info");
                } else {
                    let matchedName = "kpljk";
                    const match = code.match(/new UserController\("(.+?)"/);
                    if (match && match[1]) matchedName = match[1];
                    
                    consoleLogOutput.innerHTML += `User: ${matchedName} (Admin)\n\nExecution Finished successfully.`;
                    consoleLogOutput.style.color = "#34d399";
                    showToast("☕ Java execution success!", "success");
                }
            }, 1400);
        }
    }

    /* ==========================================
       FLOWCHART GENERATOR
       ========================================== */

    function generateFlowchartForActiveFile() {
        previewIframe.classList.add("hidden");
        previewConsole.classList.add("hidden");
        previewFlowchart.classList.remove("hidden");
        previewFlowchart.innerHTML = "Menganalisis file untuk Flowchart...";

        const content = filesData[activeFile].content;
        const lang = filesData[activeFile].lang;

        let steps = [];

        if (lang === "html") {
            steps = [
                { type: "start", text: "Page Load Event" },
                { type: "process", text: "Load DOM elements" },
                { type: "decision", text: "Has external stylesheet?" },
                { type: "process", text: "Apply Embedded styles / style.css" },
                { type: "process", text: "Render visual elements (Card container)" },
                { type: "end", text: "Tampilan Halaman Utama" }
            ];
        } else if (lang === "css") {
            steps = [
                { type: "start", text: "Parse CSS Rules" },
                { type: "process", text: "Evaluate selectors (.container, .card)" },
                { type: "process", text: "Calculate properties (glassmorphism filter)" },
                { type: "process", text: "Add hover listeners transition scale" },
                { type: "end", text: "Style Rendered to Workspace" }
            ];
        } else if (lang === "python") {
            steps = [
                { type: "start", text: "Script Main Initialization" },
                { type: "process", text: "Call process_data('user_101')" },
                { type: "process", text: "Print fetching user data trace log" },
                { type: "process", text: "Simulate API payload fetch (Sleep 1s)" },
                { type: "process", text: "Compile JSON result string" },
                { type: "end", text: "Print Output Console JSON" }
            ];
        } else if (lang === "java") {
            const hasNull = content.includes('new UserController(null');
            steps = [
                { type: "start", text: "Java App Start (main method)" },
                { type: "process", text: "Instantiate UserController object" },
                { type: "process", text: "Call displayUserInfo()" },
                { type: "decision", text: "Is username == null?" },
                hasNull ? { type: "process", text: "Throw NullPointerException error", error: true } : { type: "process", text: "Print User data console logs" },
                { type: "end", text: hasNull ? "Crashed & Exit (Exit Code 1)" : "Success exit (Exit Code 0)" }
            ];
        }

        let svg = `<svg width="340" height="${steps.length * 90 + 20}" xmlns="http://www.w3.org/2000/svg" style="font-family: 'JetBrains Mono', monospace;">
            <defs>
                <linearGradient id="flow-node-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#8b5cf6"/>
                    <stop offset="100%" stop-color="#ec4899"/>
                </linearGradient>
                <linearGradient id="flow-err-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#f43f5e"/>
                    <stop offset="100%" stop-color="#be123c"/>
                </linearGradient>
            </defs>`;

        steps.forEach((step, idx) => {
            const y = idx * 90 + 20;
            const nextY = (idx + 1) * 90 + 20;

            if (idx < steps.length - 1) {
                svg += `
                <line x1="170" y1="${y + 46}" x2="170" y2="${nextY}" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
                <polygon points="167,${nextY - 4} 173,${nextY - 4} 170,${nextY}" fill="rgba(255,255,255,0.3)" />
                `;
            }

            const fill = step.error ? "url(#flow-err-grad)" : "rgba(15, 23, 42, 0.9)";
            const stroke = step.error ? "#f43f5e" : "url(#flow-node-grad)";

            if (step.type === "start" || step.type === "end") {
                svg += `<rect x="60" y="${y}" width="220" height="46" rx="23" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
            } else if (step.type === "decision") {
                svg += `<polygon points="170,${y} 280,${y+23} 170,${y+46} 60,${y+23}" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
            } else {
                svg += `<rect x="60" y="${y}" width="220" height="46" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
            }

            svg += `<text x="170" y="${y + 27}" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">${step.text}</text>`;
        });

        svg += `</svg>`;
        
        previewFlowchart.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; width:100%;">
                <div style="font-size:0.75rem; color:#8b5cf6; font-weight:700; margin-bottom:12px; letter-spacing:1px; text-transform:uppercase;">Flowchart: ${activeFile}</div>
                ${svg}
            </div>
        `;
        showToast("📊 Flowchart logika berhasil di-generate!", "success");
    }

    /* ==========================================
       SPEECH RECOGNITION (VOICE CODING)
       ========================================== */

    function initVoiceCoding() {
        if (!btnVoiceInput) return;

        let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            btnVoiceInput.title = "Voice Input tidak didukung oleh browser ini";
            btnVoiceInput.addEventListener("click", () => {
                showToast("❌ Web Speech API tidak didukung pada browser ini.", "info");
            });
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "id-ID";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        let isListening = false;

        btnVoiceInput.addEventListener("click", () => {
            if (isListening) {
                recognition.stop();
            } else {
                try {
                    recognition.start();
                    isListening = true;
                    btnVoiceInput.classList.add("listening");
                    showToast("🎙️ Mendengarkan perintah suara Anda...", "system");
                    panelMainTitle.textContent = "Listening Voice Command...";
                } catch (e) {
                    console.error(e);
                    showToast("❌ Gagal memulai perekaman audio", "info");
                }
            }
        });

        recognition.addEventListener("result", (event) => {
            const transcript = event.results[0][0].transcript;
            chatInput.value = transcript;
            showToast(`🎙️ Terdeteksi: "${transcript}"`, "success");
            
            setTimeout(() => {
                chatForm.dispatchEvent(new Event("submit"));
            }, 600);
        });

        recognition.addEventListener("end", () => {
            isListening = false;
            btnVoiceInput.classList.remove("listening");
            panelMainTitle.textContent = currentUser ? "Antigravity AI Coder" : "Antigravity AI (Sign In)";
        });

        recognition.addEventListener("error", (e) => {
            console.error(e);
            isListening = false;
            btnVoiceInput.classList.remove("listening");
            panelMainTitle.textContent = currentUser ? "Antigravity AI Coder" : "Antigravity AI (Sign In)";
            showToast("❌ Audio error atau izin mikrofon ditolak", "info");
        });
    }

    /* ==========================================
       BUG HUNTER & KAMUS ERROR ENGINE
       ========================================== */

    function initBugHunter() {
        if (!btnHuntBugs) return;

        btnHuntBugs.addEventListener("click", () => {
            const errLog = terminalErrorInput.value.trim();
            if (!errLog) {
                showToast("❌ Mohon masukkan teks error terlebih dahulu!", "info");
                return;
            }

            analyzeTerminalError(errLog);
        });

        btnApplyBugfix.addEventListener("click", () => {
            applyResolvedBugfix();
        });
    }

    let currentBugfixCode = "";
    let currentBugfixTargetFile = "";

    function analyzeTerminalError(errorText) {
        const lower = errorText.toLowerCase();
        let errorType = "";
        let errorDesc = "";
        let errorSol = "";
        let codeBefore = "";
        let codeAfter = "";
        let targetFile = "";
        
        let matched = false;

        if (lower.includes("nullpointerexception") || lower.includes("nullpointer")) {
            matched = true;
            errorType = "NullPointerException (Java)";
            errorDesc = "Terjadi saat program mencoba memanggil atau mengakses objek yang mereferensikan nilai null (tidak dideklarasikan / diisi kosong).";
            errorSol = "Inisialisasi objek UserController dengan parameter username String yang valid (bukan null) saat memanggil constructor.";
            targetFile = "Index.java";
            
            codeBefore = `// Baris 18: memicu NullPointerException
UserController user = new UserController(null, "Biasa");
user.displayUserInfo();`;
            
            codeAfter = `// Diperbaiki: inisialisasi username bernilai valid
UserController user = new UserController("kpljk", "Admin");
user.displayUserInfo();`;
            
            currentBugfixCode = filesData["Index.java"].content.replace(
                'UserController user = new UserController(null, "Biasa");',
                'UserController user = new UserController("kpljk", "Admin");'
            );
            currentBugfixTargetFile = "Index.java";
            
        } else if (lower.includes("zerodivisionerror") || lower.includes("division by zero") || lower.includes("divided by zero")) {
            matched = true;
            errorType = "ZeroDivisionError (Python)";
            errorDesc = "Terjadi ketika melakukan operasi pembagian dengan nilai pembagi (denominator) bernilai nol (0) secara langsung.";
            errorSol = "Tambahkan pemeriksaan logis 'if division == 0' sebelum melakukan kalkulasi nilai rata-rata atau rasio data.";
            targetFile = "main.py";
            
            codeBefore = `def hitung(a, b):
    return a / b`;
            
            codeAfter = `def hitung(a, b):
    if b == 0:
        return 0
    return a / b`;
            
            currentBugfixCode = filesData["main.py"].content + `\n\n# Fix ZeroDivision\ndef hitung(a, b):\n    if b == 0: return 0\n    return a / b`;
            currentBugfixTargetFile = "main.py";
            
        } else if (lower.includes("cannot read properties of undefined") || lower.includes("referenceerror")) {
            matched = true;
            errorType = "TypeError / ReferenceError (Javascript)";
            errorDesc = "Terjadi ketika mengakses properti dari variabel bernilai undefined atau memanggil method objek yang tidak eksis di memory.";
            errorSol = "Gunakan optional chaining selector (?.) atau inisialisasi default object object check.";
            targetFile = "index.html";
            
            codeBefore = `let name = user.profile.name; // Error jika profile undefined`;
            codeAfter = `let name = user?.profile?.name || "Guest"; // Solusi aman`;
            
            currentBugfixCode = filesData["index.html"].content;
            currentBugfixTargetFile = "index.html";
        }

        if (!matched) {
            errorType = "Unrecognized Exception / Compilation Error";
            errorDesc = "Terjadi kesalahan pada struktur logika syntax code atau library dependensi yang terputus saat runtime compiler.";
            errorSol = "Periksa kesesuaian penulisan kurung tutup, nama variabel, dan versi interpreter program Anda.";
            targetFile = activeFile;
            
            codeBefore = `// Terjadi error di file: ${targetFile}`;
            codeAfter = `// Coba ganti bagian logika yang crash dan jalankan ulang compiler.`;
            
            currentBugfixCode = filesData[activeFile].content;
            currentBugfixTargetFile = activeFile;
        }

        errorDetectedType.textContent = errorType;
        errorDetectedDesc.textContent = errorDesc;
        errorDetectedSol.textContent = errorSol;
        
        diffCodeBefore.textContent = codeBefore;
        diffCodeAfter.textContent = codeAfter;
        
        bugAnalysisResult.classList.remove("hidden");
        showToast("🪲 Analisis selesai! Bug & Solusi berhasil ditemukan.", "success");
    }

    function applyResolvedBugfix() {
        if (!currentBugfixTargetFile || !currentBugfixCode) return;
        
        filesData[currentBugfixTargetFile].content = currentBugfixCode;
        
        if (activeFile === currentBugfixTargetFile) {
            loadWorkspaceFile(activeFile);
        } else {
            showToast(`🔧 Perbaikan otomatis telah diterapkan ke file ${currentBugfixTargetFile}!`, "success");
        }
        
        bugAnalysisResult.classList.add("hidden");
        terminalErrorInput.value = "";
        
        runActiveFilePreview();
    }

    // Startup Session & Database Initialization
    initWorkspaceEditor();
    initVoiceCoding();
    initBugHunter();
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
