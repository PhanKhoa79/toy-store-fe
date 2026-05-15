'use client';

import { useState } from 'react';
import { ApiErrorState } from '@/components/common';
import { Skeleton } from '@/components/ui';
import { Button, Card } from '@/components/ui';
import { useAdminCloseMutation, useAdminConversationsQuery, useAdminMessagesQuery, useAdminReplyMutation } from '@/modules/live-chat/hooks/useLiveChat';

export function AdminChatPage() {
  const { data: conversations, isLoading: convLoading, error: convError, refetch: refetchConv } = useAdminConversationsQuery();
  const [selectedId, setSelectedId] = useState('');
  const { data: messages, isLoading: msgLoading } = useAdminMessagesQuery(selectedId);
  const replyMutation = useAdminReplyMutation();
  const closeMutation = useAdminCloseMutation();
  const [replyText, setReplyText] = useState('');

  if (convLoading) return <Skeleton className="h-96 rounded-3xl" />;
  if (convError) return <ApiErrorState error={convError} onRetry={() => void refetchConv()} />;

  const selectedConversation = conversations?.find((c) => c.id === selectedId);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">Live Chat</h1>
        {(conversations ?? []).map((conv) => (
          <Card key={conv.id} className={`cursor-pointer p-4 ${selectedId === conv.id ? 'border-brand-500' : ''}`} onClick={() => setSelectedId(conv.id)}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{conv.guestName ?? 'Guest'}</span>
              <span className="text-xs text-slate-500">{conv.status}</span>
            </div>
            <p className="text-sm text-slate-500">{conv.guestEmail ?? ''}</p>
          </Card>
        ))}
        {(conversations ?? []).length === 0 && <p className="text-sm text-slate-500">Không có cuộc trò chuyện.</p>}
      </div>
      <div className="lg:col-span-2">
        {selectedConversation ? (
          <Card className="flex h-[70vh] flex-col p-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-semibold">{selectedConversation.guestName ?? 'Guest'}</span>
              <Button size="sm" variant="destructive" onClick={() => closeMutation.mutate(selectedId)} disabled={closeMutation.isPending}>Đóng</Button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto py-4">
              {msgLoading && <Skeleton className="h-20 rounded-xl" />}
              {(messages ?? []).map((msg) => (
                <div key={msg.id} className={`rounded-xl p-3 ${msg.senderType === 'staff' ? 'ml-auto max-w-xs bg-brand-50' : 'max-w-xs bg-slate-50'}`}>
                  <p className="text-sm text-slate-700">{msg.content}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-slate-100 pt-3">
              <input
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                placeholder="Nhập tin nhắn..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { replyMutation.mutate({ conversationId: selectedId, content: replyText }, { onSuccess: () => setReplyText('') }); } }}
              />
              <Button size="sm" onClick={() => replyMutation.mutate({ conversationId: selectedId, content: replyText }, { onSuccess: () => setReplyText('') })} disabled={replyMutation.isPending || !replyText.trim()}>
                Gửi
              </Button>
            </div>
          </Card>
        ) : (
          <div className="flex h-[70vh] items-center justify-center rounded-3xl border border-slate-200 bg-white">
            <p className="text-slate-500">Chọn một cuộc trò chuyện</p>
          </div>
        )}
      </div>
    </div>
  );
}
