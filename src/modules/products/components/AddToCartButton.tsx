'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui';
import { getApiErrorMessage } from '@/lib/api/http-client';
import { useAddCartItem } from '@/modules/cart/hooks/useAddCartItem';
import { useAuthStore } from '@/stores/auth-store';

type AddToCartButtonProps = {
  productId: string;
  quantity?: number;
};

export function AddToCartButton({ productId, quantity = 1 }: AddToCartButtonProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const addCartItem = useAddCartItem();

  function handleAddToCart() {
    if (!user) {
      router.push(`/login?next=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (user.role !== 'customer') {
      toast.error('Chỉ tài khoản khách hàng mới có thể thêm giỏ hàng.');
      return;
    }

    addCartItem.mutate(
      { productId, quantity },
      {
        onSuccess: () => toast.success('Đã thêm vào giỏ hàng.'),
        onError: (error) => toast.error('Không thể thêm vào giỏ hàng.', { description: getApiErrorMessage(error) })
      }
    );
  }

  return (
    <Button type="button" onClick={handleAddToCart} disabled={addCartItem.isPending}>
      {addCartItem.isPending ? 'Đang thêm...' : 'Thêm vào giỏ'}
    </Button>
  );
}
