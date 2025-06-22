import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";

const TabIcon = ({ focused, icon, title }: any) =>
  focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row flex-1 w-full min-w-[112px] min-h-14 mt-[10px] justify-center items-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor="#151312" className="size-5" />
      <Text className="ml-2 text-base font-semibold text-secondary">
        {title}
      </Text>
    </ImageBackground>
  ) : (
    <View className="items-center justify-center mt-4 rounded-full size-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );

const _layout = () => {
  const tabs = [
    { id: "search", title: "Search", headerShown: false, icon: icons.search },
    { id: "index", title: "Home", headerShown: false, icon: icons.home },
    { id: "saved", title: "Saved", headerShown: false, icon: icons.save },
    {
      id: "profile",
      title: "Profile",
      headerShown: false,
      icon: icons.person,
    },
  ];
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.id}
          options={{
            title: tab.title,
            headerShown: tab.headerShown,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} title={tab.title} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};

export default _layout;
