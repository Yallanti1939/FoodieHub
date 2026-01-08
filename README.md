# FoodieHub

A small, local clone of a FoodieHub-style frontend built with React + Vite. It's intended as a starting point for exploring or customizing a food ordering UI.

You can also view a hosted preview in AI Studio: https://ai.studio/apps/drive/18-r6iY5lqD5AgSimf0QvHnQDpPJuTDY4

## Quick Start

Prerequisites: Node.js (LTS) and npm

1. Install dependencies
   ```bash
   npm install
   ```
2. (Optional) If you use AI features, open `.env.local` and set `GEMINI_API_KEY` there.
3. Start the dev server
   ```bash
   npm run dev
   ```

## Useful scripts

- `npm run dev` — Start development server
- `npm run build` — Create production build
- `npm run preview` — Preview the production build locally

## Notes

- This project is a frontend scaffold. Backend/API integration (orders, auth, payments) is left intentionally flexible so you can plug in your own services.
- Check `package.json` for exact scripts and dependency versions.

## Contributing

If you'd like to improve this project, open an issue or submit a pull request. Small docs or UX improvements are always welcome.

## License

See `package.json` for license details.
