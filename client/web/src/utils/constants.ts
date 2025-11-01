import { HiOutlineHome, HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { FiZap } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";

import logo from "@/assets/images/logo.svg";
import type { FeatureType, MenuType } from "@/types/data.type";

export const assets = {
  logo,
};

export const endpoints = {
  courses: (params?: {
    keyword: string;
    category: string;
    page: string;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append("category", params.category);
    if (params?.keyword) searchParams.append("search", params.keyword);
    if (params?.page) searchParams.append("page", params.page);
    const queryString = searchParams.toString();
    return queryString ? `/courses/?${queryString}` : "/courses";
  },
  categories: "/categories",
};

export const menu: MenuType[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: HiOutlineHome,
  },
  {
    path: "/dashboard/explore",
    name: "Explore",
    icon: HiOutlineSquare3Stack3D,
  },
];

export const features: FeatureType[] = [
  {
    title: 'Hyper-speed Course Generation',
    icon: FiZap, 
    description: "Simply input your topic and target audience. Our AI Agent, powered by <strong>Gemini</strong>, automatically constructs the entire course structure from a logical outline and module division to detailed lesson content in seconds. <strong>Say goodbye to starting from scratch!</strong>",
    benefit: 'Saves 90% of your initial content creation time.',
  },
  {
    title: 'AI Agent: Personal Optimization Assistant',
    icon: FaRobot,
    description: "Utilize the integrated <strong>Langchain Agent</strong> as your AI consultancy expert. The Agent can help you check <strong>consistency</strong> of terminology, suggest a suitable <strong>tone of voice</strong>, or ensure the <strong>difficulty level</strong> of assignments matches your target learners.",
    benefit: 'Elevates the quality and professionalism of generated courses.',
  },
  {
    title: 'Smart Assessment Generation',
    icon: MdOutlineQuiz,
    description: "Our AI automatically <strong>analyzes the context</strong> of each lesson and generates relevant multiple-choice questions, essays, or practical scenarios. Ensure your students are effectively and fairly assessed within the new learning environment.",
    benefit: 'Fully automates your course evaluation system.',
  }
];