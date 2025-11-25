import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

import { authClient } from "~/utils/auth";

function MobileAuth() {
  const { data: session } = authClient.useSession();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [status, setStatus] = useState("");

  const handleSendOtp = async () => {
    setStatus("Sending...");
    const { data, error } = await authClient.phoneNumber.sendOtp({
      phoneNumber: phone,
    });

    if (error) {
      setStatus(error.message ?? "");
      return;
    }

    setOtpSent(true);
    setStatus("OTP sent");
  };

  const handleVerifyOtp = async () => {
    setStatus("Verifying...");
    const { data, error } = await authClient.phoneNumber.verify({
      phoneNumber: phone,
      code: otp,
    });

    if (error) {
      setStatus(error.message ?? "");
      return;
    }

    setStatus("Phone verified");
  };

  return (
    <>
      <Text className="text-foreground pb-2 text-center text-xl font-semibold">
        {session?.user?.name ? `Hello, ${session.user.name}` : "Not logged in"}
      </Text>

      {/* Google Sign-in */}
      <Pressable
        onPress={() =>
          session
            ? authClient.signOut()
            : authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
              })
        }
        className="bg-primary mb-6 flex items-center rounded-sm p-2"
      >
        <Text>{session ? "Sign Out" : "Sign In With Google"}</Text>
      </Pressable>

      {/* Phone Auth Section */}
      <View style={{ gap: 10 }}>
        <TextInput
          placeholder="Phone Number (+1234567890)"
          value={phone}
          onChangeText={setPhone}
          style={{
            borderWidth: 1,
            padding: 8,
            borderRadius: 6,
          }}
        />

        {otpSent && (
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={{
              borderWidth: 1,
              padding: 8,
              borderRadius: 6,
            }}
          />
        )}

        {!otpSent && (
          <Pressable
            onPress={handleSendOtp}
            className="bg-primary rounded-sm p-2"
          >
            <Text>Send OTP</Text>
          </Pressable>
        )}

        {otpSent && (
          <Pressable
            onPress={handleVerifyOtp}
            className="bg-primary rounded-sm p-2"
          >
            <Text>Verify OTP</Text>
          </Pressable>
        )}

        {status ? <Text>{status}</Text> : null}
      </View>
    </>
  );
}

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <Stack.Screen options={{ title: "Home Page" }} />
      <View className="bg-background h-full w-full p-4">
        <Text className="text-foreground pb-2 text-center text-5xl font-bold">
          Create <Text className="text-primary">T3</Text> Turbo
        </Text>

        <MobileAuth />
      </View>
    </SafeAreaView>
  );
}
