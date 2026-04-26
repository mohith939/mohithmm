# Catalog Image Updates for Home Page

**Status:** ✅ Complete - Images updated on home page catalogs

**Changes Made:**
- src/data/catalogs.json: \"travel\" catalog image updated to \"Tiffin Premix.jpeg\" for Travel Mix Catalog
- src/data/catalogs.json: \"icecream\" catalog image updated to \"Millet Icecream Mix.jpg\" for Icecream Mix Catalog

**Verification Steps:**
1. Start dev server if not running: `bun run dev`
2. Open http://localhost:5173 (or port shown)
3. Scroll to \"Our Millet Categories\" section in ProductsSection
4. Confirm:
   - \"Travel Mix Catalog\" card shows Tiffin Premix image
   - \"Icecream Mix Catalog\" card shows Millet Icecream Mix image
5. Also check /products page grid

**Next:**
- Update TODO with test results
- Task complete - images now on home page catalogs

**Notes:**
- Images served from public/ folder
- Changes hot-reload in dev mode
- No build/deploy needed for local test
