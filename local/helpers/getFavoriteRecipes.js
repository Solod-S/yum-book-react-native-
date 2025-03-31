import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const getFavoriteRecipes = async () => {
  try {
    const user = auth.currentUser;

    if (!user) {
      console.log("The user is not authorized");
      return [];
    }

    const recipesRef = collection(db, `users/${user.uid}/recipes`);
    const querySnapshot = await getDocs(recipesRef);

    const favoriteRecipes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return favoriteRecipes;
  } catch (error) {
    console.error("Error when receiving selected recipes:", error);
    return [];
  }
};

export { getFavoriteRecipes };
