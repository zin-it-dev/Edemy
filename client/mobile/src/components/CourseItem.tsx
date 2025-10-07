import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";

import type { Course } from "@/types/course.type";

const CourseItem = (props: Course) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="my-2"
      onPress={() =>
        router.navigate({
          pathname: "/events/[id]",
          params: { id: props.id },
        })
      }
    >
      <Card>
        <Card.Title titleVariant="titleLarge" title={props.name} />
      </Card>
    </TouchableOpacity>
  );
};

export default CourseItem;
