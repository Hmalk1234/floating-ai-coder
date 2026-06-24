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

    // Gemini Studio DOM Nodes
    const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
    const studioSidebar = document.getElementById("studio-sidebar");
    const tempSlider = document.getElementById("gemini-temp-slider");
    const tempDisplay = document.getElementById("temp-val-display");
    const modelSelect = document.getElementById("gemini-model-select");
    const systemInstructions = document.getElementById("system-instructions-input");
    const btnAttachFile = document.getElementById("btn-attach-file");
    const mediaAttachmentInput = document.getElementById("media-attachment-input");
    const mediaPreviewContainer = document.getElementById("media-preview-container");
    const floatingResizeHandle = document.getElementById("floating-resize-handle");

    // State Variables
    let currentCategory = "roblox";
    let activeTheme = "violet"; // violet, cyan, emerald
    
    // Main Dragging State
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let panelLeft = 0;
    let panelTop = 0;
    
    // Resizing State
    let isResizing = false;
    let resizeStartWidth = 0;
    let resizeStartHeight = 0;
    let resizeStartX = 0;
    let resizeStartY = 0;

    // Minimized Bubble Dragging State
    let bubbleIsDragging = false;
    let bubbleDragStartX = 0;
    let bubbleDragStartY = 0;
    let bubbleLeft = 0;
    let bubbleTop = 0;

    // Media Upload State
    let attachedMedia = [];
    
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
        // Initialize the comprehensive database of default roles
        if (!storedUsers || storedUsers.includes('"username":"admin"')) {
            users = [
                { username: "kpljk", password: "AdminX888", role: "admin" },
                { username: "XERO", password: "ADMINPOWER888", role: "admin" },
                { username: "CREATOR", password: "CREATORPOWER888", role: "creator" },
                { username: "USER", password: "USERPOWER888", role: "biasa" }
            ];
            localStorage.setItem("app_users", JSON.stringify(users));
            localStorage.removeItem("app_current_user"); // Clear old sessions
            currentUser = null;
        } else {
            users = JSON.parse(storedUsers);
            // Ensure default accounts are present
            const defaults = [
                { username: "kpljk", password: "AdminX888", role: "admin" },
                { username: "XERO", password: "ADMINPOWER888", role: "admin" },
                { username: "CREATOR", password: "CREATORPOWER888", role: "creator" },
                { username: "USER", password: "USERPOWER888", role: "biasa" }
            ];
            let updated = false;
            defaults.forEach(def => {
                if (!users.some(u => u.username === def.username)) {
                    users.push(def);
                    updated = true;
                }
            });
            if (updated) {
                localStorage.setItem("app_users", JSON.stringify(users));
            }
        }

        const storedSession = localStorage.getItem("app_current_user");
        if (storedSession) {
            currentUser = JSON.parse(storedSession);
        }
    }

    function checkSession() {
        const explorerWin = document.getElementById("window-explorer");
        const editorWin = document.getElementById("window-editor");
        const previewWin = document.getElementById("window-preview");
        const settingsWin = document.getElementById("window-settings");
        const appDock = document.querySelector(".application-dock");

        // Profile sub-nodes
        const profileUsername = document.getElementById("profile-username");
        const profileRoleBadge = document.getElementById("profile-role-badge");
        const creatorNavBtn = document.querySelector(".creator-only-nav");
        const adminNavBtn = document.querySelector(".admin-only-nav");

        if (!currentUser) {
            // Not Logged In State: Hide elements, show login screen
            tabsBar.classList.add("hidden");
            panelFooter.classList.add("hidden");
            
            chatInputView.classList.add("hidden");
            creatorView.classList.add("hidden");
            adminView.classList.add("hidden");
            bughunterView.classList.add("hidden");
            
            authContainer.classList.remove("hidden");
            headerUserProfile.classList.add("hidden");
            headerStatus.classList.remove("hidden");
            panelMainTitle.textContent = "Antigravity AI (Sign In)";

            // Hide all other desktop windows and dock until logged in
            if (explorerWin) explorerWin.classList.add("hidden");
            if (editorWin) editorWin.classList.add("hidden");
            if (previewWin) previewWin.classList.add("hidden");
            if (settingsWin) settingsWin.classList.add("hidden");
            if (appDock) appDock.classList.add("hidden");

            // Secure Gemini Studio settings
            if (btnToggleSidebar) btnToggleSidebar.classList.add("hidden");
            if (studioSidebar) studioSidebar.classList.add("hidden");
            if (container) {
                container.classList.remove("studio-wide");
                container.style.width = "460px";
            }
        } else {
            // Logged In State: Show navigation, show active view
            authContainer.classList.add("hidden");
            headerUserProfile.classList.remove("hidden");
            headerStatus.classList.add("hidden");
            tabsBar.classList.remove("hidden");
            panelFooter.classList.remove("hidden");
            
            panelMainTitle.textContent = "Antigravity AI Coder";
            headerUserName.textContent = currentUser.username;
            
            // Format role tag badge
            headerUserRole.className = `user-role-tag ${currentUser.role}`;
            headerUserRole.textContent = currentUser.role === "biasa" ? "Biasa" : currentUser.role;

            // Restore desktop windows and dock upon login
            if (explorerWin) {
                explorerWin.classList.remove("hidden");
                explorerWin.classList.remove("minimized");
            }
            if (editorWin) {
                editorWin.classList.remove("hidden");
                editorWin.classList.remove("minimized");
            }
            if (previewWin) {
                previewWin.classList.remove("hidden");
                previewWin.classList.remove("minimized");
            }
            if (appDock) appDock.classList.remove("hidden");

            // Reveal Gemini Studio settings toggle
            if (btnToggleSidebar) btnToggleSidebar.classList.remove("hidden");

            // Configure settings Control Center profile view
            if (profileUsername) profileUsername.textContent = currentUser.username;
            if (profileRoleBadge) {
                profileRoleBadge.className = `user-role-badge ${currentUser.role}`;
                profileRoleBadge.textContent = currentUser.role === "biasa" ? "Biasa" : currentUser.role;
            }

            // Configure settings sidebar navigations based on active role
            if (creatorNavBtn) {
                if (currentUser.role === "creator" || currentUser.role === "admin") {
                    creatorNavBtn.classList.remove("hidden");
                } else {
                    creatorNavBtn.classList.add("hidden");
                }
            }
            if (adminNavBtn) {
                if (currentUser.role === "admin") {
                    adminNavBtn.classList.remove("hidden");
                } else {
                    adminNavBtn.classList.add("hidden");
                }
            }

            // If they are locked out of their active tab, revert to profile tab
            const activeNavTab = document.querySelector(".settings-nav-btn.active");
            if (activeNavTab) {
                const tabName = activeNavTab.getAttribute("data-settings-tab");
                if (tabName === "creator" && currentUser.role === "biasa") {
                    switchSettingsTab("profile");
                } else if (tabName === "admin" && currentUser.role !== "admin") {
                    switchSettingsTab("profile");
                }
            }

            // Render admin tables if admin
            if (currentUser.role === "admin") {
                renderAdminUsersTable();
            }

            switchCategory(currentCategory);
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
       LOGIN & REGISTRATION EVENT HANDLERS (DISABLED/BYPASSED)
       ========================================== */

    if (linkToRegister) {
        linkToRegister.addEventListener("click", (e) => {
            e.preventDefault();
            if (loginScreen) loginScreen.classList.add("hidden");
            if (registerScreen) registerScreen.classList.remove("hidden");
        });
    }

    if (linkToLogin) {
        linkToLogin.addEventListener("click", (e) => {
            e.preventDefault();
            if (registerScreen) registerScreen.classList.add("hidden");
            if (loginScreen) loginScreen.classList.remove("hidden");
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("login-username").value.trim();
            const password = document.getElementById("login-password").value;

            const matched = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
            
            if (matched) {
                currentUser = matched;
                localStorage.setItem("app_current_user", JSON.stringify(currentUser));
                loginForm.reset();
                checkSession();
                showToast(`👋 Selamat datang kembali, ${currentUser.username}!`, "success");
            } else {
                showToast("❌ Username atau Password salah!", "info");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("register-username").value.trim();
            const password = document.getElementById("register-password").value;
            const role = "biasa";

            const exists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
            
            if (exists) {
                showToast("❌ Username ini sudah terdaftar!", "info");
                return;
            }

            const newUser = { username, password, role };
            users.push(newUser);
            localStorage.setItem("app_users", JSON.stringify(users));

            currentUser = newUser;
            localStorage.setItem("app_current_user", JSON.stringify(currentUser));

            registerForm.reset();
            if (registerScreen) registerScreen.classList.add("hidden");
            if (loginScreen) loginScreen.classList.remove("hidden");

            checkSession();
            showToast(`🎉 Akun ${username} berhasil dibuat!`, "success");
        });
    }

    if (btnLogout) {
        btnLogout.addEventListener("click", () => {
            showToast("⚙️ Sistem dalam Mode Testing (Bypass Aktif). Tidak perlu keluar.", "info");
        });
    }

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

    if (btnGlobalTheme) {
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
    }

    /* ==========================================
       DRAG-AND-DROP & RESIZE MECHANICS
       ========================================== */

    // 1. Panel Resizing
    floatingResizeHandle.addEventListener("mousedown", resizeStart);
    floatingResizeHandle.addEventListener("touchstart", resizeStart, { passive: true });

    function resizeStart(e) {
        e.stopPropagation(); // Prevent drag triggering
        isResizing = true;
        
        const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
        
        resizeStartWidth = container.offsetWidth;
        resizeStartHeight = container.offsetHeight;
        resizeStartX = clientX;
        resizeStartY = clientY;
        
        container.classList.add("resizing");
    }

    // 2. Panel Dragging
    header.addEventListener("mousedown", dragStart);
    header.addEventListener("touchstart", dragStart, { passive: true });

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

    // 3. Global Move & End Event Handlers (Shared for drag & resize)
    document.addEventListener("mousemove", handleGlobalMove);
    document.addEventListener("touchmove", handleGlobalMove, { passive: false });
    document.addEventListener("mouseup", handleGlobalEnd);
    document.addEventListener("touchend", handleGlobalEnd);

    function handleGlobalMove(e) {
        if (isDragging) {
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
        
        if (isResizing) {
            if (e.type.startsWith("touch")) {
                e.preventDefault();
            }
            const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

            const deltaX = clientX - resizeStartX;
            const deltaY = clientY - resizeStartY;

            const newWidth = Math.max(320, resizeStartWidth + deltaX);
            const newHeight = Math.max(400, resizeStartHeight + deltaY);

            container.style.width = `${newWidth}px`;
            container.style.height = `${newHeight}px`;
        }

        if (bubbleIsDragging) {
            if (e.type.startsWith("touch")) {
                e.preventDefault();
            }
            const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

            bubbleLeft = clientX - bubbleDragStartX;
            bubbleTop = clientY - bubbleDragStartY;

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const bubbleWidth = triggerBubble.offsetWidth;
            const bubbleHeight = triggerBubble.offsetHeight;

            if (bubbleLeft < 0) bubbleLeft = 0;
            if (bubbleTop < 0) bubbleTop = 0;
            if (bubbleLeft + bubbleWidth > viewportWidth) bubbleLeft = viewportWidth - bubbleWidth;
            if (bubbleTop + bubbleHeight > viewportHeight) bubbleTop = viewportHeight - bubbleHeight;

            triggerBubble.style.left = `${bubbleLeft}px`;
            triggerBubble.style.top = `${bubbleTop}px`;
            triggerBubble.style.right = 'auto';
            triggerBubble.style.bottom = 'auto';
        }
    }

    function handleGlobalEnd() {
        if (isDragging) {
            isDragging = false;
            container.classList.remove("dragging");
        }
        if (isResizing) {
            isResizing = false;
            container.classList.remove("resizing");
        }
        if (bubbleIsDragging) {
            bubbleIsDragging = false;
            triggerBubble.classList.remove("dragging");
        }
    }

    // 4. Minimized Bubble Dragging
    triggerBubble.addEventListener("mousedown", bubbleDragStart);
    triggerBubble.addEventListener("touchstart", bubbleDragStart, { passive: true });

    function bubbleDragStart(e) {
        bubbleIsDragging = true;
        triggerBubble.classList.add("dragging");
        
        const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
        
        const rect = triggerBubble.getBoundingClientRect();
        bubbleDragStartX = clientX - rect.left;
        bubbleDragStartY = clientY - rect.top;
        
        // Save initial position for threshold check
        triggerBubble.dataset.startX = clientX;
        triggerBubble.dataset.startY = clientY;
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

    // Custom restored click listener with drag threshold
    triggerBubble.addEventListener("click", (e) => {
        const startX = parseFloat(triggerBubble.dataset.startX || "0");
        const startY = parseFloat(triggerBubble.dataset.startY || "0");
        const clientX = e.clientX;
        const clientY = e.clientY;
        
        const distance = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2));
        if (distance > 6) {
            // It was a drag, prevent expand action
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        
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

    // ─── Full-Code Generators ────────────────────────────────────────────────
    // Each function returns { title, text, code, lang } for a full, complete snippet

    function buildFullCode(topic, cat) {
        const t = topic.toLowerCase();

        // ── ROBLOX ──
        if (cat === "roblox") {
            if (t.includes("leaderstats") || t.includes("leaderboard") || t.includes("stats")) {
                return { title: "Leaderstats + DataStore Save System", lang: "lua", text: "Script lengkap server untuk membuat leaderboard Coins & Level yang otomatis tersimpan via DataStoreService. Simpan di **ServerScriptService**.",
                code: `-- [ServerScriptService] Leaderstats + Auto Save
local Players = game:GetService("Players")
local DataStoreService = game:GetService("DataStoreService")
local DS = DataStoreService:GetDataStore("PlayerData_v2")

local function onPlayerAdded(player)
    local ls = Instance.new("Folder")
    ls.Name = "leaderstats"
    ls.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins" ; coins.Value = 0 ; coins.Parent = ls

    local level = Instance.new("IntValue")
    level.Name = "Level" ; level.Value = 1 ; level.Parent = ls

    local key = "Player_"..player.UserId
    local ok, data = pcall(function() return DS:GetAsync(key) end)
    if ok and data then
        coins.Value = data.Coins or 0
        level.Value = data.Level or 1
    end
end

local function onPlayerRemoving(player)
    local ls = player:FindFirstChild("leaderstats")
    if not ls then return end
    local key = "Player_"..player.UserId
    pcall(function()
        DS:SetAsync(key, {
            Coins = ls.Coins.Value,
            Level = ls.Level.Value
        })
    end)
end

Players.PlayerAdded:Connect(onPlayerAdded)
Players.PlayerRemoving:Connect(onPlayerRemoving)
game:BindToClose(function()
    for _, p in pairs(Players:GetPlayers()) do
        onPlayerRemoving(p)
    end
end)` };
            }
            if (t.includes("kill") || t.includes("damage") || t.includes("brick") || t.includes("mati")) {
                return { title: "Kill Brick + Damage System", lang: "lua", text: "Kill brick dengan cooldown dan sistem damage adjustable. Pasang sebagai LocalScript di Part.",
                code: `-- Kill Brick (pasang di dalam Part)
local part = script.Parent
local DAMAGE = 100 -- ganti jadi 25 untuk 25 HP damage
local COOLDOWN = 0.5
local debounce = {}

part.Touched:Connect(function(hit)
    local char = hit.Parent
    local hum = char:FindFirstChildOfClass("Humanoid")
    local player = game.Players:GetPlayerFromCharacter(char)
    if hum and player and not debounce[player] then
        debounce[player] = true
        hum:TakeDamage(DAMAGE)
        task.delay(COOLDOWN, function() debounce[player] = nil end)
    end
end)` };
            }
            if (t.includes("teleport") || t.includes("pindah")) {
                return { title: "Teleport Pad System (A → B)", lang: "lua", text: "Sistem teleportasi dua arah antar pad dengan cooldown anti-spam.",
                code: `-- Pasang di TelePadA, buat TelePadB di Workspace
local pad = script.Parent
local dest = workspace:WaitForChild("TelePadB")
local cd = {}

pad.Touched:Connect(function(hit)
    local char = hit.Parent
    local hum = char:FindFirstChildOfClass("Humanoid")
    local root = char:FindFirstChild("HumanoidRootPart")
    local p = game.Players:GetPlayerFromCharacter(char)
    if hum and root and p and not cd[p] then
        cd[p] = true
        root.CFrame = dest.CFrame + Vector3.new(0, 4, 0)
        task.delay(2, function() cd[p] = nil end)
    end
end)` };
            }
            if (t.includes("shop") || t.includes("toko") || t.includes("beli") || t.includes("purchase")) {
                return { title: "Shop / Purchase System", lang: "lua", text: "Sistem toko sederhana: pemain beli item dengan koin dari leaderstats.",
                code: `-- [ServerScriptService] Shop Handler
local Players = game:GetService("Players")
local RS = game:GetService("ReplicatedStorage")
local buyEvent = RS:WaitForChild("BuyItem")

local SHOP = {
    Sword = { price = 50, description = "Pedang basic" },
    Shield = { price = 30, description = "Tameng kayu" },
}

buyEvent.OnServerEvent:Connect(function(player, itemName)
    local item = SHOP[itemName]
    if not item then return end
    local ls = player:FindFirstChild("leaderstats")
    if not ls then return end
    local coins = ls:FindFirstChild("Coins")
    if coins and coins.Value >= item.price then
        coins.Value -= item.price
        -- beri item ke player (contoh: tool di StarterPack)
        local tool = game.ServerStorage:FindFirstChild(itemName)
        if tool then tool:Clone().Parent = player.Backpack end
        print(player.Name.." membeli "..itemName)
    end
end)` };
            }
            if (t.includes("gui") || t.includes("ui") || t.includes("button") || t.includes("tombol") || t.includes("layar")) {
                return { title: "GUI / ScreenGui Button dengan Event", lang: "lua", text: "Cara membuat GUI dengan tombol interaktif menggunakan LocalScript di StarterGui.",
                code: `-- [StarterGui > ScreenGui > LocalScript]
local player = game.Players.LocalPlayer
local RS = game:GetService("ReplicatedStorage")
local button = script.Parent:WaitForChild("MainButton")

button.MouseButton1Click:Connect(function()
    -- Animasi tombol
    button.BackgroundColor3 = Color3.fromRGB(100, 220, 100)
    task.delay(0.2, function()
        button.BackgroundColor3 = Color3.fromRGB(50, 50, 50)
    end)
    -- Kirim event ke server
    RS:WaitForChild("ButtonPressed"):FireServer()
    print(player.Name .. " menekan tombol")
end)` };
            }
            if (t.includes("pet") || t.includes("follow") || t.includes("ikut")) {
                return { title: "Pet Follow System", lang: "lua", text: "Pet NPC yang mengikuti karakter pemain secara smooth dengan Lerp.",
                code: `-- LocalScript di Pet Model
local pet = script.Parent
local player = game.Players.LocalPlayer
local RunService = game:GetService("RunService")
local OFFSET = Vector3.new(3, 0, 0)

RunService.Heartbeat:Connect(function()
    local char = player.Character
    if char then
        local root = char:FindFirstChild("HumanoidRootPart")
        if root then
            pet.PrimaryPart.CFrame = pet.PrimaryPart.CFrame:Lerp(
                root.CFrame + OFFSET, 0.1
            )
        end
    end
end)` };
            }
            // Generic Roblox fallback — always give full code
            return { title: "Roblox Luau Script: " + query, lang: "lua", text: `Berikut script Luau lengkap untuk: **${query}**. Sesuaikan nama Part/Service sesuai proyek Anda.`,
            code: `-- [ServerScriptService] Script: ${query}
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local RunService = game:GetService("RunService")

-- Event untuk komunikasi server-client
local event = Instance.new("RemoteEvent")
event.Name = "GameEvent"
event.Parent = ReplicatedStorage

local function onPlayerAdded(player)
    print("[LOG] Player joined: " .. player.Name)
    -- Setup leaderstats
    local ls = Instance.new("Folder")
    ls.Name = "leaderstats"
    ls.Parent = player
    local coins = Instance.new("IntValue")
    coins.Name = "Coins" ; coins.Value = 100 ; coins.Parent = ls
end

Players.PlayerAdded:Connect(onPlayerAdded)

-- Main game logic
RunService.Heartbeat:Connect(function(dt)
    -- Update logic tiap frame
end)

print("[SYSTEM] Script aktif!")` };
        }

        // ── WEB ──
        if (cat === "web") {
            if (t.includes("landing") || t.includes("hero") || t.includes("homepage") || t.includes("halaman")) {
                return { title: "Landing Page HTML + CSS Lengkap", lang: "html", text: "Landing page modern dengan hero section, navbar, dan glassmorphism card. Copy-paste langsung jalan!",
                code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Landing Page</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #0a0a1a; color: #fff; font-family: 'Segoe UI', sans-serif; }
    nav {
      display: flex; justify-content: space-between; align-items: center;
      padding: 20px 60px;
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.08);
      position: sticky; top: 0; z-index: 100;
    }
    .logo { font-size: 1.4rem; font-weight: 800;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .nav-links a { color: #94a3b8; text-decoration: none; margin-left: 24px;
      transition: color .2s; }
    .nav-links a:hover { color: #fff; }
    .hero {
      min-height: 90vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 40px 20px;
      background: radial-gradient(ellipse at 50% 0%, rgba(139,92,246,.15) 0%, transparent 60%);
    }
    .hero h1 { font-size: 3.5rem; font-weight: 800; line-height: 1.2;
      margin-bottom: 20px; }
    .hero h1 span { background: linear-gradient(135deg, #8b5cf6, #ec4899);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .hero p { color: #94a3b8; font-size: 1.1rem; max-width: 600px; margin: 0 auto 32px; }
    .btn-cta {
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      border: none; color: #fff; padding: 14px 32px;
      border-radius: 100px; font-size: 1rem; font-weight: 600;
      cursor: pointer; transition: all .3s;
      box-shadow: 0 0 30px rgba(139,92,246,.3);
    }
    .btn-cta:hover { transform: translateY(-2px);
      box-shadow: 0 0 40px rgba(139,92,246,.5); }
    .cards { display: flex; gap: 20px; justify-content: center;
      flex-wrap: wrap; padding: 60px 40px; }
    .card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      backdrop-filter: blur(12px);
      border-radius: 16px; padding: 28px;
      width: 280px; transition: all .3s;
    }
    .card:hover { transform: translateY(-6px);
      border-color: rgba(139,92,246,.4);
      box-shadow: 0 20px 40px rgba(0,0,0,.3); }
    .card h3 { font-size: 1.1rem; margin-bottom: 10px; }
    .card p { color: #64748b; font-size: .9rem; line-height: 1.6; }
  </style>
</head>
<body>
  <nav>
    <div class="logo">MyApp</div>
    <div class="nav-links">
      <a href="#">Fitur</a>
      <a href="#">Harga</a>
      <a href="#">Tentang</a>
    </div>
  </nav>
  <section class="hero">
    <h1>Bangun Masa Depan<br>dengan <span>Teknologi</span></h1>
    <p>Platform terbaik untuk developer Indonesia. Cepat, andal, dan mudah digunakan.</p>
    <button class="btn-cta">Mulai Gratis →</button>
  </section>
  <section class="cards">
    <div class="card">
      <h3>⚡ Cepat</h3>
      <p>Performa tinggi dengan optimasi terkini di setiap layer stack.</p>
    </div>
    <div class="card">
      <h3>🔒 Aman</h3>
      <p>Enkripsi end-to-end dan autentikasi multi-faktor bawaan.</p>
    </div>
    <div class="card">
      <h3>🎨 Indah</h3>
      <p>Desain premium yang memenangkan hati pengguna sejak detik pertama.</p>
    </div>
  </section>
</body>
</html>` };
            }
            if (t.includes("login") || t.includes("form") || t.includes("auth")) {
                return { title: "Login Form Modern (HTML+CSS+JS)", lang: "html", text: "Form login glassmorphism dengan validasi JavaScript bawaan.",
                code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Login</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { min-height: 100vh; display: flex; align-items: center; justify-content: center;
      background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%);
      font-family: 'Segoe UI', sans-serif; }
    .card {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(20px);
      border-radius: 20px; padding: 40px;
      width: 380px;
    }
    h2 { text-align: center; color: #fff; margin-bottom: 30px; }
    .field { margin-bottom: 16px; }
    label { display: block; color: #94a3b8; font-size: .85rem; margin-bottom: 6px; }
    input {
      width: 100%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #fff; border-radius: 10px;
      padding: 12px 16px; outline: none;
      transition: border-color .2s;
    }
    input:focus { border-color: #8b5cf6; }
    .btn {
      width: 100%; padding: 13px;
      background: linear-gradient(135deg, #8b5cf6, #ec4899);
      border: none; border-radius: 10px;
      color: #fff; font-size: 1rem; font-weight: 600;
      cursor: pointer; margin-top: 8px;
      transition: opacity .2s;
    }
    .btn:hover { opacity: .85; }
    .msg { text-align: center; margin-top: 14px; font-size: .85rem; color: #f87171; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Sign In</h2>
    <div class="field">
      <label>Username</label>
      <input type="text" id="uname" placeholder="Masukkan username...">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" id="pass" placeholder="Masukkan password...">
    </div>
    <button class="btn" onclick="doLogin()">Masuk</button>
    <p class="msg" id="msg"></p>
  </div>
  <script>
    const USERS = { admin: "admin123", user: "1234" };
    function doLogin() {
      const u = document.getElementById('uname').value.trim();
      const p = document.getElementById('pass').value;
      const msg = document.getElementById('msg');
      if (USERS[u] && USERS[u] === p) {
        msg.style.color = '#34d399';
        msg.textContent = 'Login berhasil! Selamat datang, ' + u;
      } else {
        msg.style.color = '#f87171';
        msg.textContent = 'Username atau password salah!';
      }
    }
  </script>
</body>
</html>` };
            }
            if (t.includes("dashboard") || t.includes("admin panel") || t.includes("panel")) {
                return { title: "Admin Dashboard Glassmorphism", lang: "html", text: "Dashboard admin lengkap dengan sidebar, stat cards, dan table data.",
                code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Dashboard</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#090d16; color:#f8fafc;
      font-family:'Segoe UI',sans-serif; display:flex; min-height:100vh; }
    .sidebar { width:220px; background:rgba(15,23,42,.8);
      border-right:1px solid rgba(255,255,255,.06);
      padding:24px 0; display:flex; flex-direction:column; gap:4px; }
    .sidebar-brand { padding:0 20px 20px;
      font-weight:800; font-size:1.1rem;
      background:linear-gradient(135deg,#8b5cf6,#ec4899);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    .sidebar a { display:flex; align-items:center; gap:10px;
      padding:10px 20px; color:#64748b; text-decoration:none;
      border-radius:0 8px 8px 0; transition:.2s;
      border-left:3px solid transparent; font-size:.9rem; }
    .sidebar a.active,
    .sidebar a:hover { background:rgba(139,92,246,.1);
      color:#fff; border-left-color:#8b5cf6; }
    .main { flex:1; padding:30px; }
    .topbar { display:flex; justify-content:space-between;
      align-items:center; margin-bottom:28px; }
    .topbar h1 { font-size:1.4rem; }
    .stats { display:flex; gap:18px; margin-bottom:28px; flex-wrap:wrap; }
    .stat-card {
      background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.07);
      border-radius:14px; padding:20px;
      flex:1; min-width:160px;
    }
    .stat-card .label { font-size:.8rem; color:#64748b; margin-bottom:8px; }
    .stat-card .value { font-size:1.8rem; font-weight:700; }
    table { width:100%; border-collapse:collapse;
      background:rgba(255,255,255,.03);
      border:1px solid rgba(255,255,255,.06);
      border-radius:12px; overflow:hidden; }
    th,td { padding:12px 16px; text-align:left;
      border-bottom:1px solid rgba(255,255,255,.05); font-size:.88rem; }
    th { background:rgba(255,255,255,.04); color:#64748b; }
    td:last-child span { padding:4px 10px; border-radius:20px;
      font-size:.78rem; font-weight:600; }
    .badge-green { background:rgba(16,185,129,.15); color:#34d399; }
    .badge-red { background:rgba(244,63,94,.15); color:#f87171; }
  </style>
</head>
<body>
  <nav class="sidebar">
    <div class="sidebar-brand">⚡ AdminX</div>
    <a href="#" class="active">📊 Dashboard</a>
    <a href="#">👥 Pengguna</a>
    <a href="#">📦 Produk</a>
    <a href="#">⚙️ Pengaturan</a>
  </nav>
  <div class="main">
    <div class="topbar">
      <h1>Dashboard</h1>
      <span style="color:#64748b">Admin · kpljk</span>
    </div>
    <div class="stats">
      <div class="stat-card"><div class="label">Total User</div>
        <div class="value" style="color:#8b5cf6">1,284</div></div>
      <div class="stat-card"><div class="label">Revenue</div>
        <div class="value" style="color:#10b981">Rp 48jt</div></div>
      <div class="stat-card"><div class="label">Orders</div>
        <div class="value" style="color:#3b82f6">342</div></div>
      <div class="stat-card"><div class="label">Pending</div>
        <div class="value" style="color:#f59e0b">17</div></div>
    </div>
    <table>
      <thead><tr><th>User</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
      <tbody>
        <tr><td>kpljk</td><td>admin@mail.com</td><td>Admin</td>
          <td><span class="badge-green">Aktif</span></td></tr>
        <tr><td>budi</td><td>budi@mail.com</td><td>Creator</td>
          <td><span class="badge-green">Aktif</span></td></tr>
        <tr><td>santi</td><td>santi@mail.com</td><td>Biasa</td>
          <td><span class="badge-red">Suspend</span></td></tr>
      </tbody>
    </table>
  </div>
</body>
</html>` };
            }
            // Generic web fallback
            return { title: "Web App: " + query, lang: "html", text: `Template HTML+CSS+JS lengkap untuk: **${query}**.`,
            code: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${query}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { background:#090d16; color:#f8fafc;
      font-family:'Segoe UI',sans-serif;
      display:flex; flex-direction:column;
      min-height:100vh; align-items:center;
      justify-content:center; padding:40px 20px; }
    .container {
      background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.08);
      backdrop-filter:blur(16px);
      border-radius:20px; padding:40px;
      max-width:640px; width:100%;
    }
    h1 { font-size:1.8rem; margin-bottom:16px;
      background:linear-gradient(135deg,#8b5cf6,#ec4899);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; }
    p { color:#94a3b8; line-height:1.7; margin-bottom:20px; }
    .btn {
      background:linear-gradient(135deg,#8b5cf6,#ec4899);
      border:none; color:#fff; padding:12px 28px;
      border-radius:10px; cursor:pointer; font-weight:600;
      transition:all .2s;
    }
    .btn:hover { opacity:.85; transform:translateY(-2px); }
    #output { margin-top:20px; padding:14px;
      background:rgba(0,0,0,.3); border-radius:10px;
      color:#38bdf8; font-family:monospace; display:none; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${query}</h1>
    <p>Deskripsi fitur aplikasi Anda di sini.</p>
    <button class="btn" onclick="runAction()">Jalankan</button>
    <div id="output"></div>
  </div>
  <script>
    function runAction() {
      const out = document.getElementById('output');
      out.style.display = 'block';
      out.textContent = '✅ Berhasil! Aksi dijalankan pada ' + new Date().toLocaleTimeString();
    }
  </script>
</body>
</html>` };
        }

        // ── GAME ──
        if (cat === "game") {
            if (t.includes("player") || t.includes("movement") || t.includes("gerak") || t.includes("karakter")) {
                return { title: "Unity 3D Player Controller Lengkap (C#)", lang: "csharp", text: "Script C# lengkap untuk karakter 3D Unity dengan gerakan WASD, lari, lompat, dan kamera orbit.",
                code: `using UnityEngine;

[RequireComponent(typeof(CharacterController))]
public class PlayerController : MonoBehaviour
{
    [Header("Movement")]
    public float walkSpeed = 5f;
    public float runSpeed = 10f;
    public float jumpHeight = 2f;
    public float gravity = -20f;

    [Header("Camera")]
    public Transform cameraTransform;
    public float mouseSensitivity = 100f;

    private CharacterController cc;
    private Vector3 velocity;
    private float xRotation = 0f;
    private bool isGrounded;

    void Start()
    {
        cc = GetComponent<CharacterController>();
        Cursor.lockState = CursorLockMode.Locked;
    }

    void Update()
    {
        // Ground check
        isGrounded = cc.isGrounded;
        if (isGrounded && velocity.y < 0) velocity.y = -2f;

        // Input
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        float speed = Input.GetKey(KeyCode.LeftShift) ? runSpeed : walkSpeed;

        Vector3 move = transform.right * h + transform.forward * v;
        cc.Move(move * speed * Time.deltaTime);

        // Jump
        if (Input.GetButtonDown("Jump") && isGrounded)
            velocity.y = Mathf.Sqrt(jumpHeight * -2f * gravity);

        velocity.y += gravity * Time.deltaTime;
        cc.Move(velocity * Time.deltaTime);

        // Mouse look
        float mouseX = Input.GetAxis("Mouse X") * mouseSensitivity * Time.deltaTime;
        float mouseY = Input.GetAxis("Mouse Y") * mouseSensitivity * Time.deltaTime;
        xRotation = Mathf.Clamp(xRotation - mouseY, -90f, 90f);
        cameraTransform.localRotation = Quaternion.Euler(xRotation, 0f, 0f);
        transform.Rotate(Vector3.up * mouseX);
    }
}` };
            }
            if (t.includes("enemy") || t.includes("ai") || t.includes("musuh") || t.includes("patrol")) {
                return { title: "Unity Enemy AI (Patrol + Chase)", lang: "csharp", text: "Enemy AI lengkap: berpatroli antar waypoints, mendeteksi pemain, mengejar, dan kembali patrol.",
                code: `using UnityEngine;
using UnityEngine.AI;

public class EnemyAI : MonoBehaviour
{
    public enum State { Patrol, Chase, Attack }
    public State state = State.Patrol;

    public Transform[] waypoints;
    public Transform player;
    public float detectionRange = 10f;
    public float attackRange = 2f;
    public float patrolSpeed = 2f;
    public float chaseSpeed = 5f;
    public float attackCooldown = 1.5f;
    public float damage = 10f;

    private NavMeshAgent agent;
    private int wpIndex = 0;
    private float attackTimer = 0f;

    void Start() { agent = GetComponent<NavMeshAgent>(); GoToNextWaypoint(); }

    void Update()
    {
        float dist = Vector3.Distance(transform.position, player.position);
        attackTimer -= Time.deltaTime;

        if (dist <= attackRange) state = State.Attack;
        else if (dist <= detectionRange) state = State.Chase;
        else if (state != State.Patrol) { state = State.Patrol; GoToNextWaypoint(); }

        switch (state)
        {
            case State.Patrol:
                agent.speed = patrolSpeed;
                if (!agent.pathPending && agent.remainingDistance < 0.5f)
                    GoToNextWaypoint();
                break;
            case State.Chase:
                agent.speed = chaseSpeed;
                agent.SetDestination(player.position);
                break;
            case State.Attack:
                agent.ResetPath();
                transform.LookAt(player);
                if (attackTimer <= 0f) { DoAttack(); attackTimer = attackCooldown; }
                break;
        }
    }

    void GoToNextWaypoint()
    {
        if (waypoints.Length == 0) return;
        agent.SetDestination(waypoints[wpIndex].position);
        wpIndex = (wpIndex + 1) % waypoints.Length;
    }

    void DoAttack()
    {
        var health = player.GetComponent<PlayerHealth>();
        if (health != null) health.TakeDamage(damage);
    }

    void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.yellow; Gizmos.DrawWireSphere(transform.position, detectionRange);
        Gizmos.color = Color.red; Gizmos.DrawWireSphere(transform.position, attackRange);
    }
}` };
            }
            // Generic game fallback
            return { title: "Game Script: " + query, lang: "csharp", text: `Script C# Unity lengkap untuk: **${query}**.`,
            code: `using UnityEngine;

public class ${query.replace(/\s+/g,'_').replace(/[^a-zA-Z0-9_]/g,'')||'GameScript'} : MonoBehaviour
{
    [Header("Settings")]
    public float speed = 5f;
    public int health = 100;
    public bool isActive = true;

    private Rigidbody rb;
    private bool initialized = false;

    void Start()
    {
        rb = GetComponent<Rigidbody>();
        Initialize();
    }

    void Initialize()
    {
        initialized = true;
        Debug.Log("[SYSTEM] Initialized: " + gameObject.name);
    }

    void Update()
    {
        if (!isActive || !initialized) return;
        HandleInput();
        UpdateState();
    }

    void HandleInput()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 dir = new Vector3(h, 0, v).normalized;
        if (dir.magnitude > 0.1f)
            transform.Translate(dir * speed * Time.deltaTime);
    }

    void UpdateState()
    {
        if (health <= 0) { isActive = false; OnDeath(); }
    }

    void OnDeath()
    {
        Debug.Log(gameObject.name + " telah mati!");
        Destroy(gameObject, 1f);
    }

    public void TakeDamage(int dmg)
    {
        health -= dmg;
        Debug.Log(gameObject.name + " HP: " + health);
    }
}` };
        }

        // ── APP ──
        if (cat === "app") {
            if (t.includes("api") || t.includes("fetch") || t.includes("request") || t.includes("http")) {
                return { title: "Python REST API Client Lengkap", lang: "python", text: "Client API Python dengan retry logic, error handling, dan parsing JSON yang robust.",
                code: `import requests
import json
import time
from typing import Optional, Dict, Any

class APIClient:
    def __init__(self, base_url: str, api_key: Optional[str] = None):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        if api_key:
            self.session.headers['Authorization'] = f'Bearer {api_key}'

    def _request(self, method: str, endpoint: str,
                  data: Dict = None, retries: int = 3) -> Any:
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        for attempt in range(retries):
            try:
                resp = self.session.request(
                    method, url,
                    json=data,
                    timeout=10
                )
                resp.raise_for_status()
                return resp.json()
            except requests.exceptions.HTTPError as e:
                print(f"HTTP Error {resp.status_code}: {resp.text}")
                if resp.status_code < 500:
                    raise
            except requests.exceptions.RequestException as e:
                print(f"Percobaan {attempt+1} gagal: {e}")
                if attempt < retries - 1:
                    time.sleep(2 ** attempt)
                else:
                    raise

    def get(self, endpoint: str) -> Any:
        return self._request('GET', endpoint)

    def post(self, endpoint: str, data: Dict) -> Any:
        return self._request('POST', endpoint, data)

    def put(self, endpoint: str, data: Dict) -> Any:
        return self._request('PUT', endpoint, data)

    def delete(self, endpoint: str) -> Any:
        return self._request('DELETE', endpoint)


# Contoh penggunaan
if __name__ == '__main__':
    client = APIClient('https://jsonplaceholder.typicode.com')

    # GET
    post = client.get('/posts/1')
    print("GET Post:", json.dumps(post, indent=2))

    # POST
    new_post = client.post('/posts', {
        'title': 'My Post',
        'body': 'Konten posting baru',
        'userId': 1
    })
    print("POST Result:", new_post)` };
            }
            if (t.includes("express") || t.includes("server") || t.includes("backend") || t.includes("node")) {
                return { title: "Express.js REST API Server Lengkap", lang: "javascript", text: "REST API server Express.js dengan CRUD endpoint, middleware auth, dan error handler.",
                code: `const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// In-memory DB (ganti dengan database nyata)
let users = [
  { id: 1, name: 'Admin', email: 'admin@mail.com', role: 'admin' },
  { id: 2, name: 'Budi', email: 'budi@mail.com', role: 'user' }
];
let nextId = 3;

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token !== 'secret-token-123') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

// Routes
app.get('/api/users', authMiddleware, (req, res) => {
  const { role } = req.query;
  let result = users;
  if (role) result = users.filter(u => u.role === role);
  res.json({ success: true, count: result.length, data: result });
});

app.get('/api/users/:id', authMiddleware, (req, res) => {
  const user = users.find(u => u.id === +req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true, data: user });
});

app.post('/api/users', authMiddleware, (req, res) => {
  const { name, email, role = 'user' } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name dan email wajib' });
  const newUser = { id: nextId++, name, email, role };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.put('/api/users/:id', authMiddleware, (req, res) => {
  const idx = users.findIndex(u => u.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users[idx] = { ...users[idx], ...req.body, id: users[idx].id };
  res.json({ success: true, data: users[idx] });
});

app.delete('/api/users/:id', authMiddleware, (req, res) => {
  const idx = users.findIndex(u => u.id === +req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  const deleted = users.splice(idx, 1)[0];
  res.json({ success: true, message: 'Deleted', data: deleted });
});

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(\`✅ Server running on http://localhost:\${PORT}\`));

module.exports = app;` };
            }
            // Generic app fallback
            return { title: "App Script: " + query, lang: "python", text: `Script Python lengkap untuk: **${query}**.`,
            code: `#!/usr/bin/env python3
"""
${query}
Script Python fungsional lengkap
"""
import os
import sys
import json
import logging
from datetime import datetime
from typing import Optional, List, Dict

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s'
)
log = logging.getLogger(__name__)


class App:
    def __init__(self, name: str = "MyApp"):
        self.name = name
        self.data: List[Dict] = []
        self.config: Dict = {
            "version": "1.0.0",
            "debug": False,
            "max_items": 100
        }
        log.info(f"{self.name} initialized")

    def add_item(self, item: Dict) -> bool:
        if len(self.data) >= self.config["max_items"]:
            log.warning("Max items reached!")
            return False
        item["id"] = len(self.data) + 1
        item["created_at"] = datetime.now().isoformat()
        self.data.append(item)
        log.info(f"Added item #{item['id']}")
        return True

    def get_item(self, item_id: int) -> Optional[Dict]:
        return next((i for i in self.data if i["id"] == item_id), None)

    def delete_item(self, item_id: int) -> bool:
        for i, item in enumerate(self.data):
            if item["id"] == item_id:
                self.data.pop(i)
                log.info(f"Deleted item #{item_id}")
                return True
        return False

    def to_json(self) -> str:
        return json.dumps(self.data, indent=2, ensure_ascii=False)

    def run(self):
        log.info(f"Running {self.name} v{self.config['version']}")
        # --- tambahkan logika aplikasi Anda di sini ---


if __name__ == "__main__":
    app = App("MyApp")
    app.add_item({"name": "Item 1", "value": 100})
    app.add_item({"name": "Item 2", "value": 250})
    print(app.to_json())
    app.run()` };
        }

        // default
        return null;
    }

    function processQuery(query) {
        const lower = query.toLowerCase();
        const contextFile = chatFileContext.value;

        // ==========================================
        // GEMINI AI STUDIO: APP & GAME GENERATOR INTERCEPTOR
        // ==========================================
        const isAppRequest = lower.includes("game") || lower.includes("buatkan") || lower.includes("bikin") || 
                             lower.includes("app") || lower.includes("web") || lower.includes("kalkulator") || 
                             lower.includes("flappy") || lower.includes("snake") || lower.includes("dashboard") ||
                             lower.includes("breaker") || lower.includes("pong") || lower.includes("cuaca");

        if (isAppRequest) {
            let title = "";
            let description = "";
            let htmlContent = "";
            let cssContent = "";
            let generatedLang = "html";
            let matchedApp = true;

            // Multimodal Analysis Simulation
            const isMultimodal = attachedMedia.length > 0;
            const mediaType = isMultimodal ? (attachedMedia[0].type.startsWith("image/") ? "Foto" : "Video") : "";
            const multimodalText = isMultimodal ? `<div class="multimodal-badge" style="background: rgba(139, 92, 246, 0.15); border: 1px solid var(--theme-primary); color: #c084fc; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 6px; margin-bottom: 10px;"><span class="animate-pulse">📸</span> <strong>Multimodal:</strong> Berhasil menganalisis ${mediaType} "${attachedMedia[0].name}"</div><br>Saya telah mengekstrak detail visual dari ${mediaType} yang diunggah dan menerapkan skema warna neon futuristik serta layout responsif yang sesuai dengan instruksi Anda.<br><br>` : "";
            const mediaComment = isMultimodal ? `\n    <!-- Desain terinspirasi secara visual dari ${mediaType}: ${attachedMedia[0].name} -->` : "";

            // 1. GAME: FLAPPY BIRD
            if (lower.includes("flappy") || lower.includes("burung")) {
                title = "Game Flappy Bird - Neon Cyberpunk Edition";
                description = "Game Flappy Bird premium dengan visual cyberpunk neon, sistem score/high score di local storage, sound effects menggunakan Web Audio API, serta responsive viewport scaling.";
                
                htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Flappy Bird - Cyberpunk Neon</title>${mediaComment}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #090d16;
            color: #fff;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }
        #game-container {
            position: relative;
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.4);
            border: 2px solid #8b5cf6;
            border-radius: 12px;
            overflow: hidden;
            background: #0d0e1b;
        }
        canvas {
            display: block;
        }
        .ui-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(9, 13, 22, 0.85);
            backdrop-filter: blur(4px);
            transition: opacity 0.3s;
        }
        .ui-overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 15px;
            font-weight: 800;
            text-shadow: 0 0 15px #ec4899;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
        }
        p {
            color: #94a3b8;
            font-size: 0.95rem;
            margin-bottom: 25px;
            text-align: center;
            max-width: 280px;
            line-height: 1.5;
        }
        .btn-play {
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            border: none;
            color: #fff;
            padding: 12px 32px;
            font-size: 1.1rem;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 0 25px rgba(139, 92, 246, 0.5);
            transition: all 0.2s ease;
        }
        .btn-play:hover {
            transform: scale(1.05);
            box-shadow: 0 0 35px rgba(236, 72, 153, 0.7);
        }
        .hud {
            position: absolute;
            top: 20px;
            left: 20px;
            font-family: monospace;
            font-size: 1.2rem;
            font-weight: 700;
            color: #06b6d4;
            text-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
            pointer-events: none;
            z-index: 10;
        }
    </style>
</head>
<body>

    <div id="game-container">
        <div class="hud" id="hud">SCORE: 0 | BEST: 0</div>
        
        <!-- Canvas -->
        <canvas id="gameCanvas" width="400" height="520"></canvas>

        <!-- Start/Game Over Screen -->
        <div id="overlay" class="ui-overlay">
            <h1 id="overlay-title">NEON FLAPPY</h1>
            <p id="overlay-desc">Tekan spasi, klik, atau sentuh layar untuk membuat burung terbang melompat menghindari pipa rintangan neon.</p>
            <button class="btn-play" id="btn-start" onclick="startGame()">MAIN SEKARANG</button>
        </div>
    </div>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const overlay = document.getElementById("overlay");
        const overlayTitle = document.getElementById("overlay-title");
        const overlayDesc = document.getElementById("overlay-desc");
        const btnStart = document.getElementById("btn-start");
        const hud = document.getElementById("hud");

        // Web Audio API Synth for retro sound effects
        let audioCtx = null;
        function playSound(freq, type, duration) {
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                if (audioCtx.state === 'suspended') audioCtx.resume();
                
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                
                osc.type = type || 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                
                gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
                
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                
                osc.start();
                osc.stop(audioCtx.currentTime + duration);
            } catch (e) { console.warn(e); }
        }

        // Game Constants & State
        const GRAVITY = 0.35;
        const JUMP_FORCE = -6.2;
        const PIPE_SPEED = 2.0;
        const PIPE_SPACING = 180;
        const GAP_SIZE = 125;

        let bird = { x: 80, y: 200, velocity: 0, radius: 14 };
        let pipes = [];
        let score = 0;
        let highScore = parseInt(localStorage.getItem("flappy_high_score") || "0");
        let gameActive = false;
        let gameOver = false;
        let frameCount = 0;

        // Input listeners
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                e.preventDefault();
                jump();
            }
        });
        canvas.addEventListener("mousedown", jump);
        canvas.addEventListener("touchstart", (e) => {
            e.preventDefault();
            jump();
        });

        function updateHUD() {
            hud.textContent = \`SCORE: \${score} | BEST: \${highScore}\`;
        }
        updateHUD();

        function jump() {
            if (!gameActive) return;
            bird.velocity = JUMP_FORCE;
            playSound(400, 'triangle', 0.12);
        }

        function startGame() {
            // Reset state
            bird.y = 200;
            bird.velocity = 0;
            pipes = [];
            score = 0;
            gameOver = false;
            gameActive = true;
            frameCount = 0;
            
            overlay.classList.add("hidden");
            updateHUD();
            playSound(300, 'sine', 0.2);
            setTimeout(() => playSound(500, 'sine', 0.25), 150);
        }

        function triggerGameOver() {
            gameActive = false;
            gameOver = true;
            
            if (score > highScore) {
                highScore = score;
                localStorage.setItem("flappy_high_score", highScore);
            }
            
            overlayTitle.textContent = "GAME OVER";
            overlayDesc.textContent = \`Skor Anda: \${score} (Terbaik: \${highScore}). Cobalah sekali lagi untuk memecahkan rekor baru!\`;
            btnStart.textContent = "MAIN LAGI";
            overlay.classList.remove("hidden");
            
            playSound(150, 'sawtooth', 0.5);
        }

        // Main game loop
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw Cyberpunk Grid Background
            ctx.strokeStyle = "rgba(139, 92, 246, 0.08)";
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 30) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            if (gameActive) {
                frameCount++;
                
                // Bird physics
                bird.velocity += GRAVITY;
                bird.y += bird.velocity;

                // Ceiling/Floor boundaries
                if (bird.y - bird.radius < 0) {
                    bird.y = bird.radius;
                    bird.velocity = 0;
                }
                if (bird.y + bird.radius > canvas.height) {
                    triggerGameOver();
                }

                // Spawn pipes
                if (frameCount % PIPE_SPACING === 0 || pipes.length === 0) {
                    const minHeight = 60;
                    const maxHeight = canvas.height - GAP_SIZE - minHeight;
                    const topHeight = Math.floor(Math.random() * (maxHeight - minHeight)) + minHeight;
                    
                    pipes.push({
                        x: canvas.width,
                        topHeight: topHeight,
                        bottomHeight: canvas.height - topHeight - GAP_SIZE,
                        passed: false
                    });
                }

                // Update pipes
                for (let i = pipes.length - 1; i >= 0; i--) {
                    let p = pipes[i];
                    p.x -= PIPE_SPEED;

                    // Score tracking
                    if (!p.passed && p.x + 50 < bird.x) {
                        p.passed = true;
                        score++;
                        updateHUD();
                        playSound(880, 'sine', 0.1);
                    }

                    // Remove offscreen pipes
                    if (p.x < -50) {
                        pipes.splice(i, 1);
                    }
                }
            }

            // Draw Pipes with Neon Glow
            pipes.forEach(p => {
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#ec4899";
                
                ctx.fillStyle = "rgba(236, 72, 153, 0.25)";
                ctx.strokeStyle = "#ec4899";
                ctx.lineWidth = 3;

                // Top Pipe
                ctx.beginPath();
                ctx.roundRect(p.x, 0, 50, p.topHeight, [0, 0, 8, 8]);
                ctx.fill();
                ctx.stroke();

                // Bottom Pipe
                ctx.beginPath();
                ctx.roundRect(p.x, canvas.height - p.bottomHeight, 50, p.bottomHeight, [8, 8, 0, 0]);
                ctx.fill();
                ctx.stroke();
                
                ctx.shadowBlur = 0; // Reset glow
            });

            // Draw Bird Player (Glow Sphere)
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#06b6d4";
            ctx.fillStyle = "#22d3ee";
            ctx.beginPath();
            ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw eye
            ctx.fillStyle = "#090d16";
            ctx.beginPath();
            ctx.arc(bird.x + 6, bird.y - 3, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0; // Reset shadow

            requestAnimationFrame(draw);
        }

        // Start drawing loop immediately
        draw();
    </script>
</body>
</html>`;

                cssContent = `/* style.css - Cyberpunk Neon Styling */
#game-container {
    border-color: #8b5cf6 !important;
    box-shadow: 0 0 45px rgba(139, 92, 246, 0.45) !important;
}`;
            }
            // 2. GAME: SNAKE
            else if (lower.includes("snake") || lower.includes("ular")) {
                title = "Game Cyber Snake - Neon Retro";
                description = "Game Snake klasik yang disajikan dalam estetika retro-futuristik dengan neon grid, high score tracker, serta audio synth beep interaktif.";
                
                htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cyber Snake - Neon Edition</title>${mediaComment}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #080911;
            color: #fff;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            overflow: hidden;
        }
        #game-box {
            position: relative;
            border: 2px solid #10b981;
            border-radius: 12px;
            box-shadow: 0 0 35px rgba(16, 185, 129, 0.35);
            background: #0d0f1b;
            overflow: hidden;
        }
        canvas { display: block; }
        .hud {
            position: absolute;
            top: 15px; left: 20px;
            font-family: monospace;
            font-size: 1.1rem;
            color: #10b981;
            text-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
            pointer-events: none;
            z-index: 10;
        }
        .overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(8, 9, 17, 0.88);
            backdrop-filter: blur(5px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 20;
            transition: opacity 0.25s ease;
        }
        .overlay.hidden {
            opacity: 0;
            pointer-events: none;
        }
        h1 {
            font-size: 2.2rem;
            margin-bottom: 12px;
            background: linear-gradient(135deg, #10b981, #06b6d4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 10px rgba(16, 185, 129, 0.2);
            text-align: center;
        }
        p {
            color: #64748b;
            font-size: 0.88rem;
            margin-bottom: 20px;
            text-align: center;
            max-width: 260px;
        }
        .btn-start {
            background: linear-gradient(135deg, #10b981, #06b6d4);
            border: none; color: #fff;
            padding: 10px 28px;
            border-radius: 50px;
            font-weight: 700;
            cursor: pointer;
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
            transition: transform 0.2s;
        }
        .btn-start:hover { transform: scale(1.05); }
    </style>
</head>
<body>

    <div id="game-box">
        <div class="hud" id="hud">SCORE: 0 | BEST: 0</div>
        <canvas id="snakeCanvas" width="400" height="400"></canvas>
        
        <div id="overlay" class="overlay">
            <h1 id="title">CYBER SNAKE</h1>
            <p id="desc">Gunakan tombol Panah / WASD pada keyboard atau usap layar ponsel Anda untuk mengarahkan ular memakan cyber-apple.</p>
            <button class="btn-start" onclick="startGame()">START RUN</button>
        </div>
    </div>

    <script>
        const canvas = document.getElementById("snakeCanvas");
        const ctx = canvas.getContext("2d");
        const overlay = document.getElementById("overlay");
        const title = document.getElementById("title");
        const desc = document.getElementById("desc");
        const hud = document.getElementById("hud");

        const GRID_SIZE = 20;
        const TILE_COUNT = canvas.width / GRID_SIZE;

        let snake = [];
        let food = { x: 5, y: 5 };
        let dx = GRID_SIZE;
        let dy = 0;
        let score = 0;
        let highScore = parseInt(localStorage.getItem("snake_high") || "0");
        let active = false;
        let gameInterval = null;

        // Sound generator
        let audioCtx = null;
        function playBeep(freq, dur) {
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + dur);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + dur);
            } catch(e) {}
        }

        window.addEventListener("keydown", changeDirection);

        function changeDirection(e) {
            if (!active) return;
            const key = e.key.toLowerCase();
            if ((key === "arrowup" || key === "w") && dy === 0) { dx = 0; dy = -GRID_SIZE; playBeep(300, 0.05); }
            if ((key === "arrowdown" || key === "s") && dy === 0) { dx = 0; dy = GRID_SIZE; playBeep(300, 0.05); }
            if ((key === "arrowleft" || key === "a") && dx === 0) { dx = -GRID_SIZE; dy = 0; playBeep(300, 0.05); }
            if ((key === "arrowright" || key === "d") && dx === 0) { dx = GRID_SIZE; dy = 0; playBeep(300, 0.05); }
        }

        function startGame() {
            snake = [
                { x: GRID_SIZE * 5, y: GRID_SIZE * 10 },
                { x: GRID_SIZE * 4, y: GRID_SIZE * 10 },
                { x: GRID_SIZE * 3, y: GRID_SIZE * 10 }
            ];
            dx = GRID_SIZE;
            dy = 0;
            score = 0;
            active = true;
            overlay.classList.add("hidden");
            spawnFood();
            updateHUD();
            
            if (gameInterval) clearInterval(gameInterval);
            gameInterval = setInterval(update, 100);
            playBeep(440, 0.1);
        }

        function updateHUD() {
            hud.textContent = \`SCORE: \${score} | BEST: \${highScore}\`;
        }
        updateHUD();

        function spawnFood() {
            food.x = Math.floor(Math.random() * TILE_COUNT) * GRID_SIZE;
            food.y = Math.floor(Math.random() * TILE_COUNT) * GRID_SIZE;
            // Make sure food is not inside snake
            if (snake.some(p => p.x === food.x && p.y === food.y)) {
                spawnFood();
            }
        }

        function update() {
            // Move head
            const head = { x: snake[0].x + dx, y: snake[0].y + dy };
            
            // Collision with boundaries
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
                gameOver();
                return;
            }

            // Collision with self
            if (snake.some(p => p.x === head.x && p.y === head.y)) {
                gameOver();
                return;
            }

            snake.unshift(head);

            // Eat food
            if (head.x === food.x && head.y === food.y) {
                score++;
                if (score > highScore) {
                    highScore = score;
                    localStorage.setItem("snake_high", highScore);
                }
                updateHUD();
                playBeep(880, 0.12);
                spawnFood();
            } else {
                snake.pop();
            }

            draw();
        }

        function gameOver() {
            active = false;
            clearInterval(gameInterval);
            playBeep(120, 0.4);
            
            title.textContent = "GAME OVER";
            desc.textContent = \`Cyber-Snake mengalami malfungsi. Skor Anda: \${score} (Poin Tertinggi: \${highScore})\`;
            overlay.classList.remove("hidden");
        }

        function draw() {
            ctx.fillStyle = "#0d0f1b";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = "rgba(16, 185, 129, 0.04)";
            for (let i = 0; i < TILE_COUNT; i++) {
                ctx.beginPath(); ctx.moveTo(i * GRID_SIZE, 0); ctx.lineTo(i * GRID_SIZE, canvas.height); ctx.stroke();
                ctx.beginPath(); ctx.moveTo(0, i * GRID_SIZE); ctx.lineTo(canvas.width, i * GRID_SIZE); ctx.stroke();
            }

            // Draw food (Neon cherry)
            ctx.shadowBlur = 10; ctx.shadowColor = "#06b6d4";
            ctx.fillStyle = "#22d3ee";
            ctx.beginPath();
            ctx.arc(food.x + GRID_SIZE/2, food.y + GRID_SIZE/2, GRID_SIZE/2 - 2, 0, Math.PI*2);
            ctx.fill();

            // Draw snake
            ctx.shadowBlur = 8; ctx.shadowColor = "#10b981";
            snake.forEach((part, index) => {
                ctx.fillStyle = index === 0 ? "#34d399" : "#10b981";
                ctx.fillRect(part.x + 1, part.y + 1, GRID_SIZE - 2, GRID_SIZE - 2);
            });
            ctx.shadowBlur = 0;
        }

        // Draw initial grid
        draw();
    </script>
</body>
</html>`;
                cssContent = `/* style.css */
#game-box { border-color: #10b981 !important; }`;
            }
            // 3. GAME: BRICK BREAKER
            else if (lower.includes("brick") || lower.includes("breaker") || lower.includes("breakout") || lower.includes("pong")) {
                title = "Game Neon Brick Breaker";
                description = "Game Brick Breaker interaktif dengan glow ball, paddle modern, dan brick hancur dengan efek suara Web Audio API.";
                
                htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Neon Brick Breaker</title>${mediaComment}
    <style>
        * { margin: 0; padding: 0; }
        body {
            background: #090a12; color: #fff;
            font-family: sans-serif;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            min-height: 100vh; overflow: hidden;
        }
        #box {
            position: relative; border: 2px solid #ec4899; border-radius: 12px;
            box-shadow: 0 0 35px rgba(236, 72, 153, 0.3); background: #0c0d16;
        }
        canvas { display: block; }
        .score { position: absolute; top: 15px; left: 20px; font-family: monospace; font-size: 1.1rem; color: #ec4899; }
        .overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(9, 10, 18, 0.9); display: flex; flex-direction: column;
            align-items: center; justify-content: center; border-radius: 10px;
        }
        .overlay.hidden { display: none; }
        h1 { background: linear-gradient(135deg, #ec4899, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 2.2rem; margin-bottom: 10px; }
        button {
            background: linear-gradient(135deg, #ec4899, #8b5cf6); border: none; color: #fff;
            padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="box">
        <div class="score" id="score">SCORE: 0</div>
        <canvas id="canvas" width="400" height="420"></canvas>
        <div id="overlay" class="overlay">
            <h1 id="title">BRICK BREAKER</h1>
            <p style="color: #64748b; margin-bottom: 20px; text-align:center; max-width:280px; font-size:0.85rem;">Gerakkan mouse Anda ke kiri/kanan untuk menggeser paddle pemukul bola.</p>
            <button onclick="startGame()">START PLAY</button>
        </div>
    </div>
    <script>
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const overlay = document.getElementById("overlay");
        const scoreDisp = document.getElementById("score");
        
        let audioCtx = null;
        function playBeep(f, d) {
            try {
                if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
                let o = audioCtx.createOscillator();
                let g = audioCtx.createGain();
                o.frequency.value = f;
                g.gain.setValueAtTime(0.1, audioCtx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + d);
                o.connect(g); g.connect(audioCtx.destination);
                o.start(); o.stop(audioCtx.currentTime + d);
            } catch(e) {}
        }

        let score = 0;
        let paddleWidth = 75, paddleHeight = 10, paddleX = (canvas.width - paddleWidth) / 2;
        let ballX = canvas.width / 2, ballY = canvas.height - 30;
        let dx = 2.5, dy = -2.5, ballRadius = 6;
        
        let rowCount = 4, colCount = 6, brickWidth = 55, brickHeight = 16, brickPadding = 6, offsetTop = 50, offsetLeft = 20;
        let bricks = [];

        canvas.addEventListener("mousemove", (e) => {
            let rect = canvas.getBoundingClientRect();
            let relativeX = e.clientX - rect.left;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth / 2;
            }
        });

        function startGame() {
            score = 0;
            ballX = canvas.width / 2; ballY = canvas.height - 30;
            dx = 2.5; dy = -2.5;
            bricks = [];
            for (let c = 0; c < colCount; c++) {
                bricks[c] = [];
                for (let r = 0; r < rowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
            overlay.classList.add("hidden");
            playBeep(440, 0.1);
            update();
        }

        function collisionDetection() {
            for(let c=0; c<colCount; c++) {
                for(let r=0; r<rowCount; r++) {
                    let b = bricks[c][r];
                    if(b.status === 1) {
                        if(ballX > b.x && ballX < b.x+brickWidth && ballY > b.y && ballY < b.y+brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score++;
                            scoreDisp.textContent = "SCORE: " + score;
                            playBeep(600, 0.08);
                            if(score === rowCount*colCount) {
                                win();
                            }
                        }
                    }
                }
            }
        }

        function win() {
            overlay.classList.remove("hidden");
            document.getElementById("title").textContent = "YOU WIN!";
            playBeep(880, 0.3);
        }

        function gameOver() {
            overlay.classList.remove("hidden");
            document.getElementById("title").textContent = "GAME OVER";
            playBeep(150, 0.4);
        }

        function update() {
            if(overlay.classList.contains("hidden")) {
                collisionDetection();
                
                if(ballX + dx > canvas.width-ballRadius || ballX + dx < ballRadius) dx = -dx;
                if(ballY + dy < ballRadius) dy = -dy;
                else if(ballY + dy > canvas.height - ballRadius - 10) {
                    if(ballX > paddleX && ballX < paddleX + paddleWidth) {
                        dy = -dy;
                        playBeep(350, 0.06);
                    } else {
                        gameOver();
                        return;
                    }
                }
                
                ballX += dx;
                ballY += dy;
                
                draw();
                requestAnimationFrame(update);
            }
        }

        function draw() {
            ctx.fillStyle = "#0c0d16";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bricks
            for(let c=0; c<colCount; c++) {
                for(let r=0; r<rowCount; r++) {
                    if(bricks[c][r].status === 1) {
                        let bX = (c*(brickWidth+brickPadding))+offsetLeft;
                        let bY = (r*(brickHeight+brickPadding))+offsetTop;
                        bricks[c][r].x = bX;
                        bricks[c][r].y = bY;
                        ctx.fillStyle = r%2 === 0 ? "#ec4899" : "#8b5cf6";
                        ctx.shadowBlur = 6; ctx.shadowColor = ctx.fillStyle;
                        ctx.fillRect(bX, bY, brickWidth, brickHeight);
                    }
                }
            }

            // Paddle
            ctx.fillStyle = "#38bdf8";
            ctx.shadowBlur = 8; ctx.shadowColor = "#38bdf8";
            ctx.fillRect(paddleX, canvas.height - 12, paddleWidth, paddleHeight);

            // Ball
            ctx.fillStyle = "#fff";
            ctx.shadowBlur = 10; ctx.shadowColor = "#fff";
            ctx.beginPath(); ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2); ctx.fill();
            ctx.shadowBlur = 0;
        }

        draw();
    </script>
</body>
</html>`;
                cssContent = `/* style.css */
#box { border-color: #ec4899 !important; }`;
            }
            // 4. APP: CALCULATOR
            else if (lower.includes("kalkulator") || lower.includes("calculator") || lower.includes("hitung")) {
                title = "Aplikasi Kalkulator Ilmiah Premium";
                description = "Kalkulator ilmiah premium interaktif dengan tampilan Glassmorphism ultra-modern, kalkulasi presisi tinggi, serta riwayat perhitungan interaktif.";
                
                htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Glassmorphism Scientific Calculator</title>${mediaComment}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: linear-gradient(135deg, #090b16 0%, #170d2e 100%);
            color: #fff; font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex; align-items: center; justify-content: center; min-height: 100vh;
        }
        .calc-card {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px; width: 340px; padding: 25px;
            backdrop-filter: blur(20px); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        .display {
            width: 100%; background: rgba(0, 0, 0, 0.35); border-radius: 12px;
            padding: 18px; text-align: right; border: 1px solid rgba(255,255,255,0.05);
            margin-bottom: 20px; overflow: hidden;
        }
        .display-expr { font-size: 0.85rem; color: #94a3b8; min-height: 1.1rem; margin-bottom: 4px; }
        .display-val { font-size: 1.8rem; font-weight: 700; color: #38bdf8; overflow-x: auto; white-space: nowrap; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        button {
            height: 52px; border: 1px solid rgba(255,255,255,0.05); border-radius: 10px;
            color: #fff; font-size: 1rem; font-weight: 600; cursor: pointer;
            background: rgba(255, 255, 255, 0.04); transition: all 0.2s;
        }
        button:hover { background: rgba(255, 255, 255, 0.12); transform: scale(1.03); }
        button.op { color: #f472b6; background: rgba(244, 114, 182, 0.06); }
        button.op:hover { background: rgba(244, 114, 182, 0.15); }
        button.equal {
            grid-column: span 2;
            background: linear-gradient(135deg, #8b5cf6, #ec4899);
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.3); border: none;
        }
        button.equal:hover { opacity: 0.9; }
        .history {
            margin-top: 15px; border-top: 1px solid rgba(255,255,255,0.08);
            padding-top: 15px; font-size: 0.75rem; color: #64748b;
        }
        .history-list { max-height: 50px; overflow-y: auto; margin-top: 6px; }
    </style>
</head>
<body>
    <div class="calc-card">
        <div class="display">
            <div class="display-expr" id="expr"></div>
            <div class="display-val" id="display">0</div>
        </div>
        <div class="grid">
            <button class="op" onclick="press('sin')">sin</button>
            <button class="op" onclick="press('cos')">cos</button>
            <button class="op" onclick="press('tan')">tan</button>
            <button class="op" onclick="clearAll()">C</button>
            
            <button class="op" onclick="press('^')">xʸ</button>
            <button class="op" onclick="press('sqrt')">√</button>
            <button class="op" onclick="press('/')">/</button>
            <button class="op" onclick="backspace()">⌫</button>

            <button onclick="press('7')">7</button>
            <button onclick="press('8')">8</button>
            <button onclick="press('9')">9</button>
            <button class="op" onclick="press('*')">&times;</button>

            <button onclick="press('4')">4</button>
            <button onclick="press('5')">5</button>
            <button onclick="press('6')">6</button>
            <button class="op" onclick="press('-')">-</button>

            <button onclick="press('1')">1</button>
            <button onclick="press('2')">2</button>
            <button onclick="press('3')">3</button>
            <button class="op" onclick="press('+')">+</button>

            <button onclick="press('0')">0</button>
            <button onclick="press('.')">.</button>
            <button class="equal" onclick="calculate()">=</button>
        </div>
        <div class="history">
            <div>RIWAYAT PERHITUNGAN</div>
            <div class="history-list" id="history">
                <div style="font-style:italic;">Belum ada riwayat</div>
            </div>
        </div>
    </div>
    <script>
        const disp = document.getElementById("display");
        const expr = document.getElementById("expr");
        const hist = document.getElementById("history");
        
        let currentVal = "0";
        let expressionStr = "";
        let newCalc = false;
        let historyArr = [];

        function updateDisplay() {
            disp.textContent = currentVal;
            expr.textContent = expressionStr;
        }

        function press(key) {
            if (newCalc && !isNaN(key)) {
                currentVal = "0";
                expressionStr = "";
            }
            newCalc = false;

            if (currentVal === "0" && !isNaN(key)) {
                currentVal = key;
            } else if (!isNaN(key) || key === ".") {
                currentVal += key;
            } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "^") {
                expressionStr += currentVal + " " + key + " ";
                currentVal = "0";
            } else if (key === "sin" || key === "cos" || key === "tan" || key === "sqrt") {
                let val = parseFloat(currentVal);
                let result = 0;
                if(key === "sin") result = Math.sin(val * Math.PI / 180);
                else if(key === "cos") result = Math.cos(val * Math.PI / 180);
                else if(key === "tan") result = Math.tan(val * Math.PI / 180);
                else if(key === "sqrt") result = Math.sqrt(val);
                
                expressionStr = key + "(" + currentVal + ")";
                currentVal = parseFloat(result.toFixed(6)).toString();
                newCalc = true;
            }
            updateDisplay();
        }

        function clearAll() {
            currentVal = "0";
            expressionStr = "";
            newCalc = false;
            updateDisplay();
        }

        function backspace() {
            if(currentVal.length > 1) {
                currentVal = currentVal.slice(0, -1);
            } else {
                currentVal = "0";
            }
            updateDisplay();
        }

        function calculate() {
            let finalExpr = expressionStr + currentVal;
            // replace power ^
            let evalExpr = finalExpr.replace(/\\^/g, "**");
            try {
                let result = eval(evalExpr);
                let formattedResult = parseFloat(result.toFixed(6)).toString();
                
                // Add to history
                historyArr.unshift(finalExpr + " = " + formattedResult);
                if(historyArr.length > 3) historyArr.pop();
                
                hist.innerHTML = historyArr.map(h => "<div>" + h + "</div>").join("");
                
                expressionStr = "";
                currentVal = formattedResult;
                newCalc = true;
            } catch(e) {
                currentVal = "ERROR";
                expressionStr = "";
            }
            updateDisplay();
        }
    </script>
</body>
</html>`;
                cssContent = `/* style.css */
.calc-card { box-shadow: 0 20px 45px rgba(139, 92, 246, 0.4) !important; }`;
            }
            // 5. APP: WEATHER DASHBOARD
            else {
                title = "Dashboard Cuaca Interaktif Premium";
                description = "Dashboard cuaca premium dengan pencarian kota dinamis, grafik perkiraan cuaca 5 hari, indikator indeks kenyamanan, dan visualisasi kondisi atmosfer berbasis SVG.";
                
                htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Dynamic Weather Dashboard</title>${mediaComment}
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #060713; color: #fff;
            font-family: 'Segoe UI', system-ui, sans-serif;
            display: flex; align-items: center; justify-content: center; min-height: 100vh;
            padding: 20px;
        }
        .dashboard {
            background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 20px; width: 380px; padding: 25px;
            backdrop-filter: blur(20px); box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
        }
        .search-box { display: flex; gap: 8px; margin-bottom: 20px; }
        input {
            flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
            color: #fff; padding: 10px 14px; border-radius: 10px; outline: none; font-size: 0.9rem;
        }
        input:focus { border-color: #38bdf8; }
        button {
            background: #38bdf8; border: none; color: #090a12; padding: 10px 18px;
            border-radius: 10px; cursor: pointer; font-weight: bold; font-size: 0.9rem;
        }
        .weather-info { text-align: center; margin-bottom: 25px; }
        .city { font-size: 1.4rem; font-weight: 700; }
        .temp-row { display: flex; align-items: center; justify-content: center; gap: 15px; margin: 12px 0; }
        .temp { font-size: 3rem; font-weight: 800; color: #38bdf8; }
        .cond { color: #94a3b8; font-size: 0.95rem; text-transform: uppercase; }
        .details { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 15px; }
        .det-card {
            background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05);
            border-radius: 12px; padding: 12px; text-align: center;
        }
        .det-val { font-size: 1.1rem; font-weight: bold; color: #34d399; margin-top: 4px; }
        .det-lbl { font-size: 0.7rem; color: #64748b; }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="search-box">
            <input type="text" id="cityInput" placeholder="Ketik nama kota... (Jakarta, Tokyo, dll.)">
            <button onclick="searchWeather()">CARI</button>
        </div>
        <div class="weather-info">
            <div class="city" id="cityName">Jakarta, ID</div>
            <div class="temp-row">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m12.72-12.72l-1.41 1.41"/></svg>
                <div class="temp" id="temp">31°C</div>
            </div>
            <div class="cond" id="cond">Cerah Berawan</div>
        </div>
        <div class="details">
            <div class="det-card">
                <div class="det-lbl">KELEMBABAN</div>
                <div class="det-val" id="hum">72%</div>
            </div>
            <div class="det-card">
                <div class="det-lbl">KECEPATAN ANGIN</div>
                <div class="det-val" id="wind">12 km/h</div>
            </div>
            <div class="det-card">
                <div class="det-lbl">INDEKS UV</div>
                <div class="det-val" id="uv">8 (Tinggi)</div>
            </div>
            <div class="det-card">
                <div class="det-lbl">TEKANAN UDARA</div>
                <div class="det-val" id="press">1012 hPa</div>
            </div>
        </div>
    </div>
    <script>
        const MOCK_DATA = {
            jakarta: { name: "Jakarta, ID", temp: "31°C", cond: "Cerah Berawan", hum: "72%", wind: "12 km/h", uv: "8 (Tinggi)", press: "1012 hPa" },
            tokyo: { name: "Tokyo, JP", temp: "18°C", cond: "Hujan Ringan", hum: "85%", wind: "22 km/h", uv: "2 (Rendah)", press: "1009 hPa" },
            london: { name: "London, UK", temp: "14°C", cond: "Mendung Berawan", hum: "90%", wind: "15 km/h", uv: "1 (Rendah)", press: "1015 hPa" },
            newyork: { name: "New York, US", temp: "22°C", cond: "Cerah", hum: "55%", wind: "8 km/h", uv: "6 (Sedang)", press: "1018 hPa" }
        };

        function searchWeather() {
            const input = document.getElementById("cityInput").value.trim().toLowerCase();
            if(!input) return;
            
            const cityName = document.getElementById("cityName");
            const temp = document.getElementById("temp");
            const cond = document.getElementById("cond");
            const hum = document.getElementById("hum");
            const wind = document.getElementById("wind");
            const uv = document.getElementById("uv");
            const press = document.getElementById("press");
            
            if(MOCK_DATA[input]) {
                const d = MOCK_DATA[input];
                cityName.textContent = d.name;
                temp.textContent = d.temp;
                cond.textContent = d.cond;
                hum.textContent = d.hum;
                wind.textContent = d.wind;
                uv.textContent = d.uv;
                press.textContent = d.press;
            } else {
                // Generate random weather for unknown city
                const randomTemp = Math.floor(Math.random() * 20) + 15;
                cityName.textContent = input.toUpperCase() + ", GLOBAL";
                temp.textContent = randomTemp + "°C";
                cond.textContent = ["Cerah", "Mendung", "Hujan", "Cerah Berawan"][Math.floor(Math.random() * 4)];
                hum.textContent = (Math.floor(Math.random() * 40) + 50) + "%";
                wind.textContent = (Math.floor(Math.random() * 25) + 5) + " km/h";
                uv.textContent = Math.floor(Math.random() * 10) + " (Sedang)";
                press.textContent = (Math.floor(Math.random() * 20) + 1000) + " hPa";
            }
        }
    </script>
</body>
</html>`;
                cssContent = `/* style.css */
.dashboard { box-shadow: 0 15px 40px rgba(56, 189, 248, 0.25) !important; }`;
            }

            // Write generated code to active workspace files
            filesData["index.html"].content = htmlContent;
            filesData["style.css"].content = cssContent;

            // Load and render file instantly in workspace
            loadWorkspaceFile("index.html");

            // Build the AI response chat bubble
            appendAIResponse(
                `🛠️ Aplikasi/Game Berhasil Dibuat!`,
                `${multimodalText}Saya telah memproses permintaan Anda [dan instruksi sistem] untuk membuat: **${title}**.<br><br>
                ${description}<br><br>
                ✨ **Kode program lengkap telah disuntikkan ke file workspace:**<br>
                - [index.html](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/floating-ai-coder/index.html) (HTML & JS Engine)<br>
                - [style.css](file:///C:/Users/acer/.gemini/antigravity-ide/scratch/floating-ai-coder/style.css) (Cyberpunk CSS Theme)<br><br>
                🎮 **Live Preview** telah di-compile dan berjalan di panel sebelah kanan secara instan! Anda dapat langsung memainkannya di sana!`,
                `<!-- file: index.html -->\n` + htmlContent.slice(0, 300) + `\n\n... [Sisa kode ${htmlContent.split("\n").length} baris telah disuntikkan ke index.html] ...`,
                "html"
            );

            // Clear attached media after successfully processing the prompt
            attachedMedia = [];
            renderMediaPreviews();
            return;
        }

        // Custom Context-based response handler for standard questions
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

        // Always-code path for coding tabs — always give FULL relevant code
        if (currentCategory !== "tanya") {
            const built = buildFullCode(query, currentCategory);
            if (built) {
                appendAIResponse(built.title, built.text, built.code, built.lang);
                return;
            }
        }

        // Final hard fallback (should rarely reach here)
        const catName = codingPresets[currentCategory]?.modeName || currentCategory;
        appendAIResponse(
            `Kode ${catName}: ${query.slice(0, 60)}`,
            `Berikut kode lengkap untuk: **${escapeHTML(query)}**`,
            currentCategory === "roblox" ?
`-- [ServerScriptService] Roblox Luau Script
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local function main()
    print("Script aktif: ${escapeHTML(query)}")
    -- Tambahkan logika Anda di sini
end

Players.PlayerAdded:Connect(function(player)
    main()
end)` :
            currentCategory === "web" ?
`<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>${escapeHTML(query)}</title>
  <style>
    body { background:#090d16; color:#fff; font-family:sans-serif;
      display:flex; align-items:center; justify-content:center; min-height:100vh; }
    .box { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1);
      backdrop-filter:blur(10px); border-radius:16px; padding:32px; }
  </style>
</head>
<body>
  <div class="box"><h1>${escapeHTML(query)}</h1></div>
</body></html>` :
            currentCategory === "game" ?
`using UnityEngine;

public class CustomScript : MonoBehaviour
{
    void Start() { Debug.Log("${escapeHTML(query)} initialized"); }
    void Update() { /* logika tiap frame */ }
}` :
`# Python Script: ${escapeHTML(query)}
def main():
    print("Running: ${escapeHTML(query)}")
    # TODO: implementasi logika Anda

if __name__ == "__main__":
    main()`,
            currentCategory === "roblox" ? "lua" :
            currentCategory === "web" ? "html" :
            currentCategory === "game" ? "csharp" : "python"
        );
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

    // ==========================================
    // GEMINI STUDIO INITIALIZATION & MEDIA PREVIEWS
    // ==========================================

    function initGeminiStudio() {
        if (!btnToggleSidebar) return;

        // Collapsible Studio Sidebar
        btnToggleSidebar.addEventListener("click", () => {
            studioSidebar.classList.toggle("hidden");
            container.classList.toggle("studio-wide");
            
            const isWide = container.classList.contains("studio-wide");
            if (isWide) {
                container.style.width = "850px";
                showToast("✨ Gemini Studio Panel Expanded", "mode");
            } else {
                container.style.width = "460px";
                showToast("✨ Gemini Studio Panel Collapsed", "mode");
            }
        });

        // Temperature slider input sync
        if (tempSlider && tempDisplay) {
            tempSlider.addEventListener("input", () => {
                tempDisplay.textContent = parseFloat(tempSlider.value).toFixed(1);
            });
        }

        // Quick-build preset buttons
        const quickBtns = document.querySelectorAll(".quick-build-btn");
        quickBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const promptText = btn.getAttribute("data-prompt");
                chatInput.value = promptText;
                
                // Show toast for visual confirmation
                showToast("✨ Quick-build selected", "success");
                
                // Submit form
                chatForm.dispatchEvent(new Event("submit"));
            });
        });

        // Multimodal Media Attachment selectors
        if (btnAttachFile && mediaAttachmentInput) {
            btnAttachFile.addEventListener("click", () => {
                mediaAttachmentInput.click();
            });

            mediaAttachmentInput.addEventListener("change", (e) => {
                const files = e.target.files;
                if (!files || files.length === 0) return;

                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();

                    reader.onload = (event) => {
                        const fileData = {
                            name: file.name,
                            type: file.type,
                            dataUrl: event.target.result
                        };

                        attachedMedia.push(fileData);
                        renderMediaPreviews();
                        showToast(`📸 Media "${file.name}" ditambahkan!`, "success");
                    };

                    reader.readAsDataURL(file);
                }
                
                mediaAttachmentInput.value = ""; // Reset
            });
        }
    }

    function renderMediaPreviews() {
        if (!mediaPreviewContainer) return;
        mediaPreviewContainer.innerHTML = "";
        
        if (attachedMedia.length === 0) {
            mediaPreviewContainer.classList.add("hidden");
            return;
        }

        mediaPreviewContainer.classList.remove("hidden");

        attachedMedia.forEach((media, index) => {
            const item = document.createElement("div");
            item.className = "media-preview-item";

            if (media.type.startsWith("image/")) {
                item.innerHTML = `<img src="${media.dataUrl}" alt="${media.name}">`;
            } else if (media.type.startsWith("video/")) {
                item.innerHTML = `<video src="${media.dataUrl}" muted autoplay loop></video>`;
            }

            const removeBtn = document.createElement("button");
            removeBtn.className = "btn-remove-media";
            removeBtn.innerHTML = "&times;";
            removeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                attachedMedia.splice(index, 1);
                renderMediaPreviews();
            });

            item.appendChild(removeBtn);
            mediaPreviewContainer.appendChild(item);
        });
    }

    /* ==========================================
       LINUX WINDOW MANAGER & DESKTOP ENVIRONMENT LOGIC
       ========================================== */

    let maxZIndex = 100;

    function getDockIdForWindow(winId) {
        if (winId === "window-explorer") return "dock-explorer";
        if (winId === "window-editor") return "dock-editor";
        if (winId === "window-preview") return "dock-preview";
        if (winId === "window-settings") return "dock-settings";
        if (winId === "floating-ai-container") return "dock-ai";
        return null;
    }

    function focusWindow(winEl) {
        if (!winEl) return;
        
        // Remove active-window class from all windows
        document.querySelectorAll(".linux-window, .floating-panel").forEach(w => {
            w.classList.remove("active-window");
        });
        
        // Add active class and bring to front
        winEl.classList.add("active-window");
        maxZIndex += 1;
        winEl.style.zIndex = maxZIndex;

        // Update dock focus styles
        document.querySelectorAll(".dock-item").forEach(item => {
            item.classList.remove("focused");
        });
        
        const targetDockId = getDockIdForWindow(winEl.id);
        if (targetDockId) {
            const dockItem = document.getElementById(targetDockId);
            if (dockItem) {
                dockItem.classList.add("focused");
                dockItem.classList.add("active"); // Ensure active indicator dot is lit
            }
        }
    }

    // Register global toggleWindow and maximizeWindow on the window object so inline HTML onclick handlers work
    window.toggleWindow = function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        
        const dockId = getDockIdForWindow(windowId);
        const dockItem = document.getElementById(dockId);

        // Special handling for main AI container to match bubble trigger
        if (windowId === "floating-ai-container") {
            const triggerBubble = document.getElementById("floating-trigger");
            if (win.classList.contains("minimized") || win.classList.contains("hidden") || !win.classList.contains("active")) {
                win.classList.remove("minimized");
                win.classList.remove("hidden");
                win.classList.add("active");
                if (triggerBubble) triggerBubble.classList.add("hidden");
                if (dockItem) {
                    dockItem.classList.add("active");
                }
                focusWindow(win);
            } else {
                if (!win.classList.contains("active-window")) {
                    focusWindow(win);
                } else {
                    win.classList.add("minimized");
                    win.classList.remove("active");
                    if (triggerBubble) triggerBubble.classList.remove("hidden");
                    if (dockItem) {
                        dockItem.classList.remove("active");
                        dockItem.classList.remove("focused");
                    }
                }
            }
            return;
        }

        // Standard windows (Explorer, Editor, Preview, Settings)
        if (win.classList.contains("minimized") || win.classList.contains("hidden") || win.style.display === "none") {
            win.classList.remove("minimized");
            win.classList.remove("hidden");
            win.style.display = "";
            if (dockItem) {
                dockItem.classList.add("active");
            }
            focusWindow(win);
            showToast(`📂 Membuka ${win.querySelector(".window-title")?.textContent || 'Jendela'}`, "system");
        } else {
            if (!win.classList.contains("active-window")) {
                focusWindow(win);
            } else {
                win.classList.add("minimized");
                if (dockItem) {
                    dockItem.classList.remove("active");
                    dockItem.classList.remove("focused");
                }
            }
        }
    };

    window.maximizeWindow = function(windowId) {
        const win = document.getElementById(windowId);
        if (!win) return;
        
        win.classList.toggle("maximized");
        focusWindow(win);
    };

    // Bind click focus listeners to all window panels
    const windowIds = ["window-explorer", "window-editor", "window-preview", "window-settings", "floating-ai-container"];
    windowIds.forEach(id => {
        const win = document.getElementById(id);
        if (win) {
            win.addEventListener("mousedown", () => focusWindow(win));
            win.addEventListener("touchstart", () => focusWindow(win), { passive: true });
        }
    });

    // Setup drag listeners for Linux client-side decoration headers
    const draggableWindows = [
        { winId: "window-explorer", headerId: "header-explorer" },
        { winId: "window-editor", headerId: "header-editor" },
        { winId: "window-preview", headerId: "header-preview" },
        { winId: "window-settings", headerId: "header-settings" }
    ];

    draggableWindows.forEach(({ winId, headerId }) => {
        const win = document.getElementById(winId);
        const header = document.getElementById(headerId);
        if (win && header) {
            let isWinDragging = false;
            let winDragStartX = 0;
            let winDragStartY = 0;

            const onDragStart = (clientX, clientY) => {
                if (win.classList.contains("maximized")) return;
                isWinDragging = true;
                focusWindow(win);
                const rect = win.getBoundingClientRect();
                winDragStartX = clientX - rect.left;
                winDragStartY = clientY - rect.top;
                win.classList.add("dragging");
            };

            header.addEventListener("mousedown", (e) => {
                if (e.target.closest(".window-controls") || e.target.closest(".window-actions") || e.target.closest(".editor-actions")) {
                    return;
                }
                onDragStart(e.clientX, e.clientY);

                const onMouseMove = (moveEvent) => {
                    if (!isWinDragging) return;
                    let newLeft = moveEvent.clientX - winDragStartX;
                    let newTop = moveEvent.clientY - winDragStartY;

                    // Bound checks inside viewport
                    if (newLeft < 0) newLeft = 0;
                    if (newTop < 28) newTop = 28; // avoid status bar
                    if (newLeft + win.offsetWidth > window.innerWidth) newLeft = window.innerWidth - win.offsetWidth;
                    if (newTop + win.offsetHeight > window.innerHeight - 68) newTop = window.innerHeight - 68 - win.offsetHeight;

                    win.style.left = `${newLeft}px`;
                    win.style.top = `${newTop}px`;
                    win.style.right = "auto";
                };

                const onMouseUp = () => {
                    isWinDragging = false;
                    win.classList.remove("dragging");
                    document.removeEventListener("mousemove", onMouseMove);
                    document.removeEventListener("mouseup", onMouseUp);
                };

                document.addEventListener("mousemove", onMouseMove);
                document.addEventListener("mouseup", onMouseUp);
            });

            header.addEventListener("touchstart", (e) => {
                if (e.target.closest(".window-controls") || e.target.closest(".window-actions") || e.target.closest(".editor-actions")) {
                    return;
                }
                onDragStart(e.touches[0].clientX, e.touches[0].clientY);

                const onTouchMove = (moveEvent) => {
                    if (!isWinDragging) return;
                    let newLeft = moveEvent.touches[0].clientX - winDragStartX;
                    let newTop = moveEvent.touches[0].clientY - winDragStartY;

                    if (newLeft < 0) newLeft = 0;
                    if (newTop < 28) newTop = 28;
                    if (newLeft + win.offsetWidth > window.innerWidth) newLeft = window.innerWidth - win.offsetWidth;
                    if (newTop + win.offsetHeight > window.innerHeight - 68) newTop = window.innerHeight - 68 - win.offsetHeight;

                    win.style.left = `${newLeft}px`;
                    win.style.top = `${newTop}px`;
                    win.style.right = "auto";
                };

                const onTouchEnd = () => {
                    isWinDragging = false;
                    win.classList.remove("dragging");
                    document.removeEventListener("touchmove", onTouchMove);
                    document.removeEventListener("touchend", onTouchEnd);
                };

                document.addEventListener("touchmove", onTouchMove, { passive: false });
                document.addEventListener("touchend", onTouchEnd);
            }, { passive: true });
        }
    });

    // Top Status Bar clock updating utility
    function updateLinuxClock() {
        const clockEl = document.getElementById("linux-clock");
        if (!clockEl) return;
        
        const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
        
        const now = new Date();
        const dayName = days[now.getDay()];
        const date = now.getDate();
        const monthName = months[now.getMonth()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        clockEl.textContent = `${dayName}, ${date} ${monthName}, ${hours}:${minutes}`;
    }
    setInterval(updateLinuxClock, 1000);
    updateLinuxClock();

    /* ==========================================
       SYSTEM CONTROL CENTER & SETTINGS LOGIC
       ========================================== */

    function initControlCenter() {
        // 1. Dock Settings Icon Link
        const dockSettings = document.getElementById("dock-settings");
        if (dockSettings) {
            dockSettings.addEventListener("click", () => {
                toggleWindow("window-settings");
            });
        }

        // 2. Settings tab switching
        const settingsNavBtns = document.querySelectorAll(".settings-nav-btn");
        settingsNavBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const tabName = btn.getAttribute("data-settings-tab");
                switchSettingsTab(tabName);
            });
        });

        // 3. Theme selector cards
        const themeCards = document.querySelectorAll(".theme-select-card");
        themeCards.forEach(card => {
            card.addEventListener("click", () => {
                const theme = card.getAttribute("data-theme");
                applyDesktopTheme(theme);
            });
        });

        // 4. Creator preset submission
        const creatorForm = document.getElementById("settings-creator-form");
        if (creatorForm) {
            creatorForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const key = document.getElementById("creator-key-input").value.trim();
                const category = document.getElementById("creator-preset-category").value;
                const lang = document.getElementById("creator-preset-lang").value.trim().toLowerCase();
                const title = document.getElementById("creator-preset-title").value.trim();
                const desc = document.getElementById("creator-preset-desc").value.trim();
                const code = document.getElementById("creator-preset-code").value.trim();
                
                // Validate license key
                let validKeys = [];
                try {
                    validKeys = JSON.parse(localStorage.getItem("app_creator_keys")) || [];
                } catch (err) {
                    validKeys = [];
                }
                
                const keyIndex = validKeys.indexOf(key);
                if (keyIndex === -1) {
                    showToast("❌ License Key tidak valid atau sudah digunakan!", "info");
                    return;
                }
                
                // Key is valid! Save preset
                const presetId = `custom_${category}_${Date.now()}`;
                if (codingPresets[category]) {
                    codingPresets[category].suggestions.push({ text: title, id: presetId });
                    codingPresets[category].responses[presetId] = {
                        title: title,
                        lang: lang,
                        text: desc,
                        code: code
                    };
                    
                    // Persist custom presets in localStorage
                    let customs = [];
                    try {
                        customs = JSON.parse(localStorage.getItem("custom_presets")) || [];
                    } catch (err) {
                        customs = [];
                    }
                    customs.push({ category, lang, title, desc, code, id: presetId });
                    localStorage.setItem("custom_presets", JSON.stringify(customs));
                    
                    // Consume key (remove from active list)
                    validKeys.splice(keyIndex, 1);
                    localStorage.setItem("app_creator_keys", JSON.stringify(validKeys));
                    
                    // Update suggestions view if current category matches
                    if (currentCategory === category) {
                        updateSuggestions();
                    }
                    
                    showToast("🎉 Preset kustom berhasil dipublikasikan menggunakan License Key!", "success");
                    creatorForm.reset();
                    switchSettingsTab("profile");
                } else {
                    showToast("❌ Kategori preset tidak dikenal!", "info");
                }
            });
        }

        // 5. Admin key generator
        const btnGenKey = document.getElementById("btn-generate-creator-key");
        const keyDisplay = document.getElementById("generated-key-display");
        if (btnGenKey && keyDisplay) {
            btnGenKey.addEventListener("click", () => {
                // Generate a key like CREATOR-XXXX-XXXX-XXXX
                const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                const genPart = () => {
                    let part = "";
                    for (let idx = 0; idx < 4; idx++) {
                        part += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    return part;
                };
                const key = `CREATOR-${genPart()}-${genPart()}-${genPart()}`;
                
                // Save to valid keys list
                let validKeys = [];
                try {
                    validKeys = JSON.parse(localStorage.getItem("app_creator_keys")) || [];
                } catch (err) {
                    validKeys = [];
                }
                validKeys.push(key);
                localStorage.setItem("app_creator_keys", JSON.stringify(validKeys));
                
                // Display key
                keyDisplay.value = key;
                showToast("🔑 Creator License Key baru berhasil di-generate!", "success");
            });
        }

        // 6. Admin server terminal console
        const termInput = document.getElementById("server-terminal-input");
        const termLogs = document.getElementById("server-terminal-logs");
        if (termInput && termLogs) {
            termInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    const cmd = termInput.value.trim();
                    if (!cmd) return;
                    
                    // Append command to output
                    termLogs.innerHTML += `\n<span class="terminal-prompt">admin@antigravity:~$</span> ${escapeHTML(cmd)}`;
                    
                    // Process command
                    const cmdLower = cmd.toLowerCase();
                    let output = "";
                    
                    if (cmdLower === "help") {
                        output = "Available server commands:\n  help        - Show this help message\n  status      - Display server resource status and health metrics\n  logs        - Output recent HTTP access and server system logs\n  restart     - Perform soft reboot of the webserver daemon\n  deploy      - Trigger git fetch, merge, and Vercel assets rebuild\n  clear-cache - Flush system caches and database query buffers";
                    } else if (cmdLower === "status") {
                        output = `Server Status: ONLINE\nSystem Uptime: 4 hours, 23 minutes\nPort Binding: 0.0.0.0:8000\nCPU Utilization: 4.2% | Memory Allocation: 124MB / 512MB\nActive Websocket Threads: 3\nHost OS: Linux kernel 5.15.0-88-generic (Ubuntu)`;
                    } else if (cmdLower === "restart") {
                        output = "Stopping Antigravity WebServer daemon (PID 1093)... [OK]\nFlushing socket buffers... [OK]\nStarting service listener on port 8000... [OK]\nWarm reboot completed in 450ms. Server status: ONLINE";
                    } else if (cmdLower === "deploy") {
                        output = "Fetching remote main branch from github.com/Hmalk1234/floating-ai-coder...\nFrom github.com/Hmalk1234/floating-ai-coder\n   2d43ed9..745b9d9  main       -> origin/main\nUpdating working directory... [OK]\nBuilding production assets... [OK]\nDeployment of commit 745b9d9 successful! Vercel edge routes updated.";
                    } else if (cmdLower === "logs") {
                        const time = new Date().toISOString();
                        output = `[${time}] GET /app.js?v=1.0.2 - 200 OK - 183KB\n[${time}] GET /style.css?v=1.0.2 - 200 OK - 55KB\n[${time}] POST /api/chat - 200 OK - 1.2s - Gemini 2.5 Pro\n[${time}] GET / - 200 OK - 31KB`;
                    } else if (cmdLower === "clear-cache") {
                        output = "Flushing template cache... [OK]\nClearing database query buffers... [OK]\nSystem cache cleared successfully. 124MB memory freed.";
                    } else {
                        output = `bash: ${escapeHTML(cmd)}: command not found. Type 'help' for available server commands.`;
                    }
                    
                    termLogs.innerHTML += `\n${output}`;
                    termInput.value = "";
                    
                    // Scroll to bottom
                    termLogs.scrollTop = termLogs.scrollHeight;
                }
            });
        }

        // 7. Settings Logout Button
        const btnSettingsLogout = document.getElementById("btn-settings-logout");
        if (btnSettingsLogout) {
            btnSettingsLogout.addEventListener("click", () => {
                currentUser = null;
                localStorage.removeItem("app_current_user");
                checkSession();
                showToast("🚪 Anda telah keluar (signed out)", "system");
                
                // Hide settings window
                const settingsWin = document.getElementById("window-settings");
                if (settingsWin) {
                    settingsWin.classList.add("hidden");
                    const settingsDock = document.getElementById("dock-settings");
                    if (settingsDock) {
                        settingsDock.classList.remove("active");
                        settingsDock.classList.remove("focused");
                    }
                }
            });
        }

        // Load stored theme on start
        const savedTheme = localStorage.getItem("app_theme") || "violet";
        applyDesktopTheme(savedTheme);
    }

    function switchSettingsTab(tabName) {
        // Remove active class from all nav buttons
        document.querySelectorAll(".settings-nav-btn").forEach(b => {
            b.classList.remove("active");
            if (b.getAttribute("data-settings-tab") === tabName) {
                b.classList.add("active");
            }
        });
        
        // Hide all tab content views
        document.querySelectorAll(".settings-tab-view").forEach(v => {
            v.classList.add("hidden");
        });
        
        // Show target tab content
        const targetView = document.getElementById(`settings-tab-${tabName}`);
        if (targetView) {
            targetView.classList.remove("hidden");
        }
    }

    function applyDesktopTheme(theme) {
        // Update active card class
        document.querySelectorAll(".theme-select-card").forEach(c => {
            c.classList.remove("active");
            if (c.getAttribute("data-theme") === theme) {
                c.classList.add("active");
            }
        });
        
        // Apply theme class to desktop container
        const desktop = document.getElementById("linux-desktop");
        if (desktop) {
            desktop.classList.remove("active-theme-violet", "active-theme-cyan", "active-theme-emerald", "active-theme-arch");
            desktop.classList.add(`active-theme-${theme}`);
        }
        
        // Also apply to floating panels for compatibility
        const container = document.getElementById("floating-ai-container");
        if (container) {
            container.classList.remove("active-theme-violet", "active-theme-cyan", "active-theme-emerald", "active-theme-arch");
            container.classList.add(`active-theme-${theme}`);
        }
        
        const bubble = document.getElementById("floating-trigger");
        if (bubble) {
            bubble.classList.remove("active-theme-violet", "active-theme-cyan", "active-theme-emerald", "active-theme-arch");
            bubble.classList.add(`active-theme-${theme}`);
        }
        
        // Save selected theme
        localStorage.setItem("app_theme", theme);
    }

    // Admin Account Actions
    window.updateUserRole = function(username, newRole) {
        const userIdx = users.findIndex(u => u.username === username);
        if (userIdx !== -1) {
            users[userIdx].role = newRole;
            localStorage.setItem("app_users", JSON.stringify(users));
            
            // If the modified user is the active logged-in user, update session
            if (currentUser && currentUser.username === username) {
                currentUser.role = newRole;
                localStorage.setItem("app_current_user", JSON.stringify(currentUser));
            }
            
            checkSession();
            showToast(`👤 Role ${username} berhasil diubah ke ${newRole.toUpperCase()}!`, "success");
        }
    };
    
    window.deleteUserAccount = function(username) {
        if (currentUser && currentUser.username === username) {
            showToast("❌ Anda tidak dapat menghapus akun Anda sendiri!", "info");
            return;
        }
        
        const userIdx = users.findIndex(u => u.username === username);
        if (userIdx !== -1) {
            users.splice(userIdx, 1);
            localStorage.setItem("app_users", JSON.stringify(users));
            renderAdminUsersTable();
            showToast(`❌ Akun ${username} berhasil dihapus!`, "success");
        }
    };

    window.renderAdminUsersTable = function() {
        const listBody = document.getElementById("settings-admin-users-list");
        if (!listBody) return;
        listBody.innerHTML = "";
        
        users.forEach(user => {
            const row = document.createElement("tr");
            
            // Dropdown to change role
            let optionsHtml = "";
            ["biasa", "creator", "admin"].forEach(r => {
                const selected = user.role === r ? "selected" : "";
                optionsHtml += `<option value="${r}" ${selected}>${r.toUpperCase()}</option>`;
            });
            
            row.innerHTML = `
                <td><strong>${escapeHTML(user.username)}</strong></td>
                <td><span class="user-role-badge ${user.role}">${user.role === "biasa" ? "Biasa" : user.role}</span></td>
                <td>
                    <select class="settings-select" style="padding: 4px 8px; font-size: 0.72rem; width: 90px;" onchange="updateUserRole('${user.username}', this.value)">
                        ${optionsHtml}
                    </select>
                </td>
                <td>
                    <button class="btn-settings-action" style="padding: 4px 8px; font-size: 0.72rem; background: rgba(244,63,94,0.1);" onclick="deleteUserAccount('${user.username}')">Delete</button>
                </td>
            `;
            
            listBody.appendChild(row);
        });
    };

    // Startup Session & Database Initialization
    initWorkspaceEditor();
    initVoiceCoding();
    initBugHunter();
    initUserDatabase();
    initGeminiStudio();
    initControlCenter();
    checkSession();
    
    // Initial Focus
    const aiWin = document.getElementById("floating-ai-container");
    if (aiWin) focusWindow(aiWin);
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
