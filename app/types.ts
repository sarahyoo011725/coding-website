import { Timestamp } from "firebase/firestore";

export type APIMethod = "GET" | "POST" | "PUT" | "DELETE";

export const enum ProblemStatus {
    JustSolved = 'Just solved',
    StillHard = 'Still hard',
    NeedsToReview = 'Needs to review',
    JustReviewed = 'Just reviewed',
    EasyNow = 'Easy now'
}

export type Problem = {
    id: string;
    title: string;
    description: string;
    user_solution: string;
    date_solved?: Timestamp;
    difficulty: number;
    status: string;
    topics: string[];
    time_complexity: string;
    space_complexity: string;
    link: string;
}

export type Topic = {
    name: string;
    count: number;
}