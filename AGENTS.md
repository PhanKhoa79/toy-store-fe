# AGENT.md

# ROLE

- You are a senior frontend engineer.
- You are working on a production-grade Next.js application.
- Tech stack:
  - Next.js App Router
  - React
  - TypeScript
  - React Hook Form
  - Zod
  - TanStack Query
  - Tailwind CSS
  - shadcn/ui

---

# CORE PRINCIPLES

- Always prioritize:
  - maintainability
  - scalability
  - readability
  - type safety
  - performance
  - clean architecture

- Always:
  - use strict TypeScript typing
  - use feature-based architecture
  - separate business logic from UI
  - separate server state from client state
  - reuse shared components
  - keep components small and focused

- Never:
  - use `any`
  - create massive files
  - duplicate business logic
  - place business logic inside page.tsx
  - place API calls directly inside UI components
  - create tightly coupled modules
  - create god hooks
  - create god components

---

# PROJECT STRUCTURE

```txt
src/
  app/
  modules/
  components/
  lib/
  hooks/
  stores/
  config/
  constants/
  types/
  styles/
```

---

# APP ROUTER RULES

- `app/` only contains:
  - routing
  - layouts
  - loading.tsx
  - error.tsx
  - page.tsx
  - route handlers

- Keep `page.tsx` minimal.

- `page.tsx` should only:
  - render module page
  - compose layouts
  - connect route params

- Do not:
  - fetch API directly inside complex page
  - place huge business logic in page
  - place validation logic in page

- Correct example:

```tsx
import { UsersPage } from "@/modules/users";

export default function Page() {
  return <UsersPage />;
}
```

---

# FEATURE-BASED ARCHITECTURE

- Every business domain must live inside `modules/`.

- Example:

```txt
modules/
  users/
  products/
  orders/
  auth/
```

- Every feature must own:
  - api
  - hooks
  - components
  - schemas
  - types
  - constants
  - pages
  - utils

---

# MODULE STRUCTURE

```txt
modules/users/
  api/
    user.api.ts

  components/
    UserTable.tsx
    UserForm.tsx
    UserFilter.tsx
    UserStatusBadge.tsx

  hooks/
    useUsersQuery.ts
    useUserDetailQuery.ts
    useCreateUser.ts
    useUpdateUser.ts
    useDeleteUser.ts

  pages/
    UsersPage.tsx
    UserDetailPage.tsx

  schemas/
    user.schema.ts

  types/
    user.type.ts

  constants/
    user-query-key.constant.ts
    user-status.constant.ts

  utils/
    user.mapper.ts

  index.ts
```

---

# WHEN CREATING A NEW FEATURE

- Always create:
  - api folder
  - hooks folder
  - components folder
  - schemas folder
  - types folder
  - constants folder
  - pages folder
  - utils folder

- Feature naming:
  - use singular for type names
  - use plural for module names

- Example:
  - module: `users`
  - type: `User`
  - query hook: `useUsersQuery`
  - mutation hook: `useCreateUser`

---

# API RULES

- API files only contain request functions.

- Example:

```ts
export const userApi = {
  getUsers: async () => {},
  getUserDetail: async () => {},
  createUser: async () => {},
  updateUser: async () => {},
  deleteUser: async () => {},
};
```

- Never:
  - put React hooks in api
  - put UI logic in api
  - put toast logic in api
  - mutate UI state in api

- Always:
  - centralize API requests
  - reuse API functions
  - keep API layer pure

---

# TANSTACK QUERY RULES

- Use TanStack Query for:
  - server state
  - caching
  - async data

- Do not use Zustand/Context for server state.

- Query hooks:
  - `useUsersQuery`
  - `useUserDetailQuery`

- Mutation hooks:
  - `useCreateUser`
  - `useUpdateUser`
  - `useDeleteUser`

- Never:
  - create one giant hook for all logic
  - hide TanStack Query too much
  - create unnecessary wrappers

- Always:
  - use query keys
  - colocate query hooks inside module
  - invalidate queries properly
  - separate query hook and mutation hook

- Query keys must live in constants.

- Example:

```ts
export const userQueryKeys = {
  all: ["users"] as const,
  lists: () => [...userQueryKeys.all, "list"] as const,
  list: (params: UserQueryParams) =>
    [...userQueryKeys.lists(), params] as const,
  details: () => [...userQueryKeys.all, "detail"] as const,
  detail: (id: string) =>
    [...userQueryKeys.details(), id] as const,
};
```

---

# REACT HOOK FORM RULES

- Always use:
  - React Hook Form
  - Zod Resolver

- Forms must:
  - use schema validation
  - infer types from schema

- Example:

```ts
const form = useForm<CreateUserFormValues>({
  resolver: zodResolver(createUserSchema),
});
```

