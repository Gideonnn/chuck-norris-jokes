import { Joke } from '.';

export type JokeAction = (jokes: Joke[]) => Joke[];
