import { useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";

import { SafeAreaView } from "react-native-safe-area-context";
import { Recipes } from "@/components";
import Toast from "react-native-toast-message";
import { useAuth } from "@/context/authContext";
import { getFavoriteRecipes } from "../../helpers";
import { useIsFocused } from "@react-navigation/native";
import { categoriesData } from "../../constants";
import { mealsData } from "../../constants/all";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const [state, setState] = useState({
    activeCategory: "Beef",
    meals: [],
  });

  const [categories, setCategories] = useState([]);
  const searchQueryRef = useRef("");

  const getCategories = async () => {
    const favorites = {
      idCategory: "0",
      strCategory: "Favorites",
      strCategoryThumb: require("../../assets/images/categories/favorite.png"),
      strCategoryDescription: "",
    };
    setCategories([favorites, ...categoriesData]);
  };

  const getFavorites = async () => {
    try {
      const data = await getFavoriteRecipes();
      setState({ activeCategory: "Favorites", meals: data });
    } catch (error) {
      console.log("Error in getFavorites:", error);
    }
  };

  const getMeals = async category => {
    try {
      const result = mealsData
        .filter(i => i.strCategory === category)
        .slice(0, 10);
      setState(prev => ({ ...prev, meals: result }));
    } catch (error) {
      console.log("Error in getRecipes:", error);
    }
  };

  const handleChangeCategory = async category => {
    if (category !== state.activeCategory) {
      try {
        if (category === "Favorites") {
          await getFavorites();
        } else {
          const result = mealsData
            .filter(i => i.strCategory === category)
            .slice(0, 12);

          setState(prev => ({
            ...prev,
            meals: result,
            activeCategory: category,
          }));

          searchQueryRef.current = "";
        }
      } catch (error) {
        console.log("Error in getMeals:", error);
      }
    }
  };

  const handleSearch = async () => {
    const query = searchQueryRef.current.trim();

    if (query.length === 0) {
      Toast.show({
        type: "info",
        position: "top",
        text1: "Enter a search query",
        text2: "The search field cannot be empty.",
        visibilityTime: 1500,
        autoHide: true,
        bottomOffset: 50,
      });
      return;
    }

    try {
      const optimizedQuery = query.toLocaleLowerCase();
      const result = mealsData.filter(i =>
        i.strMeal.toLowerCase().includes(optimizedQuery)
      );
      const meals = result || [];

      if (meals.length === 0) {
        Toast.show({
          type: "error",
          position: "top",
          text1: "No meals found",
          text2: `No results for "${query}". Try a different search.`,
          visibilityTime: 2000,
          autoHide: true,
          bottomOffset: 50,
        });
        return;
      }

      setState(prev => ({
        ...prev,
        meals,
      }));

      Toast.show({
        type: "success",
        position: "top",
        text1: "Search successful",
        text2: `${meals.length} meals found`,
        visibilityTime: 1500,
        autoHide: true,
        bottomOffset: 50,
      });
    } catch (error) {
      console.log("Error in handleSearch:", error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Search error",
        text2: "Could not complete the search. Please try again later.",
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });
    }
  };

  useEffect(() => {
    getCategories();
    getMeals(state.activeCategory);
  }, []);

  useEffect(() => {
    const query = searchQueryRef.current.trim();
    if (
      isFocused &&
      state.activeCategory === "Favorites" &&
      query.length === 0
    ) {
      getFavorites();
    }
  }, [isFocused, user]);

  return (
    <SafeAreaView edges={["top"]} className="flex-1">
      <StatusBar style="dark" />

      <Recipes
        meals={state.meals}
        categories={categories}
        searchQueryRef={searchQueryRef}
        handleSearch={handleSearch}
        handleChangeCategory={handleChangeCategory}
        state={state}
      />
    </SafeAreaView>
  );
}
