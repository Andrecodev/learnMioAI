# TanStack Query + Zustand Integration

This project now includes TanStack Query for server state management and Zustand for client state management.

## 🚀 What's Been Set Up

### TanStack Query (React Query)
- **Global Provider**: `ReactQueryProvider` wraps the entire app in `app/layout.tsx`
- **DevTools**: React Query DevTools available in development
- **API Layer**: External API utilities in `lib/api.ts`
- **Custom Hooks**: Pre-built hooks for common operations in `hooks/use-api.ts`

### Zustand
- **Profile Form Store**: `useProfileFormStore` manages form state across 3 steps
- **UI Store**: `useUIStore` for global UI state (sidebar, modals, etc.)
- **Persistent State**: Form data persists across step navigation

## 📁 File Structure

```
├── components/
│   └── react-query-provider.tsx    # TanStack Query provider
├── stores/
│   └── ui-store.ts                  # Zustand stores
├── hooks/
│   └── use-api.ts                   # TanStack Query hooks
├── lib/
│   └── api.ts                       # API utilities for external endpoints
└── .env.example                     # Environment variables for external APIs
```

## 🔧 Usage Examples

### Profile Form (Already Integrated)

The `ProfileForm` component demonstrates both:

```tsx
// Zustand for form state
const { formData, currentStep, setFormData, nextStep } = useProfileFormStore();

// TanStack Query for external API calls
const batchSaveMutation = useBatchProfileSave();
```

### External API Configuration

1. Copy `.env.example` to `.env.local`
2. Add your external API endpoints:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_API_TOKEN=your-token
```

### Creating New API Hooks

```tsx
// In hooks/use-api.ts
export const useYourDataQuery = (params: any) => {
  return useQuery({
    queryKey: ['your-data', params],
    queryFn: () => api.yourEndpoint.get(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
```

### Creating New Zustand Stores

```tsx
// In stores/ui-store.ts
interface YourState {
  data: any[];
  setData: (data: any[]) => void;
}

export const useYourStore = create<YourState>((set) => ({
  data: [],
  setData: (data) => set({ data }),
}));
```

## 🎯 Benefits

### TanStack Query
- ✅ Automatic caching and background updates
- ✅ Error handling and retry logic
- ✅ Loading states and mutations
- ✅ Optimistic updates
- ✅ Perfect for external APIs

### Zustand
- ✅ Simple global state management
- ✅ No boilerplate like Redux
- ✅ TypeScript friendly
- ✅ Persistent across components

## 🔄 Data Flow

1. **User Interaction** → Zustand store updates local state
2. **Form Submission** → TanStack Query mutation calls external API
3. **Success Response** → Cache invalidation and optimistic updates
4. **Background Sync** → Automatic refetching and cache management

## 🛠 Next Steps

1. **Add your external API endpoints** in `lib/api.ts`
2. **Create custom hooks** for your specific data needs
3. **Expand Zustand stores** for more global state
4. **Configure environment variables** for your external services

## 📚 Documentation

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [Zustand Docs](https://github.com/pmndrs/zustand)
