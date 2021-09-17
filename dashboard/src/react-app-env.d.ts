/// <reference types="react-scripts" />

import { RouteComponentProps } from "react-router";

export interface homePage extends RouteComponentProps {
    user: user | undefined,
}

export interface user {
    id: string,
    name: string,
    avatar: string,
}