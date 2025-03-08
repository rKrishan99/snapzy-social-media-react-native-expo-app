import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { styles } from "@/styles/create.styles"; 
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Image } from "expo-image";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateScreen() {
  const router = useRouter();
  const { user } = useUser();

  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSharing, setSharing] = useState(false);

  // Automatically scroll up when the keyboard is open
  const scrollViewRef = useRef<KeyboardAwareScrollView>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd(true);
      }, 100); // Small delay ensures rendering is complete before scrolling
    });

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const generateUploadUrl = useMutation(api.post.generateUploadUrl);
  const createPost = useMutation(api.post.createPost);

  const handdleShare =async () => {
    if(!selectedImage) return;

    try{
      setSharing(true);
      console.log("Started sharing process...");

      const uploadUrl = await generateUploadUrl();
      console.log("uploadUrl:",uploadUrl);

      const uploadResult = await FileSystem.uploadAsync(uploadUrl,
        selectedImage, {
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
          mimeType: "image/jpeg"
        }
      );
      console.log("uploadResult:",uploadResult);

      if(uploadResult.status !== 200) throw new Error("Upload Failed");

      const { storageId } = JSON.parse(uploadResult.body);
      console.log("storageId:",storageId);

      
      await createPost({storageId, caption});

      router.push("/(tabs)");

    }catch(error){
      console.log("Error sharing post");
    }finally{
      setSharing(false);
    }
  };

  if (!selectedImage) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={28} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Posts</Text>
          <View style={{ width: 28 }} />
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.emptyImageContainer}>
          <Ionicons name="image-outline" size={48} color={COLORS.grey} />
          <Text style={styles.emptyImageText}>Tap to select an image</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
    >
      <View style={styles.contentContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(null), setCaption("");
            }}
            disabled={isSharing}
          >
            <Ionicons name="close-outline" size={28} color={isSharing ? COLORS.grey : COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Post</Text>
          <TouchableOpacity
            style={[styles.shareButton, isSharing && styles.shareButtonDiabled]}
            disabled={isSharing || !selectedImage}
            onPress={handdleShare}
          >
            {isSharing ? <ActivityIndicator size="small" color={COLORS.primary} /> : <Text style={styles.shareText}>Share</Text>}
          </TouchableOpacity>
        </View>

        {/* SCROLLABLE CONTENT */}
        <KeyboardAwareScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid={true}
          extraScrollHeight={Platform.OS === "android" ? 20 : 0} // Adjusts scroll height when keyboard opens
        >
          <View style={[styles.content, isSharing && styles.contentDisabled]}>
            {/* IMAGE SECTION */}
            <View style={styles.imageSection}>
              <Image source={selectedImage} style={styles.previewImage} contentFit="cover" transition={200} />
              <TouchableOpacity
                style={styles.changeImageButton}
                onPress={pickImage}
                disabled={isSharing}
              >
                <Ionicons name="image-outline" size={20} color={COLORS.white} />
                <Text style={styles.changeImageText}>Change</Text>
              </TouchableOpacity>
            </View>

            {/* INPUT SECTION */}
            <View style={styles.inputSection}>
              <View style={styles.captionContainer}>
                <Image source={user?.imageUrl} style={styles.userAvatar} contentFit="cover" transition={200} />
                <TextInput
                  style={styles.captionInput}
                  placeholder="Write something..."
                  placeholderTextColor={COLORS.grey}
                  multiline
                  value={caption}
                  onChangeText={setCaption}
                  editable={!isSharing}
                  onFocus={() => scrollViewRef.current?.scrollToEnd(true)}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
