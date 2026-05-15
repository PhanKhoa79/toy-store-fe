'use client';

import { useEffect, useState } from 'react';
import { Button, Card } from '@/components/ui';
import { liveChatService } from '@/modules/live-chat/services/live-chat.service';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<Parameters<typeof liveChatService.listMessages>[0] extends string ? Awaited<ReturnType<typeof liveChatService.listMessages>> : never>([]);
  const [text, setText] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!conversationId) return;
    const interval = setInterval(async () => {
      const data = await liveChatService.listMessages(conversationId);
      setMessages(data ?? []);
    }, 3000);
    return () => clearInterval(interval);
  }, [conversationId]);

  async function startChat() {
    const conv = await liveChatService.createConversation({ guestName: guestName || 'Guest', guestEmail });
    if (conv) {
      setConversationId(conv.id);
      setStarted(true);
    }
  }

  async function send() {
    if (!text.trim() || !conversationId) return;
    await liveChatService.sendMessage(conversationId, text);
    const data = await liveChatService.listMessages(conversationId);
    setMessages(data ?? []);
    setText('');
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!open && (
        <Button onClick={() => setOpen(true)} className="h-14 w-14 rounded-full shadow-lg">
          💬
        </Button>
      )}
      {open && (
        <Card className="flex h-96 w-80 flex-col p-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-semibold">Chat hỗ trợ</span>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>✕</Button>
          </div>
          {!started ? (
            <div className="mt-4 space-y-3">
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Tên của bạn" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
              <input className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Email (tùy chọn)" value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)} />
              <Button className="w-full" onClick={startChat}>Bắt đầu chat</Button>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-2 overflow-y-auto py-3">
                {(messages ?? []).map((msg: any) => (
                  <div key={msg.id} className={`rounded-lg p-2 text-sm ${msg.senderType === 'guest' || msg.senderType === 'customer' ? 'bg-slate-50' : 'ml-auto max-w-[80%] bg-brand-50'}`}>
                    {msg.content}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 border-t border-slate-100 pt-2">
                <input className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm" placeholder="Nhập tin nhắn..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} />
                <Button size="sm" onClick={send}>Gửi</Button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}
