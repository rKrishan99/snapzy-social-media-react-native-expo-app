import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.styles";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default function login() {

  const {startSSOFlow} =useSSO();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try{
      const {createdSessionId, setActive} = await startSSOFlow({strategy:"oauth_google"});
      console.log("setActive:", setActive);

      if(setActive && createdSessionId){
        setActive({session: createdSessionId});
        console.log("Session set successfully");
        console.log("Navigating to (tabs)...");
        router.replace('/(tabs)');
        console.log("Navigation call made");
      }
    }catch(error){
      console.error("OAuth error", error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Brand Section */}
      <View style={styles.brandSection}>
        <View style={styles.logoContainer}>
          {/* <Ionicons name="leaf" size={32} Colors={COLORS.primary} /> */}
          <Image
          style={styles.logoIcon}
          source={require("../../assets/images/snapzy-logo-icon.png")}
          resizeMode="cover"
        />
        </View>
        <Text style={styles.appName}>Snapzy</Text>
        <Text style={styles.tagline}>Snap It, Share It, Love It.</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/login-screen-image.png")}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>
      {/* Login Section */}
      <View style={styles.loginSection}>
        <TouchableOpacity 
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
        >
          <View style={styles.googleIconContainer}>
            <Ionicons name="logo-google" size={24} color={COLORS.surface} />
          </View>
          <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
        <Text style={styles.termsText}>Join Snapzy by agreeing to our Terms and Privacy Policy.</Text>
      </View>
    </View>
  );
}
