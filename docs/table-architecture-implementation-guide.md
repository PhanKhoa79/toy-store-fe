# Table Architecture Implementation Guide

Tài liệu này mô tả quy trình chuẩn để tạo bảng mới theo architecture hiện tại của `toyshop-fe`.

## 1. Mục tiêu

- Reusable: dùng lại shared table components.
- Config-driven: feature chỉ khai báo config/business.
- Type-safe + maintainable.
- Dễ đổi từ mock data sang API thật mà không phá UI.

## 2. Cấu trúc thư mục chuẩn

```txt
src/
  components/
    table/
      AppTable.tsx
      AppTableFilters.tsx
      AppTablePagination.tsx
      AppTableActionCell.tsx
      types/
        table-filter.type.ts
        table-action.type.ts
        table-query.type.ts

  modules/
    <feature>/
      pages/
        <Feature>Page.tsx
      components/
        <Feature>Table.tsx
      configs/
        <feature>-columns.tsx
        <feature>-filters.ts
        <feature>-actions.tsx
        <feature>-status.config.ts
      hooks/
        use<Feature>Table.ts
      services/
        <feature>.service.ts
      types/
        <feature>.type.ts
      mock-data.ts
      index.ts
```

## 3. Quy trình tạo bảng mới

### Bước 1: Tạo type

- Tạo `Dto` (shape dữ liệu nguồn) và `Row` (shape render table).
- Ví dụ:
  - `AlertItemDto`
  - `AlertTableRow`

### Bước 2: Tạo mock data trước

- Tạo `mock-data.ts` theo `Dto`.
- Dùng mock để chốt UI/UX trước khi backend sẵn sàng.

### Bước 3: Tạo config

- `*-status.config.ts`: map trạng thái/priority -> `labelKey`, `color`.
- `*-filters.ts`: định nghĩa search/select/date/dateRange/timeRange.
- `*-actions.tsx`: định nghĩa action theo row (`hidden`, `disabled`, `onClick`).
- `*-columns.tsx`: dựng columns, không hardcode text hiển thị.

### Bước 4: Tạo feature hook

- `use<Feature>Table.ts` chịu trách nhiệm:
  - giữ state filter/pagination,
  - định nghĩa default filters (`DEFAULT_*_FILTERS`),
  - expose `resetFilters()` và `hasActiveFilters`,
  - map `Dto -> Row`,
  - filter data,
  - tạo `columns`,
  - gọi `useAppTable`.

### Bước 5: Tạo table component

- `components/<Feature>Table.tsx` compose:
  - `AppTableFilters`
  - nút `Xóa bộ lọc` (dùng `table.filters.clear`), disabled khi `!hasActiveFilters`
  - `AppTable`
  - `AppTablePagination`

### Bước 6: Page chỉ compose layout

- `pages/<Feature>Page.tsx` chỉ render Header + `<FeatureTable />`.
- Không để logic bảng nặng trong page.

### Bước 7: i18n hóa toàn bộ text hiển thị

- Không hardcode label/title/status text trong UI.
- Thêm key vào `src/i18n/dictionaries/vi.ts` và `src/i18n/dictionaries/en.ts`.

### Bước 8: Loading + Empty

- Loading bảng: dùng `Skeleton` (component `ui/skeleton.tsx`).
- Empty bảng: dùng `components/common/Empty.tsx` qua `AppTable`.

### Bước 9: Verify

- Chạy `npm run typecheck`.
- Kiểm tra UI parity (CSS không drift).

## 4. Quy ước filter search (debounce)

- Search trong `AppTableFilters` đã hỗ trợ debounce bằng `useDebounce`.
- Mặc định `300ms`, có thể override bằng `debounceMs` trong `SearchFilterDef`.

## 5. Quy trình Mock -> API thật

Ban đầu bảng dùng mock. Khi có backend, thay như sau:

### Giai đoạn mock

- `use<Feature>Table.ts` lấy data từ `mock-data.ts` (hoặc hook trả mock).
- UI hoàn toàn chạy được không phụ thuộc backend.

### Chuyển sang API

1. Tạo/hoàn thiện `services/<feature>.service.ts` để gọi API.
2. Trong hook (`use<Feature>Table.ts` hoặc `use<Feature>Query.ts`), thay source data từ mock sang API.
3. Giữ nguyên:
   - `configs/*`
   - `AppTable`, `AppTableFilters`, `AppTablePagination`, `AppTableActionCell`
   - layout page/component
4. Chỉ cập nhật mapping `Dto -> Row` nếu response BE khác shape mock.

Kết quả: thay data source nhưng UI layer gần như không đổi.

## 6. Checklist trước khi merge

- [ ] Có `types` tách `Dto` và `Row`.
- [ ] Có `mock-data.ts` cho phase đầu.
- [ ] Có đủ `configs`: columns/filters/actions/status.
- [ ] `AppTableFilters` dùng được với search/select/date/range.
- [ ] Có nút `Xóa bộ lọc` và reset về default filter state.
- [ ] Cột status render bằng config + badge/tag (không hardcode màu).
- [ ] Text hiển thị đã i18n.
- [ ] Empty/loading theo chuẩn shared component.
- [ ] `npm run typecheck` pass.
