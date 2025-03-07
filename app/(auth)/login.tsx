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

      if(setActive && createdSessionId){
        setActive({session: createdSessionId});
        router.replace('/(tabs)');
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
          <Ionicons name="leaf" size={32} Colors={COLORS.primary} />
        </View>
        <Text style={styles.appName}>Snapzy</Text>
        <Text style={styles.tagline}>don't miss anything</Text>
      </View>
      <View style={styles.illustrationContainer}>
        <Image
          source={require("../../assets/images/auth-image.png")}
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
        <Text style={styles.termsText}>By continuing, you agree to our Terms and Privacy</Text>
      </View>
    </View>
  );
}
