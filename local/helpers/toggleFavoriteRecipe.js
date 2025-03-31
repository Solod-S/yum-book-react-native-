import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import Toast from "react-native-toast-message";
import { ToastAndroid } from "react-native";

const toggleFavoriteRecipe = async (recipeId, recipeData, setIsFavorite) => {
  const user = auth.currentUser;

  if (!user) return;

  const recipeRef = doc(db, `users/${user.uid}/recipes/${recipeId}`);

  try {
    const docSnap = await getDoc(recipeRef);

    if (docSnap.exists()) {
      await deleteDoc(recipeRef);
      setIsFavorite(false);
      ToastAndroid.show(
        "Your recipe has been successfully removed from favorites.",
        ToastAndroid.LONG
      );
      // Toast.show({
      //   type: "success",
      //   position: "top",
      //   text1: "Removed from Favorites!",
      //   text2: "Your recipe has been successfully removed from favorites.",
      //   visibilityTime: 2000,
      //   autoHide: true,
      //   topOffset: 50,
      // });
    } else {
      await setDoc(recipeRef, {
        ...recipeData,
        createdAt: Date.now(),
      });
      setIsFavorite(true);
      ToastAndroid.show(
        "Your recipe has been successfully added to favorites.",
        ToastAndroid.LONG
      );
      // Toast.show({
      //   type: "success",
      //   position: "top",
      //   text1: "Added to Favorites!",
      //   text2: "Your recipe has been successfully added to favorites.",
      //   visibilityTime: 2000,
      //   autoHide: true,
      //   topOffset: 50,
      // });
    }
  } catch (error) {
    // Toast.show({
    //   type: "error",
    //   position: "top",
    //   text1: "Something went wrong!",
    //   text2: "Please try again later.",
    //   visibilityTime: 2000,
    //   autoHide: true,
    //   topOffset: 50,
    // });

    console.error("Ошибка при обновлении избранного:", error);
  }
};

const checkIfFavorite = async (recipeId, setIsFavorite) => {
  const user = auth.currentUser;
  if (!user) return;

  const recipeRef = doc(db, `users/${user.uid}/recipes/${recipeId}`);
  const docSnap = await getDoc(recipeRef);

  setIsFavorite(docSnap.exists());
};

export { toggleFavoriteRecipe, checkIfFavorite };
