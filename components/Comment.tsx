import { styles } from "@/styles/feed.styles";
import { View, Text, Image } from "react-native";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  content: string;
  _creationTime: number;
  user: {
    fullname: string;
    image: string | undefined;
  };
}

export default function Comment({ comment }: { comment: Comment }) {
  return (
    <View style={styles.commentContainer}>
      <Image
        source={{ uri: comment.user.image }}
        style={styles.commentAvatar}
      />
      <View>
        <Text style={styles.commentUsername}>{comment.content}</Text>
        <Text style={styles.captionText}>{comment.content}</Text>
        <Text style={styles.commentTime}>
          {formatDistanceToNow(comment._creationTime, { addSuffix: true })}
        </Text>
      </View>
    </View>
  );
}
