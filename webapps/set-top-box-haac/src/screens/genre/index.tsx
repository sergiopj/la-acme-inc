import './genre.scss';

import React, { useCallback, useRef } from 'react';
import { screenReady, NavigableButton, Footer, NavigableWrapper } from '@telefonica/la-web-sdk';
import { Intent, Game, GameScreenData } from '../../../../../dialogs/src/models';
import { useAura } from '@telefonica/la-web-sdk';

const GameScreen: React.FC<GameScreenData> = (gameData: GameScreenData) => {
    const { sendCommand } = useAura();
    const gameList = useRef(gameData.games);

    const goToHome = () => {
        sendCommand({ intent: Intent.HOME, entities: [] });
    };

    const getImage = (filename: string | undefined): string => {
        if (filename) {
            return `${process.env.PUBLIC_URL}/assets/imgs/${filename}`;
        }

        return `${process.env.PUBLIC_URL}/assets/imgs/notfound.png`;
    };

    const onFocus = useCallback((event: Event) => {

        console.log('focus', event);
        const element = event.target as HTMLElement;
        element.scrollTo({ behavior: 'smooth' });
    }, []);
    return (
        <div className="genre-screen">
            <h1 className="title">GAMES - CATEGORY {gameData.title.toUpperCase()} </h1>
            <div className="games">
                {gameList.current.map((game: Game, index: number) => (
                    <NavigableWrapper
                        id={game.id}
                        key={game.id}
                        autoScroll={true}
                        focusedClass="game__focused"
                        defaultFocused={index === 0}
                        onFocus={onFocus}
                    >
                        <div className="game">
                            <div className="upper-container">
                                <img src={getImage(game.img)} alt={game.title} />
                                <div className="right-container">
                                    <b>Name: {game.title}</b>
                                    <p>Platform: {game.platform}</p>
                                    <p>Year: {game.year}</p>
                                </div>
                            </div>
                            <div className="lower-container">
                                <p>Description: {game.description}</p>
                            </div>
                        </div>
                    </NavigableWrapper>
                ))}
            </div>
            <Footer>
                <NavigableButton
                    id="categories-button"
                    defaultClass="button"
                    focusedClass="button focus"
                    onClick={() => goToHome()}
                >
                    BACK
                </NavigableButton>
            </Footer>
        </div>
    );
};

export default screenReady(GameScreen);
