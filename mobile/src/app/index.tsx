import * as Device from "expo-device";
import {
    Platform,
    StyleSheet,
    View,
    ActivityIndicator,
    Button,
    Modal,
    Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthView, UserButton } from "@clerk/expo/native";

import { AnimatedIcon } from "@/components/animated-icon";
import { HintRow } from "@/components/hint-row";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useAuth, useUser } from "@clerk/expo";
import { useState } from "react";

function getDevMenuHint() {
    if (Platform.OS === "web") {
        return <ThemedText type='small'>use browser devtools</ThemedText>;
    }
    if (Device.isDevice) {
        return (
            <ThemedText type='small'>
                shake device or press <ThemedText type='code'>m</ThemedText> in
                terminal
            </ThemedText>
        );
    }
    const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
    return (
        <ThemedText type='small'>
            press <ThemedText type='code'>{shortcut}</ThemedText>
        </ThemedText>
    );
}

export default function HomeScreen() {
    const { isSignedIn, isLoaded } = useAuth({
        treatPendingAsSignedOut: false,
    });
    const { user } = useUser()
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    if (!isLoaded) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ThemedView style={styles.heroSection}>
                    <AnimatedIcon />
                    {isSignedIn ? (
                        <>
                            <UserButton />
                            <ThemedText type='title' style={styles.title}>
                                Welcome to&nbsp; {user?.fullName}
                            </ThemedText>
                        </>
                    ) : (
                        <Button
                            title='Sign in'
                            onPress={() => setIsAuthOpen(true)}
                        />
                    )}
                </ThemedView>

                <Modal
                    animationType='slide'
                    visible={isAuthOpen}
                    presentationStyle='pageSheet'
                    onRequestClose={() => setIsAuthOpen(false)}
                >
                    <AuthView onDismiss={() => setIsAuthOpen(false)} />
                </Modal>

                <ThemedView
                    type='backgroundElement'
                    style={styles.stepContainer}
                >
                    <HintRow
                        title='Try editing'
                        hint={
                            <ThemedText type='code'>
                                src/app/index.tsx
                            </ThemedText>
                        }
                    />
                    <HintRow title='Dev tools' hint={getDevMenuHint()} />
                    <HintRow
                        title='Fresh start'
                        hint={
                            <ThemedText type='code'>
                                npm run reset-project
                            </ThemedText>
                        }
                    />
                </ThemedView>

                {Platform.OS === "web" && <WebBadge />}
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.four,
        alignItems: "center",
        gap: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
        maxWidth: MaxContentWidth,
    },
    heroSection: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: Spacing.four,
        gap: Spacing.four,
    },
    title: {
        textAlign: "center",
    },
    code: {
        textTransform: "uppercase",
    },
    stepContainer: {
        gap: Spacing.three,
        alignSelf: "stretch",
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        borderRadius: Spacing.four,
    },
});
