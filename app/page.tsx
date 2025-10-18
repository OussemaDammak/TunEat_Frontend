"use client";

import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants";

import { Search } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | number>(
    "all"
  );

  //Modal states

  const [showAuth, setShowAuth] = useState(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [loadingRecipes, setLoadingRecipes]= useState(false);
  const [viewingRecipe, setViewingRecipe] = useState<RecipeType | null>(null);
  const [showUserProfile, setShowUserProfile] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoadingRecipes(true)
        const res = await axios.get<RecipeType[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/recipes/`,
          {
            params: {
              search: searchTerm,
              category:
                selectedCategory !== "all" ? selectedCategory : undefined,
            },
          }
        );
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }finally{
        setLoadingRecipes(false)
      }
    };

    fetchRecipes();
  }, [searchTerm, selectedCategory]);
  useEffect(() => {
    fetchCategories();
    fetchUser();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get<CategoryType[]>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/`
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  const fetchUser = async () => {
    try {
   
         const res = await axios.get<UserType>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/profile/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
          },
        }
      );
      setUser(res.data);
    
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

    console.log("avalable recipes: ",recipes);


}