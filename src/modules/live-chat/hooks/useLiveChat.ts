'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { liveChatService } from '@/modules/live-chat/services/live-chat.service';

export function useAdminConversationsQuery() {
  return useQuery({ queryKey: ['chat', 'conversations'], queryFn: liveChatService.listAdminConversations });
}

export function useAdminMessagesQuery(conversationId: string) {
  return useQuery({
    queryKey: ['chat', 'messages', conversationId],
    queryFn: () => liveChatService.listAdminMessages(conversationId),
    enabled: Boolean(conversationId),
    refetchInterval: 3000
  });
}

export function useAdminReplyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ conversationId, content }: { conversationId: string; content: string }) => liveChatService.adminReply(conversationId, content),
    onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: ['chat', 'messages', vars.conversationId] })
  });
}

export function useAdminCloseMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: liveChatService.adminClose,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] })
  });
}
