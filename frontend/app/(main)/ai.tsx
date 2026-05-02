import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, radius, spacing, shadows } from '../../src/theme/colors';
import { useChatStore } from '../../src/store/chatStore';
import ScreenHeader from '../../src/components/ScreenHeader';

export default function AIInterface() {
  const messages = useChatStore((s) => s.messages);
  const isTyping = useChatStore((s) => s.isTyping);
  const send = useChatStore((s) => s.send);
  const [text, setText] = useState('');
  const listRef = useRef<FlatList>(null);

  const onSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    send(trimmed);
    setText('');
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <LinearGradient colors={colors.waterGradient} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScreenHeader title="AI Assistant" subtitle="Ask anything about your aquarium" testID="ai-header" />

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
          <FlatList
            ref={listRef}
            testID="chat-list"
            data={messages}
            keyExtractor={(i) => i.id}
            contentContainerStyle={styles.listContent}
            onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
            renderItem={({ item }) => {
              const isUser = item.role === 'user';
              return (
                <View
                  testID={`chat-bubble-${item.role}`}
                  style={[
                    styles.bubbleRow,
                    { justifyContent: isUser ? 'flex-end' : 'flex-start' },
                  ]}
                >
                  {!isUser && (
                    <View style={styles.aiAvatar}>
                      <Ionicons name="sparkles" size={14} color={colors.primary} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.bubble,
                      isUser ? styles.userBubble : styles.aiBubble,
                    ]}
                  >
                    <Text
                      style={[
                        styles.bubbleText,
                        isUser ? styles.userBubbleText : styles.aiBubbleText,
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                </View>
              );
            }}
            ListFooterComponent={
              isTyping ? (
                <View testID="typing-indicator" style={styles.bubbleRow}>
                  <View style={styles.aiAvatar}>
                    <Ionicons name="sparkles" size={14} color={colors.primary} />
                  </View>
                  <View style={[styles.bubble, styles.aiBubble]}>
                    <Text style={styles.aiBubbleText}>typing…</Text>
                  </View>
                </View>
              ) : null
            }
          />

          <View style={styles.inputBar}>
            <View style={styles.inputWrap}>
              <TextInput
                testID="chat-input"
                value={text}
                onChangeText={setText}
                placeholder="Ask anything about your aquarium…"
                placeholderTextColor={colors.textMuted}
                style={styles.input}
                onSubmitEditing={onSend}
                returnKeyType="send"
                multiline
              />
              <TouchableOpacity
                testID="send-button"
                onPress={onSend}
                style={[styles.sendBtn, !text.trim() && { opacity: 0.5 }]}
                disabled={!text.trim()}
              >
                <Ionicons name="send" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  listContent: { padding: spacing.lg, gap: spacing.sm, paddingBottom: spacing.md },
  bubbleRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    gap: 8,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.lg,
  },
  userBubble: {
    backgroundColor: colors.userBubble,
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.aiBubble,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  bubbleText: { fontSize: 15, lineHeight: 21 },
  userBubbleText: { color: '#fff' },
  aiBubbleText: { color: colors.textPrimary },
  inputBar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    paddingBottom: spacing.md,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.surface,
    borderRadius: radius.full,
    paddingLeft: spacing.md,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    maxHeight: 120,
    paddingVertical: Platform.OS === 'ios' ? 10 : 6,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
