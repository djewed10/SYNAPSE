# Frontend - Missing Dependencies

The following packages need to be installed in the `front-end` directory:

## UI & Component Libraries
- `@radix-ui/react-dialog` - Dialog/Modal components
- `@radix-ui/react-select` - Select dropdown components
- `clsx` - Utility for classname management
- `tailwind-merge` - Merge tailwind classes without conflicts
- `lucide-react` - Icon library

## Form Handling & Validation
- `react-hook-form` - Form state management
- `zod` - TypeScript-first schema validation

## State Management & Data Fetching
- `zustand` - Lightweight state management
- `@tanstack/react-query` - Server state management

## HTTP Client
- `axios` - Promise-based HTTP client

## Development Dependencies
These should already be installed:
- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`

## Installation Command

```bash
cd front-end

npm install @radix-ui/react-dialog @radix-ui/react-select clsx tailwind-merge lucide-react react-hook-form zod zustand @tanstack/react-query axios

# Or using yarn
yarn add @radix-ui/react-dialog @radix-ui/react-select clsx tailwind-merge lucide-react react-hook-form zod zustand @tanstack/react-query axios
```

## After Installation

1. Run `npm run dev` to start the development server
2. Navigate to `http://localhost:3000` to see the landing page
3. Test login/register flows (API integration needed)
4. Check `.env.local` for configuration

## Notes

- The project uses Next.js 13+ App Router
- Tailwind CSS is configured with dark mode
- All components follow shadcn/ui conventions
- Type safety with TypeScript throughout