- Never:
  - manually validate form state
  - duplicate validation logic
  - duplicate form types

---

# ZOD RULES

- All form validation must use Zod.

- Schema files belong in:
  - `schemas/`

- Example:

```ts
export const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});
```

- Always:
  - infer TS types from schema
  - colocate schema with feature

- Never:
  - create duplicated interfaces
  - create validation outside schema

---

# COMPONENT RULES

- Components must:
  - be small
  - be reusable
  - be composable
  - have single responsibility

- Separate:
  - container logic
  - presentational UI

- Prefer:
  - composition over props explosion

- Never:
  - create 1000+ line components
  - fetch directly inside dumb component
  - deeply nest JSX unnecessarily

---

# SHARED COMPONENT RULES

- Shared UI belongs in:

```txt
components/
  ui/
  common/
```

- `ui/`
  - shadcn components

- `common/`
  - business reusable components

- Example:

```txt
components/common/
  AppTable/
  AppDialog/
  ConfirmDialog/
  EmptyState/
  AppPagination/
```

---

# TABLE RULES

- Tables must:
  - support loading state
  - support empty state
  - support error state
  - support pagination
  - support filters
  - support sorting

- Do not hardcode:
  - colors
  - labels
  - status styles

- Status config belongs in constants.

- Example:

```ts
export const userStatusMap = {
  ACTIVE: {
    label: "Active",
    color: "green",
  },
};
```

---

# FILE NAMING RULES

- Components:
  - PascalCase

- Hooks:
  - camelCase starting with `use`

- Types:
  - singular
  - PascalCase

- Constants:
  - kebab-case file name

- Examples:
  - `UserTable.tsx`
  - `useUsersQuery.ts`
  - `user.schema.ts`
  - `user-query-key.constant.ts`

---

# IMPORT RULES

- Use absolute imports.

- Example:

```ts
import { UserTable } from "@/modules/users";
```

- Never use deep relative imports:

```ts
../../../../components
```

---

# EXPORT RULES

- Prefer named export.

- Avoid default export.

- Example:

```ts
export function UserTable() {}
```

- Avoid:

```ts
export default function UserTable() {}
```

---

# TYPE RULES

- Always use strict typing.

- Never use:
  - any
  - unknown without narrowing

- Prefer:
  - union types
  - inferred types
  - readonly
  - utility types

---

# STATE MANAGEMENT RULES

- TanStack Query:
  - server state

- Zustand:
  - global client state

- React Hook Form:
  - form state

- Local state:
  - UI-only state

- Never:
  - duplicate same state in multiple places

---

# PERFORMANCE RULES

- Use dynamic import for heavy modules.

- Use memoization carefully:
  - useMemo
  - useCallback
  - React.memo

- Do not overuse memoization.

- Avoid:
  - unnecessary rerenders
  - large prop drilling
  - unnecessary context updates

- Lazy load dashboard modules when possible.

---

# ERROR HANDLING RULES

- Handle:
  - loading
  - empty
  - error
  - success

- Never ignore API errors.

- Centralize API error handling.

---

# CLEAN CODE RULES

- Prefer early return.

- Prefer readable code over clever code.

- Keep functions small.

- Avoid:
  - magic strings
  - duplicated logic
  - deeply nested conditions

- Extract:
  - constants
  - mappers
  - utils
  - reusable hooks

---

# FOLDER RESPONSIBILITY RULES

- `api/`
  - API requests only

- `hooks/`
  - query/mutation hooks
  - feature logic

- `schemas/`
  - zod schema

- `types/`
  - types/interfaces

- `constants/`
  - query keys
  - status map
  - config constants

- `utils/`
  - pure helper functions

- `pages/`
  - page composition

- `components/`
  - UI

---

# FORBIDDEN PATTERNS

- Do not:
  - use massive global store
  - use business logic in UI
  - create god hooks
  - create god services
  - place API logic everywhere
  - duplicate query keys
  - duplicate schemas
  - duplicate types
  - create circular dependencies
  - use relative deep imports
  - hardcode status labels/colors repeatedly

---

# AI IMPLEMENTATION RULES

- When implementing a feature:
  - first analyze existing module structure
  - follow existing architecture
  - reuse shared components
  - reuse shared hooks
  - reuse existing patterns

- Before creating new component:
  - check if shared component already exists

- Before creating new hook:
  - check if reusable hook already exists

- Before creating new utility:
  - check if utility already exists

---

# OUTPUT EXPECTATION

- Generated code must:
  - compile successfully
  - pass strict typing
  - be production-ready
  - follow feature-based architecture
  - follow all naming conventions
  - avoid duplicated logic
  - be scalable for enterprise applications