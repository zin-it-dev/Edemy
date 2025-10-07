import React from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";

import CourseItem from "./CourseItem";
import { fetchCourses } from "@/services/course.service";

const Courses = () => {
  const { data } = useQuery({ queryKey: ["courses"], queryFn: fetchCourses });

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseItem {...item} />}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.log("resfreshing...")}
          />
        }
      />
    </View>
  );
};

export default Courses;
