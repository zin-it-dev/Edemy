import { useUser } from "@clerk/clerk-expo";
import { Image } from "expo-image";

export const ProfileTabIcon = ({
  size,
  color,
}: {
  size: number;
  color: string;
}) => {
  const { user } = useUser();

  return (
    <>
      {user && (
        <Image
          source={{ uri: user.imageUrl }}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            borderWidth: 2,
            borderColor: color,
          }}
        />
      )}
    </>
  );
};
