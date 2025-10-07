import { View, Text, Button, TextInput } from "react-native";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";

import { SignOutButton } from "@/components/SignOutButton";

const Profile = () => {
  const { user } = useUser();

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const onSaveUser = async () => {
    if (!user) return;

    try {
      await user?.update({
        firstName: firstName!,
        lastName: lastName!,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSaveImage = async () => {
    if (!user || !selectedImage) return;

    try {
      const localUri = selectedImage;
      const filename = localUri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename || "");
      const extension = match ? match[1].toLowerCase() : "jpg";

      let type =
        extension === "jpg" || extension === "jpeg"
          ? "image/jpeg"
          : `image/${extension}`;

      const formData = new FormData();
      formData.append("file", { uri: localUri, name: filename, type } as any);

      await user.setProfileImage({
        file: formData as any,
      });
      setSelectedImage(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center">
      <Text>Profile</Text>

      <Image
        source={{ uri: user?.imageUrl || "" }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />

      <Text className="font-bold">
        {user?.firstName} {user?.lastName}
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName || ""}
        onChangeText={setFirstName}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName || ""}
        onChangeText={setLastName}
      />

      <View className="py-3">
        <Button title="Choose a photo" onPress={pickImageAsync} />
        <Button title="Use this photo" onPress={onSaveImage} />
      </View>

      <Button
        onPress={onSaveUser}
        title="Update account"
        color={"#6c47ff"}
      ></Button>

      <SignOutButton />
    </View>
  );
};

export default Profile;
