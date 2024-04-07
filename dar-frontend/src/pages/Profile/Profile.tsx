import { PageWrapper } from "../PageWrapper/PageWrapper";
import { MealsList } from "./components/MealsList/MealsList";
import { AddMealModal } from "../../features/add-meal/AddMealModal";
import "./Profile.css";
import { MealsHeader } from "./components";

export const Profile = () => {
  return (
    <PageWrapper>
      <div className="profile-container">
        <MealsHeader />
        <AddMealModal />
        <MealsList />
      </div>
    </PageWrapper>
  );
};
