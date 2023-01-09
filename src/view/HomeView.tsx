import {Component} from "react";
import WorldView from "./WorldView.tsx";
import {World} from "../model/world/World.ts";

export class HomeView extends Component {
    render() {
        const world: World = new World();

        return (
            <div>
                <h1>Home</h1>
                <WorldView world={world} />
            </div>
        );
    }
}