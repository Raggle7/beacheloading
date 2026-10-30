-- TTT2 Loading Screen: points connecting players at the hosted loading screen page.
--
-- Set DEFAULT_URL to your GitHub Pages address, or override it from server.cfg with
--   ttt2_loadingscreen_url "https://YOUR-NAME.github.io/YOUR-REPO/?map=%m"
-- Keep ?map=%m: GMod fills in the map name, so per-map backgrounds show up straight away.

local DEFAULT_URL = "https://YOUR-NAME.github.io/YOUR-REPO/?map=%m"

local urlConVar = CreateConVar(
	"ttt2_loadingscreen_url",
	DEFAULT_URL,
	FCVAR_NONE,
	"Loading screen page URL, copied into sv_loadingurl."
)

local function applyLoadingURL()
	local url = urlConVar:GetString()
	if url == "" or string.find(url, "YOUR-NAME", 1, true) then return end

	RunConsoleCommand("sv_loadingurl", url)
end

hook.Add("Initialize", "TTT2LoadingScreen", applyLoadingURL)
cvars.AddChangeCallback("ttt2_loadingscreen_url", applyLoadingURL, "TTT2LoadingScreen")
