import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const toggleFavoriteRecipe = async (recipeId, recipeData, setIsFavorite) => {
  const user = auth.currentUser;
  if (!user) return;

  const recipeRef = doc(db, `users/${user.uid}/recipes/${recipeId}`);

  try {
    const docSnap = await getDoc(recipeRef);

    if (docSnap.exists()) {
      await deleteDoc(recipeRef);
      setIsFavorite(false);
    } else {
      // Рецепта нет в избранном — добавляем
      await setDoc(recipeRef, {
        ...recipeData,
        createdAt: Date.now(),
      });
      setIsFavorite(true);
    }
  } catch (error) {
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
