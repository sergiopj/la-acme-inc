import './home.scss';

import React, { useState } from 'react';
import { AuraCommands, screenReady, useAura } from '@telefonica/la-web-sdk';
import { HomeScreenData, Intent, GameCard, Entity, Categories, Operation } from '../../../../../dialogs/src/models';

import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { navigationSaga } from '../../redux/actions/navigationActions';

import HomeMenu from './components/HomeMenu';
import HomeTopMenu from './components/HomeTopMenu';

import styled from 'styled-components';
import LazyCard from '../../components/Hocs/withLazyLoader/LazyCard';
import withProvider from './withProvider';

interface CarouselTitleProps {
    focusedIndexVertical: number;
}

const CarouselTitle = styled.div<CarouselTitleProps>`
    font-size: 26px;
    font-weight: bold;
    height: 50px;
    will-change: transform;
    transition: transform 0.3s ease-in-out;
    transform: ${(props) => `translateY(-${props.focusedIndexVertical * 400}px)`};
`;
const HomeScreen: React.FC<HomeScreenData> = (screenData: HomeScreenData) => {
    const { platformTitle, platforms, games } = screenData;
    const { sendCommand } = useAura();
    const dispatch = useDispatch();
    const { isActive } = useSelector((state: RootStateOrAny) => state.navigation);

    const [cardFocused, setCardFocused] = useState(false);

    const [focusedIndex, setFocusedIndex] = useState(0);
    const [focusedIndexSecond, setFocusedIndexSecond] = useState(0);
    const [focusedIndexThird, setFocusedIndexThird] = useState(0);
    const [focusedIndexFourth, setFocusedIndexFourth] = useState(0);
    const [focusedIndexFifth, setFocusedIndexFifth] = useState(0);
    const [focusedIndexSixth, setFocusedIndexSixth] = useState(0);
    const [focusedIndexVertical, setFocusedIndexVertical] = useState(0);

    const goToGame = (gameId: string) => {
        sendCommand(AuraCommands.getAuraCommandSingle(Operation.GAME, { type: Entity.GAMEID, entity: gameId }));
    };

    const goToHome = (platformId: string) => {
        sendCommand(AuraCommands.getAuraCommandSingle(Intent.HOME, { type: Entity.PLTID, entity: platformId }));
    };

    const goToCart = () => {
        sendCommand(AuraCommands.getAuraCommand(Operation.CART));
    };

    interface switchObject<TValue> {
        [id: string]: TValue;
    }

    const focusedIndexFunctions: switchObject<Function> = {
        0: setFocusedIndex,
        1: setFocusedIndexSecond,
        2: setFocusedIndexThird,
        3: setFocusedIndexFourth,
        4: setFocusedIndexFifth,
        5: setFocusedIndexSixth,
    };

    const focusedIndexes: switchObject<number> = {
        0: focusedIndex,
        1: focusedIndexSecond,
        2: focusedIndexThird,
        3: focusedIndexFourth,
        4: focusedIndexFifth,
        5: focusedIndexSixth,
    };

    const isFocused = (indexCategory: number, indexCard: number) =>
        indexCard === focusedIndexes[indexCategory] && focusedIndexVertical === indexCategory && cardFocused;

    return (
        <div className="home-screen">
            <div className="home-screen__menu">
                <HomeMenu goToHome={goToHome} platforms={platforms} />
            </div>
            <div className="home-screen__games">
                <HomeTopMenu platformTitle={platformTitle} goToCart={goToCart} />
                <div className="home-screen__carousels-wrapper">
                    {Object.keys(games).map((key, indexCategory) => (
                        <div className="home-screen__carousel" key={`game-carousel-0-${indexCategory}`}>
                            <CarouselTitle focusedIndexVertical={focusedIndexVertical}>
                                {Categories[key as keyof typeof Categories].toUpperCase()}
                            </CarouselTitle>
                            <div className="home-screen__cards-wrapper">
                                {games[key as string].map((game: GameCard, indexCard: number) => (
                                    <div key={`game-card-0-${indexCard}`}>
                                        <LazyCard
                                            onClick={() => dispatch(navigationSaga(() => goToGame(game.id)))}
                                            onFocus={() => {
                                                focusedIndexFunctions[indexCategory](() => indexCard);
                                                setFocusedIndexVertical(() => indexCategory);
                                                setCardFocused((isFocused) => !isFocused);
                                            }}
                                            onBlur={() => setCardFocused((isFocused) => !isFocused)}
                                            game={game}
                                            key={`game-card-0-${indexCard}`}
                                            focused={indexCard === 0 && indexCategory === 0}
                                            isFocused={isFocused(indexCategory, indexCard)}
                                            navigableId={`${indexCard}-${indexCategory}`}
                                            indexX={focusedIndexes[indexCategory]}
                                            indexY={focusedIndexVertical}
                                            isActive={isActive}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default screenReady(withProvider(HomeScreen));
