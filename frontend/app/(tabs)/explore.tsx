import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Notes = () => {
 
  const [newNote, setNewNote] = useState(''); // New note content
  const [replyNoteId, setReplyNoteId] = useState<string | null>(null); // ID of the note being replied to
  const [replyContent, setReplyContent] = useState(''); // Reply content
  const [loading, setLoading] = useState(false); // Loading state

  // Dummy data for notes
  const dummyNotes: Note[] = [
    {
      id: '1',
      authorName: 'John Doe',
      content: 'This is the first note.',
      replies: [
        {
          id: '1-1',
          authorName: 'Jane Smith',
          content: 'Thanks for sharing!',
        },
      ],
    },
    {
      id: '2',
      authorName: 'Alice Johnson',
      content: 'Hello everyone!',
      replies: [],
    },
  ];
  const [notes, setNotes] = useState<Note[]>(dummyNotes); // List of notes
  // Function to post a new note
  const postNote = () => {
    if (!newNote.trim()) return;
    const newNoteObj: Note = {
      id: (notes.length + 1).toString(),
      authorName: 'You',
      content: newNote,
      replies: [],
    };
    setNotes([newNoteObj, ...notes]);
    setNewNote('');
  };

  // Function to post a reply to a note
  const postReply = (noteId: string) => {
    if (!replyContent.trim()) return;
    const updatedNotes = notes.map((note) => {
      if (note.id === noteId) {
        const newReply: Reply = {
          id: `${noteId}-${note.replies.length + 1}`,
          authorName: 'You',
          content: replyContent,
        };
        return { ...note, replies: [...note.replies, newReply] };
      }
      return note;
    });
    setNotes(updatedNotes);
    setReplyContent('');
    setReplyNoteId(null);
  };

  // Render each note item
  const renderNote = ({ item }: { item: Note }) => (
    <View className="bg-gray-800 rounded-xl p-4 mb-4">
      <Text className="text-white text-base font-semibold mb-2">
        {item.authorName}
      </Text>
      <Text className="text-gray-300 text-base mb-2">{item.content}</Text>
      {/* Display replies */}
      {item.replies.length > 0 && (
        <View className="bg-gray-700 rounded-lg p-2 mb-2">
          {item.replies.map((reply) => (
            <View key={reply.id} className="mb-2">
              <Text className="text-gray-400 text-sm font-semibold">
                {reply.authorName}
              </Text>
              <Text className="text-gray-300 text-sm">{reply.content}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Reply button */}
      <TouchableOpacity
        onPress={() =>
          setReplyNoteId((prevId) => (prevId === item.id ? null : item.id))
        }
        className="flex-row items-center mt-2"
      >
        <MaterialIcons name="reply" size={20} color="#fff" />
        <Text className="text-white text-sm ml-1">Reply</Text>
      </TouchableOpacity>
      {/* Reply input */}
      {replyNoteId === item.id && (
        <View className="mt-2">
          <TextInput
            className="bg-gray-900 text-white rounded-md p-2"
            placeholder="Write a reply..."
            placeholderTextColor="#888"
            value={replyContent}
            onChangeText={setReplyContent}
            multiline
          />
          <TouchableOpacity
            onPress={() => postReply(item.id)}
            className="bg-blue-500 rounded-md p-2 mt-2 items-center"
          >
            <Text className="text-white font-semibold">Post Reply</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-900 px-4 pt-4"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text className="text-2xl font-bold text-white mb-4">Notes</Text>
      {/* New Note Input */}
      <View className="mb-4">
        <TextInput
          className="bg-gray-800 text-white rounded-md p-4"
          placeholder="What's on your mind?"
          placeholderTextColor="#888"
          value={newNote}
          onChangeText={setNewNote}
          multiline
        />
        <TouchableOpacity
          onPress={postNote}
          className="bg-green-500 rounded-md p-4 mt-2 items-center"
        >
          <Text className="text-white font-semibold">Post Note</Text>
        </TouchableOpacity>
      </View>
      {/* Notes List */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNote}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default Notes;

// Type definitions
interface Note {
  id: string;
  authorName: string;
  content: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  authorName: string;
  content: string;
}